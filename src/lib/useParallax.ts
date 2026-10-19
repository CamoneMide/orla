"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { skipMotion } from "./utils";

/**
 * Desktop with a mouse only. On touch the page scrolls on the compositor while
 * these transforms are set from the main thread, so the layer visibly trails
 * the finger. gsap.matchMedia also reverts every transform if the query stops
 * matching (a resize below 900, reduced motion switched on).
 */
const WHEN =
  "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * The site's parallax: every `[data-parallax]` element (see ui/Parallax for
 * the image layer; `data-parallax="text"` moves an element by
 * `data-parallax-amount` px instead) is scrubbed against the scroll.
 *
 * Transforms only, with positions measured by ScrollTrigger at refresh — no
 * layout reads or writes per frame.
 *
 * Unlike the reveals, these are built as soon as the route renders, while the
 * curtain is still over it. A scrubbed layer has a position for every scroll
 * offset, including the current one; building it after the lift would jump a
 * hero already in view from its CSS rest to that position.
 */
export function useParallax() {
  const pathname = usePathname();

  useEffect(() => {
    if (skipMotion()) return;

    let mm: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const media = gsap.matchMedia();
      mm = media;
      media.add(WHEN, () => {
        document
          .querySelectorAll<HTMLElement>("[data-parallax]")
          .forEach((el) => {
            const box = el.parentElement;
            const amount = Number(el.dataset.parallaxAmount);
            if (!box || !amount) return;

            // The trigger is always the untransformed parent, so ScrollTrigger
            // never measures the layer it is moving.
            const mode = el.dataset.parallax;
            if (mode === "text") {
              gsap.fromTo(
                el,
                { y: -amount },
                {
                  y: amount,
                  ease: "none",
                  scrollTrigger: {
                    trigger: box,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
              return;
            }

            const travel = () => amount * box.offsetHeight;

            if (mode === "cover") {
              // Absolute scroll offsets, not "top top": a stuck element's
              // rect reads top 0 at any scroll, so a refresh mid-page would
              // measure the wrong start.
              gsap.fromTo(
                el,
                { y: 0 },
                {
                  y: () => -travel(),
                  ease: "none",
                  scrollTrigger: {
                    start: 0,
                    end: () => box.offsetHeight,
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                },
              );
              return;
            }

            gsap.fromTo(
              el,
              { y: () => -travel() },
              {
                y: () => travel(),
                ease: "none",
                scrollTrigger: {
                  trigger: box,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
      });
    })();

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [pathname]);
}
