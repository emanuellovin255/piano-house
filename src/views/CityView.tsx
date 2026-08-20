import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href } from "@/lib/routes";
import { attractions, practical } from "@/data/city-guide";
import { media } from "@/data/images.generated";

import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

export function CityView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const banner = media.hero.find((p) => p.src.endsWith("pano.jpg"))!;

  const groups = [
    { id: "cetate", label: { ro: "În cetate", en: "Inside the citadel" } },
    {
      id: "muzee",
      label: { ro: "Muzee și colecții", en: "Museums and collections" },
    },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow={dict.city.eyebrow}
        title={dict.city.title}
        subtitle={dict.city.subtitle}
        image={banner}
        crumbs={[
          { label: dict.nav.home, href: href("home", locale) },
          { label: dict.nav.city },
        ]}
      />

      {groups.map((group, index) => {
        const items = attractions.filter((a) => a.category === group.id);
        if (items.length === 0) return null;
        return (
          <Section key={group.id} tone={index % 2 === 0 ? "dark" : "soft"}>
            <div className="shell">
              <SectionHeading title={group.label[locale]} />
              <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2">
                {items.map((attraction) => (
                  <RevealItem
                    key={attraction.id}
                    className="rounded-2xl bg-ink-soft p-7 ring-1 ring-bone/8"
                  >
                    <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-magenta uppercase">
                      <Icon name="MapPin" className="size-3.5" />
                      {attraction.walk[locale]}
                    </p>
                    <h3 className="mt-4 text-xl font-bold tracking-tight">
                      {attraction.name[locale]}
                    </h3>
                    <p className="mt-3 leading-relaxed text-bone/60">
                      {attraction.blurb[locale]}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Section>
        );
      })}

      <Section tone="light">
        <div className="shell">
          <SectionHeading title={dict.city.practicalTitle} tone="light" />
          <RevealGroup className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {practical.map((item) => (
              <RevealItem
                key={item.id}
                className="flex items-start gap-4 border-t border-ink/10 pt-5"
              >
                <Icon
                  name={item.icon}
                  className="mt-0.5 size-5 shrink-0 text-magenta"
                />
                <div>
                  <p className="font-medium text-ink">{item.label[locale]}</p>
                  <p className="mt-1 text-sm text-ink/50">
                    {item.value[locale]}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
