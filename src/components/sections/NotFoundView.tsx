import Link from "next/link";

import { notFound as nf } from "@/content/forms";
import { cases } from "@/content/cases";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Split } from "@/components/ui/Type";
import { Button } from "@/components/ui/Button";

export function NotFoundView() {
  return (
    <>
      <section className="relative z-10 bg-warm pt-36 pb-20 md:pt-44">
        <div className="container-page">
          <Reveal className="grid items-center gap-12 md:grid-cols-[340px_1fr]">
            <Media
              slot={nf.image}
              width={409}
              height={630}
              className="hidden aspect-[409/630] rounded-lg md:block"
              sizes="30vw"
            />

            <div>
              <p className="numeral text-ink-3">{nf.code}</p>
              <Split heading={nf.heading} as="h1" className="mt-4 max-w-[12ch]" />
              <p className="mt-6 max-w-[44ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
                {nf.body}
              </p>
              <Button href={nf.cta.href} className="mt-8">
                {nf.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 bg-ground pb-24">
        <div className="container-page">
          <Reveal kind="stagger" className="grid gap-6 md:grid-cols-3">
            {cases.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group overflow-hidden rounded-lg border border-line"
              >
                <Media
                  slot={c.hero}
                  width={448}
                  height={320}
                  className="aspect-[448/320]"
                  imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <div className="p-6">
                  <span className="label">{c.room}</span>
                  <p className="mt-2 font-display text-24 font-medium text-ink">
                    {c.title}
                  </p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
