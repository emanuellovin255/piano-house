"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href } from "@/lib/routes";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { sendContact } from "@/actions/send-contact";

import { Field, inputClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const mountedAt = useRef(0);
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
    setError,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema(dict)),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      terms: false,
      locale,
      website: "",
    },
  });

  const onValid = async (values: ContactInput) => {
    setState("sending");
    setServerError(undefined);

    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, String(value));
    }
    formData.set("elapsed", String(Date.now() - mountedAt.current));

    const result = await sendContact(formData);
    if (result.status === "success") return setState("success");
    if (result.status === "invalid") {
      for (const [field, message] of Object.entries(result.errors)) {
        setError(field as keyof ContactInput, { message });
      }
      return setState("idle");
    }
    setServerError(result.message ?? dict.booking.errorBody);
    setState("error");
  };

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-magenta/30 bg-ink-soft p-10 text-center"
      >
        <Icon name="CheckCircle2" className="mx-auto size-8 text-magenta" />
        <h3 className="mt-5 text-xl font-bold tracking-tight">
          {dict.booking.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-bone/60">
          {dict.booking.successBody}
        </p>
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
      className="space-y-6"
    >
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="c-website">Website</label>
        <input
          id="c-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <input type="hidden" {...register("locale")} />

      <fieldset disabled={state === "sending"} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label={dict.booking.name}
            htmlFor="c-name"
            error={errors.name?.message}
          >
            <input
              id="c-name"
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
            htmlFor="c-phone"
            error={errors.phone?.message}
          >
            <input
              id="c-phone"
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
          htmlFor="c-email"
          error={errors.email?.message}
        >
          <input
            id="c-email"
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
          htmlFor="c-message"
          error={errors.message?.message}
        >
          <textarea
            id="c-message"
            rows={5}
            className={`${inputClass} h-auto resize-y py-3.5 leading-relaxed`}
            aria-invalid={Boolean(errors.message)}
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

        <Button
          type="submit"
          size="lg"
          disabled={state === "sending"}
          icon="ArrowRight"
        >
          {state === "sending" ? dict.booking.submitting : dict.booking.submit}
        </Button>

        {state === "error" && serverError && (
          <p
            className="flex items-start gap-2 rounded-xl bg-magenta/10 p-4 text-xs leading-relaxed text-bone/80"
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
      </fieldset>
    </form>
  );
}
