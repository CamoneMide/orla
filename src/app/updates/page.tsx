import type { Metadata } from "next";

import { updates } from "@/content/updates";
import { PageHead } from "@/components/sections/PageHead";
import { Closer } from "@/components/sections/Closer";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Updates",
  description: "Firmware releases and workshop decisions, posted roughly monthly.",
};

export default function UpdatesPage() {
  return (
    <>
      <PageHead
        eyebrow={updates.eyebrow}
        heading={updates.heading}
        aside={updates.aside}
        body={updates.body}
      />

      <section className="relative z-10 bg-ground pt-16 pb-8">
        <div className="container-page">
          <Reveal kind="stagger" className="flex flex-col">
            {updates.posts.map((p) => (
              <article
                key={p.slug}
                className="grid gap-8 border-t border-line py-10 md:grid-cols-[160px_1fr_536px] md:items-start md:gap-10"
              >
                <div className="flex flex-col gap-2">
                  <time className="label" dateTime={p.date}>
                    {formatDate(p.date)}
                  </time>
                  <span className="micro rounded-round border border-line px-2.5 py-1 text-ink-3 md:self-start">
                    {p.tag}
                  </span>
                </div>

                <div>
                  <h2 className="h-card max-w-[20ch]">{p.title}</h2>
                  <p className="mt-4 max-w-[52ch] font-body text-20 leading-[1.6] text-ink-2">
                    {p.body}
                  </p>
                </div>

                <Media
                  slot={p.image}
                  width={536}
                  height={400}
                  className="aspect-[536/400] rounded-lg"
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <Closer />
    </>
  );
}
