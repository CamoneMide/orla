"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

import { product } from "@/config/product";
import { navLinks } from "@/content/site";
import { useUi } from "@/store/ui";
import { NAV_CLOSE_S } from "@/components/chrome/Nav";
import { skipMotion } from "@/lib/utils";

type Gsap = typeof import("gsap").default;

/*
 * The intro and every page transition share one curtain.
 *
 *   intro       warm plate, tagline rises -> ink plate wipes down over it ->
 *               the wordmark rolls up -> lift
 *   navigation  ink plate wipes down over the page -> the destination's name
 *               rolls up -> the route swaps behind it -> lift
 *   lift        the word rolls on out the top while the plate's top edge
 *               travels down, uncovering the new page top-first
 *
 * This replaced a View Transitions crossfade. A view transition freezes the
 * live DOM behind its snapshot, so the nav panel could not play its own close
 * and had to be snapped shut; a DOM curtain leaves the page live, so the nav
 * closes on its real choreography first and the curtain follows.
 *
 * Unit parking: the CSS parks every rolling unit at translateY(110%) so the
 * first paint is already hidden. GSAP parses that into a px `y`, and a bare
 * `yPercent` tween would stack on it — every tween starts from an explicit
 * `y: 0` for that reason.
 */

const EASE_SWEEP = "power4.inOut";
const EASE_OUT = "power4.out"; // the house quint-out, as in useReveal
const SHUT = "inset(0% 0% 100% 0%)";
const OPEN = "inset(0% 0% 0% 0%)";
const LIFTED = "inset(100% 0% 0% 0%)";

/** What the curtain says on the way to `url`: its nav label, else the name. */
function labelFor(url: URL): string {
  const exact = navLinks.find((l) => l.href === url.pathname + url.hash);
  const page = navLinks.find((l) => l.href === url.pathname);
  return (exact ?? page)?.label ?? product.name;
}

/** The rolling letters of one plate (`.curtain-warm` or `.curtain-dark`). */
const units = (root: HTMLElement, plate: string) =>
  Array.from(root.querySelectorAll<HTMLElement>(`${plate} .curtain-u`));

export function PageCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef<Array<() => void>>([]);
  const busy = useRef(false);
  const [word, setWord] = useState<string>(product.name);

  // Resolve a waiting navigation once the new route has actually rendered.
  useEffect(() => {
    const waiting = pending.current;
    pending.current = [];
    waiting.forEach((resolve) => resolve());
  }, [pathname]);

  // Intro: runs once, on the document load that rendered the curtain.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!document.documentElement.classList.contains("js-ready")) {
      el.classList.remove("is-intro");
      return;
    }

    let cancelled = false;
    busy.current = true;
    (async () => {
      const [{ default: gsap }] = await Promise.all([
        import("gsap"),
        // The word is set in DM Sans; rolling it in the fallback face and
        // swapping mid-animation is a visible jump. Capped so a slow font
        // never holds the page.
        Promise.race([document.fonts.ready, wait(1000)]),
      ]);
      if (cancelled) return;

      const dark = el.querySelector<HTMLElement>(".curtain-dark");
      const tl = gsap.timeline();
      tl.fromTo(
        units(el, ".curtain-warm"),
        { y: 0, yPercent: 110 },
        { yPercent: 0, duration: 0.8, ease: EASE_OUT, stagger: 0.06 },
        0.1,
      )
        .fromTo(
          dark,
          { clipPath: SHUT },
          { clipPath: OPEN, duration: 0.85, ease: EASE_SWEEP },
          0.85,
        )
        .fromTo(
          units(el, ".curtain-dark"),
          { y: 0, yPercent: 110 },
          { yPercent: 0, duration: 0.75, ease: EASE_OUT, stagger: 0.05 },
          1.3,
        );
      await tl;
      if (cancelled) return;
      await wait(150);
      await lift(gsap, el);
      el.classList.remove("is-intro");
      busy.current = false;
    })().catch((err: unknown) => {
      // Never leave the page behind a curtain that failed to animate.
      uncoverNow(el);
      busy.current = false;
      throw err;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Navigation: intercept internal link clicks in the capture phase, so every
  // existing <Link> keeps working unchanged and content stays plain hrefs.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      if (skipMotion()) return;

      // Event targets are always DOM nodes here; `closest` exists only on
      // Elements, so a text-node target is narrowed out by the instanceof.
      const target = e.target;
      const anchor = target instanceof Element ? target.closest("a") : null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return; // not a URL we can route; let the browser have it
      }
      if (url.origin !== window.location.origin) return;
      // Same page with a hash (e.g. /#pricing from /) — let the browser scroll.
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      const el = root.current;
      if (busy.current || !el) return;
      busy.current = true;
      navigate(el, url).catch((err: unknown) => {
        uncoverNow(el);
        busy.current = false;
        throw err;
      });
    };

    const navigate = async (el: HTMLElement, url: URL) => {
      const [{ default: gsap }] = await Promise.all([
        import("gsap"),
        // Shut the nav on its own choreography first; the curtain comes in
        // only once the pill is back to its resting size.
        closeNav(),
      ]);

      // Commit the new word now, so the units queried below are its letters.
      flushSync(() => setWord(labelFor(url)));
      const dark = el.querySelector<HTMLElement>(".curtain-dark");
      gsap.set(el, { clipPath: OPEN, visibility: "visible" });
      el.style.pointerEvents = "auto";
      useUi.getState().setCovered(true);

      const tl = gsap.timeline();
      tl.fromTo(
        dark,
        { clipPath: SHUT },
        { clipPath: OPEN, duration: 0.75, ease: EASE_SWEEP },
      ).fromTo(
        units(el, ".curtain-dark"),
        { y: 0, yPercent: 110 },
        { yPercent: 0, duration: 0.7, ease: EASE_OUT, stagger: 0.04 },
        0.45,
      );

      // Swap the route as soon as the plate is solid; the word finishes
      // rising over it, which hides the router's latency.
      const routed = tl.then(
        () =>
          new Promise<void>((resolve) => {
            // Failsafe: never hold the curtain if a navigation stalls.
            const timer = setTimeout(resolve, 1500);
            pending.current.push(() => {
              clearTimeout(timer);
              resolve();
            });
            router.push(url.pathname + url.search + url.hash);
          }),
      );
      await Promise.all([tl, routed]);
      await wait(150);
      await lift(gsap, el);
      busy.current = false;
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  const letters = Array.from(word.toLowerCase());
  return (
    <div ref={root} className="curtain is-intro" aria-hidden="true">
      <div className="curtain-warm">
        <p className="font-display text-24 font-medium text-black md:text-32">
          {product.tagline.split(" ").map((w, k) => (
            <span key={k} className="curtain-mask">
              <span className="curtain-u">{w}</span>
            </span>
          ))}
        </p>
      </div>
      <div className="curtain-dark">
        <p className="h-display text-on-dark lowercase">
          <span className="curtain-mask">
            {letters.map((c, k) =>
              c === " " ? (
                " "
              ) : (
                <span key={k} className="curtain-u">
                  {c}
                </span>
              ),
            )}
          </span>
        </p>
      </div>
    </div>
  );
}

/**
 * Rolls the word out the top and draws the plate's top edge down the screen.
 * `covered` drops a beat into the sweep, so the page's own reveals start as
 * the edge passes over them rather than behind the plate.
 */
async function lift(gsap: Gsap, el: HTMLElement) {
  const zoom = Array.from(
    document.querySelectorAll<HTMLElement>("#main [data-enter='zoom']"),
  );
  const tl = gsap.timeline();
  tl.to(units(el, ".curtain-dark"), {
    yPercent: -110,
    duration: 0.5,
    ease: "power3.in",
    stagger: 0.03,
  })
    .fromTo(
      el,
      { clipPath: OPEN },
      { clipPath: LIFTED, duration: 0.95, ease: EASE_SWEEP },
      0.2,
    )
    .call(() => useUi.getState().setCovered(false), [], 0.4)
    // The hero frame eases out of a slight zoom under the edge. Moving the
    // whole of <main> instead was tried and dropped: it opens a strip of bare
    // body above the page as the curtain's edge passes the top.
    .fromTo(
      zoom,
      { scale: 1.12 },
      { scale: 1, duration: 1.8, ease: EASE_OUT, clearProps: "transform" },
      0.3,
    );
  await tl;
  rest(gsap, el);
}

/** Back to the resting state: hidden, inert, every unit parked below. */
function rest(gsap: Gsap, el: HTMLElement) {
  gsap.set(el, { visibility: "hidden", clipPath: OPEN });
  el.style.pointerEvents = "";
  gsap.set(el.querySelector(".curtain-dark"), { clipPath: SHUT });
  gsap.set(el.querySelectorAll(".curtain-u"), { y: 0, yPercent: 110 });
}

function uncoverNow(el: HTMLElement) {
  el.classList.remove("is-intro");
  el.style.visibility = "hidden";
  el.style.pointerEvents = "";
  useUi.getState().setCovered(false);
}

function closeNav(): Promise<void> {
  const ui = useUi.getState();
  if (!ui.menuOpen) return Promise.resolve();
  ui.closeMenu();
  return wait(NAV_CLOSE_S * 1000);
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
