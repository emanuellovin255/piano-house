import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getDictionary, fill } from "@/dictionaries";
import { href } from "@/lib/routes";
import { units, type Unit } from "@/data/units";
import { galleryItems } from "@/data/gallery";
import { whatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { AmenityList } from "@/components/sections/AmenityList";
import { UnitCard } from "@/components/sections/UnitCard";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

export function UnitDetailView({
  unit,
  locale,
}: {
  unit: Unit;
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const others = units.filter((u) => u.slug !== unit.slug);

  // The per-unit folders duplicate images that already carry gallery metadata,
  // so reuse those entries to get alt text and blur data for the lightbox.
  const photos = unit.photos
    .map((photo) =>
      galleryItems.find((item) =>
        item.src.endsWith(photo.src.split("/").pop()!),
      ),
    )
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      {/* Masthead: the cover shown whole above the name on phones, the same
          photo full-bleed behind it from md up. */}
      <section className="relative overflow-hidden pt-24 pb-14 md:flex md:min-h-[78svh] md:items-end md:pt-32 md:pb-20">
        <div
          aria-hidden
          style={{ backgroundImage: `url(${unit.cover.blurDataURL})` }}
          className="absolute inset-0 scale-110 bg-cover bg-center opacity-35 md:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/55 md:hidden"
        />
        <div className="relative mx-auto mb-8 aspect-3/2 w-[min(100%-1.5rem,60svh)] overflow-hidden rounded-2xl ring-1 ring-bone/15 md:absolute md:inset-0 md:m-0 md:aspect-auto md:w-auto md:rounded-none md:ring-0">
          <Image
            src={unit.cover.src}
            alt={`${unit.kind[locale]} ${unit.name}`}
            fill
            priority
            sizes="(min-width: 768px) 100vw, 96vw"
            placeholder="blur"
            blurDataURL={unit.cover.blurDataURL}
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/65 to-ink/45 md:block" />

        <div className="shell relative">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs text-bone/50"
          >
            <a
              href={href("units", locale)}
              className="transition-colors hover:text-bone"
            >
              {dict.nav.units}
            </a>
            <Icon name="ChevronRight" className="size-3 opacity-50" />
            <span className="text-bone/80">{unit.name}</span>
          </nav>

          <p className="eyebrow mb-4 text-magenta">{unit.kind[locale]}</p>
          <SplitText
            lines={[unit.name]}
            className="display text-[clamp(3rem,12vw,9rem)]"
          />
          <p className="mt-5 max-w-xl text-lg text-bone/70">
            {unit.tagline[locale]}
          </p>

          <dl className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-bone/15 pt-6">
            <Stat
              icon="Users"
              label={dict.common.guests}
              value={fill(dict.common.guestsMax, { n: unit.maxGuests })}
            />
            <Stat
              icon="BedDouble"
              label={dict.common.totalArea}
              value={`${unit.totalArea} ${dict.common.sqm}`}
            />
            <div className="ml-auto flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight tabular-nums">
                {unit.pricePerNight} lei
              </span>
              <span className="text-sm text-bone/50">
                {dict.common.perNight}
              </span>
            </div>
          </dl>
        </div>
      </section>

      {/* Description, rooms, beds */}
      <Section tone="light">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-6 text-lg leading-relaxed text-ink/70">
                {unit.intro[locale].map((paragraph, i) => (
                  <p
                    key={i}
                    className={i === 0 ? "text-xl text-ink/85" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <h2 className="text-sm font-semibold tracking-wide text-ink/45 uppercase">
                {dict.units.detailRooms}
              </h2>
              <ul className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
                {unit.rooms.map((room, i) => (
                  <li
                    key={i}
                    className="flex items-baseline justify-between gap-6 py-4"
                  >
                    <span className="text-ink/80">{room.label[locale]}</span>
                    <span className="shrink-0 font-bold tabular-nums text-ink">
                      {room.area} {dict.common.sqm}
                    </span>
                  </li>
                ))}
                <li className="flex items-baseline justify-between gap-6 py-4">
                  <span className="font-semibold text-ink">
                    {dict.common.totalArea}
                  </span>
                  <span className="shrink-0 text-lg font-extrabold tabular-nums text-magenta">
                    {unit.totalArea} {dict.common.sqm}
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="mt-10">
              <h2 className="text-sm font-semibold tracking-wide text-ink/45 uppercase">
                {dict.units.detailBeds}
              </h2>
              <ul className="mt-5 space-y-3">
                {unit.beds[locale].map((bed, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink/75">
                    <Icon name="BedDouble" className="size-5 text-magenta" />
                    {bed}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sticky booking card */}
          <div className="lg:col-span-5">
            <Reveal direction="left" className="lg:sticky lg:top-28">
              <div className="rounded-2xl bg-ink p-7 text-bone md:p-8">
                <p className="eyebrow text-magenta">{dict.booking.eyebrow}</p>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight tabular-nums">
                    {unit.pricePerNight} lei
                  </span>
                  <span className="text-sm text-bone/50">
                    {dict.common.perNight}
                  </span>
                </p>
                <p className="mt-2 text-sm text-bone/45">
                  {dict.units.priceNote}
                </p>

                <ul className="mt-7 space-y-2.5 border-t border-bone/10 pt-6">
                  {unit.highlights[locale].map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-bone/75"
                    >
                      <Icon
                        name="Check"
                        className="size-4 text-magenta"
                        strokeWidth={2.5}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3">
                  <ButtonLink
                    href={`${href("booking", locale)}?unit=${unit.slug}`}
                    size="lg"
                    icon="ArrowRight"
                  >
                    {fill(dict.units.bookThis, { name: unit.name })}
                  </ButtonLink>
                  <a
                    href={whatsappUrl(locale, { unitName: unit.name })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-bone/25 text-base font-semibold transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                  >
                    <Icon name="MessageCircle" className="size-5" />
                    {dict.common.whatsapp}
                  </a>
                  <a
                    href={`tel:${siteConfig.phones[0].raw}`}
                    className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-bone/60 transition-colors hover:text-bone"
                  >
                    <Icon name="Phone" className="size-4" />
                    {siteConfig.phones[0].display}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Amenities */}
      <Section tone="dark">
        <div className="shell">
          <SectionHeading title={dict.units.detailAmenities} />
          <Reveal className="mt-12">
            <AmenityList ids={unit.amenities} locale={locale} columns={3} />
          </Reveal>
        </div>
      </Section>

      {/* Gallery */}
      <Section tone="soft">
        <div className="shell">
          <SectionHeading title={dict.units.detailGallery} />
          <div className="mt-12">
            <MasonryGallery
              items={photos}
              locale={locale}
              dict={dict}
              showFilters={false}
            />
          </div>
        </div>
      </Section>

      {/* Other units */}
      <Section tone="dark">
        <div className="shell">
          <SectionHeading title={dict.units.otherUnits} />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {others.map((other) => (
              <RevealItem key={other.slug} className="flex">
                <UnitCard
                  unit={other}
                  locale={locale}
                  dict={dict}
                  className="w-full"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-10">
            <ButtonLink
              href={href("units", locale)}
              variant="ghost"
              icon="ArrowRight"
            >
              {dict.common.backToUnits}
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon name={icon} className="size-5 text-magenta" />
      <div>
        <dt className="text-xs tracking-wide text-bone/45 uppercase">
          {label}
        </dt>
        <dd className="font-semibold">{value}</dd>
      </div>
    </div>
  );
}
