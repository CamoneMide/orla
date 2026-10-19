import { materials, inside } from "@/content/home";
import { Eyebrow, Split } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";

export function Materials() {
  return (
    <section id="spec" className="relative z-10 bg-ground section-y">
      <div className="container-page">
        <Reveal>
          <Eyebrow>{materials.eyebrow}</Eyebrow>
          <Split heading={materials.heading} className="mt-8 max-w-[18ch]" />
          <p className="mt-7 max-w-[54ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
            {materials.body}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {materials.chips.map((c) => (
              <li
                key={c}
                className="rounded-round border border-line bg-cool px-4 py-2 font-body text-12 uppercase tracking-[-0.02em] text-ink-2"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-10">
          <Reveal>
            <dl className="w-full">
              {materials.spec.map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[minmax(90px,1fr)_2fr] gap-6 border-b border-line py-4"
                >
                  <dt className="label">{row.k}</dt>
                  <dd className="font-body text-14 uppercase tracking-[-0.02em] text-ink">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex gap-3">
              {materials.swatches.map((s) => (
                <figure key={s.key} className="flex-1">
                  <Media
                    slot={s}
                    width={164}
                    height={112}
                    className="aspect-[164/112] rounded-md"
                    sizes="20vw"
                    // The felt grain is the subject; AVIF at the default 75
                    // smooths it away. Not `unoptimized`: the master is
                    // 1264px and ~500KB for a 164px tile.
                    quality={95}
                  />
                  <figcaption className="micro mt-2.5 text-ink-3">
                    {s.label}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-6 max-w-[42ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2">
              {materials.stripNote}
            </p>
          </Reveal>
        </div>

        {/* "Simple to live with" */}
        <Reveal className="mt-28 md:mt-36">
          <Eyebrow>{inside.eyebrow}</Eyebrow>
          <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
            <Split heading={inside.heading} className="max-w-[15ch]" />
            <p className="font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-right md:text-16">
              {inside.aside}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[44ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
              {inside.body}
            </p>
            <Button href={inside.cta.href}>{inside.cta.label}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
