import { cn } from "@/lib/utils";

/**
 * Infinite horizontal band. The track holds the items twice and shifts by
 * exactly -50%, so the seam is never visible.
 */
export function Marquee({
  items,
  className,
  separator = "·",
}: {
  items: string[];
  className?: string;
  separator?: string;
}) {
  const track = [...items, ...items];
  return (
    <div
      className={cn(
        "relative flex overflow-hidden py-6 select-none",
        className,
      )}
      aria-hidden
    >
      <div className="flex shrink-0 animate-(--animate-marquee) items-center gap-8 pr-8">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="display text-[clamp(1.75rem,4vw,3rem)] uppercase">
              {item}
            </span>
            <span className="text-magenta text-[clamp(1.75rem,4vw,3rem)] leading-none">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
