"use client";

import { useEffect, useRef } from "react";
import { cn, skipMotion } from "@/lib/utils";

/**
 * Counts up when it scrolls into view. The original's stat blocks all sit at
 * zero until they are reached — that is why they read as "00" in any static
 * capture of the page.
 *
 * The count writes the span's text directly rather than through state: a
 * setState per frame re-rendered the component ~100 times per stat for a
 * change that is one text node. React rendered the "00" and never re-renders
 * it with different children, so it never overwrites the written value.
 */
export function CountUp({
  value,
  className,
  duration = 1600,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const target = parseFloat(value);
  const numeric = Number.isFinite(target);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const width = value.split(".")[0].length + (decimals ? decimals + 1 : 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // React renders the digits as the span's only child, a Text node. Write
    // to that node: `textContent =` would replace it every frame, which costs
    // a node insertion and a full layout instead of a text-change layout.
    const el = ref.current;
    const text = el?.firstChild;
    if (!numeric || !el || !(text instanceof Text)) return;
    const show = (n: number) => {
      text.data = n.toFixed(decimals).padStart(width, "0");
    };

    if (skipMotion()) {
      show(target);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          // quint-out, the house curve
          show(target * (1 - Math.pow(1 - p, 5)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, numeric, decimals, width]);

  if (!numeric) {
    return <span className={cn("tabular-nums", className)}>{value}</span>;
  }

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {(0).toFixed(decimals).padStart(width, "0")}
    </span>
  );
}
