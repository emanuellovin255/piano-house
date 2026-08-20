import { Suspense } from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href } from "@/lib/routes";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { BookingForm } from "@/components/booking/BookingForm";

export function BookingView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.booking.eyebrow}
        title={dict.booking.title}
        subtitle={dict.booking.subtitle}
        crumbs={[
          { label: dict.nav.home, href: href("home", locale) },
          { label: dict.nav.booking },
        ]}
      />

      <Section tone="dark" className="pt-0 md:pt-0">
        <div className="shell">
          <Suspense
            fallback={
              <p className="py-20 text-center text-sm text-bone/40">
                {dict.common.loading}
              </p>
            }
          >
            <BookingForm locale={locale} />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
