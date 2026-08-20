import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold tracking-wide text-bone/55 uppercase"
      >
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-bone/40">{hint}</p>}
      {error && (
        <p className="text-xs font-medium text-magenta" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  "h-12 w-full rounded-xl border border-bone/15 bg-ink px-4 text-sm text-bone " +
  "transition-colors placeholder:text-bone/30 hover:border-bone/30 focus:border-magenta focus:outline-none " +
  "aria-[invalid=true]:border-magenta";

export const selectClass = `${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23a8a29a" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>')] bg-[length:18px] bg-[position:right_0.9rem_center] bg-no-repeat pr-11`;
