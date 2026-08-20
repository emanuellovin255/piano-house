import Image from "next/image";
import Link from "next/link";
import type { MediaImage } from "@/data/images.generated";
import { SplitText } from "@/components/motion/SplitText";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Masthead for every interior page. With an image it becomes a short
 * full-bleed banner; without one it is a typographic block on ink.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  crumbs,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: MediaImage;
  crumbs?: Crumb[];
  align?: "left" | "center";
}) {
  const lines = title.split(" ").length > 5 ? splitInTwo(title) : [title];

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-ink pt-32 pb-14 md:pt-44 md:pb-20",
        image && "pb-20 md:pb-28",
      )}
    >
      {image && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={image.blurDataURL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/72 to-ink/40" />
        </>
      )}

      <div
        className={cn("shell relative", align === "center" && "text-center")}
      >
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={cn(
              "mb-6 flex flex-wrap items-center gap-2 text-xs text-bone/45",
              align === "center" && "justify-center",
            )}
          >
            {crumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <Icon name="ChevronRight" className="size-3 opacity-50" />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-bone"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-bone/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && <p className="eyebrow mb-5 text-magenta">{eyebrow}</p>}

        <SplitText
          lines={lines}
          className={cn(
            "display text-[clamp(2.25rem,6vw,4.75rem)]",
            align === "center" ? "mx-auto max-w-4xl" : "max-w-4xl",
          )}
          delay={0.05}
        />

        {subtitle && (
          <p
            className={cn(
              "mt-6 max-w-2xl text-lg leading-relaxed text-bone/60",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

/** Break a long heading roughly in half so the mask reveal has two rows. */
function splitInTwo(title: string): string[] {
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
