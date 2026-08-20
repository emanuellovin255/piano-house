import type { Locale, L } from "@/lib/i18n";
import { units } from "@/data/units";

/**
 * Every page has a localised slug so URLs read naturally in both languages
 * (/despre-noi and /en/about). A single catch-all route resolves these,
 * which keeps the slug table as the one place routing is defined.
 */
export const pages = {
  home: { ro: "", en: "" },
  about: { ro: "despre-noi", en: "about" },
  units: { ro: "apartamente", en: "apartments" },
  amenities: { ro: "facilitati", en: "amenities" },
  gallery: { ro: "galerie", en: "gallery" },
  city: { ro: "alba-iulia", en: "alba-iulia" },
  reviews: { ro: "recenzii", en: "reviews" },
  booking: { ro: "rezervari", en: "booking" },
  contact: { ro: "contact", en: "contact" },
  faq: { ro: "intrebari-frecvente", en: "faq" },
  terms: { ro: "termeni-si-conditii", en: "terms" },
  privacy: { ro: "politica-de-confidentialitate", en: "privacy" },
  cookies: { ro: "politica-cookies", en: "cookies" },
} as const satisfies Record<string, L>;

export type PageKey = keyof typeof pages;

/** Build an href for a page, e.g. href("units", "en") -> "/en/apartments" */
export function href(page: PageKey, locale: Locale): string {
  const slug = pages[page][locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

/** Detail page for one accommodation unit, e.g. /ro/apartamente/city */
export function unitHref(unitSlug: string, locale: Locale): string {
  return `${href("units", locale)}/${unitSlug}`;
}

/** Reverse lookup: which page does this slug segment belong to? */
export function pageFromSlug(
  segments: string[],
  locale: Locale,
): PageKey | null {
  const joined = segments.join("/");
  for (const key of Object.keys(pages) as PageKey[]) {
    if (pages[key][locale] === joined) return key;
  }
  return null;
}

/**
 * Given the current path segments in one locale, produce the equivalent
 * segments in the other — so the language switcher never drops the user home.
 */
export function translateSegments(
  segments: string[],
  from: Locale,
  to: Locale,
): string[] {
  if (segments.length === 0) return [];

  const page = pageFromSlug(segments, from);
  if (page) return pages[page][to] ? [pages[page][to]] : [];

  // Unit detail pages: [unitsSlug, unitSlug]
  if (segments.length === 2 && segments[0] === pages.units[from]) {
    const unit = units.find((u) => u.slug === segments[1]);
    if (unit) return [pages.units[to], unit.slug];
  }
  return [];
}

/** All static paths for generateStaticParams on the catch-all route. */
export function allPagePaths(locale: Locale): string[][] {
  const staticPages = (Object.keys(pages) as PageKey[])
    .filter((key) => key !== "home")
    .map((key) => [pages[key][locale]]);
  const unitPages = units.map((u) => [pages.units[locale], u.slug]);
  return [...staticPages, ...unitPages];
}
