import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { pages, type PageKey } from "@/lib/routes";
import { units } from "@/data/units";
import { absoluteUrl } from "@/lib/seo";

const priorities: Partial<Record<PageKey, number>> = {
  home: 1,
  units: 0.9,
  booking: 0.9,
  gallery: 0.8,
  about: 0.7,
  amenities: 0.7,
  city: 0.7,
  contact: 0.7,
  faq: 0.6,
  reviews: 0.5,
  terms: 0.2,
  privacy: 0.2,
  cookies: 0.2,
};

/** Every entry carries its own hreflang alternates, as Google expects. */
function alternates(segmentsFor: (l: Locale) => string[]) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(l, segmentsFor(l));
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const key of Object.keys(pages) as PageKey[]) {
      const segmentsFor = (l: Locale) => (pages[key][l] ? [pages[key][l]] : []);
      entries.push({
        url: absoluteUrl(locale, segmentsFor(locale)),
        lastModified,
        changeFrequency: key === "home" ? "weekly" : "monthly",
        priority: priorities[key] ?? 0.5,
        alternates: alternates(segmentsFor),
      });
    }

    for (const unit of units) {
      const segmentsFor = (l: Locale) => [pages.units[l], unit.slug];
      entries.push({
        url: absoluteUrl(locale, segmentsFor(locale)),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: alternates(segmentsFor),
      });
    }
  }

  return entries;
}
