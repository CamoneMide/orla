"use client";

import { useId, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { EASE_QUINT, EASE_STANDARD, cn } from "@/lib/utils";
import type { FaqItem } from "@/content/types";

/**
 * The original opens the first row by default and marks closed rows with a
 * vertical three-dot glyph, open ones with a single dot.
 */
export function Accordion({
  items,
  className,
  tone = "raised",
}: {
  items: FaqItem[];
  className?: string;
  tone?: "raised" | "plain";
}) {
  const [open, setOpen] = useState(0);

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div
            key={item.q}
            className={cn(
              "rounded-md transition-colors duration-200 border border-[#ffffff]",
              tone === "raised" ? "bg-cool" : "bg-ground border border-line",
              isOpen &&
                tone === "raised" &&
                "bg-ground shadow-[var(--shadow-accordion)]",
            )}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span className="font-display text-22 font-medium text-ink">
                  {item.q}
                </span>
                <Glyph open={isOpen} />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_QUINT }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 font-body text-20 leading-[1.6] text-ink-2">
                    {item.a}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** Distance from the centre dot to each outer dot, in viewBox units (= px). */
const SPREAD = 5.4;

/**
 * Three dots fuse into one on open and split back into three on close. The
 * outer dots travel to the centre and shrink while the centre swells to absorb
 * them; the goo filter (blur, then a hard alpha threshold) is what makes them
 * bridge like liquid in transit instead of overlapping as separate discs. At
 * rest the 2.4-unit gaps are wide enough that the threshold leaves each dot
 * crisp.
 */
function Glyph({ open }: { open: boolean }) {
  const goo = `goo-${useId().replace(/:/g, "")}`;
  const reduced = useReducedMotion();
  // Ease-in-out, not the house quint-out: quint covers the whole journey in
  // ~100ms, so the liquid bridge only showed for a single frame.
  const t = { duration: reduced ? 0 : 0.6, ease: EASE_STANDARD };
  // The swell peaks as the outer dots arrive (mid-travel), then settles; on
  // close it dips as they tear away.
  const pulse = {
    duration: reduced ? 0 : 0.6,
    times: [0, 0.55, 1],
    ease: EASE_QUINT,
  };

  return (
    <span
      className="grid h-5 w-5 shrink-0 place-items-center"
      aria-hidden="true"
    >
      <svg viewBox="0 0 6 16" className="h-4 w-1.5 overflow-visible">
        <defs>
          <filter
            id={goo}
            filterUnits="userSpaceOnUse"
            x="-4"
            y="-4"
            width="14"
            height="24"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" />
          </filter>
        </defs>
        <g filter={`url(#${goo})`} fill="#262626">
          {[-1, 1].map((dir) => (
            <m.circle
              key={dir}
              cx="3"
              cy={8 + dir * SPREAD}
              r="1.5"
              initial={false}
              animate={
                open ? { y: -dir * SPREAD, scale: 0.2 } : { y: 0, scale: 1 }
              }
              transition={t}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
          <m.circle
            cx="3"
            cy="8"
            r="1.5"
            initial={false}
            animate={{ scale: open ? [1, 1.55, 1.3] : [1.3, 0.85, 1] }}
            transition={pulse}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </g>
      </svg>
    </span>
  );
}
