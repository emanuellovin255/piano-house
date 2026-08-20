import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href } from "@/lib/routes";
import { units, priceFrom } from "@/data/units";
import { amenityCategories, amenitiesByCategory } from "@/data/amenities";
import {
  heroSlides,
  galleryTeaser,
  courtyardLounge,
  galleryItems,
} from "@/data/gallery";
import { attractions } from "@/data/city-guide";
import { hasReviews } from "@/data/reviews";
import { siteConfig } from "@/config/site";

import { Hero } from "@/components/hero/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Marquee } from "@/components/motion/Marquee";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { UnitCard } from "@/components/sections/UnitCard";
import { AmenityList } from "@/components/sections/AmenityList";
import { CtaBand } from "@/components/sections/CtaBand";
import { ReviewsBlock } from "@/components/sections/ReviewsBlock";

export function HomeView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        slides={heroSlides}
        priceFrom={priceFrom}
      />

      <div className="border-y border-bone/10 bg-ink-soft">
        <Marquee
          items={[
            "Piano House",
            "Alba Iulia",
            "Str. Iașilor 35",
            "Cazare la curte",
          ]}
        />
      </div>

      {/* Intro — the owner's own words, set as an editorial statement. */}
      <Section tone="light">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-magenta">{dict.home.introEyebrow}</p>
              <h2 className="display mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] text-ink">
                {dict.home.introTitle}
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/65">
                {dict.home.introBody}
              </p>
            </Reveal>

            <RevealGroup className="mt-12 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-3">
              <RevealItem>
                <p className="display text-4xl text-ink">
                  <Counter to={units.length} />
                </p>
                <p className="mt-2 text-sm text-ink/55">
                  {dict.home.statsUnits}
                </p>
              </RevealItem>
              <RevealItem>
                <p className="display text-4xl text-ink">
                  {dict.home.statsRenovatedValue}
                </p>
                <p className="mt-2 text-sm text-ink/55">
                  {dict.home.statsRenovated}
                </p>
              </RevealItem>
              <RevealItem>
                <p className="display text-4xl text-ink">
                  {dict.home.statsCitadelValue}
                </p>
                <p className="mt-2 text-sm text-ink/55">
                  {dict.home.statsCitadel}
                </p>
              </RevealItem>
            </RevealGroup>

            <Reveal delay={0.1} className="mt-10">
              <ButtonLink
                href={href("about", locale)}
                variant="outlineDark"
                icon="ArrowRight"
              >
                {dict.common.readMore}
              </ButtonLink>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="left">
              <Parallax className="aspect-3/4 rounded-2xl" amount={8}>
                <Image
                  src={courtyardLounge.src}
                  alt={courtyardLounge.alt[locale]}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  placeholder="blur"
                  blurDataURL={courtyardLounge.blurDataURL}
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Units */}
      <Section tone="dark" id="units">
        <div className="shell">
          <SectionHeading
            eyebrow={dict.home.unitsEyebrow}
            title={dict.home.unitsTitle}
            body={dict.home.unitsBody}
            action={
              <ButtonLink
                href={href("units", locale)}
                variant="outline"
                icon="ArrowRight"
              >
                {dict.common.viewAll}
              </ButtonLink>
            }
          />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {units.map((unit) => (
              <RevealItem key={unit.slug} className="flex">
                <UnitCard
                  unit={unit}
                  locale={locale}
                  dict={dict}
                  className="w-full"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Amenities */}
      <Section tone="soft">
        <div className="shell">
          <SectionHeading
            eyebrow={dict.home.amenitiesEyebrow}
            title={dict.home.amenitiesTitle}
            action={
              <ButtonLink
                href={href("amenities", locale)}
                variant="outline"
                icon="ArrowRight"
              >
                {dict.common.viewAll}
              </ButtonLink>
            }
          />
          <RevealGroup className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
            {amenityCategories.map((category) => (
              <RevealItem key={category.id}>
                <h3 className="text-lg font-bold tracking-tight">
                  {category.label[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bone/50">
                  {category.blurb[locale]}
                </p>
                <AmenityList
                  ids={amenitiesByCategory(category.id)
                    .slice(0, 4)
                    .map((a) => a.id)}
                  locale={locale}
                  columns={1}
                  className="mt-6"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Gallery teaser */}
      <Section tone="dark">
        <div className="shell">
          <SectionHeading
            eyebrow={dict.home.galleryEyebrow}
            title={dict.home.galleryTitle}
            action={
              <ButtonLink
                href={href("gallery", locale)}
                variant="outline"
                icon="ArrowRight"
              >
                {dict.common.seePhotos}
              </ButtonLink>
            }
          />
        </div>
        <RevealGroup className="mt-14 grid grid-cols-2 gap-3 px-3 md:grid-cols-3 md:gap-4 md:px-4">
          {galleryTeaser.map((item, i) => (
            <RevealItem
              key={item.src}
              className={
                i === 0 ? "col-span-2 md:col-span-1 md:row-span-2" : ""
              }
            >
              <Link
                href={href("gallery", locale)}
                className="group relative block size-full overflow-hidden rounded-xl bg-ink-soft"
              >
                <Image
                  src={item.src}
                  alt={item.alt[locale]}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  placeholder="blur"
                  blurDataURL={item.blurDataURL}
                  className="size-full object-cover transition-transform duration-[0.9s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="shell mt-8 text-center text-sm text-bone/45">
          {galleryItems.length}+{" "}
          {locale === "ro" ? "fotografii în galerie" : "photos in the gallery"}
        </div>
      </Section>

      {/* City guide */}
      <Section tone="light">
        <div className="shell">
          <SectionHeading
            eyebrow={dict.home.cityEyebrow}
            title={dict.home.cityTitle}
            body={dict.home.cityBody}
            tone="light"
            action={
              <ButtonLink
                href={href("city", locale)}
                variant="outlineDark"
                icon="ArrowRight"
              >
                {dict.common.readMore}
              </ButtonLink>
            }
          />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.slice(0, 3).map((attraction) => (
              <RevealItem key={attraction.id} className="bg-bone p-7">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-magenta uppercase">
                  <Icon name="MapPin" className="size-3.5" />
                  {attraction.walk[locale]}
                </p>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">
                  {attraction.name[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {attraction.blurb[locale]}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {hasReviews && (
        <Section tone="soft">
          <div className="shell">
            <SectionHeading
              eyebrow={dict.home.reviewsEyebrow}
              title={dict.reviews.title}
            />
            <ReviewsBlock locale={locale} dict={dict} className="mt-14" />
          </div>
        </Section>
      )}

      <CtaBand locale={locale} dict={dict} />

      <div className="border-t border-bone/10 bg-ink-soft">
        <Marquee
          items={[
            siteConfig.phones[0].display,
            "Rezervări",
            siteConfig.email,
            "Alba Iulia",
          ]}
        />
      </div>
    </>
  );
}
