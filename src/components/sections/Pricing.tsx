import { pricing } from "@/content/home";
import { Eyebrow, Split } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { formatMoney } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="relative z-10 bg-ground section-y">
      <div className="container-page">
        <Reveal>
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
            <Split heading={pricing.heading} className="max-w-[13ch]" />
            <p className="font-body text-14 uppercase tracking-[-0.02em] text-ink-2 md:text-right md:text-16">
              {pricing.aside}
            </p>
          </div>
          <p className="mt-7 max-w-[46ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
            {pricing.body}
          </p>
        </Reveal>

        <Reveal kind="stagger" className="mt-16 grid gap-6 md:grid-cols-3">
          {pricing.tiers.map((t) => (
            <article
              key={t.name}
              className={`flex flex-col overflow-hidden rounded-lg border ${
                t.featured ? "border-ink" : "border-line"
              }`}
            >
              <div
                className={`p-7 ${t.featured ? "bg-ink text-on-dark" : "bg-warm"}`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-display text-24 font-medium ${
                      t.featured ? "text-on-dark" : "text-ink"
                    }`}
                  >
                    {t.name}
                  </h3>
                  {t.featured && (
                    <span className="micro rounded-round border border-white/25 px-2.5 py-1 text-on-dark-2">
                      Most chosen
                    </span>
                  )}
                </div>

                <p
                  className={`numeral mt-8 ${
                    t.featured ? "text-on-dark" : "text-ink"
                  }`}
                >
                  {formatMoney(t.price)}
                </p>
                <p
                  className={`mt-1 font-body text-14 uppercase tracking-[-0.02em] ${
                    t.featured ? "text-on-dark-2" : "text-ink-3"
                  }`}
                >
                  {t.unit}
                </p>
              </div>

              <div className="flex flex-1 flex-col bg-ground p-7">
                <p className="font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2">
                  {t.body}
                </p>

                <ul className="mt-7 flex flex-1 flex-col gap-3">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 border-b border-line pb-3 font-body text-14 uppercase tracking-[-0.02em] text-ink"
                    >
                      <span
                        className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-round bg-ink"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href={t.cta.href}
                  variant={t.featured ? "solid" : "ghost"}
                  className="mt-8 justify-center"
                >
                  {t.cta.label}
                </Button>
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal className="mt-16 text-center">
          <p className="label text-ink-3">{pricing.integrationsLabel}</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {pricing.integrations.map((n) => (
              <li
                key={n}
                className="font-display text-20 font-medium text-ink-3 transition-colors duration-200 hover:text-ink"
              >
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
