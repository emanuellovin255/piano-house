import Link from "next/link";
import { ro } from "@/dictionaries/ro";
import { Icon } from "@/components/ui/Icon";

/**
 * Rendered for any address under a locale that does not resolve. It cannot
 * read params, so it shows both languages rather than guessing wrong.
 */
export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center justify-center px-6 py-32 text-center">
      <div>
        <p className="eyebrow text-magenta">404</p>
        <h1 className="display mt-5 text-[clamp(2rem,6vw,4rem)]">
          {ro.notFound.title}
        </h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-bone/55">
          {ro.notFound.body}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/ro"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-magenta px-7 text-sm font-semibold transition-colors hover:bg-bone hover:text-ink"
          >
            <Icon name="ArrowLeft" className="size-4" />
            {ro.notFound.cta}
          </Link>
          <Link
            href="/en"
            className="inline-flex h-12 items-center rounded-full border border-bone/25 px-7 text-sm font-semibold transition-colors hover:border-bone hover:bg-bone hover:text-ink"
          >
            English
          </Link>
        </div>
      </div>
    </section>
  );
}
