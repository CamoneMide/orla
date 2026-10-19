import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { legal, getLegal } from "@/content/legal";
import { Closer } from "@/components/sections/Closer";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return legal.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegal(slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.standfirst };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegal(slug);
  if (!doc) notFound();

  return (
    <>
      <section className="relative z-10 bg-ground pt-40 pb-20 md:pt-48">
        <div className="container-page">
          <Reveal>
            <p className="label">Legal</p>
            <h1 className="h-section mt-6 max-w-[16ch]">{doc.title}</h1>
            <p className="mt-6 max-w-[52ch] font-body text-20 leading-[1.6] text-ink-2">
              {doc.standfirst}
            </p>
            <p className="mt-6 micro text-ink-3">
              Last updated {formatDate(doc.updated)}
            </p>
          </Reveal>

          <Reveal className="mt-16 max-w-[var(--container-measure)]">
            {doc.sections.map((s) => (
              <section key={s.h} className="border-t border-line py-8">
                <h2 className="h-card max-w-[20ch]">{s.h}</h2>
                {s.p.map((p, i) => (
                  <p
                    key={i}
                    className="mt-4 font-body text-20 leading-[1.6] text-ink-2"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </Reveal>
        </div>
      </section>

      <Closer />
    </>
  );
}
