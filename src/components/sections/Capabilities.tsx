import { capabilities } from "@/content/home";
import { Eyebrow, Split } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";

export function Capabilities() {
  return (
    <section className="relative z-10 bg-cool section-y">
      <div className="container-page">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow center>{capabilities.eyebrow}</Eyebrow>
          <Split
            heading={capabilities.heading}
            className="mt-7 max-w-[14ch] text-balance"
          />
          <p className="mt-7 max-w-[62ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
            {capabilities.body}
          </p>
        </Reveal>

        <Reveal
          kind="stagger"
          className="mt-20 grid gap-px overflow-hidden rounded-lg bg-line md:mt-28 md:grid-cols-2"
        >
          {capabilities.steps.map((s) => (
            <div key={s.n} className="bg-ground p-8 md:p-10">
              <span className="font-body text-20 text-ink-3">{s.n}</span>
              <h3 className="h-card mt-6">{s.title}</h3>
              <p className="mt-4 font-body text-20 leading-[1.6] text-ink-2">
                {s.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
