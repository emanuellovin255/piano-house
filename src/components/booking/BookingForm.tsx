"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DateRange } from "react-day-picker";
import { motion, AnimatePresence } from "motion/react";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { units, unitBySlug } from "@/data/units";
import { siteConfig } from "@/config/site";
import { href } from "@/lib/routes";
import { whatsappUrl } from "@/lib/whatsapp";
import { formatNights, formatLei } from "@/lib/utils";
import { bookingSchema, type BookingInput } from "@/lib/booking-schema";
import { sendBooking } from "@/actions/send-booking";

import { DateRangePicker } from "@/components/booking/DateRangePicker";
import { Field, inputClass, selectClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Inferred from the shared schema so the two can never drift apart. */
type FormValues = BookingInput;

const toISODate = (date: Date) => {
  const copy = new Date(date);
  copy.setMinutes(copy.getMinutes() - copy.getTimezoneOffset());
  return copy.toISOString().slice(0, 10);
};

export function BookingForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const searchParams = useSearchParams();
  const presetUnit = searchParams.get("unit");
  const mountedAt = useRef(0);

  const [range, setRange] = useState<DateRange | undefined>();
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState<string>();

  // Records when the form first appeared, so the action can reject submissions
  // that arrive faster than a person could type.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(bookingSchema(dict)),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      unit: presetUnit && unitBySlug(presetUnit) ? presetUnit : "",
      checkIn: "",
      checkOut: "",
      adults: 2,
      children: 0,
      message: "",
      terms: false,
      locale,
      website: "",
      elapsed: 0,
    },
  });

  const selectedUnitSlug = watch("unit");
  const adults = Number(watch("adults"));
  const children = Number(watch("children"));
  const name = watch("name");
  const unit = unitBySlug(selectedUnitSlug);

  // Keep the hidden date fields in step with the calendar.
  useEffect(() => {
    setValue("checkIn", range?.from ? toISODate(range.from) : "", {
      shouldValidate: false,
    });
    setValue("checkOut", range?.to ? toISODate(range.to) : "", {
      shouldValidate: false,
    });
  }, [range, setValue]);

  // TANGO sleeps two adults and no children, so clamp when the unit changes.
  useEffect(() => {
    if (!unit) return;
    if (adults > unit.maxGuests) setValue("adults", unit.maxGuests);
    const maxChildren = Math.max(
      0,
      unit.maxGuests - Math.min(adults, unit.maxGuests),
    );
    if (children > maxChildren) setValue("children", maxChildren);
  }, [unit, adults, children, setValue]);

  const nights = useMemo(() => {
    if (!range?.from || !range?.to) return 0;
    return Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000);
  }, [range]);

  const total = unit && nights > 0 ? unit.pricePerNight * nights : 0;

  const waHref = whatsappUrl(locale, {
    unitName: unit?.name,
    checkIn: range?.from,
    checkOut: range?.to,
    nights: nights || undefined,
    adults: adults || undefined,
    children: children || undefined,
    total: total || undefined,
    name: name || undefined,
  });

  const maxAdults = unit?.maxGuests ?? 4;
  const maxChildren = unit ? Math.max(0, unit.maxGuests - adults) : 3;

  const onValid = async (values: FormValues) => {
    setState("sending");
    setServerError(undefined);

    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, String(value));
    }
    formData.set("elapsed", String(Date.now() - mountedAt.current));

    const result = await sendBooking(formData);

    if (result.status === "success") {
      setState("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (result.status === "invalid") {
      for (const [field, message] of Object.entries(result.errors)) {
        setError(field as keyof FormValues, { message });
      }
      setState("idle");
      return;
    }
    setServerError(result.message ?? dict.booking.errorBody);
    setState("error");
  };

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-magenta/30 bg-ink-soft p-10 text-center md:p-14"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-magenta/15">
          <Icon name="CheckCircle2" className="size-7 text-magenta" />
        </span>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          {dict.booking.successTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-bone/60">
          {dict.booking.successBody}
        </p>
        <a
          href={`tel:${siteConfig.phones[0].raw}`}
          className="mt-8 inline-flex items-center gap-2 text-lg font-bold tracking-tight transition-colors hover:text-magenta"
        >
          <Icon name="Phone" className="size-4 text-magenta" />
          {siteConfig.phones[0].display}
        </a>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit(onValid)(event);
      }}
      noValidate
      className="grid gap-10 lg:grid-cols-12 lg:gap-14"
    >
      {/* Honeypot — visually and programmatically hidden from real users. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <input type="hidden" {...register("locale")} />
      <input type="hidden" {...register("checkIn")} />
      <input type="hidden" {...register("checkOut")} />

      <div className="lg:col-span-7">
        <fieldset disabled={state === "sending"} className="space-y-8">
          <div>
            <legend className="text-xs font-semibold tracking-wide text-bone/55 uppercase">
              {dict.booking.pickDates}
            </legend>
            <div className="relative mt-4 rounded-2xl border border-bone/12 bg-ink-soft p-4 sm:p-6">
              <DateRangePicker
                value={range}
                onChange={setRange}
                locale={locale}
                numberOfMonths={2}
              />
            </div>
            {(errors.checkIn || errors.checkOut) && (
              <p className="mt-2 text-xs font-medium text-magenta" role="alert">
                {errors.checkOut?.message ?? errors.checkIn?.message}
              </p>
            )}
          </div>

          <Field
            label={dict.booking.unit}
            htmlFor="unit"
            error={errors.unit?.message}
          >
            <select
              id="unit"
              className={selectClass}
              aria-invalid={Boolean(errors.unit)}
              {...register("unit")}
            >
              <option value="">{dict.booking.unitPlaceholder}</option>
              {units.map((u) => (
                <option key={u.slug} value={u.slug}>
                  {u.kind[locale]} {u.name} — {u.pricePerNight} lei
                  {dict.common.perNight}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label={dict.booking.adults}
              htmlFor="adults"
              error={errors.adults?.message}
            >
              <select
                id="adults"
                className={selectClass}
                {...register("adults", { valueAsNumber: true })}
              >
                {Array.from({ length: maxAdults }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label={dict.booking.children}
              htmlFor="children"
              error={errors.children?.message}
            >
              <select
                id="children"
                className={selectClass}
                {...register("children", { valueAsNumber: true })}
              >
                {Array.from({ length: maxChildren + 1 }, (_, i) => i).map(
                  (n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ),
                )}
              </select>
            </Field>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label={dict.booking.name}
              htmlFor="name"
              error={errors.name?.message}
            >
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder={dict.booking.namePlaceholder}
                className={inputClass}
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
              />
            </Field>
            <Field
              label={dict.booking.phone}
              htmlFor="phone"
              error={errors.phone?.message}
            >
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+40 7xx xxx xxx"
                className={inputClass}
                aria-invalid={Boolean(errors.phone)}
                {...register("phone")}
              />
            </Field>
          </div>

          <Field
            label={dict.booking.email}
            htmlFor="email"
            error={errors.email?.message}
          >
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="nume@exemplu.ro"
              className={inputClass}
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
          </Field>

          <Field
            label={dict.booking.message}
            htmlFor="message"
            error={errors.message?.message}
          >
            <textarea
              id="message"
              rows={4}
              placeholder={dict.booking.messagePlaceholder}
              className={`${inputClass} h-auto resize-y py-3.5 leading-relaxed`}
              {...register("message")}
            />
          </Field>

          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-bone/70">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    className="mt-0.5 size-4.5 shrink-0 accent-magenta"
                    aria-invalid={Boolean(errors.terms)}
                  />
                  <span>
                    {dict.booking.termsPrefix}
                    <a
                      href={href("terms", locale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-magenta underline underline-offset-2"
                    >
                      {dict.booking.termsLink}
                    </a>
                  </span>
                </label>
                {errors.terms && (
                  <p
                    className="mt-2 text-xs font-medium text-magenta"
                    role="alert"
                  >
                    {errors.terms.message}
                  </p>
                )}
              </div>
            )}
          />
        </fieldset>
      </div>

      {/* Summary rail */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="rounded-2xl border border-bone/12 bg-ink-soft p-7">
            <h2 className="text-xs font-semibold tracking-wide text-bone/55 uppercase">
              {dict.booking.summaryTitle}
            </h2>

            <dl className="mt-5 space-y-3.5 text-sm">
              <Row
                label={dict.booking.summaryUnit}
                value={unit ? unit.name : "—"}
              />
              <Row
                label="Check-in"
                value={range?.from ? formatLongDate(range.from, locale) : "—"}
              />
              <Row
                label="Check-out"
                value={range?.to ? formatLongDate(range.to, locale) : "—"}
              />
              <Row
                label={dict.booking.summaryNights}
                value={nights > 0 ? formatNights(nights, locale) : "—"}
              />
              <Row
                label={dict.booking.summaryGuests}
                value={
                  adults ? `${adults}${children ? ` + ${children}` : ""}` : "—"
                }
              />
            </dl>

            <AnimatePresence initial={false}>
              {total > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 flex items-baseline justify-between border-t border-bone/12 pt-5">
                    <span className="text-sm text-bone/60">
                      {dict.booking.summaryTotal}
                    </span>
                    <span className="text-2xl font-extrabold tracking-tight tabular-nums">
                      {formatLei(total)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-bone/40">
                    {unit &&
                      `${unit.pricePerNight} lei × ${formatNights(nights, locale)} · `}
                    {dict.booking.summaryHint}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              size="lg"
              className="mt-7 w-full"
              disabled={state === "sending"}
              icon={state === "sending" ? undefined : "ArrowRight"}
            >
              {state === "sending" ? (
                <>
                  <Icon name="Loader2" className="size-4 animate-spin" />
                  {dict.booking.submitting}
                </>
              ) : (
                dict.booking.submit
              )}
            </Button>

            {state === "error" && serverError && (
              <p
                className="mt-4 flex items-start gap-2 rounded-xl bg-magenta/10 p-4 text-xs leading-relaxed text-bone/80"
                role="alert"
              >
                <Icon
                  name="AlertCircle"
                  className="mt-px size-4 shrink-0 text-magenta"
                />
                <span>
                  <strong className="block font-semibold">
                    {dict.booking.errorTitle}
                  </strong>
                  {serverError}
                </span>
              </p>
            )}

            <div className="mt-6 border-t border-bone/12 pt-6">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-bone/20 text-sm font-semibold transition-colors hover:border-bone hover:bg-bone hover:text-ink"
              >
                <Icon name="MessageCircle" className="size-4" />
                {dict.booking.whatsappCta}
              </a>
              <p className="mt-2.5 text-center text-xs text-bone/40">
                {dict.booking.whatsappHint}
              </p>
              <p className="mt-4 text-center text-xs text-bone/45">
                {dict.booking.orCall}{" "}
                <a
                  href={`tel:${siteConfig.phones[0].raw}`}
                  className="font-semibold text-bone transition-colors hover:text-magenta"
                >
                  {siteConfig.phones[0].display}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-bone/50">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

function formatLongDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
