import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { cases, getCase } from "@/content/cases";
import { Closer } from "@/components/sections/Closer";
import { Faq } from "@/components/sections/Faq";
import { faq } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Eyebrow, Split } from "@/components/ui/Type";
import { Parallax } from "@/components/ui/Parallax";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return { title: c.room, description: c.standfirst };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const others = cases.filter((x) => x.slug !== c.slug);

  return (
    <>
      {/* Full-bleed hero with the title over it */}
      <section className="relative z-10 h-[70svh] min-h-[440px] w-full overflow-hidden">
        <Parallax amount={0.1}>
          <Image
            src={`/orla-product-images/${c.hero.key}.webp`}
            alt={c.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/35" />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <h1 className="h-display max-w-[14ch] text-center text-on-dark">
            {c.title}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="relative z-10 bg-ground section-y">
        <div className="container-page">
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <Split heading={c.intro.heading} className="mt-8 max-w-[16ch]" />
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <p className="font-body text-20 leading-[1.6] text-ink-2">
                {c.intro.body}
              </p>
              <p className="font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-right">
                {c.intro.aside}
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-16">
            <dl className="grid gap-px overflow-hidden rounded-lg bg-line md:grid-cols-4">
              {c.facts.map((f) => (
                <div key={f.k} className="bg-ground p-6">
                  <dt className="label">{f.k}</dt>
                  <dd className="mt-3 font-display text-24 font-medium text-ink">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Numbered sections */}
      <section className="relative z-10 bg-warm section-y">
        <div className="container-page flex flex-col gap-20 md:gap-28">
          {c.sections.map((s, i) => (
            <Reveal
              key={s.n}
              className={`grid items-center gap-10 md:grid-cols-2 ${
                i % 2 ? "md:[&>figure]:order-first" : ""
              }`}
            >
              <div>
                <span className="font-body text-20 text-ink-3">{s.n}</span>
                <h2 className="h-sub mt-5 max-w-[16ch]">{s.title}</h2>
                <p className="mt-6 max-w-[46ch] font-body text-20 leading-[1.6] text-ink-2">
                  {s.body}
                </p>
              </div>

              {s.image ? (
                <figure>
                  <Media
                    slot={s.image}
                    width={696}
                    height={522}
                    className="aspect-[4/3] rounded-lg"
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </figure>
              ) : (
                <figure className="rounded-lg bg-ground p-10">
                  <blockquote className="font-display text-24 italic leading-[1.4] text-ink md:text-32">
                    {c.pull}
                  </blockquote>
                </figure>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing statement */}
      <section className="relative z-10 bg-ground section-y">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="h-section mx-auto max-w-[18ch]">
              {c.closing.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
              {c.closing.body}
            </p>
          </Reveal>

          <Reveal kind="stagger" className="mt-16 grid gap-6 md:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/cases/${o.slug}`}
                className="group overflow-hidden rounded-lg border border-line text-left"
              >
                <Media
                  slot={o.hero}
                  width={448}
                  height={320}
                  className="aspect-[448/320]"
                  imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <div className="p-6">
                  <span className="label">{o.room}</span>
                  <p className="mt-2 font-display text-24 font-medium text-ink">
                    {o.title}
                  </p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <Faq data={faq} className="bg-warm" />
      <Closer />
    </>
  );
}
