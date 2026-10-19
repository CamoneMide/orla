"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { skipMotion } from "./utils";
import { whenUncovered } from "@/store/ui";

/**
 * The site's one reveal system.
 *
 * Every section marked `data-reveal` animates in on the house curve. It runs on
 * every route, not just home — a page whose text never reveals reads as broken
 * next to one whose does.
 *
 * GSAP + ScrollTrigger are imported dynamically so they stay out of the server
 * bundle and out of the critical path.
 *
 * Triggers are not built until the page curtain has lifted. Everything above
 * the fold fires the moment its trigger exists, so building them on the route
 * change would play those reveals out behind the curtain, unseen.
 */
export function useReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const targets = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    // Resting state: no intro, everything already home.
    if (skipMotion()) {
      targets().forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        if (el.dataset.reveal === "wipe") {
          Array.from(el.children).forEach((c) => {
            (c as HTMLElement).style.transform = "none";
          });
        }
        Array.from(el.children).forEach((c) => {
          (c as HTMLElement).style.clipPath = "none";
        });
      });
      return;
    }

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        whenUncovered(),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        targets().forEach((el) => {
          const kind = el.dataset.reveal || "up";
          const delay = Number(el.dataset.revealDelay || 0);
          const common = {
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            duration: 1.2,
            ease: "power4.out", // quint-out equivalent of cubic-bezier(.22,1,.36,1)
            delay,
          };

          if (kind === "clip") {
            const kids = Array.from(el.children) as HTMLElement[];
            gsap.set(el, { opacity: 1 });
            gsap.fromTo(
              kids,
              { clipPath: "inset(0 0 100% 0)" },
              { ...common, clipPath: "inset(0 0 0% 0)", stagger: 0.06 },
            );
            return;
          }

          if (kind === "wipe") {
            // Window in from the left, content back out the other way by the
            // same amount, so the word holds still under a travelling edge
            // (see .footer-mark-wipe). Transforms only: no repaint per frame.
            // x: 0 because the CSS park is parsed into px, and xPercent
            // would stack on it.
            const wipe = {
              ...common,
              duration: 1.6,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 80%", once: true },
            };
            gsap.fromTo(el, { x: 0, xPercent: -100 }, { ...wipe, xPercent: 0 });
            gsap.fromTo(
              Array.from(el.children),
              { x: 0, xPercent: 100 },
              { ...wipe, xPercent: 0 },
            );
            return;
          }

          if (kind === "stagger") {
            const kids = Array.from(el.children) as HTMLElement[];
            gsap.set(el, { opacity: 1 });
            // y:0 makes the set idempotent — without it a second run stacks
            // onto the transform the first run left behind.
            gsap.set(kids, { opacity: 0, y: 24 });
            gsap.to(kids, { ...common, opacity: 1, y: 0, stagger: 0.08 });
            return;
          }

          gsap.set(el, { y: 24, opacity: 0 });
          gsap.to(el, { ...common, y: 0, opacity: 1 });
        });

        ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [pathname]);
}
