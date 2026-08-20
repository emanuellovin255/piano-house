import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  tone = "dark",
  id,
  className,
  children,
}: {
  tone?: "dark" | "light" | "soft";
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-(--spacing-section)",
        tone === "dark" && "bg-ink text-bone",
        tone === "soft" && "bg-ink-soft text-bone",
        tone === "light" && "bg-bone text-ink",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "dark",
  align = "left",
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p
            className={cn(
              "eyebrow mb-5",
              tone === "dark" ? "text-magenta" : "text-magenta",
            )}
          >
            {eyebrow}
          </p>
        )}
        <h2 className="display text-[clamp(2rem,5.2vw,3.75rem)]">{title}</h2>
        {body && (
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed text-pretty",
              tone === "dark" ? "text-bone-dim" : "text-ink/65",
            )}
          >
            {body}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
