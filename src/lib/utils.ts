import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "1 noapte" / "3 nopți" — Romanian has a distinct plural form past 1. */
export function formatNights(nights: number, locale: "ro" | "en") {
  if (locale === "en") return `${nights} ${nights === 1 ? "night" : "nights"}`;
  return `${nights} ${nights === 1 ? "noapte" : "nopți"}`;
}

export function formatLei(amount: number) {
  return `${amount.toLocaleString("ro-RO")} lei`;
}
