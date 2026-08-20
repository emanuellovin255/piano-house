import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href } from "@/lib/routes";
import { amenityCategories, amenitiesByCategory } from "@/data/amenities";
import { units } from "@/data/units";
import { media } from "@/data/images.generated";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

export function AmenitiesView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const banner = media.gallery.find((p) => p.src.endsWith("img_5226.jpg"))!;

  return (
    <>
      <PageHero
        eyebrow={dict.amenities.eyebrow}
        title={dict.amenities.title}
        subtitle={dict.amenities.subtitle}
        image={banner}
        crumbs={[
          { label: dict.nav.home, href: href("home", locale) },
          { label: dict.nav.amenities },
        ]}
      />

      {amenityCategories.map((category, index) => (
        <Section key={category.id} tone={index % 2 === 0 ? "dark" : "soft"}>
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow text-magenta">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="display mt-4 text-[clamp(1.75rem,4vw,2.75rem)]">
                  {category.label[locale]}
                </h2>
                <p className="mt-5 leading-relaxed text-bone/55">
                  {category.blurb[locale]}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <RevealGroup className="grid gap-x-8 gap-y-px sm:grid-cols-2">
                {amenitiesByCategory(category.id).map((amenity) => (
                  <RevealItem
                    key={amenity.id}
                    className="flex items-start gap-4 border-b border-bone/10 py-5"
                  >
                    <Icon
                      name={amenity.icon}
                      className="mt-0.5 size-5 shrink-0 text-magenta"
                    />
                    <div>
                      <p className="font-medium">{amenity.label[locale]}</p>
                      {amenity.note && (
                        <p className="mt-1 text-sm text-bone/45">
                          {amenity.note[locale]}
                        </p>
                      )}
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Section>
      ))}

      {/* Per-unit quick reference */}
      <Section tone="light">
        <div className="shell">
          <h2 className="display text-[clamp(1.75rem,4vw,2.75rem)] text-ink">
            {locale === "ro"
              ? "Ce găsiți în fiecare spațiu"
              : "What each space includes"}
          </h2>
          <Reveal className="mt-10 overflow-x-auto">
            <table className="w-full min-w-160 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink/15 text-xs tracking-wide text-ink/50 uppercase">
                  <th className="py-4 pr-4 font-semibold">
                    {locale === "ro" ? "Dotare" : "Amenity"}
                  </th>
                  {units.map((unit) => (
                    <th
                      key={unit.slug}
                      className="px-4 py-4 text-center font-semibold"
                    >
                      {unit.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {amenityCategories.flatMap((category) =>
                  amenitiesByCategory(category.id).map((amenity) => (
                    <tr key={amenity.id} className="border-b border-ink/10">
                      <td className="py-3.5 pr-4 text-ink/75">
                        {amenity.label[locale]}
                      </td>
                      {units.map((unit) => (
                        <td key={unit.slug} className="px-4 py-3.5 text-center">
                          {unit.amenities.includes(amenity.id) ||
                          category.id === "outdoor" ||
                          category.id === "access" ? (
                            <Icon
                              name="Check"
                              className="mx-auto size-4 text-magenta"
                              strokeWidth={2.5}
                            />
                          ) : (
                            <span className="text-ink/20">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </Reveal>
        </div>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
