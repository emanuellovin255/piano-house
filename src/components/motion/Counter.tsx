"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

export function Counter({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const value = useMotionValue(0);
  const spring = useSpring(value, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) value.set(to);
  }, [inView, to, value]);

  useEffect(() => {
    if (reduced) {
      if (ref.current) ref.current.textContent = `${to}${suffix}`;
      return;
    }
    return spring.on("change", (latest) => {
      if (ref.current)
        ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
  }, [spring, suffix, reduced, to]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
