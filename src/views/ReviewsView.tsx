import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href } from "@/lib/routes";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ReviewsBlock } from "@/components/sections/ReviewsBlock";
import { CtaBand } from "@/components/sections/CtaBand";

export function ReviewsView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.reviews.eyebrow}
        title={dict.reviews.title}
        crumbs={[
          { label: dict.nav.home, href: href("home", locale) },
          { label: dict.nav.reviews },
        ]}
      />

      <Section tone="dark" className="pt-0 md:pt-0">
        <div className="shell">
          <ReviewsBlock locale={locale} dict={dict} />
        </div>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
