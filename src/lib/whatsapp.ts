import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n";

export type WhatsAppEnquiry = {
  unitName?: string;
  checkIn?: Date;
  checkOut?: Date;
  adults?: number;
  children?: number;
  name?: string;
  nights?: number;
  total?: number;
};

const dateFmt: Record<Locale, Intl.DateTimeFormat> = {
  ro: new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }),
  en: new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }),
};

const copy = {
  ro: {
    opening: "Bună ziua! Aș dori să verific disponibilitatea la Piano House.",
    generic: "Bună ziua! Aș dori informații despre cazarea la Piano House.",
    unit: "Spațiu",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Persoane",
    adults: (n: number) => `${n} ${n === 1 ? "adult" : "adulți"}`,
    children: (n: number) => `${n} ${n === 1 ? "copil" : "copii"}`,
    nights: (n: number) => `${n} ${n === 1 ? "noapte" : "nopți"}`,
    duration: "Durata",
    estimate: "Total estimat",
    name: "Nume",
    closing: "Mulțumesc!",
  },
  en: {
    opening: "Hello! I would like to check availability at Piano House.",
    generic:
      "Hello! I would like some information about staying at Piano House.",
    unit: "Space",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    adults: (n: number) => `${n} ${n === 1 ? "adult" : "adults"}`,
    children: (n: number) => `${n} ${n === 1 ? "child" : "children"}`,
    nights: (n: number) => `${n} ${n === 1 ? "night" : "nights"}`,
    duration: "Length of stay",
    estimate: "Estimated total",
    name: "Name",
    closing: "Thank you!",
  },
} as const;

/**
 * Builds a wa.me link with the enquiry already written out. Called both from
 * the booking form (full details) and from plain "message us" buttons (no
 * details), so every field is optional.
 */
export function whatsappUrl(locale: Locale, enquiry: WhatsAppEnquiry = {}) {
  const c = copy[locale];
  const fmt = dateFmt[locale];
  const hasDetails = Boolean(
    enquiry.unitName || enquiry.checkIn || enquiry.checkOut || enquiry.adults,
  );

  const lines: string[] = [hasDetails ? c.opening : c.generic, ""];

  if (enquiry.unitName) lines.push(`${c.unit}: ${enquiry.unitName}`);
  if (enquiry.checkIn)
    lines.push(`${c.checkIn}: ${fmt.format(enquiry.checkIn)}`);
  if (enquiry.checkOut)
    lines.push(`${c.checkOut}: ${fmt.format(enquiry.checkOut)}`);
  if (enquiry.nights) lines.push(`${c.duration}: ${c.nights(enquiry.nights)}`);

  if (enquiry.adults) {
    const parts = [c.adults(enquiry.adults)];
    if (enquiry.children) parts.push(c.children(enquiry.children));
    lines.push(`${c.guests}: ${parts.join(", ")}`);
  }

  if (enquiry.total) lines.push(`${c.estimate}: ${enquiry.total} lei`);
  if (enquiry.name) lines.push(`${c.name}: ${enquiry.name}`);

  lines.push("", c.closing);

  const text = lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}
