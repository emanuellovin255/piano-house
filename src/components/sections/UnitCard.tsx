import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";
import type { Unit } from "@/data/units";
import { unitHref } from "@/lib/routes";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function UnitCard({
  unit,
  locale,
  dict,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  unit: Unit;
  locale: Locale;
  dict: Dictionary;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={unitHref(unit.slug, locale)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-ink-soft",
        "ring-1 ring-bone/8 transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)]",
        "hover:ring-bone/20 focus-visible:ring-magenta",
        className,
      )}
    >
      {/* 3:2 — the ratio every unit photo was shot at. A 4:3 window cost
          each cover a strip off both sides for nothing. */}
      <div className="relative aspect-3/2 overflow-hidden">
        <Image
          src={unit.cover.src}
          alt={`${unit.kind[locale]} ${unit.name}`}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={unit.cover.blurDataURL}
          className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

        <span className="absolute top-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 text-[0.6875rem] font-semibold tracking-wide text-bone uppercase backdrop-blur-sm">
          {unit.kind[locale]}
        </span>

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <h3 className="display text-[clamp(1.75rem,4vw,2.5rem)]">
            {unit.name}
          </h3>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-bone text-ink transition-[background-color,transform] duration-400 ease-[var(--ease-out-expo)] group-hover:bg-magenta group-hover:text-bone">
            <Icon name="ArrowUpRight" className="size-4" strokeWidth={2} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="text-sm leading-relaxed text-bone/60">
          {unit.tagline[locale]}
        </p>

        <dl className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-bone/10 pt-4 text-sm">
          <div className="flex items-center gap-2 text-bone/70">
            <Icon name="Users" className="size-4 text-bone/35" />
            <dd className="tabular-nums">
              {unit.maxGuests} {dict.common.guests}
            </dd>
          </div>
          <div className="flex items-center gap-2 text-bone/70">
            <Icon name="BedDouble" className="size-4 text-bone/35" />
            <dd className="tabular-nums">
              {unit.totalArea} {dict.common.sqm}
            </dd>
          </div>
          <div className="ml-auto font-bold tabular-nums">
            {unit.pricePerNight} lei
            <span className="ml-1 text-xs font-medium text-bone/45">
              {dict.common.perNight}
            </span>
          </div>
        </dl>
      </div>
    </Link>
  );
}
