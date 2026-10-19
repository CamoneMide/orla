import type { Metadata } from "next";
import Link from "next/link";

import { index, cases, upcoming } from "@/content/cases";
import { PageHead } from "@/components/sections/PageHead";
import { Closer } from "@/components/sections/Closer";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "Room by room: what the lamp actually does in a kitchen, an evening and an entryway.",
};

export default function CasesPage() {
  return (
    <>
      <PageHead
        eyebrow={index.eyebrow}
        heading={index.heading}
        aside={index.aside}
      />

      <section className="relative z-10 bg-ground pb-8 pt-14">
        <div className="container-page">
          <Reveal kind="stagger" className="flex flex-col gap-6">
            {cases.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group grid overflow-hidden rounded-lg bg-warm md:grid-cols-[1fr_auto] md:items-stretch"
              >
                <div className="flex flex-col justify-between gap-10 p-8 md:min-h-[560px] md:p-12">
                  <span
                    className="grid h-6 w-6 place-items-center"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 12 12" className="h-3.5 w-3.5">
                      <g fill="#262626">
                        <rect x="0" y="0" width="3" height="3" rx="0.7" />
                        <rect x="7" y="2" width="3" height="3" rx="0.7" />
                        <rect x="0" y="7" width="3" height="3" rx="0.7" />
                        <rect x="7" y="9" width="3" height="3" rx="0.7" />
                      </g>
                    </svg>
                  </span>

                  <div>
                    <h2 className="h-section">{c.room}</h2>
                    <p className="mt-3 font-display text-24 font-medium text-ink md:text-32">
                      {c.title}
                    </p>
                    <p className="mt-6 max-w-[46ch] border-t border-line pt-4 font-body text-14 tracking-[-0.02em] text-ink-2">
                      {c.standfirst}
                    </p>
                  </div>
                </div>

                <div className="p-4 md:w-[600px] md:p-6">
                  <Media
                    slot={c.hero}
                    width={567}
                    height={446}
                    className="aspect-[567/446] h-full rounded-md"
                    imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                    sizes="(max-width: 900px) 100vw, 45vw"
                  />
                </div>
              </Link>
            ))}

            {upcoming.map((c) => (
              <article
                key={c.room}
                className="grid overflow-hidden rounded-lg bg-warm md:grid-cols-[1fr_auto] md:items-stretch"
              >
                <div className="flex flex-col justify-between gap-10 p-8 md:min-h-[560px] md:p-12">
                  <span className="micro rounded-round border border-line px-2.5 py-1 text-ink-3 md:self-start">
                    {c.note}
                  </span>
                  <div>
                    <h2 className="h-section">{c.room}</h2>
                    <p className="mt-3 font-display text-24 font-medium text-ink md:text-32">
                      {c.title}
                    </p>
                    <p className="mt-6 max-w-[46ch] border-t border-line pt-4 font-body text-14 tracking-[-0.02em] text-ink-2">
                      {c.standfirst}
                    </p>
                  </div>
                </div>

                <div className="p-4 md:w-[600px] md:p-6">
                  <Media
                    slot={c.hero}
                    width={567}
                    height={446}
                    className="aspect-[567/446] h-full rounded-md"
                    sizes="(max-width: 900px) 100vw, 45vw"
                  />
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <Closer />
    </>
  );
}
