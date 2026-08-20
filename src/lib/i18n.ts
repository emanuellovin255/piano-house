export const locales = ["ro", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

/** A string that exists in both languages. Used across all content data files. */
export type L = Record<Locale, string>;

/** A list of strings that exists in both languages. */
export type LList = Record<Locale, readonly string[]>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function t(value: L, locale: Locale) {
  return value[locale];
}
