import Link from "next/link";
import Image from "next/image";

import { nextSteps, nextStepsHead, closer } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Split } from "@/components/ui/Type";
import { Parallax } from "@/components/ui/Parallax";

/**
 * The pair of blocks every interior page closes on: three linked cards, then a
 * full-bleed plate carrying the primary call to action. Both are measured off
 * the original, which repeats them on every route except home.
 */
export function Closer() {
  return (
    <>
      {/* Desktop only. Measured on the original: at 390 the interior pages go
          straight from the FAQ to the closing plate, and stacking these three
          cards there adds ~250vh the original does not have. */}
      <section className="relative z-10 hidden bg-cool pt-20 pb-20 md:block md:pt-28">
        <div className="container-page">
          <Reveal className="flex flex-col items-center pb-14 text-center">
            <Eyebrow center>{nextStepsHead.eyebrow}</Eyebrow>
            <Split heading={nextStepsHead.heading} className="mt-7" />
            <p className="mt-7 max-w-[52ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
              {nextStepsHead.body}
            </p>
          </Reveal>

          <Reveal kind="stagger" className="grid gap-6 md:grid-cols-3">
            {nextSteps.map((s) => (
              <Link
                key={s.title}
                href={s.cta.href}
                className="group flex flex-col overflow-hidden rounded-lg bg-ground"
              >
                <Media
                  slot={s.image}
                  width={448}
                  height={320}
                  className="aspect-[448/320]"
                  imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                  sizes="(max-width: 900px) 100vw, 33vw"
                />

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="h-card">{s.title}</h2>
                  <p className="mt-4 flex-1 font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2">
                    {s.body}
                  </p>

                  <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-4">
                    <span className="micro text-ink-3">{s.foot}</span>
                    <span className="font-display text-16 text-ink transition-opacity duration-200 group-hover:opacity-60">
                      {s.cta.label} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <ClosingPlate />
    </>
  );
}

/**
 * The full-bleed plate carrying the primary call to action. Interior pages get
 * it through `Closer`; home renders it on its own photograph, because the
 * original closes home on the same plate without the card trio above it.
 */
export function ClosingPlate({
  image = closer.image,
}: {
  image?: { key: string; alt: string };
}) {
  return (
    <section className="relative z-10 h-[76svh] min-h-[520px] w-full overflow-hidden">
      <Parallax amount={0.1}>
        <Image
          src={`/orla-product-images/${image.key}.webp`}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Parallax>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,16,12,0.30) 0%, rgba(20,16,12,0.10) 45%, rgba(20,16,12,0.34) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 flex items-center gap-2.5">
          <span className="grid h-5 w-5 place-items-center rounded-sm bg-ground">
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden="true">
              <g fill="#262626">
                <rect x="1" y="1" width="2.6" height="2.6" rx="0.6" />
                <rect x="6.4" y="2.6" width="2.6" height="2.6" rx="0.6" />
                <rect x="1" y="6.4" width="2.6" height="2.6" rx="0.6" />
              </g>
            </svg>
          </span>
          <span className="font-display text-16 text-on-dark md:text-24">
            {closer.badge}
          </span>
        </div>

        {/* Lead and trail on their own lines, as the original sets them; at
            phone width the lead wraps on its own. */}
        <h2 className="h-display text-on-dark">
          <span className="block">{closer.heading.lead}</span>
          <span className="block">{closer.heading.trail}</span>
        </h2>

        <div className="mt-9 flex flex-col items-center gap-3.5 sm:flex-row">
          {closer.ctas.map((c) => (
            <Button
              key={c.label}
              href={c.href}
              variant={c.variant === "solid" ? "solid" : "light"}
            >
              {c.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
