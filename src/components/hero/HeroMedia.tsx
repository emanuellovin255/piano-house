"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

  const mp4 = isMobile ? siteConfig.hero.mobile : siteConfig.hero.desktop;
  const webm = isMobile
    ? siteConfig.hero.mobileWebm
    : siteConfig.hero.desktopWebm;

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      {mode === "video" ? (
        <video
          ref={videoRef}
          key={mp4}
          className="size-full object-cover"
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
            <Image
              src={slides[index].src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={slides[index].blurDataURL}
              className={
                reduced
                  ? "object-cover"
                  : "object-cover animate-(--animate-ken-burns) will-change-transform"
              }
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Legibility scrim: dark at the bottom where the copy sits, lighter up top. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 via-45% to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent" />
      {/* Keeps the transparent header readable over bright frames. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
    </div>
  );
}
