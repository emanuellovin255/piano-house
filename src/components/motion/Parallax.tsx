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
 * viewport. The child should be taller than the wrapper (scale it up) so the
 * translation never exposes an edge.
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

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 scale-[1.3] will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
