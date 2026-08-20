import { z } from "zod";
import { units } from "@/data/units";
import type { Dictionary } from "@/dictionaries";

const unitSlugs = units.map((u) => u.slug) as [string, ...string[]];

/**
 * One schema, used by the client form and re-run inside the server action —
 * a request that skips the browser still gets validated.
 */
export function bookingSchema(dict: Dictionary) {
  const f = dict.form;
  return z
    .object({
      name: z.string().trim().min(2, f.tooShort),
      phone: z
        .string()
        .trim()
        .min(6, f.invalidPhone)
        .regex(/^[+0-9\s().-]{6,24}$/, f.invalidPhone),
      email: z.email(f.invalidEmail),
      unit: z.enum(unitSlugs, f.unitRequired),
      checkIn: z.string().min(1, f.datesRequired),
      checkOut: z.string().min(1, f.datesRequired),
      adults: z.number().int().min(1).max(4),
      children: z.number().int().min(0).max(3),
      message: z.string().trim().max(2000).optional().or(z.literal("")),
      terms: z.boolean().refine((value) => value === true, f.termsRequired),
      locale: z.enum(["ro", "en"]),
      /** Honeypot — real people never see this field, bots fill it in. */
      website: z.string().max(0).optional().or(z.literal("")),
      /** Milliseconds the form was on screen before submit. */
      elapsed: z.number().optional(),
    })
    .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
      message: f.checkoutAfterCheckin,
      path: ["checkOut"],
    });
}

export type BookingInput = z.infer<ReturnType<typeof bookingSchema>>;

export type BookingResult =
  | { status: "success" }
  | { status: "error"; message?: string }
  | { status: "invalid"; errors: Record<string, string> };
