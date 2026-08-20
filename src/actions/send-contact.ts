"use server";

import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { contactSchema } from "@/lib/contact-schema";
import type { BookingResult } from "@/lib/booking-schema";

export async function sendContact(formData: FormData): Promise<BookingResult> {
  const rawLocale = String(formData.get("locale") ?? "ro");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ro";
  const dict = getDictionary(locale);

  const raw = Object.fromEntries(formData);
  const parsed = contactSchema(dict).safeParse({
    ...raw,
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
  if (data.website) return { status: "success" };
  if (typeof data.elapsed === "number" && data.elapsed < 2500)
    return { status: "success" };

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.BOOKING_FROM_EMAIL ?? "Piano House <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — message not emailed:",
      data,
    );
    return { status: "error", message: dict.booking.errorBody };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: siteConfig.email,
      replyTo: data.email,
      subject:
        locale === "ro"
          ? `Mesaj de pe site · ${data.name}`
          : `Website message · ${data.name}`,
      html: `
        <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;color:#12100f">
          <p style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#e4257f;margin:0 0 8px">
            ${locale === "ro" ? "Mesaj de contact" : "Contact message"}
          </p>
          <h1 style="font-size:24px;margin:0 0 8px;letter-spacing:-.02em">${escapeHtml(data.name)}</h1>
          <p style="margin:0 0 24px;font-size:13px">
            <a href="tel:${data.phone.replace(/\s/g, "")}" style="color:#e4257f">${escapeHtml(data.phone)}</a> ·
            <a href="mailto:${data.email}" style="color:#e4257f">${escapeHtml(data.email)}</a>
          </p>
          <div style="padding:16px;background:#f5f1ea;border-radius:12px">
            <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</p>
          </div>
        </div>`,
    });
    if (result.error) throw new Error(result.error.message);
    return { status: "success" };
  } catch (error) {
    console.error("[contact] send failed:", error);
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
