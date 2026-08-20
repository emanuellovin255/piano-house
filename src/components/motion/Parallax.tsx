"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Moves its child slower than the page as the container passes through the
 * viewport. It scales the child just enough to cover the drift, so give the
 * wrapper the ratio of the photo inside it and almost nothing is cropped.
 */
export function Parallax({
  children,
  amount = 12,
  className,
}: {
  children: ReactNode;
  /** Peak offset in percent of the container height. */
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`-${amount}%`, `${amount}%`],
  );

  // The child has to overhang by the drift on both sides or the translation
  // exposes an edge. A flat 1.3 was sized for the largest amount we use and
  // quietly ate a quarter of every photo; this scales to the drift asked for.
  const scale = reduced ? 1 : 1 + (amount * 2) / 100 + 0.02;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
