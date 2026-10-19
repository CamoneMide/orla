"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, useReducedMotion, type Variants } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { product } from "@/config/product";
import { navLinks, navFeature } from "@/content/site";
import { useUi } from "@/store/ui";
import { Wordmark } from "./Wordmark";
import { Countdown, LaunchLabel } from "@/components/ui/Countdown";
import { EASE_QUINT } from "@/lib/utils";

/*
 * Panel choreography. Every element inside the panel follows the panel's
 * variant labels, so one AnimatePresence drives both directions.
 *
 * Exit variants are functions of `still`, which arrives through
 * AnimatePresence's `custom`: an exiting subtree keeps its last props, so a
 * flag read from the closure would be stale by the time the exit runs.
 */

/**
 * How long the contents play out before the panel itself starts to collapse:
 * the longest exit below (the last link, or the image). Any shorter and the
 * pill starts shrinking while they are still visible, and the layout animation
 * stretches them.
 */
const HOLD = 0.3;
/** The whole close, contents then pill. The page curtain waits this long. */
export const NAV_CLOSE_S = HOLD + 0.35;
/** The house curve mirrored, so the exit accelerates away rather than settles. */
const EASE_IN = [0.64, 0, 0.78, 0] as const;

const out = (still: boolean, duration: number) =>
  still ? { duration: 0 } : { duration, ease: EASE_IN };

const panelV: Variants = {
  hidden: { height: 0, opacity: 0 },
  shown: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.35, ease: EASE_QUINT },
  },
  gone: (still: boolean) => ({
    height: 0,
    opacity: 0,
    transition: still
      ? { duration: 0 }
      : { duration: 0.35, ease: EASE_QUINT, delay: HOLD },
  }),
};

const listV: Variants = {
  shown: { transition: { delayChildren: 0.06, staggerChildren: 0.035 } },
  // Last link leaves first, so the close reads as the open played backwards.
  gone: (still: boolean) => ({
    transition: still ? {} : { staggerChildren: 0.02, staggerDirection: -1 },
  }),
};

const linkV: Variants = {
  hidden: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_QUINT } },
  gone: (still: boolean) => ({
    opacity: 0,
    y: -6,
    transition: out(still, 0.18),
  }),
};

/*
 * The feature image opens through a polygon whose top edge starts steeply
 * tilted below the frame and flattens as it rises, so it sweeps in on a
 * diagonal; on close the bottom edge lifts away on the opposite tilt. Every
 * state keeps four points in the same order so the strings interpolate.
 */
const clipV: Variants = {
  hidden: { clipPath: "polygon(0% 160%, 100% 100%, 100% 100%, 0% 100%)" },
  shown: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: { duration: 0.9, ease: EASE_QUINT, delay: 0.1 },
  },
  gone: (still: boolean) => ({
    clipPath: "polygon(0% 0%, 100% 0%, 100% -40%, 0% 0%)",
    transition: out(still, 0.3),
  }),
};

const imageV: Variants = {
  hidden: { scale: 1.25 },
  shown: {
    scale: 1,
    transition: { duration: 1.2, ease: EASE_QUINT, delay: 0.1 },
  },
  gone: (still: boolean) => ({ scale: 1.08, transition: out(still, 0.3) }),
};

const riseV = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 10 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_QUINT, delay },
  },
  gone: (still: boolean) => ({
    opacity: 0,
    y: -4,
    transition: out(still, 0.16),
  }),
});

const ruleV: Variants = {
  hidden: { scaleX: 0 },
  shown: {
    scaleX: 1,
    transition: { duration: 0.8, ease: EASE_QUINT, delay: 0.15 },
  },
  gone: (still: boolean) => ({ scaleX: 0, transition: out(still, 0.25) }),
};

/*
 * Countdown cells rise out of their masks one after another. `custom` is the
 * cell's index on the way in; on the way out AnimatePresence's `custom`
 * replaces it, so the cells lift away together.
 */
const cellV: Variants = {
  hidden: { y: "110%" },
  shown: (i: number) => ({
    y: "0%",
    transition: { duration: 0.7, ease: EASE_QUINT, delay: 0.28 + i * 0.06 },
  }),
  gone: (still: boolean) => ({ y: "-110%", transition: out(still, 0.24) }),
};

/**
 * A fixed 190x52 pill at top:30 (24 on mobile), centred, radius 24 — measured
 * off the original. It expands into a dark panel holding the links, a feature
 * card, and the live launch countdown.
 */
export function Nav() {
  const { menuOpen, toggleMenu, closeMenu } = useUi();
  const still = Boolean(useReducedMotion());

  // One duration for every nav animation, so reduced motion zeroes them all.
  const anim = { duration: still ? 0 : 0.35, ease: EASE_QUINT };

  // The pill stays wide while the contents play out on close; shrinking it
  // with `menuOpen` would squeeze them through the layout animation. Set
  // during render: React's pattern for state derived from a prop change.
  const [held, setHeld] = useState(false);
  if (menuOpen && !held) setHeld(true);
  useEffect(() => {
    if (menuOpen || !held) return;
    const id = setTimeout(() => setHeld(false), still ? 0 : HOLD * 1000);
    return () => clearTimeout(id);
  }, [menuOpen, held, still]);
  const wide = menuOpen || (held && !still);
  const pathname = usePathname();

  useEffect(() => closeMenu(), [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <m.button
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <div className="nav-shell pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center md:top-[30px]">
        <m.div
          layout
          transition={anim}
          className="pointer-events-auto overflow-hidden rounded-pill bg-black text-on-dark shadow-[var(--shadow-pill)]"
          style={{ width: wide ? "min(720px, calc(100vw - 32px))" : 190 }}
        >
          {/* Bar. The wordmark and the toggle take `layout` to opt into
              scale correction: the pill's width animates as a transform,
              which would otherwise stretch them with it. */}
          <div className="flex h-14 items-center justify-between px-5">
            <Link
              href="/"
              className="text-[26px] leading-none text-on-dark"
              onClick={closeMenu}
            >
              <m.span
                layout="position"
                transition={anim}
                className="block"
              >
                <Wordmark />
              </m.span>
            </Link>

            <m.button
              layout="position"
              transition={anim}
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="nav-panel"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-6 w-7 flex-col items-end justify-center gap-1.25 cursor-pointer"
            >
              <m.span
                animate={
                  menuOpen
                    ? { rotate: 45, y: 3.5, width: 20 }
                    : { rotate: 0, y: 0, width: 24 }
                }
                transition={anim}
                className="block h-[1.5px] bg-on-dark"
              />
              <m.span
                animate={
                  menuOpen
                    ? { rotate: -45, y: -3.5, width: 20 }
                    : { rotate: 0, y: 0, width: 16 }
                }
                transition={anim}
                className="block h-[1.5px] bg-on-dark"
              />
            </m.button>
          </div>

          {/* Panel */}
          <AnimatePresence initial={false} custom={still}>
            {menuOpen && (
              <m.div
                id="nav-panel"
                variants={panelV}
                // `false` propagates down the variant tree, so under reduced
                // motion every child opens already in its shown state too.
                initial={still ? false : "hidden"}
                animate="shown"
                exit="gone"
                custom={still}
              >
                <div className="px-5 pb-6 md:px-8 md:pb-8">
                  <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    <nav aria-label="Main">
                      <m.ul
                        className="flex flex-col gap-2.5"
                        variants={listV}
                      >
                        {navLinks.map((l) => (
                          <m.li key={l.label} variants={linkV}>
                            <Link
                              href={l.href}
                              onClick={closeMenu}
                              className="font-body text-18 uppercase tracking-[-0.02em] text-on-dark transition-opacity duration-200 hover:opacity-60"
                            >
                              {l.label}
                            </Link>
                          </m.li>
                        ))}
                      </m.ul>
                    </nav>

                    <Link
                      href={navFeature.href}
                      onClick={closeMenu}
                      className="group relative hidden overflow-hidden rounded-md md:block md:w-[320px]"
                    >
                      <m.div variants={clipV}>
                        <m.div variants={imageV}>
                          <Image
                            src={`/orla-product-images/${navFeature.image.key}.webp`}
                            alt={navFeature.image.alt}
                            width={640}
                            height={380}
                            className="h-[190px] w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                          />
                        </m.div>
                      </m.div>
                      <m.span
                        variants={riseV(0.45)}
                        className="absolute inset-x-0 bottom-4 text-center font-body text-16 text-on-dark"
                      >
                        {navFeature.label}
                      </m.span>
                    </Link>
                  </div>

                  {/* A drawn rule in place of the old border-t, so it can grow;
                      same 1px, same 28px above and 20px below. */}
                  <m.div
                    variants={ruleV}
                    className="mt-7 h-px origin-left bg-white/15"
                  />
                  <div className="pt-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <m.p
                        variants={riseV(0.22)}
                        className="label text-on-dark-2"
                      >
                        {product.tagline}
                      </m.p>
                      <div className="flex items-center gap-4">
                        <m.span
                          variants={riseV(0.26)}
                          className="hidden h-1 w-1 rounded-round bg-on-dark-2 md:block"
                        />
                        <m.span
                          variants={riseV(0.26)}
                          className="font-display text-14 text-on-dark"
                        >
                          <LaunchLabel />
                        </m.span>
                        <Countdown tone="dark" cellVariants={cellV} />
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </>
  );
}
