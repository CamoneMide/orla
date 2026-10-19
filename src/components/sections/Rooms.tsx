import Link from "next/link";
import { rooms } from "@/content/home";
import { Eyebrow, Split } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";

export function Rooms() {
  return (
    <section className="relative z-10 bg-ground section-y">
      <div className="container-page">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow center>{rooms.eyebrow}</Eyebrow>
          <Split heading={rooms.heading} className="mt-7" />
          <p className="mt-7 max-w-[54ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
            {rooms.body}
          </p>
        </Reveal>

        <Reveal
          kind="stagger"
          className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3"
        >
          {rooms.cards.map((c) => (
            <article
              key={c.title}
              className="group flex flex-col overflow-hidden rounded-lg border border-line bg-ground"
            >
              <div className="relative">
                <Media
                  slot={c.image!}
                  width={567}
                  height={446}
                  className="aspect-[567/446]"
                  imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-ink px-2.5 py-1.5 font-body text-12 uppercase tracking-[-0.02em] text-on-dark">
                  {c.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="h-card max-w-[16ch]">{c.title}</h3>
                <p className="mt-4 flex-1 font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2">
                  {c.body}
                </p>

                <div className="mt-8 flex items-end justify-between gap-4 border-t border-line pt-4">
                  <span className="micro text-ink-3">{c.foot}</span>
                  <Link
                    href={c.cta!.href}
                    className="font-display text-16 text-ink transition-opacity duration-200 hover:opacity-60"
                  >
                    {c.cta!.label} →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal className="mt-16 flex flex-col items-center text-center">
          <p className="max-w-[46ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
            {rooms.body}
          </p>
          <Button href={rooms.cta.href} className="mt-7">
            {rooms.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
