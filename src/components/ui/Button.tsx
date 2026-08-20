import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

type Variant = "primary" | "outline" | "outlineDark" | "ghost" | "solidLight";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-magenta text-bone hover:bg-bone hover:text-ink",
  outline:
    "border border-bone/25 text-bone hover:border-bone hover:bg-bone hover:text-ink",
  outlineDark:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-bone",
  ghost: "text-bone/70 hover:text-bone",
  solidLight: "bg-bone text-ink hover:bg-magenta hover:text-bone",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: string;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
      {icon && (
        <Icon
          name={icon}
          className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
      {icon && (
        <Icon
          name={icon}
          className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
