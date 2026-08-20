import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href, unitHref } from "@/lib/routes";
import { units } from "@/data/units";
import { media } from "@/data/images.generated";

import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { UnitCard } from "@/components/sections/UnitCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icon } from "@/components/ui/Icon";

export function UnitsView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const banner = media.gallery.find((p) => p.src.endsWith("img_5231.jpg"))!;

  return (
    <>
      <PageHero
        eyebrow={dict.units.eyebrow}
        title={dict.units.title}
        subtitle={dict.units.subtitle}
        image={banner}
        crumbs={[
          { label: dict.nav.home, href: href("home", locale) },
          { label: dict.nav.units },
        ]}
      />

      <Section tone="dark">
        <div className="shell">
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {units.map((unit, i) => (
              <RevealItem key={unit.slug} className="flex">
                <UnitCard
                  unit={unit}
                  locale={locale}
                  dict={dict}
                  className="w-full"
                  priority={i === 0}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Comparison table */}
      <Section tone="light">
        <div className="shell">
          <SectionHeading title={dict.units.compareTitle} tone="light" />
          <Reveal className="mt-10 overflow-x-auto">
            <table className="w-full min-w-140 border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/15 text-xs tracking-wide text-ink/50 uppercase">
                  <th className="py-4 pr-4 font-semibold">
                    {dict.units.colUnit}
                  </th>
                  <th className="px-4 py-4 font-semibold">
                    {dict.units.colGuests}
                  </th>
                  <th className="px-4 py-4 font-semibold">
                    {dict.units.colArea}
                  </th>
                  <th className="px-4 py-4 font-semibold">
                    {dict.units.colPrice}
                  </th>
                  <th className="py-4 pl-4" />
                </tr>
              </thead>
              <tbody>
                {units.map((unit) => (
                  <tr key={unit.slug} className="group border-b border-ink/10">
                    <td className="py-5 pr-4">
                      <span className="block text-lg font-extrabold tracking-tight text-ink">
                        {unit.name}
                      </span>
                      <span className="text-sm text-ink/50">
                        {unit.kind[locale]}
                      </span>
                    </td>
                    <td className="px-4 py-5 tabular-nums text-ink/75">
                      {unit.maxGuests}
                    </td>
                    <td className="px-4 py-5 tabular-nums text-ink/75">
                      {unit.totalArea} {dict.common.sqm}
                    </td>
                    <td className="px-4 py-5 font-bold tabular-nums text-ink">
                      {unit.pricePerNight} lei
                    </td>
                    <td className="py-5 pl-4 text-right">
                      <Link
                        href={unitHref(unit.slug, locale)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-magenta transition-opacity hover:opacity-70"
                      >
                        {dict.common.readMore}
                        <Icon name="ArrowRight" className="size-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="mt-6 text-sm text-ink/50">{dict.units.priceNote}</p>
        </div>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
