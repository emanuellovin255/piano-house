"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export type AccordionEntry = { q: string; a: string };

export function Accordion({
  items,
  tone = "dark",
  className,
}: {
  items: AccordionEntry[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      className={cn(
        "divide-y",
        tone === "dark" ? "divide-bone/12" : "divide-ink/12",
        className,
      )}
    >
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                className={cn(
                  "flex w-full items-center justify-between gap-6 py-5 text-left transition-colors",
                  tone === "dark" ? "hover:text-magenta" : "hover:text-magenta",
                )}
              >
                <span className="text-base font-semibold tracking-tight md:text-lg">
                  {item.q}
                </span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,border-color] duration-300",
                    tone === "dark" ? "border-bone/20" : "border-ink/20",
                    expanded && "rotate-180 border-magenta",
                  )}
                >
                  <Icon name="ChevronDown" className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "max-w-3xl pb-6 leading-relaxed",
                      tone === "dark" ? "text-bone/60" : "text-ink/65",
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
