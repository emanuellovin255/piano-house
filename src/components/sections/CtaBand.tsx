import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";
import { href } from "@/lib/routes";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { courtyardNight } from "@/data/gallery";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

export function CtaBand({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={courtyardNight.src}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={courtyardNight.blurDataURL}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/78" />

      <div className="shell relative py-24 md:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="display text-[clamp(2rem,5.5vw,3.75rem)]">
            {dict.home.ctaTitle}
          </h2>
          <p className="mt-6 text-lg text-bone/70">{dict.home.ctaBody}</p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={href("booking", locale)}
              size="lg"
              icon="ArrowRight"
            >
              {dict.common.bookNow}
            </ButtonLink>
            <a
              href={whatsappUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full border border-bone/25 px-8 text-base font-semibold transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-ink"
            >
              <Icon name="MessageCircle" className="size-5" />
              {dict.common.whatsapp}
            </a>
          </div>

          <a
            href={`tel:${siteConfig.phones[0].raw}`}
            className="mt-8 inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight transition-colors hover:text-magenta md:text-3xl"
          >
            <Icon name="Phone" className="size-5 text-magenta" />
            {siteConfig.phones[0].display}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
