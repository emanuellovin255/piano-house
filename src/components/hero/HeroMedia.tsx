"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { MediaImage } from "@/data/images.generated";
import { siteConfig } from "@/config/site";

type Mode = "unknown" | "video" | "slides";

/**
 * The hero backdrop. When the client's video files exist it plays the one that
 * matches the viewport (16:9 on desktop, 9:16 on phones). Until then — and for
 * anyone on reduced motion or a metered connection — it cross-fades a set of
 * stills with a slow Ken Burns drift instead. Both paths occupy exactly the
 * same box, so switching one on later changes nothing about the layout.
 *
 * Two shapes, one rule: the whole photograph, always. On phones it is a framed
 * card in the page flow, shaped to the image. On desktop it still fills the
 * section, but the frame is fitted inside it rather than cropped to it, over a
 * wash made from the image's own blur placeholder — so a 3:2 photo on a 16:9
 * screen keeps its edges instead of losing them off the sides.
 */
export function HeroMedia({ slides }: { slides: MediaImage[] }) {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("unknown");
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(query.matches);
    query.addEventListener("change", sync);

    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const saveData = connection?.saveData === true;

    // Decided on the next frame so the poster paints first and the choice
    // never costs a synchronous re-render.
    const frame = requestAnimationFrame(() => {
      sync();
      setMode(
        siteConfig.hero.videoEnabled && !reduced && !saveData
          ? "video"
          : "slides",
      );
    });

    return () => {
      cancelAnimationFrame(frame);
      query.removeEventListener("change", sync);
    };
  }, [reduced]);

  // Still-image rotation. Paused while the tab is hidden so it does not burn
  // frames in the background.
  useEffect(() => {
    if (mode !== "slides" || reduced || slides.length < 2) return;
    let timer: ReturnType<typeof setInterval>;
    const start = () => {
      timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    };
    const onVisibility = () => {
      clearInterval(timer);
      if (!document.hidden) start();
    };
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mode, reduced, slides.length]);

  // Video mode is 16:9 on desktop and 9:16 on phones; stills keep their own.
  const frame = mode === "video" ? { width: 9, height: 16 } : slides[index];
  const mp4 = isMobile ? siteConfig.hero.mobile : siteConfig.hero.desktop;
  const webm = isMobile
    ? siteConfig.hero.mobileWebm
    : siteConfig.hero.desktopWebm;

  return (
    <div
      // The phone frame takes the shape of the photo inside it, so a portrait
      // slide added later is shown whole too rather than cropped to landscape.
      // Width is capped by height as well as by the column, so a tall frame on
      // a short screen shrinks instead of pushing the buttons off the page.
      style={
        {
          "--frame": `${frame.width}/${frame.height}`,
          "--fr": frame.width / frame.height,
        } as CSSProperties
      }
      className="relative mx-auto aspect-(--frame) w-[min(100%,calc(46svh*var(--fr)))] overflow-hidden rounded-2xl bg-ink ring-1 ring-bone/15 md:absolute md:inset-0 md:aspect-auto md:w-auto md:rounded-none md:ring-0"
    >
      {mode === "video" ? (
        <video
          ref={videoRef}
          key={mp4}
          className="size-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload={isMobile ? "none" : "metadata"}
          poster={slides[0]?.src}
          // A missing or unplayable file silently falls back to the stills.
          onError={() => setMode("slides")}
          aria-hidden
        >
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      ) : (
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            {/* Fills whatever the fitted photo leaves over, so the letterbox
                on a wider screen reads as depth rather than as bars. */}
            <div
              aria-hidden
              style={{
                backgroundImage: `url(${slides[index].blurDataURL})`,
              }}
              className="absolute inset-0 scale-110 bg-cover bg-center opacity-55"
            />
            <Image
              src={slides[index].src}
              alt=""
              fill
              priority={index === 0}
              sizes="(min-width: 768px) 100vw, 96vw"
              placeholder="blur"
              blurDataURL={slides[index].blurDataURL}
              // Contain, not cover: cropping is what hid two thirds of these
              // photographs. Ken Burns would crop the edges back off, so it
              // goes with it.
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Legibility scrims, desktop only — on phones the copy sits below the
          frame, so darkening the photo would cost contrast for nothing. */}
      <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/55 via-45% to-ink/25 md:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/75 via-ink/20 to-transparent md:block" />
      {/* Keeps the transparent header readable over bright frames. */}
      <div className="absolute inset-x-0 top-0 hidden h-40 bg-gradient-to-b from-ink/70 to-transparent md:block" />
    </div>
  );
}
