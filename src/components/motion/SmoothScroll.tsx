"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "motion/react";
import { usePathname } from "next/navigation";

/**
 * Momentum scrolling for the whole document. Skipped entirely when the visitor
 * asks for reduced motion, and on coarse pointers where native scrolling is
 * already better than anything we could emulate.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    // Interpolating toward the target (rather than easing a fixed duration per
    // wheel event) keeps the step size constant regardless of refresh rate, so
    // a 120 Hz display no longer arrives in visible chunks.
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });

    // Lenis has to run inside Motion's frame loop, not its own rAF. With two
    // loops, `useScroll` reads the scroll position from the frame *before*
    // Lenis moved it, and every scroll-linked transform trails the page by one
    // frame — the stutter you see on the hero and the parallax panels.
    const update = ({ timestamp }: { timestamp: number }) =>
      lenis.raf(timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
    };
  }, []);

  // Route changes should land at the top, the way a normal navigation does —
  // unless the URL points at an anchor, which we must not override.
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
