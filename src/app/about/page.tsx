import type { Metadata } from "next";
import Image from "next/image";

import { about } from "@/content/about";
import { Closer } from "@/components/sections/Closer";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Eyebrow, Split } from "@/components/ui/Type";
import { Parallax } from "@/components/ui/Parallax";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nine people, two workshops, one lamp — and the reasoning behind building only one thing.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero plate */}
      <section className="relative z-10 h-[72svh] min-h-[460px] w-full overflow-hidden">
        <Parallax amount={0.1}>
          <Image
            src={`/orla-product-images/${about.hero.image.key}.webp`}
            alt={about.hero.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <h1 className="h-display text-center text-on-dark">
            {about.hero.title}
          </h1>
        </div>
      </section>

      {/* Opening */}
      <section className="relative z-10 bg-ground section-y">
        <div className="container-page">
          <Reveal>
            <Eyebrow>{about.opening.eyebrow}</Eyebrow>
            <Split heading={about.opening.heading} className="mt-8 max-w-[15ch]" />
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <p className="font-body text-20 leading-[1.6] text-ink-2">
                {about.opening.body}
              </p>
              <p className="font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2">
                {about.opening.aside}
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-20">
            <p className="label mb-6">{about.details.label}</p>
            <dl>
              {about.details.rows.map((r) => (
                <div
                  key={r.k}
                  className="grid grid-cols-[minmax(90px,1fr)_2fr] gap-6 border-t border-line py-5"
                >
                  <dt className="label">{r.k}</dt>
                  <dd className="whitespace-pre-line text-right font-body text-14 uppercase tracking-[-0.02em] text-ink">
                    {r.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Why a lamp */}
      <section className="relative z-10 bg-warm section-y">
        <div className="container-page">
          <Reveal className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>{about.belief.eyebrow}</Eyebrow>
              <Split heading={about.belief.heading} className="mt-7 max-w-[15ch]" />
              <p className="mt-7 font-body text-20 leading-[1.6] text-ink-2">
                {about.belief.body}
              </p>
              <p className="mt-5 font-body text-20 leading-[1.6] text-ink-2">
                {about.belief.body2}
              </p>
            </div>
            <Media
              slot={about.belief.image}
              width={708}
              height={531}
              className="aspect-[4/3] rounded-lg"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="relative z-10 bg-ground section-y">
        <div className="container-page">
          <Reveal>
            <Eyebrow>{about.principles.eyebrow}</Eyebrow>
            <Split heading={about.principles.heading} className="mt-7 max-w-[14ch]" />
          </Reveal>

          <Reveal kind="stagger" className="mt-14 grid gap-px overflow-hidden rounded-lg bg-line md:grid-cols-2">
            {about.principles.items.map((p) => (
              <div key={p.n} className="bg-ground p-8 md:p-10">
                <span className="font-body text-20 text-ink-3">{p.n}</span>
                <h3 className="h-card mt-6 max-w-[18ch]">{p.title}</h3>
                <p className="mt-4 font-body text-20 leading-[1.6] text-ink-2">
                  {p.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Workshops */}
      <section className="relative z-10 bg-warm section-y">
        <div className="container-page">
          <Reveal>
            <Eyebrow>{about.workshops.eyebrow}</Eyebrow>
            <Split heading={about.workshops.heading} className="mt-7 max-w-[14ch]" />
          </Reveal>

          <Reveal kind="stagger" className="mt-14 grid gap-6 md:grid-cols-2">
            {about.workshops.items.map((w) => (
              <article
                key={w.place}
                className="overflow-hidden rounded-lg bg-ground"
              >
                <Media
                  slot={w.image}
                  width={708}
                  height={531}
                  className="aspect-[4/3]"
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <div className="p-8">
                  <span className="label">{w.place}</span>
                  <h3 className="h-card mt-4">{w.title}</h3>
                  <p className="mt-4 font-body text-20 leading-[1.6] text-ink-2">
                    {w.body}
                  </p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Team — roles, no faces */}
      <section className="relative z-10 bg-ground section-y">
        <div className="container-page">
          <Reveal>
            <Eyebrow>{about.team.eyebrow}</Eyebrow>
            <div className="mt-7 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
              <Split heading={about.team.heading} className="max-w-[15ch]" />
              <p className="font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-right">
                {about.team.note}
              </p>
            </div>
          </Reveal>

          <Reveal kind="stagger" className="mt-12 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 md:grid-cols-5">
            {about.team.roles.map((r) => (
              <div key={r.role} className="bg-ground p-7">
                <p className="numeral text-ink">{r.count}</p>
                <p className="mt-3 label">{r.role}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-24 text-center">
            <Split
              heading={about.closing.heading}
              className="mx-auto max-w-[18ch]"
            />
            <p className="mx-auto mt-6 max-w-[46ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
              {about.closing.body}
            </p>
          </Reveal>
        </div>
      </section>

      <Closer />
    </>
  );
}
