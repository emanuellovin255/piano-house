"use server";

import { Resend } from "resend";
import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { unitBySlug } from "@/data/units";
import { bookingSchema, type BookingResult } from "@/lib/booking-schema";

/**
 * Per-IP throttle. In-memory, so it resets on deploy and is per-instance —
 * enough for a property site with a handful of enquiries a day, and it costs
 * nothing. Swap for a shared store if the site ever runs multi-region.
 */
const recent = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 500) {
    for (const [key, times] of recent) {
      if (times.every((t) => now - t > WINDOW_MS)) recent.delete(key);
    }
  }
  return hits.length > MAX_PER_WINDOW;
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export async function sendBooking(formData: FormData): Promise<BookingResult> {
  const rawLocale = String(formData.get("locale") ?? "ro");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ro";
  const dict = getDictionary(locale);

  const raw = Object.fromEntries(formData);
  const parsed = bookingSchema(dict).safeParse({
    ...raw,
    adults: Number(raw.adults),
    children: Number(raw.children),
    terms: raw.terms === "true" || raw.terms === "on",
    elapsed: raw.elapsed === undefined ? undefined : Number(raw.elapsed),
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return { status: "invalid", errors };
  }

  const data = parsed.data;

  // Bots either trip the honeypot or submit faster than a human can type.
  if (data.website) return { status: "success" };
  if (typeof data.elapsed === "number" && data.elapsed < 2500) {
    return { status: "success" };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: dict.booking.errorBody };
  }

  const unit = unitBySlug(data.unit);
  const nights = Math.round(
    (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) /
      86_400_000,
  );
  const total = unit ? unit.pricePerNight * nights : null;

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.BOOKING_FROM_EMAIL ?? `Piano House <onboarding@resend.dev>`;

  if (!apiKey) {
    // Local development without credentials: log it so the flow is still
    // testable end to end, and tell the caller it did not actually send.
    console.warn("[booking] RESEND_API_KEY is not set — enquiry not emailed:", {
      ...data,
      nights,
      total,
    });
    return { status: "error", message: dict.booking.errorBody };
  }

  const rows: [string, string][] = [
    [locale === "ro" ? "Nume" : "Name", data.name],
    [locale === "ro" ? "Telefon" : "Phone", data.phone],
    ["E-mail", data.email],
    [
      locale === "ro" ? "Spațiu" : "Space",
      `${unit?.kind[locale] ?? ""} ${unit?.name ?? data.unit}`,
    ],
    ["Check-in", formatDate(data.checkIn, locale)],
    ["Check-out", formatDate(data.checkOut, locale)],
    [locale === "ro" ? "Nopți" : "Nights", String(nights)],
    [
      locale === "ro" ? "Persoane" : "Guests",
      `${data.adults} ${locale === "ro" ? "adulți" : "adults"}${
        data.children
          ? `, ${data.children} ${locale === "ro" ? "copii" : "children"}`
          : ""
      }`,
    ],
    [
      locale === "ro" ? "Total estimat" : "Estimated total",
      total ? `${total} lei` : "—",
    ],
  ];

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#6b6b6b;font-size:13px;white-space:nowrap">${label}</td><td style="padding:8px 0;font-weight:600;font-size:14px">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const ownerHtml = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;color:#12100f">
      <p style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#e4257f;margin:0 0 8px">
        ${locale === "ro" ? "Cerere de rezervare" : "Booking request"}
      </p>
      <h1 style="font-size:24px;margin:0 0 24px;letter-spacing:-.02em">${escapeHtml(data.name)}</h1>
      <table style="border-collapse:collapse;width:100%">${table}</table>
      ${
        data.message
          ? `<div style="margin-top:24px;padding:16px;background:#f5f1ea;border-radius:12px">
               <p style="margin:0 0 6px;font-size:12px;color:#6b6b6b">${locale === "ro" ? "Mesaj" : "Message"}</p>
               <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</p>
             </div>`
          : ""
      }
      <p style="margin-top:28px;font-size:13px">
        <a href="tel:${data.phone.replace(/\s/g, "")}" style="color:#e4257f">${escapeHtml(data.phone)}</a> ·
        <a href="mailto:${data.email}" style="color:#e4257f">${escapeHtml(data.email)}</a>
      </p>
    </div>`;

  const guestHtml = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;color:#12100f">
      <h1 style="font-size:24px;margin:0 0 16px;letter-spacing:-.02em">
        ${locale === "ro" ? "Am primit cererea dumneavoastră" : "We have received your request"}
      </h1>
      <p style="font-size:15px;line-height:1.6;color:#4a4a4a;margin:0 0 24px">
        ${
          locale === "ro"
            ? `Bună ziua, ${escapeHtml(data.name)}! Vă mulțumim pentru interes. Verificăm disponibilitatea și revenim cu o confirmare în cel mai scurt timp.`
            : `Hello ${escapeHtml(data.name)}, thank you for your interest. We are checking availability and will come back with a confirmation as soon as we can.`
        }
      </p>
      <table style="border-collapse:collapse;width:100%">${table}</table>
      <p style="margin-top:28px;font-size:13px;color:#6b6b6b">
        ${siteConfig.legalName} · ${siteConfig.address.street}, ${siteConfig.address.city}<br>
        <a href="tel:${siteConfig.phones[0].raw}" style="color:#e4257f">${siteConfig.phones[0].display}</a>
      </p>
    </div>`;

  try {
    const resend = new Resend(apiKey);

    const owner = await resend.emails.send({
      from,
      to: siteConfig.email,
      replyTo: data.email,
      subject:
        locale === "ro"
          ? `Rezervare ${unit?.name ?? ""} · ${data.name} · ${formatDate(data.checkIn, locale)}`
          : `Booking ${unit?.name ?? ""} · ${data.name} · ${formatDate(data.checkIn, locale)}`,
      html: ownerHtml,
    });
    if (owner.error) throw new Error(owner.error.message);

    // The guest confirmation is a courtesy — a failure here must not make the
    // visitor think their enquiry was lost, since the owner already has it.
    const guest = await resend.emails.send({
      from,
      to: data.email,
      replyTo: siteConfig.email,
      subject:
        locale === "ro"
          ? "Piano House — am primit cererea dumneavoastră"
          : "Piano House — we have received your request",
      html: guestHtml,
    });
    if (guest.error)
      console.error("[booking] guest confirmation failed:", guest.error);

    return { status: "success" };
  } catch (error) {
    console.error("[booking] send failed:", error);
    return { status: "error", message: dict.booking.errorBody };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
