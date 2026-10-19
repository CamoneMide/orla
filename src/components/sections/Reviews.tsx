import { reviews, outro } from "@/content/home";
import { Eyebrow, Split } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ClosingPlate } from "@/components/sections/Closer";

/**
 * The original runs named testimonials with portraits here. Those are real
 * people who agreed to appear on someone else's site, and inventing
 * replacements would be fabricating evidence — so these are unattributed and
 * labelled as such. See BRIEF.md.
 */
export function Reviews() {
  return (
    <>
      <section className="relative z-10 bg-warm section-y">
        <div className="container-page">
          <Reveal>
            <Eyebrow>{reviews.eyebrow}</Eyebrow>
            <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
              <Split heading={reviews.heading} className="max-w-[16ch]" />
              <div className="md:text-right">
                <p className="font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
                  {reviews.aside}
                </p>
                <div className="mt-6 flex md:justify-end">
                  <Button href={reviews.cta.href}>{reviews.cta.label}</Button>
                </div>
              </div>
            </div>
            <p className="mt-7 max-w-[46ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2">
              {reviews.body}
            </p>
          </Reveal>

          <Reveal kind="stagger" className="mt-14 grid gap-6 md:grid-cols-2">
            {reviews.items.map((r) => (
              <figure
                key={r.quote}
                className="flex flex-col rounded-lg border border-line bg-ground p-8"
              >
                <blockquote className="font-display text-20 italic leading-[1.55] text-ink md:text-22">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-auto pt-8 label text-ink-3">
                  {r.meta}
                </figcaption>
              </figure>
            ))}
          </Reveal>

          <Reveal className="mt-8">
            <p className="micro text-ink-3">{reviews.disclaimer}</p>
          </Reveal>
        </div>
      </section>

      <ClosingPlate image={outro.image} />
    </>
  );
}
