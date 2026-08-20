"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/lib/i18n";
import { href, type PageKey } from "@/lib/routes";
import type { Dictionary } from "@/dictionaries";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/layout/Wordmark";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const NAV: PageKey[] = [
  "about",
  "units",
  "amenities",
  "gallery",
  "city",
  "contact",
];
const MOBILE_NAV: PageKey[] = [
  "about",
  "units",
  "amenities",
  "gallery",
  "city",
  "reviews",
  "faq",
  "contact",
];

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // The listener fires on every scroll frame, so it must not touch React
    // unless the answer actually changed — `setScrolled` with an unchanged
    // value still costs a render pass before React bails out.
    let last = false;
    const onScroll = () => {
      const next = window.scrollY > 24;
      if (next === last) return;
      last = next;
      setScrolled(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Read the initial position on the next frame rather than during the
    // effect body, so the first paint is not forced into a second render.
    const frame = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Navigating away closes the menu. Adjusting during render beats an effect:
  // the overlay never paints once on the new page before disappearing.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const phone = siteConfig.phones[0];

  return (
    <>
      <header
        className={cn(
          // backdrop-filter is deliberately left out of the transition: blurring
          // the strip behind a full-width fixed bar is already the most
          // expensive thing on the page, and animating its radius for half a
          // second made every scroll that crossed the threshold drop frames.
          "fixed inset-x-0 top-0 z-50 transform-gpu transition-[background-color,border-color] duration-500",
          scrolled || open
            ? "border-b border-bone/10 bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-18 items-center justify-between gap-6 md:h-22">
          <Link
            href={href("home", locale)}
            aria-label={siteConfig.name}
            className="relative z-10 shrink-0"
          >
            <Wordmark className="h-11 w-auto text-bone md:h-13" />
          </Link>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label={dict.nav.menu}
          >
            {NAV.map((key) => {
              const target = href(key, locale);
              const active =
                pathname === target || pathname.startsWith(`${target}/`);
              return (
                <Link
                  key={key}
                  href={target}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    active ? "text-bone" : "text-bone/60 hover:text-bone",
                  )}
                >
                  {dict.nav[key]}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-magenta"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <LangSwitcher locale={locale} className="text-bone" />
            <a
              href={`tel:${phone.raw}`}
              className="hidden items-center gap-2 text-sm font-semibold text-bone/80 transition-colors hover:text-bone xl:flex"
            >
              <Icon name="Phone" className="size-4" />
              {phone.display}
            </a>
            <ButtonLink
              href={href("booking", locale)}
              size="sm"
              className="hidden sm:inline-flex"
            >
              {dict.common.bookNow}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? dict.nav.closeMenu : dict.nav.menu}
              className="relative z-10 -mr-2 grid size-10 place-items-center text-bone lg:hidden"
            >
              <Icon
                name={open ? "X" : "Menu"}
                className="size-6"
                strokeWidth={1.75}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink pt-18 lg:hidden md:pt-22"
          >
            <div className="shell flex h-full flex-col justify-between overflow-y-auto pt-8 pb-28">
              <nav className="flex flex-col" aria-label={dict.nav.menu}>
                {MOBILE_NAV.map((key, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.04 * i + 0.06,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={href(key, locale)}
                      className="flex items-center justify-between border-b border-bone/10 py-4 text-2xl font-bold tracking-tight"
                    >
                      {dict.nav[key]}
                      <Icon
                        name="ArrowUpRight"
                        className="size-5 text-magenta"
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-10 flex flex-col gap-3">
                <ButtonLink href={href("booking", locale)} size="lg">
                  {dict.common.bookNow}
                </ButtonLink>
                <a
                  href={`tel:${phone.raw}`}
                  className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-bone/70"
                >
                  <Icon name="Phone" className="size-4" />
                  {phone.display}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
