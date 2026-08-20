import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href } from "@/lib/routes";
import { galleryItems } from "@/data/gallery";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { CtaBand } from "@/components/sections/CtaBand";

export function GalleryView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.gallery.eyebrow}
        title={dict.gallery.title}
        subtitle={dict.gallery.subtitle}
        crumbs={[
          { label: dict.nav.home, href: href("home", locale) },
          { label: dict.nav.gallery },
        ]}
      />

      <Section tone="dark" className="pt-0 md:pt-0">
        <div className="shell">
          <MasonryGallery items={galleryItems} locale={locale} dict={dict} />
        </div>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
