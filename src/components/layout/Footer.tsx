import Link from "next/link";
import { siteConfig, directionsUrl } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";
import { href, unitHref, type PageKey } from "@/lib/routes";
import { units } from "@/data/units";
import { whatsappUrl } from "@/lib/whatsapp";
import { Wordmark } from "@/components/layout/Wordmark";
import { Icon, FacebookIcon } from "@/components/ui/Icon";

const EXPLORE: PageKey[] = [
  "about",
  "amenities",
  "gallery",
  "city",
  "reviews",
  "faq",
];
const LEGAL: PageKey[] = ["terms", "privacy", "cookies"];

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const linkClass = "text-sm text-bone/55 transition-colors hover:text-bone";

  return (
    <footer className="border-t border-bone/10 bg-ink pb-[calc(6rem+env(safe-area-inset-bottom))] sm:pb-0">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Wordmark className="h-14 w-auto text-bone" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone/55">
              {dict.footer.tagline}
            </p>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-bone/15 px-4 py-2 text-sm font-medium text-bone/75 transition-colors hover:border-bone/40 hover:text-bone"
            >
              <FacebookIcon className="size-4" />
              Facebook
            </a>
          </div>

          <div className="md:col-span-4">
            <h3 className="eyebrow text-magenta">{dict.footer.bookings}</h3>
            <ul className="mt-6 space-y-4">
              {siteConfig.phones.map((phone) => (
                <li key={phone.raw}>
                  <a
                    href={`tel:${phone.raw}`}
                    className="flex items-center gap-3 text-lg font-bold tracking-tight text-bone transition-colors hover:text-magenta"
                  >
                    <Icon name="Phone" className="size-4 text-bone/40" />
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-bone/70 transition-colors hover:text-bone"
                >
                  <Icon name="Mail" className="size-4 text-bone/40" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-bone/70 transition-colors hover:text-bone"
                >
                  <Icon name="MessageCircle" className="size-4 text-bone/40" />
                  {dict.common.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-bone/70 transition-colors hover:text-bone"
                >
                  <Icon
                    name="MapPin"
                    className="mt-0.5 size-4 shrink-0 text-bone/40"
                  />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.county}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-4">
            <div>
              <h3 className="eyebrow text-bone/40">{dict.nav.units}</h3>
              <ul className="mt-5 space-y-3">
                {units.map((unit) => (
                  <li key={unit.slug}>
                    <Link
                      href={unitHref(unit.slug, locale)}
                      className={linkClass}
                    >
                      {unit.kind[locale]} {unit.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={href("booking", locale)} className={linkClass}>
                    {dict.nav.booking}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-bone/40">{dict.footer.explore}</h3>
              <ul className="mt-5 space-y-3">
                {EXPLORE.map((key) => (
                  <li key={key}>
                    <Link href={href(key, locale)} className={linkClass}>
                      {dict.nav[key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-bone/10 pt-8 text-xs text-bone/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}.{" "}
            {dict.footer.rights}.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((key) => (
              <li key={key}>
                <Link
                  href={href(key, locale)}
                  className="transition-colors hover:text-bone"
                >
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
