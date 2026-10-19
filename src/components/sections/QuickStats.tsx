import { quickStats } from "@/content/home";
import { Eyebrow, Split } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Parallax } from "@/components/ui/Parallax";

export function QuickStats() {
  const [wake, battery, setup] = quickStats.tiles;

  return (
    <section className="relative z-10 bg-warm section-y">
      <div className="container-page">
        <Reveal
          kind="stagger"
          className="grid gap-6 md:grid-cols-3 md:grid-rows-[auto_auto]"
        >
          {/* Tall image tile with the wake figure */}
          <article className="relative row-span-2 flex min-h-[420px] flex-col overflow-hidden rounded-lg">
            <Parallax amount={0.04}>
              <Media
                slot={wake.image!}
                width={480}
                height={900}
                className="absolute inset-0 h-full w-full"
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            </Parallax>
            <div className="relative z-10 p-8">
              <p className="numeral text-ink">
                <CountUp value={wake.value} />
                <span className="font-body text-forty text-ink-3">{wake.unit}</span>
              </p>
              <p className="mt-2 max-w-[24ch] font-body text-14 uppercase leading-[1.4] tracking-[-0.02em] text-ink-2">
                {wake.label}
              </p>
            </div>

            <div className="relative z-10 mt-auto bg-gradient-to-t from-black/60 to-transparent p-7 pt-16">
              <h3 className="font-display text-24 font-medium text-on-dark">
                {quickStats.caption.title}
              </h3>
              <p className="font-display text-24 font-medium text-on-dark-3">
                {quickStats.caption.body}
              </p>
            </div>
          </article>

          {/* Headline + CTA */}
          <article className="flex flex-col justify-between rounded-lg border border-line bg-ground p-8 md:col-span-1 md:row-span-2">
            <div>
              <Eyebrow>{quickStats.eyebrow}</Eyebrow>
              <Split heading={quickStats.heading} className="mt-6 max-w-[13ch]" />
            </div>
            <div className="mt-10">
              <p className="max-w-[38ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2">
                {quickStats.body}
              </p>
              <Button href={quickStats.cta.href} className="mt-7">
                {quickStats.cta.label}
              </Button>
            </div>
          </article>

          {/* Two small figure tiles */}
          {[battery, setup].map((t) => (
            <article
              key={t.label}
              className="flex flex-col rounded-lg border border-line bg-ground p-7"
            >
              {t.tag && <span className="label">{t.tag}</span>}
              <p className="numeral mt-6 text-ink">
                <CountUp value={t.value} />
                <span className="font-body text-forty text-ink-3">{t.unit}</span>
              </p>
              <p className="mt-3 max-w-[30ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2">
                {t.label}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
