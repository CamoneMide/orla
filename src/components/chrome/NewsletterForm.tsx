"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { footer } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { submitDemo } from "@/lib/submitDemo";

export function NewsletterForm() {
  const [values, setValues] = useState({ name: "", email: "" });
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: submitDemo,
  });

  const field =
    "w-full border-b border-line bg-transparent py-3 font-body text-16 uppercase tracking-[-0.02em] " +
    "text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none transition-colors duration-200";

  if (isSuccess) {
    return (
      <p className="font-display text-20 text-ink" role="status">
        Thank you — you would be on the list.{" "}
        <span className="text-ink-3">
          Nothing was sent; this is a front-end demonstration.
        </span>
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        mutate(values);
      }}
    >
      <label className="sr-only" htmlFor="nl-name">
        {footer.newsletter.fields.name}
      </label>
      <input
        id="nl-name"
        name="name"
        required
        value={values.name}
        onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        placeholder={footer.newsletter.fields.name}
        className={field}
      />

      <label className="sr-only" htmlFor="nl-email">
        {footer.newsletter.fields.email}
      </label>
      <input
        id="nl-email"
        name="email"
        type="email"
        required
        value={values.email}
        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        placeholder={footer.newsletter.fields.email}
        className={field}
      />

      <div className="mt-7 flex md:flex-wrap flex-nowrap items-center gap-5">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending" : footer.newsletter.submit}
        </Button>
        <p className="label max-w-[240px] text-ink-3">
          {footer.newsletter.note}
        </p>
      </div>
    </form>
  );
}
