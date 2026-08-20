import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { locales, isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { pages, pageFromSlug, allPagePaths, type PageKey } from "@/lib/routes";
import { pageMeta } from "@/lib/page-meta";
import { unitBySlug, type Unit } from "@/data/units";
import {
  buildMetadata,
  pageSegments,
  faqJsonLd,
  unitJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";

import { AboutView } from "@/views/AboutView";
import { UnitsView } from "@/views/UnitsView";
import { UnitDetailView } from "@/views/UnitDetailView";
import { AmenitiesView } from "@/views/AmenitiesView";
import { GalleryView } from "@/views/GalleryView";
import { CityView } from "@/views/CityView";
import { ReviewsView } from "@/views/ReviewsView";
import { BookingView } from "@/views/BookingView";
import { ContactView } from "@/views/ContactView";
import { FaqView } from "@/views/FaqView";
import { LegalView } from "@/views/LegalView";

type Params = { lang: string; slug: string[] };

type Resolved = { kind: "page"; page: PageKey } | { kind: "unit"; unit: Unit };

/** Turn the URL segments back into the page (or unit) they address. */
function resolve(segments: string[], locale: Locale): Resolved | null {
  const page = pageFromSlug(segments, locale);
  if (page) return { kind: "page", page };

  if (segments.length === 2 && segments[0] === pages.units[locale]) {
    const unit = unitBySlug(segments[1]);
    if (unit) return { kind: "unit", unit };
  }
  return null;
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    allPagePaths(lang).map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const locale: Locale = lang;

  const resolved = resolve(slug, locale);
  if (!resolved) return {};

  if (resolved.kind === "unit") {
    const { unit } = resolved;
    return buildMetadata({
      locale,
      title: `${unit.kind[locale]} ${unit.name}`,
      description: unit.intro[locale][0],
      segmentsFor: (l) => [pages.units[l], unit.slug],
      image: unit.cover.src,
    });
  }

  const meta = pageMeta[resolved.page];
  return buildMetadata({
    locale,
    title: meta.title[locale],
    description: meta.description[locale],
    segmentsFor: pageSegments(resolved.page),
  });
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;

  const resolved = resolve(slug, locale);
  if (!resolved) notFound();

  const dict = getDictionary(locale);

  if (resolved.kind === "unit") {
    const { unit } = resolved;
    return (
      <>
        <JsonLd data={unitJsonLd(unit.slug, locale)} />
        <JsonLd
          data={breadcrumbJsonLd(locale, [
            { name: dict.nav.home, segments: [] },
            { name: dict.nav.units, segments: [pages.units[locale]] },
            { name: unit.name, segments: [pages.units[locale], unit.slug] },
          ])}
        />
        <UnitDetailView unit={unit} locale={locale} />
      </>
    );
  }

  const { page } = resolved;
  const crumbs = (
    <JsonLd
      data={breadcrumbJsonLd(locale, [
        { name: dict.nav.home, segments: [] },
        { name: pageMeta[page].title[locale], segments: [pages[page][locale]] },
      ])}
    />
  );

  switch (page) {
    case "about":
      return (
        <>
          {crumbs}
          <AboutView locale={locale} />
        </>
      );
    case "units":
      return (
        <>
          {crumbs}
          <UnitsView locale={locale} />
        </>
      );
    case "amenities":
      return (
        <>
          {crumbs}
          <AmenitiesView locale={locale} />
        </>
      );
    case "gallery":
      return (
        <>
          {crumbs}
          <GalleryView locale={locale} />
        </>
      );
    case "city":
      return (
        <>
          {crumbs}
          <CityView locale={locale} />
        </>
      );
    case "reviews":
      return (
        <>
          {crumbs}
          <ReviewsView locale={locale} />
        </>
      );
    case "booking":
      return (
        <>
          {crumbs}
          <BookingView locale={locale} />
        </>
      );
    case "contact":
      return (
        <>
          {crumbs}
          <ContactView locale={locale} />
        </>
      );
    case "faq":
      return (
        <>
          {crumbs}
          <JsonLd data={faqJsonLd(locale)} />
          <FaqView locale={locale} />
        </>
      );
    case "terms":
      return (
        <>
          {crumbs}
          <LegalView doc="terms" locale={locale} />
        </>
      );
    case "privacy":
      return (
        <>
          {crumbs}
          <LegalView doc="privacy" locale={locale} />
        </>
      );
    case "cookies":
      return (
        <>
          {crumbs}
          <LegalView doc="cookies" locale={locale} />
        </>
      );
    default:
      notFound();
  }
}

function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
