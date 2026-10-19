import type { Metadata } from "next";

import { waitlist } from "@/content/forms";
import { faq } from "@/content/home";
import { Faq } from "@/components/sections/Faq";
import { Closer } from "@/components/sections/Closer";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Eyebrow, Split } from "@/components/ui/Type";
import { DemoForm } from "@/components/forms/DemoForm";
import { Countdown, LaunchLabel } from "@/components/ui/Countdown";

export const metadata: Metadata = {
  title: "Waitlist",
  description:
    "Ask for a place in the private beta. A small number of homes each round.",
};

export default function WaitlistPage() {
  return (
    <>
      <section className="relative z-10 bg-warm pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="container-page">
          <Reveal className="grid gap-12 md:grid-cols-[340px_1fr] md:gap-16">
            <Media
              slot={waitlist.image}
              width={478}
              height={818}
              className="hidden aspect-[478/818] rounded-lg md:block"
              sizes="30vw"
            />

            <div>
              <div className="flex flex-wrap items-center gap-6">
                <Eyebrow>{waitlist.eyebrow}</Eyebrow>
                <span className="label text-ink-3">{waitlist.eyebrowMeta}</span>
              </div>

              <Split
                heading={waitlist.heading}
                as="h1"
                className="mt-7 max-w-[16ch]"
              />

              <p className="mt-6 max-w-[52ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2 md:text-16">
                {waitlist.body}
              </p>

              <div className="mt-10 max-w-[620px]">
                <DemoForm
                  fields={waitlist.fields}
                  submitLabel={waitlist.submit}
                  note={waitlist.note}
                  success={waitlist.success}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Dark figures band */}
      <section className="relative z-10 bg-ink py-16">
        <div className="container-page">
          <Reveal className="grid gap-10 md:grid-cols-3">
            {waitlist.figures.map((f, i) => (
              <div
                key={f.label}
                className={`text-center ${
                  i ? "md:border-l md:border-white/15" : ""
                }`}
              >
                <p className="numeral text-on-dark">
                  {f.value}
                  {"unit" in f && f.unit ? (
                    <span className="font-body text-forty text-on-dark-2">
                      {" "}
                      {f.unit}
                    </span>
                  ) : null}
                </p>
                <p className="mt-3 label text-on-dark-2">{f.label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-14 flex flex-col items-center gap-4 border-t border-white/15 pt-10">
            <LaunchLabel className="label text-on-dark-2" />
            <Countdown tone="dark" />
          </Reveal>
        </div>
      </section>

      <Faq data={faq} className="bg-ground" />
      <Closer />
    </>
  );
}
