"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { GalleryItem } from "@/data/gallery";
import { galleryFilters } from "@/data/gallery";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";
import { fill } from "@/dictionaries";
import { Lightbox } from "@/components/gallery/Lightbox";
import { cn } from "@/lib/utils";

type FilterId = (typeof galleryFilters)[number]["id"];

export function MasonryGallery({
  items,
  locale,
  dict,
  showFilters = true,
}: {
  items: GalleryItem[];
  locale: Locale;
  dict: Dictionary;
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      filter === "all" ? items : items.filter((i) => i.tags.includes(filter)),
    [items, filter],
  );

  const labelFor = (id: FilterId) => {
    if (id === "all") return dict.gallery.filterAll;
    if (id === "interior") return dict.gallery.filterInterior;
    if (id === "exterior") return dict.gallery.filterExterior;
    return id.toUpperCase();
  };

  return (
    <>
      {showFilters && (
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {galleryFilters.map(({ id, count }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setFilter(id);
                setOpenIndex(null);
              }}
              aria-pressed={filter === id}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === id ? "text-ink" : "text-bone/60 hover:text-bone",
              )}
            >
              {filter === id && (
                <motion.span
                  layoutId="gallery-filter-pill"
                  className="absolute inset-0 rounded-full bg-bone"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">
                {labelFor(id)}
                <span className="ml-1.5 tabular-nums opacity-45">{count}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {fill(dict.gallery.countLabel, { n: visible.length })}
      </p>

      <div className="columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
        {visible.map((item, i) => (
          <motion.button
            key={item.src}
            type="button"
            layout
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              delay: Math.min(i, 8) * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => setOpenIndex(i)}
            className="group mb-3 block w-full cursor-zoom-in overflow-hidden rounded-xl bg-ink-soft md:mb-4"
            aria-label={item.alt[locale]}
          >
            <Image
              src={item.src}
              alt={item.alt[locale]}
              width={item.width}
              height={item.height}
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw"
              placeholder="blur"
              blurDataURL={item.blurDataURL}
              loading={i < 8 ? "eager" : "lazy"}
              className="h-auto w-full transition-transform duration-[0.9s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
          </motion.button>
        ))}
      </div>

      <Lightbox
        items={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
        locale={locale}
        dict={dict}
      />
    </>
  );
}
