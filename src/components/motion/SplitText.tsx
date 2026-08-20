"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Reveals a heading word by word from behind a mask. Each line is its own
 * overflow-hidden row, so the words slide up out of nothing rather than
 * fading in place.
 */
export function SplitText({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h1",
  play = "mount",
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "div";
  play?: "mount" | "inView";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[Tag];

  const animateProps =
    play === "mount"
      ? { animate: "visible" as const }
      : {
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-80px" },
        };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...animateProps}
      variants={{
        visible: {
          transition: { staggerChildren: 0.07, delayChildren: delay },
        },
      }}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("block overflow-hidden pb-[0.08em]", lineClassName)}
          aria-hidden
        >
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
