import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A layer that drifts against the scroll inside its clipping box (driven by
 * lib/useParallax). The parent must be positioned and `overflow-hidden`.
 *
 * The layer is oversized by `amount` of the box's height above and below, and
 * never travels further than that, so no edge is ever exposed. That oversize
 * is the whole cost to the framing: the picture is cropped as for a box
 * (1 + 2·amount) times as tall. Without JS it simply sits centred.
 *
 * `range`:
 *   pass   drift across the box's whole pass through the viewport, lagging the
 *          page (the usual parallax)
 *   cover  for the sticky home hero, which never moves itself: drift up over
 *          the first viewport of scroll, while the next section covers it.
 *          Assumes the box sits at the top of the document.
 */
export function Parallax({
  amount = 0.08,
  range = "pass",
  className,
  children,
}: {
  amount?: number;
  range?: "pass" | "cover";
  className?: string;
  children: ReactNode;
}) {
  const pad = `${-amount * 100}%`;
  return (
    <div
      data-parallax={range}
      data-parallax-amount={amount}
      className={cn("absolute inset-x-0", className)}
      style={{ top: pad, bottom: pad }}
    >
      {children}
    </div>
  );
}
