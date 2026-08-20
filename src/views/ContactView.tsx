import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href } from "@/lib/routes";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { LocationMap } from "@/components/sections/LocationMap";
import { ContactForm } from "@/components/booking/ContactForm";
import { Icon, FacebookIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

export function ContactView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
        crumbs={[
          { label: dict.nav.home, href: href("home", locale) },
          { label: dict.nav.contact },
        ]}
      />

      <Section tone="dark" className="pt-0 md:pt-0">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal className="space-y-8">
              <div>
                <h2 className="eyebrow text-bone/40">
                  {dict.contact.phoneLabel}
                </h2>
                <div className="mt-4 space-y-2">
                  {siteConfig.phones.map((phone) => (
                    <a
                      key={phone.raw}
                      href={`tel:${phone.raw}`}
                      className="flex items-center gap-3 text-2xl font-extrabold tracking-tight transition-colors hover:text-magenta"
                    >
                      <Icon name="Phone" className="size-5 text-magenta" />
                      {phone.display}
                    </a>
                  ))}
                </div>
                <a
                  href={whatsappUrl(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-bone/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                >
                  <Icon name="MessageCircle" className="size-4" />
                  {dict.common.whatsapp}
                </a>
              </div>

              <div>
                <h2 className="eyebrow text-bone/40">
                  {dict.contact.emailLabel}
                </h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-4 flex items-center gap-3 text-lg font-semibold transition-colors hover:text-magenta"
                >
                  <Icon name="Mail" className="size-5 text-magenta" />
                  {siteConfig.email}
                </a>
              </div>

              <div>
                <h2 className="eyebrow text-bone/40">
                  {dict.contact.addressLabel}
                </h2>
                <p className="mt-4 flex items-start gap-3 text-lg leading-relaxed">
                  <Icon
                    name="MapPin"
                    className="mt-1 size-5 shrink-0 text-magenta"
                  />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.county}
                    <br />
                    {siteConfig.address.postalCode}
                  </span>
                </p>
              </div>

              <div>
                <h2 className="eyebrow text-bone/40">
                  {dict.contact.checkInLabel}
                </h2>
                <p className="mt-4 flex items-center gap-3 text-lg">
                  <Icon name="Clock" className="size-5 text-magenta" />
                  <span className="tabular-nums">
                    {siteConfig.checkIn} / {siteConfig.checkOut}
                  </span>
                </p>
              </div>

              <div>
                <h2 className="eyebrow text-bone/40">{dict.footer.followUs}</h2>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2.5 text-lg font-semibold transition-colors hover:text-magenta"
                >
                  <FacebookIcon className="size-5 text-magenta" />
                  Facebook
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal direction="left">
              <h2 className="display text-[clamp(1.5rem,3.4vw,2.25rem)]">
                {dict.contact.formTitle}
              </h2>
              <div className="mt-8">
                <ContactForm locale={locale} />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="soft" className="pt-0 md:pt-0">
        <div className="shell">
          <h2 className="display mb-8 text-[clamp(1.5rem,3.4vw,2.25rem)]">
            {dict.contact.mapTitle}
          </h2>
          <LocationMap dict={dict} />
        </div>
      </Section>
    </>
  );
}
