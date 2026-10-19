import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Hover roll: each unit slides up out of a one-line mask while its copy rises
 * in from below, left to right; on leave it plays back right to left.
 *
 * The copy is a `text-shadow` one line-height down, not a second DOM node, so
 * the glyphs are pixel-identical and the label is only in the DOM once for
 * layout. The trigger is the nearest `.group` ancestor (hover or
 * focus-visible) — the motion lives in globals.css under `.roll`.
 *
 * `split="chars"` cascades per character; `split="words"` moves whole words.
 * Spaces are left as plain text between units so they keep their width.
 */
export function RollText({
  text,
  split = "chars",
  className,
}: {
  text: string;
  split?: "chars" | "words";
  className?: string;
}) {
  const parts = split === "chars" ? Array.from(text) : text.split(/(\s+)/);
  const units = parts.filter((p) => p.trim() !== "").length;

  let i = 0;
  return (
    <span className={cn("roll", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {parts.map((p, k) => {
          if (p.trim() === "") return p;
          const n = i++;
          return (
            <span
              key={k}
              className="roll-u"
              // CSSProperties has no index signature for custom properties;
              // these two are read only by the .roll-u rules in globals.css.
              style={{ "--i": n, "--r": units - 1 - n } as CSSProperties}
            >
              {p}
            </span>
          );
        })}
      </span>
    </span>
  );
}
