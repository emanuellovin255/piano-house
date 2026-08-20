"use client";

import { useEffect, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ro as roLocale, enGB } from "react-day-picker/locale";
import "react-day-picker/style.css";
import type { Locale } from "@/lib/i18n";

/**
 * Range picker styled to the site's palette. react-day-picker ships its own
 * stylesheet for layout; every colour is overridden through classNames so the
 * calendar matches the rest of the page instead of looking bolted on.
 */
export function DateRangePicker({
  value,
  onChange,
  locale,
  numberOfMonths = 1,
}: {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  locale: Locale;
  /** Upper bound — phones always get a single month regardless. */
  numberOfMonths?: number;
}) {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <DayPicker
      mode="range"
      selected={value}
      onSelect={onChange}
      locale={locale === "ro" ? roLocale : enGB}
      numberOfMonths={wide ? numberOfMonths : 1}
      disabled={{ before: today }}
      startMonth={today}
      showOutsideDays
      classNames={{
        root: "rdp-root text-bone [--rdp-accent-color:var(--color-magenta)] [--rdp-day-height:2.5rem] [--rdp-day-width:2.5rem]",
        months: "flex flex-col gap-8 sm:flex-row",
        month: "w-full",
        month_caption: "flex h-10 items-center justify-center",
        caption_label: "text-sm font-semibold capitalize",
        nav: "absolute inset-x-0 top-0 flex h-10 items-center justify-between",
        button_previous:
          "grid size-9 place-items-center rounded-full text-bone/60 transition-colors hover:bg-bone/10 hover:text-bone disabled:opacity-25",
        button_next:
          "grid size-9 place-items-center rounded-full text-bone/60 transition-colors hover:bg-bone/10 hover:text-bone disabled:opacity-25",
        chevron: "size-4 fill-current",
        month_grid: "w-full border-collapse",
        weekdays: "",
        weekday:
          "pb-2 text-[0.6875rem] font-medium uppercase tracking-wide text-bone/35",
        week: "",
        day: "p-0 text-center",
        day_button:
          "mx-auto grid size-10 place-items-center rounded-full text-sm tabular-nums transition-colors hover:bg-bone/12 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent",
        today: "font-bold text-magenta",
        selected: "text-bone",
        range_start:
          "rounded-l-full bg-magenta [&_button]:bg-magenta [&_button]:text-bone",
        range_end:
          "rounded-r-full bg-magenta [&_button]:bg-magenta [&_button]:text-bone",
        range_middle:
          "bg-magenta/18 [&_button]:rounded-none [&_button]:hover:bg-magenta/25",
        outside: "text-bone/20",
        disabled: "text-bone/20",
        hidden: "invisible",
        footer: "pt-4 text-xs text-bone/45",
      }}
    />
  );
}
