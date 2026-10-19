import { Eyebrow, Split } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";
import type { SplitHeading } from "@/content/types";

/** The standard interior-page opening: eyebrow, split heading, right-hand aside. */
export function PageHead({
  eyebrow,
  heading,
  aside,
  body,
}: {
  eyebrow?: string;
  heading: SplitHeading;
  aside?: string;
  body?: string;
}) {
  return (
    <section className="relative z-10 bg-ground pt-40 pb-4 md:pt-48">
      <div className="container-page">
        <Reveal kind="stagger">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <div className="mt-8 grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
            <Split heading={heading} as="h1" className="max-w-[16ch]" />
            {aside && (
              <p className="font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-right md:text-16">
                {aside}
              </p>
            )}
          </div>
          {body && (
            <p className="mt-7 max-w-[54ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
              {body}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
