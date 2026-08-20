import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
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
        image && "pt-24 md:pt-44",
      )}
    >
      {image && (
        <>
          {/* Phones: the banner's own blur placeholder, stretched, plus an ink
              wash — so the heading sits on the photo's colour, not flat black.
              Both go under the frame, which is why they come first. */}
          <div
            aria-hidden
            style={{ backgroundImage: `url(${image.blurDataURL})` }}
            className="absolute inset-0 scale-110 bg-cover bg-center opacity-35 md:hidden"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/55 md:hidden"
          />
          {/* One image, two shapes: a framed card in the flow on phones — where
              a full-bleed crop showed a sliver of the frame — and the
              full-bleed backdrop it has always been from md up. */}
          <div
            style={
              {
                "--frame": `${image.width}/${image.height}`,
                "--fr": image.width / image.height,
              } as CSSProperties
            }
            className="relative mx-auto mb-8 aspect-(--frame) w-[min(100%-1.5rem,calc(40svh*var(--fr)))] overflow-hidden rounded-2xl ring-1 ring-bone/15 md:absolute md:inset-0 md:m-0 md:aspect-auto md:w-auto md:rounded-none md:ring-0"
          >
            <Image
              src={image.src}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 100vw, 96vw"
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/72 to-ink/40 md:block" />
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
