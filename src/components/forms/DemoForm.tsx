"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitDemo } from "@/lib/submitDemo";
import { cn } from "@/lib/utils";

export type FieldSpec = {
  n?: string;
  name: string;
  label: string;
  hint?: string;
  type: string;
  required?: boolean;
};

/**
 * One form component for the waitlist and the contact page. Numbered rows are
 * the contact layout; unnumbered rows are the waitlist's underlined stack.
 */
export function DemoForm({
  fields,
  submitLabel,
  note,
  success,
  numbered,
}: {
  fields: FieldSpec[];
  submitLabel: string;
  note: string;
  success: { title: string; body: string };
  numbered?: boolean;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const { mutate, isPending, isSuccess } = useMutation({ mutationFn: submitDemo });

  if (isSuccess) {
    return (
      <div role="status" className="rounded-lg border border-line bg-warm p-8">
        <p className="h-card">{success.title}</p>
        <p className="mt-3 font-body text-20 leading-[1.6] text-ink-2">
          {success.body}
        </p>
      </div>
    );
  }

  const input =
    "w-full border-b border-line bg-transparent py-3 font-body text-16 tracking-[-0.02em] " +
    "text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none transition-colors duration-200";

  return (
    <form
      className="flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        mutate(values);
      }}
    >
      {fields.map((f) => (
        <div
          key={f.name}
          className={cn(
            "py-2",
            numbered && "grid grid-cols-[40px_1fr] items-start gap-4 py-4",
          )}
        >
          {numbered && (
            <span className="micro pt-4 text-ink-3" aria-hidden="true">
              {f.n}
            </span>
          )}

          <div>
            <label
              htmlFor={f.name}
              className={cn(
                numbered
                  ? "font-display text-24 font-medium text-ink"
                  : "sr-only",
              )}
            >
              {f.label}
            </label>
            {numbered && f.hint && (
              <p className="label mt-1 text-ink-3">{f.hint}</p>
            )}

            {f.type === "textarea" ? (
              <textarea
                id={f.name}
                name={f.name}
                required={f.required}
                rows={3}
                placeholder={numbered ? undefined : f.label.toUpperCase()}
                value={values[f.name] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.name]: e.target.value }))
                }
                className={cn(input, "mt-2 resize-y")}
              />
            ) : (
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                required={f.required}
                placeholder={numbered ? undefined : f.label.toUpperCase()}
                value={values[f.name] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.name]: e.target.value }))
                }
                className={cn(input, numbered && "mt-2")}
              />
            )}
          </div>
        </div>
      ))}

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending" : submitLabel}
        </Button>
        <p className="label max-w-[34ch] text-ink-3">{note}</p>
      </div>
    </form>
  );
}
