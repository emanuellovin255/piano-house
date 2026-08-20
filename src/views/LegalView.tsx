import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href, type PageKey } from "@/lib/routes";
import { legalDocs, type LegalKey } from "@/data/legal";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function LegalView({ doc, locale }: { doc: LegalKey; locale: Locale }) {
  const dict = getDictionary(locale);
  const content = legalDocs[doc];
  const title = dict.nav[doc as PageKey & LegalKey];

  const updated = new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(content.updated));

  return (
    <>
      <PageHero
        title={title}
        subtitle={content.intro[locale]}
        crumbs={[
          { label: dict.nav.home, href: href("home", locale) },
          { label: title },
        ]}
      />

      <Section tone="dark" className="pt-0 md:pt-0">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="text-xs tracking-wide text-bone/35 uppercase">
              {locale === "ro" ? "Ultima actualizare" : "Last updated"}:{" "}
              {updated}
            </p>

            <div className="mt-12 space-y-12">
              {content.sections.map((section, i) => (
                <Reveal key={i} delay={i * 0.03}>
                  <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                    <span className="mr-3 text-magenta tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading[locale]}
                  </h2>
                  <div className="mt-5 space-y-4 leading-relaxed text-bone/65">
                    {section.body[locale].map((paragraph, j) => (
                      <p key={j}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
