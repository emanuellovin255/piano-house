import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { locales, type Locale } from "@/lib/i18n";
import { pages, type PageKey } from "@/lib/routes";
import { units } from "@/data/units";
import { faq } from "@/data/faq";

const BASE = siteConfig.url;

/** Absolute URL for a set of path segments under a locale. */
export function absoluteUrl(locale: Locale, segments: string[] = []) {
  const path = [locale, ...segments.filter(Boolean)].join("/");
  return `${BASE}/${path}`;
}

/**
 * hreflang map for a page. `segmentsFor` receives a locale and returns that
 * locale's segments, so translated slugs stay linked to each other.
 */
export function alternatesFor(
  locale: Locale,
  segmentsFor: (l: Locale) => string[],
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(l, segmentsFor(l));
  languages["x-default"] = absoluteUrl("ro", segmentsFor("ro"));
  return { canonical: absoluteUrl(locale, segmentsFor(locale)), languages };
}

export function buildMetadata({
  locale,
  title,
  description,
  segmentsFor,
  image,
}: {
  locale: Locale;
  title: string;
  description: string;
  segmentsFor: (l: Locale) => string[];
  image?: string;
}): Metadata {
  const url = absoluteUrl(locale, segmentsFor(locale));
  const ogImage = image ?? "/media/new/pano-outside.jpg";
  return {
    title,
    description,
    alternates: alternatesFor(locale, segmentsFor),
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: locale === "ro" ? "ro_RO" : "en_GB",
      images: [
        { url: ogImage, width: 1200, height: 630, alt: siteConfig.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Convenience for pages that map 1:1 onto the route table. */
export function pageSegments(page: PageKey) {
  return (l: Locale) => (pages[page][l] ? [pages[page][l]] : []);
}

/* ---------------------------------- JSON-LD --------------------------------- */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.city,
  addressRegion: siteConfig.address.county,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.country,
};

export function lodgingJsonLd(locale: Locale) {
  const prices = units.map((u) => u.pricePerNight);
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${BASE}/#lodging`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl(locale),
    telephone: siteConfig.phones.map((p) => p.raw),
    email: siteConfig.email,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    image: [
      `${BASE}/media/new/pano-outside.jpg`,
      `${BASE}/media/units/cover/city.jpg`,
      `${BASE}/media/units/cover/tango.jpg`,
    ],
    priceRange: `${Math.min(...prices)}–${Math.max(...prices)} RON`,
    currenciesAccepted: "RON",
    checkinTime: siteConfig.checkIn,
    checkoutTime: siteConfig.checkOut,
    petsAllowed: false,
    smokingAllowed: false,
    numberOfRooms: units.length,
    sameAs: [siteConfig.social.facebook],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Free WiFi",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Free parking",
        value: true,
      },
      { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
      {
        "@type": "LocationFeatureSpecification",
        name: "Wheelchair accessible entrance",
        value: true,
      },
    ],
  };
}

export function unitJsonLd(slug: string, locale: Locale) {
  const unit = units.find((u) => u.slug === slug);
  if (!unit) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: `${unit.kind[locale]} ${unit.name} — ${siteConfig.name}`,
    description: unit.intro[locale][0],
    url: `${BASE}/${locale}/${pages.units[locale]}/${unit.slug}`,
    image: unit.photos.map((p) => `${BASE}${p.src}`),
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: unit.maxGuests,
      unitText: "person",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: unit.totalArea,
      unitCode: "MTK",
    },
    address: postalAddress,
    containedInPlace: { "@id": `${BASE}/#lodging` },
    offers: {
      "@type": "Offer",
      price: unit.pricePerNight,
      priceCurrency: "RON",
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q[locale],
      acceptedAnswer: { "@type": "Answer", text: item.a[locale] },
    })),
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  trail: { name: string; segments: string[] }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(locale, item.segments),
    })),
  };
}
