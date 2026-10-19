"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { intro } from "@/content/home";

/** Card size at rest, as a fraction of the row. */
const FROM = 0.56;
/** Scroll progress at which the card reaches full bleed. */
const UNTIL = 0.55;
/** Corner radius at rest, as seen on screen. */
const RADIUS = 16;
const ASPECT = 10 / 16;

/**
 * The ghost wordmark, then a card that widens toward full-bleed as it is
 * scrolled through — the original scrubs this against the scroll rather than
 * playing it on entry.
 *
 * The card always occupies its full-bleed slot in the layout and is drawn
 * scaled down inside it, anchored at its top edge. Growing it is a transform,
 * so nothing below it moves: it used to animate `width`, which re-laid out and
 * repainted the rest of the page every frame, and pushed every section below
 * down ~400px *after* ScrollTrigger had measured them — so their reveals all
 * started off-screen. The cost is that, mid-scrub, the space under the card is
 * the full-size slot rather than the card's current height.
 *
 * The size-over-scroll curve is the one the width version had (and Motion's
 * useScroll before it): progress measured against the card's *current*
 * height, so progress and size feed each other —
 *
 *   p = d / (vh + c·s),   s = FROM + k·p     (k = (1 − FROM) / UNTIL)
 *
 * with d the scroll past the start and c the full-bleed height. Solved for s
 * that is one quadratic, so every frame is arithmetic on values cached at
 * refresh — no layout reads, no layout writes.
 */
export function Intro() {
  const track = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = track.current;
    const el = card.current;
    if (!row || !el) return;

    const draw = (s: number, r: number) => {
      el.style.transform = `scale(${s})`;
      // The radius is drawn before the scale, so it is divided back out to
      // keep the on-screen corner at r.
      el.style.borderRadius = `${r / s}px`;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(1, 0);
      return;
    }

    let trigger: { kill: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const k = (1 - FROM) / UNTIL;
      let vh = 0;
      let c = 0;

      const render = (d: number) => {
        let s = FROM;
        if (d > 0) {
          const b = vh - FROM * c;
          s = (-b + Math.sqrt(b * b + 4 * c * (FROM * vh + k * d))) / (2 * c);
        }
        s = Math.min(1, s);
        const p = Math.max(0, d) / (vh + c * s);
        draw(s, RADIUS * Math.max(0, 1 - p / UNTIL));
      };

      trigger = ScrollTrigger.create({
        trigger: row,
        start: "top bottom",
        // Full bleed lands where s hits 1 in the equation above: p = UNTIL
        // against the full-size card.
        end: () => `+=${UNTIL * (window.innerHeight + row.clientWidth * ASPECT)}`,
        onRefresh: (self) => {
          // The only layout reads, once per refresh (load, resize).
          vh = window.innerHeight;
          c = row.clientWidth * ASPECT;
          render(self.scroll() - self.start);
        },
        // Outside start..end ScrollTrigger stops calling this, so the card
        // costs nothing once it is past.
        onUpdate: (self) => render(self.scroll() - self.start),
      });
    })();

    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, []);

  return (
    <section className="relative z-10 bg-ground pt-28 pb-0 md:pt-36">
      <div className="container-page">
        {/* Lags the page by up to 24px either way (lib/useParallax); the card
            sits 64-96px below, so the drift never closes the gap. */}
        <p
          data-parallax="text"
          data-parallax-amount={24}
          className="text-center font-display font-medium text-ink-3 select-none"
          style={{
            fontSize: "clamp(40px, 8vw, 110px)",
            lineHeight: 1.04,
            letterSpacing: "-0.06em",
          }}
        >
          {intro.wordmark}
        </p>
      </div>

      <div ref={track} className="mt-16 md:mt-24">
        <div
          ref={card}
          style={{
            transform: `scale(${FROM})`,
            transformOrigin: "50% 0",
            borderRadius: RADIUS / FROM,
          }}
          className="relative aspect-[16/10] w-full overflow-hidden shadow-[var(--shadow-card)]"
        >
          <Image
            src={`/orla-product-images/${intro.image.key}.webp`}
            alt={intro.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
