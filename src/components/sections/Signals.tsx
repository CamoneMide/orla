import { signals } from "@/content/home";
import { Eyebrow, Split } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Accordion } from "@/components/ui/Accordion";
import { CountUp } from "@/components/ui/CountUp";

export function Signals() {
  return (
    <section className="relative z-10 bg-warm section-y">
      <div className="container-page">
        <Reveal>
          <Eyebrow>{signals.eyebrow}</Eyebrow>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Split heading={signals.heading} className="max-w-[16ch]" />
            <p className="max-w-[44ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-right md:text-16">
              {signals.note}
            </p>
          </div>
        </Reveal>

        {/* Dark feature panel */}
        <Reveal className="mt-14">
          <div className="grid overflow-hidden rounded-lg bg-ink md:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
              <p className="numeral text-on-dark">
                <CountUp value={signals.feature.value} />
                <span className="font-body text-forty text-on-dark-2">
                  {signals.feature.unit}
                </span>
              </p>
              <div>
                {signals.feature.lines.map((l) => (
                  <p key={l} className="font-display text-16 text-on-dark md:text-18">
                    {l}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col justify-end gap-5 p-8 md:p-10">
              <Media
                slot={signals.feature.image}
                width={560}
                height={360}
                className="aspect-[560/360] rounded-md"
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <p className="font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-on-dark-2 md:text-right">
                {signals.feature.caption}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Live data strip */}
        <Reveal className="mt-10 flex flex-col gap-2 border-b border-line pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-4 w-4 place-items-center rounded-xs bg-ink">
              <span className="block h-1.5 w-1.5 rounded-round bg-accent" />
            </span>
            <span className="label">{signals.stripLabel}</span>
          </div>
          <p className="label text-ink-3">{signals.stripNote}</p>
        </Reveal>

        <Reveal kind="stagger" className="mt-8 grid gap-6 md:grid-cols-3">
          {signals.cards.map((c) => (
            <div
              key={c.label}
              className="flex flex-col rounded-lg border border-line bg-ground p-6"
            >
              <div className="flex items-baseline justify-between">
                <span className="label">{c.label}</span>
                <span className="micro text-ink-3">{c.meta}</span>
              </div>

              <p className="numeral mt-8 text-ink">
                <CountUp value={c.value} />
                <span className="font-body text-forty text-ink-3">{c.unit}</span>
              </p>

              <p className="mt-8 flex-1 font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2">
                {c.note}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="micro text-ink-3">{c.foot}</span>
                <span className="micro text-ink-3">Ongoing</span>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-20">
          <h3 className="h-card">{signals.measure.title}</h3>
          <p className="mt-3 font-body text-14 uppercase tracking-[-0.02em] text-ink-2">
            {signals.measure.body}
          </p>
          <Accordion items={signals.measure.items} className="mt-8" />
        </Reveal>
      </div>
    </section>
  );
}
