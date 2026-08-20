import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";
import {
  reviews,
  hasReviews,
  averageRating,
  reviewsEmptyState,
} from "@/data/reviews";
import { siteConfig } from "@/config/site";
import { Icon, FacebookIcon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function ReviewsBlock({
  locale,
  dict,
  className,
}: {
  locale: Locale;
  dict: Dictionary;
  className?: string;
}) {
  if (!hasReviews) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-dashed border-bone/15 px-8 py-14 text-center",
          className,
        )}
      >
        <Icon name="Star" className="mx-auto size-8 text-magenta" />
        <h3 className="mt-5 text-xl font-bold tracking-tight">
          {reviewsEmptyState.title[locale]}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-bone/55">
          {reviewsEmptyState.body[locale]}
        </p>
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-bone/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-bone/50"
        >
          <FacebookIcon className="size-4" />
          {dict.reviews.leaveReview}
        </a>
      </div>
    );
  }

  return (
    <div className={className}>
      {averageRating !== null && (
        <div className="mb-10 flex items-center gap-4">
          <span className="display text-5xl tabular-nums">
            {averageRating.toFixed(1)}
          </span>
          <div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  className="size-4 fill-magenta text-magenta"
                />
              ))}
            </div>
            <p className="mt-1 text-sm text-bone/50">
              {reviews.length} {locale === "ro" ? "recenzii" : "reviews"}
            </p>
          </div>
        </div>
      )}

      <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <RevealItem
            key={review.id}
            className="flex flex-col rounded-2xl bg-ink p-7 ring-1 ring-bone/8"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  className={cn(
                    "size-3.5",
                    i < Math.round(review.rating / 2)
                      ? "fill-magenta text-magenta"
                      : "text-bone/20",
                  )}
                />
              ))}
            </div>
            <p className="mt-5 flex-1 text-sm leading-relaxed text-bone/75">
              “{review.text[locale]}”
            </p>
            <footer className="mt-6 border-t border-bone/10 pt-4 text-xs text-bone/45">
              <span className="font-semibold text-bone/70">
                {review.author}
              </span>
              {review.origin && <span> · {review.origin}</span>}
              <span className="block capitalize">{review.source}</span>
            </footer>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
