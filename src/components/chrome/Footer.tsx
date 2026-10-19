import Link from "next/link";
import { product } from "@/config/product";
import { footer } from "@/content/site";
import { NewsletterForm } from "./NewsletterForm";
import { RollText } from "@/components/ui/RollText";

export function Footer() {
  return (
    <footer className="bg-warm">
      {/* The oversized mark the original closes on, as live type: the drawn
          SVG read as an upscaled bitmap at this size. The band is 0.5em tall
          and the font capped at 760px, so it tops out at 380px; the letters
          sit on its floor and their tops run out past its top edge. The
          word's ink (1.375em) cannot span the container at that size, so the
          letters are spread edge to edge; 1.83 is 1392 / 760, so the band
          reaches its cap where the container stops growing and the spacing
          stays proportional below it.

          The band itself clips nothing. The word is drawn on a stage that
          bleeds into the padding around it (py-20 above and below, the 24px
          gutter at the sides — keep .footer-mark-wipe's insets in step) and
          fades out only across that bleed, so the blurred tops and bottoms
          dissolve into the padding instead of stopping at a hard edge. */}
      <div className="container-wide py-8 md:py-12 lg:py-16">
        <div
          className="relative"
          style={{
            fontSize: "min(760px, calc((100vw - 48px) / 1.83))",
            height: "0.5em",
          }}
          aria-hidden="true"
        >
          <div className="footer-mark-wipe" data-reveal="wipe">
            <div>
              <div className="footer-mark-stage translate-y-6">
                {/* One sharp copy of the word and eight progressively blurred
                    ones stacked over it, each shown from its own point on the
                    ramp out to the edge (see .footer-mark-layer). */}
                {Array.from({ length: 9 }, (_, level) => (
                  <div key={level} className="footer-mark-layer">
                    {/* At line-height 0.88, DM Sans's baseline sits 0.099em above
                        the line box's bottom, so -0.089em puts it on the band's
                        floor. The insets pull the o's and the a's side bearings
                        (0.047em, 0.057em) past the band's edges so the ink, not
                        the advance, meets the container. Offsets are from the
                        stage, hence the bleed added back. */}
                    <p
                      className="absolute flex justify-between font-display font-medium lowercase text-ink select-none"
                      style={{
                        left: "calc(var(--bleed-x) - 0.047em)",
                        right: "calc(var(--bleed-x) - 0.057em)",
                        bottom: "calc(var(--bleed-y) - 0.089em)",
                        lineHeight: 0.88,
                      }}
                    >
                      {product.name.split("").map((ch, i) => (
                        <span key={i}>{ch}</span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide pb-10">
        {/* Links take 3/5 of the row and the newsletter 2/5. Nesting the
            link columns keeps that exact; four sibling tracks at 1fr/2fr
            would hand the links the extra gaps. */}
        <div className="grid gap-12 border-t border-line pt-10 md:grid-cols-5 md:gap-8">
          <div className="grid gap-12 md:col-span-3 grid-cols-3 md:gap-8">
            {footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="micro mb-5 text-ink-3">{col.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("http") ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group font-body text-14 uppercase tracking-[-0.02em] text-ink-2 transition-colors duration-200 hover:text-ink"
                        >
                          <RollText
                            text={l.label}
                            split="words"
                            className="roll-words"
                          />
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="group font-body text-14 uppercase tracking-[-0.02em] text-ink transition-colors duration-200 hover:text-ink"
                        >
                          <RollText
                            text={l.label}
                            split="words"
                            className="roll-words"
                          />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="md:col-span-2 md:border-l md:border-line md:pl-10">
            <p className="mb-1.5 font-display text-16 text-ink">
              {footer.newsletter.eyebrow}
            </p>
            <p className="h-card mb-6">{footer.newsletter.title}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-14 tracking-[-0.02em] text-ink-2">
            {footer.colophon}
          </p>
          <p className="micro text-ink-3">{footer.note}</p>
        </div>
      </div>

      <p className="sr-only">{product.summary}</p>
    </footer>
  );
}
