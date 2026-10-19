import { faq } from "@/content/home";
import { Eyebrow, Split } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export function Faq({
  data = faq,
  className = "bg-ground",
}: {
  data?: typeof faq;
  className?: string;
}) {
  return (
    <section id="faq" className={`relative z-10 section-y ${className}`}>
      <div className="container-page">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow center>{data.eyebrow}</Eyebrow>
          <Split heading={data.heading} className="mt-7" />
          <p className="mt-7 max-w-[52ch] font-body text-14 uppercase leading-normal tracking-[-0.02em] text-ink-2 md:text-16">
            {data.body}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-14 max-w-210">
          <Accordion items={data.items} />
        </Reveal>
      </div>
    </section>
  );
}
