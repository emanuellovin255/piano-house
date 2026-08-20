import { z } from "zod";
import type { Dictionary } from "@/dictionaries";

export function contactSchema(dict: Dictionary) {
  const f = dict.form;
  return z.object({
    name: z.string().trim().min(2, f.tooShort),
    phone: z
      .string()
      .trim()
      .min(6, f.invalidPhone)
      .regex(/^[+0-9\s().-]{6,24}$/, f.invalidPhone),
    email: z.email(f.invalidEmail),
    message: z.string().trim().min(5, f.tooShort).max(2000),
    terms: z.boolean().refine((value) => value === true, f.termsRequired),
    locale: z.enum(["ro", "en"]),
    website: z.string().max(0).optional().or(z.literal("")),
    elapsed: z.number().optional(),
  });
}

export type ContactInput = z.infer<ReturnType<typeof contactSchema>>;
