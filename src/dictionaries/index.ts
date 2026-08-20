import type { Locale } from "@/lib/i18n";
import { ro } from "./ro";
import { en } from "./en";

export type Dictionary = typeof ro;

const dictionaries: Record<Locale, Dictionary> = { ro, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Fill {placeholders} in a dictionary string. */
export function fill(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    String(values[key] ?? `{${key}}`),
  );
}
