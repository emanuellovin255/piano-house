import type { Locale } from "@/lib/i18n";
import { amenityById } from "@/data/amenities";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function AmenityList({
  ids,
  locale,
  tone = "dark",
  columns = 2,
  className,
}: {
  ids: string[];
  locale: Locale;
  tone?: "dark" | "light";
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-x-8 gap-y-4",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {ids.map((id) => {
        const amenity = amenityById(id);
        if (!amenity) return null;
        return (
          <li key={id} className="flex items-start gap-3">
            <Icon
              name={amenity.icon}
              className={cn(
                "mt-0.5 size-5 shrink-0",
                tone === "dark" ? "text-magenta" : "text-magenta",
              )}
            />
            <div>
              <p
                className={cn(
                  "text-sm font-medium",
                  tone === "dark" ? "text-bone" : "text-ink",
                )}
              >
                {amenity.label[locale]}
              </p>
              {amenity.note && (
                <p
                  className={cn(
                    "text-xs",
                    tone === "dark" ? "text-bone/45" : "text-ink/50",
                  )}
                >
                  {amenity.note[locale]}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
