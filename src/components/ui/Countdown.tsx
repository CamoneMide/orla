"use client";

import { useSyncExternalStore } from "react";
import { type Variants } from "motion/react";
import * as m from "motion/react-m";
import { product } from "@/config/product";
import { cn } from "@/lib/utils";

type Parts = { days: number; hrs: number; min: number; sec: number };

const TARGET = new Date(product.launch.date).getTime();

/*
 * The clock is an external store, read with useSyncExternalStore rather than
 * mirrored into state from an effect. The snapshot is whole seconds, so it is
 * stable between ticks as the hook requires, and the server snapshot is null:
 * the prerendered HTML and the hydration render agree (no ticking-clock
 * mismatch), and the live value takes over right after.
 */
function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const nowSeconds = () => Math.floor(Date.now() / 1000);
const beforeHydration = () => null;

/** Seconds since the epoch, or null while the server render is on screen. */
function useNow(): number | null {
  return useSyncExternalStore(subscribe, nowSeconds, beforeHydration);
}

function partsAt(now: number): Parts {
  const s = Math.max(0, Math.floor((TARGET - now * 1000) / 1000));
  return {
    days: Math.floor(s / 86400),
    hrs: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    sec: s % 60,
  };
}

const pad = (n: number, w = 2) => String(n).padStart(w, "0");

/**
 * The countdown's label. Before launch it is `launch.label`; once the date has
 * passed it becomes `launch.afterLabel` and the cells disappear, instead of
 * the countdown sitting at 000:00:00:00 for good. The prerendered HTML always
 * carries the pre-launch label (the build cannot know the visit date), so
 * after launch it switches on hydration.
 */
export function LaunchLabel({ className }: { className?: string }) {
  const now = useNow();
  const launched = now !== null && now * 1000 >= TARGET;
  return (
    <span className={className}>
      {launched ? product.launch.afterLabel : product.launch.label}
    </span>
  );
}

/**
 * Live countdown to launch. Shows dashes until hydrated, and nothing at all
 * once the launch date has passed (see LaunchLabel).
 *
 * `cellVariants` lets a parent choreograph the cells: each one sits in an
 * overflow mask and receives its index as `custom`, and follows the parent's
 * variant labels. Without it the cells are static.
 */
export function Countdown({
  className,
  tone = "dark",
  cellVariants,
}: {
  className?: string;
  tone?: "dark" | "light";
  cellVariants?: Variants;
}) {
  const now = useNow();
  if (now !== null && now * 1000 >= TARGET) return null;

  const parts = now === null ? null : partsAt(now);
  const cells: Array<[string, string]> = parts
    ? [
        [pad(parts.days, 3), "Days"],
        [pad(parts.hrs), "Hrs"],
        [pad(parts.min), "Min"],
        [pad(parts.sec), "Sec"],
      ]
    : [
        ["—", "Days"],
        ["—", "Hrs"],
        ["—", "Min"],
        ["—", "Sec"],
      ];

  const numTone = tone === "dark" ? "text-on-dark" : "text-ink";
  const labTone = tone === "dark" ? "text-on-dark-2" : "text-ink-3";

  return (
    <div className={cn("flex items-start", className)}>
      {cells.map(([v, label], i) => (
        <div key={label} className="flex items-start">
          {i > 0 && (
            <span
              className={cn(
                "overflow-hidden font-body text-24 leading-none px-2 pt-1",
                labTone,
              )}
              aria-hidden="true"
            >
              <m.span
                className="block"
                variants={cellVariants}
                custom={i - 0.5}
              >
                :
              </m.span>
            </span>
          )}
          <div className="overflow-hidden">
            <m.div
              className="text-center"
              variants={cellVariants}
              custom={i}
            >
              <div
                className={cn(
                  "font-body text-24 leading-none tabular-nums md:text-32",
                  numTone,
                )}
              >
                {v}
              </div>
              <div className={cn("micro mt-1.5", labTone)}>{label}</div>
            </m.div>
          </div>
        </div>
      ))}
    </div>
  );
}
