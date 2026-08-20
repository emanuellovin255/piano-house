"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";
import { href } from "@/lib/routes";
import { siteConfig } from "@/config/site";
import type { MediaImage } from "@/data/images.generated";
import { HeroMedia } from "@/components/hero/HeroMedia";
import { SplitText } from "@/components/motion/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function Hero({
  locale,
  dict,
  slides,
  priceFrom,
}: {
  locale: Locale;
  dict: Dictionary;
  slides: MediaImage[];
  priceFrom: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Deliberately a translation and not a scale. Scaling this layer meant Chrome
  // re-rasterised a full-viewport photo on every scroll frame — on top of the
  // Ken Burns animation already scaling the same image — which is what made the
  // hero flicker. Translating composites the existing texture instead.
  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "9%"],
  );
  const mediaOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1, 0.3],
  );
  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "38%"],
  );
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-14 md:pb-20"
    >
      {/* Overhangs the section top and bottom so the parallax drift never
          exposes an edge as the hero scrolls away. */}
      <motion.div
        style={{ y: mediaY, opacity: mediaOpacity }}
        className="absolute inset-x-0 -top-[10%] h-[120%] transform-gpu will-change-[transform,opacity]"
      >
        <HeroMedia slides={slides} />
      </motion.div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="shell relative z-10"
      >
        <motion.p
          className="eyebrow flex items-center gap-3 text-magenta"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="h-px w-8 bg-magenta" />
          {dict.hero.eyebrow}
        </motion.p>

        <SplitText
          lines={dict.hero.titleLines}
          delay={0.25}
          className="display mt-6 max-w-[15ch] text-[clamp(2.4rem,6.6vw,6rem)]"
        />

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <motion.p
            className="max-w-xl text-base leading-relaxed text-bone/75 md:col-span-6 md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:items-center md:col-span-6 md:justify-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-1 sm:mr-4 sm:items-end">
              <span className="text-xs font-medium tracking-wide text-bone/45 uppercase">
                {dict.common.from}
              </span>
              <span className="text-2xl font-extrabold tracking-tight whitespace-nowrap tabular-nums">
                {priceFrom} lei
                <span className="ml-1 text-sm font-medium text-bone/50">
                  {dict.common.perNight}
                </span>
              </span>
            </div>
            <ButtonLink
              href={href("booking", locale)}
              size="lg"
              icon="ArrowRight"
            >
              {dict.hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink
              href={href("units", locale)}
              variant="outline"
              size="lg"
            >
              {dict.hero.ctaSecondary}
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex items-center justify-between border-t border-bone/10 pt-6 text-xs text-bone/40 md:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="flex items-center gap-2">
            <Icon name="ChevronDown" className="size-4 animate-bounce" />
            {dict.common.scrollDown}
          </span>
          <Link
            href={href("contact", locale)}
            className="hidden items-center gap-2 transition-colors hover:text-bone sm:flex"
          >
            <Icon name="MapPin" className="size-3.5" />
            {siteConfig.address.street}, {siteConfig.address.city}
          </Link>
          <a
            href={`tel:${siteConfig.phones[0].raw}`}
            className="flex items-center gap-2 font-semibold transition-colors hover:text-bone"
          >
            <Icon name="Phone" className="size-3.5" />
            {siteConfig.phones[0].display}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
