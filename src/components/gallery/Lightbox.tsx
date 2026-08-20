"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { GalleryItem } from "@/data/gallery";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";
import { Icon } from "@/components/ui/Icon";

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
  locale,
  dict,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
  locale: Locale;
  dict: Dictionary;
}) {
  const open = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, onClose]);

  const current = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-100 flex flex-col bg-ink/97 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={dict.gallery.title}
        >
          <div className="flex items-center justify-between px-4 py-4 md:px-8">
            <span className="text-sm tabular-nums text-bone/50">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label={dict.common.close}
              className="grid size-11 place-items-center rounded-full border border-bone/15 text-bone transition-colors hover:border-bone/50"
            >
              <Icon name="X" className="size-5" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 md:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                className="relative flex size-full items-center justify-center"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  if (info.offset.x > 80) go(-1);
                }}
              >
                <Image
                  src={current.src}
                  alt={current.alt[locale]}
                  width={current.width}
                  height={current.height}
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  placeholder="blur"
                  blurDataURL={current.blurDataURL}
                  className="max-h-full w-auto rounded-lg object-contain select-none"
                  priority
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={dict.common.prev}
              className="absolute left-1 grid size-12 place-items-center rounded-full text-bone/60 transition-colors hover:bg-bone/10 hover:text-bone md:left-4"
            >
              <Icon name="ChevronLeft" className="size-7" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={dict.common.next}
              className="absolute right-1 grid size-12 place-items-center rounded-full text-bone/60 transition-colors hover:bg-bone/10 hover:text-bone md:right-4"
            >
              <Icon name="ChevronRight" className="size-7" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
