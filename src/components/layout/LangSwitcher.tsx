"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { translateSegments } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * Swaps locale while staying on the same page — /ro/apartamente/city becomes
 * /en/apartments/city rather than dumping the visitor on the homepage.
 */
export function LangSwitcher({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const current = pathname.split("/").filter(Boolean).slice(1);

  return (
    <div
      className={cn("flex items-center gap-1 text-xs font-semibold", className)}
    >
      {locales.map((l, i) => {
        const segments =
          l === locale ? current : translateSegments(current, locale, l);
        const target = segments.length
          ? `/${l}/${segments.join("/")}`
          : `/${l}`;
        return (
          <span key={l} className="flex items-center gap-1">
            {i > 0 && <span className="opacity-30">/</span>}
            <Link
              href={target}
              hrefLang={l}
              aria-current={l === locale ? "true" : undefined}
              className={cn(
                "rounded px-1 py-0.5 uppercase transition-colors",
                l === locale ? "text-current" : "opacity-45 hover:opacity-100",
              )}
            >
              {l}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
