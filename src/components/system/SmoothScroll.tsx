"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReveal } from "@/lib/useReveal";
import { useParallax } from "@/lib/useParallax";
import { useUi } from "@/store/ui";

/**
 * Lenis, as the original ships. It drives GSAP's ScrollTrigger rather than
 * fighting it, and it is disabled outright under reduced motion.
 *
 * Lenis runs on GSAP's ticker, the integration Lenis documents, rather than
 * a requestAnimationFrame loop of its own: one frame loop instead of two, and
 * `prioritize` puts the scroll step ahead of GSAP's render in each tick, so a
 * reveal or scrub that ScrollTrigger starts on this frame's scroll also draws
 * on this frame.
 *
 * GSAP's lag smoothing is left on, against the Lenis README's
 * `lagSmoothing(0)`: it is global, and turning it off would let the page
 * curtain jump straight to its end after a long hydration frame. All it costs
 * Lenis is a slower catch-up after a >500ms stall.
 */
export function SmoothScroll() {
  useReveal();
  useParallax();
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: import("lenis").default | undefined;
    let untick: (() => void) | undefined;
    let cancelled = false;

    // Hold the page still while the curtain is over it: a wheel during the
    // intro would otherwise lift the curtain onto a page already scrolled.
    const hold = (covered: boolean) =>
      covered ? lenis?.stop() : lenis?.start();
    const unsubscribe = useUi.subscribe((s) => hold(s.covered));

    (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      if (cancelled) return;

      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);

      hold(useUi.getState().covered);

      // GSAP's ticker time is in seconds; Lenis expects milliseconds.
      const tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick, false, true);
      untick = () => gsap.ticker.remove(tick);
    })();

    return () => {
      cancelled = true;
      unsubscribe();
      untick?.();
      lenis?.destroy();
    };
  }, []);

  // Route change: return to the top and move focus, so the transition does not
  // leave a keyboard user stranded mid-document.
  useEffect(() => {
    window.scrollTo(0, 0);
    const main = document.getElementById("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  }, [pathname]);

  return null;
}
