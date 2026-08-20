import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href } from "@/lib/routes";
import { faq, houseRules, rulesWarning } from "@/data/faq";

import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

export function FaqView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.faq.eyebrow}
        title={dict.faq.title}
        crumbs={[
          { label: dict.nav.home, href: href("home", locale) },
          { label: dict.nav.faq },
        ]}
      />

      <Section tone="dark" className="pt-0 md:pt-0">
        <div className="shell">
          <div className="max-w-4xl">
            <Accordion
              items={faq.map((item) => ({
                q: item.q[locale],
                a: item.a[locale],
              }))}
            />
          </div>
        </div>
      </Section>

      <Section tone="light">
        <div className="shell">
          <SectionHeading title={dict.faq.rulesTitle} tone="light" />
          <RevealGroup className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {houseRules.map((rule, i) => (
              <RevealItem
                key={i}
                className="flex items-start gap-4 border-t border-ink/10 pt-5"
              >
                <Icon
                  name={rule.icon}
                  className="mt-0.5 size-5 shrink-0 text-magenta"
                />
                <p className="leading-relaxed text-ink/75">
                  {rule.text[locale]}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <p className="mt-10 flex items-start gap-3 rounded-2xl bg-ink/5 p-6 text-sm leading-relaxed text-ink/70">
              <Icon
                name="AlertCircle"
                className="mt-0.5 size-5 shrink-0 text-magenta"
              />
              {rulesWarning[locale]}
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
