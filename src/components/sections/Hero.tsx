import Image from "next/image";
import { hero } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { SplitOnDark } from "@/components/ui/Type";
import { Parallax } from "@/components/ui/Parallax";
import heroImg from "../../../public/orla-product-images/product.webp";
/**
 * The hero is `position: sticky` at the top of the document — the next section
 * scrolls up over it rather than pushing it away. Measured on the original,
 * where the hero section is sticky/top:0 at a full viewport height.
 */
export function Hero() {
  return (
    <section className="sticky top-0 z-0 h-svh w-full overflow-hidden">
      <Parallax range="cover" amount={0.08}>
        <Image
          src={heroImg}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          // eases out of a slight zoom as the page curtain lifts (PageCurtain).
          // The zoom is on the image and the drift on its wrapper, so the two
          // compose instead of fighting over one transform.
          data-enter="zoom"
        />
      </Parallax>
      {/* The original keeps its hero legible with a soft top-down scrim */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,16,12,0.42) 0%, rgba(20,16,12,0.12) 42%, rgba(20,16,12,0.30) 100%)",
        }}
      />

      <div
        data-reveal="stagger"
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <div className="mb-6 flex items-center gap-2.5">
          <span className="grid h-5 w-5 place-items-center rounded-sm bg-ground">
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden="true">
              <g fill="#262626">
                <rect x="1" y="1" width="2.6" height="2.6" rx="0.6" />
                <rect x="6.4" y="2.6" width="2.6" height="2.6" rx="0.6" />
                <rect x="1" y="6.4" width="2.6" height="2.6" rx="0.6" />
              </g>
            </svg>
          </span>
          <span className="font-display text-16 text-on-dark md:text-24">
            {hero.badge}
          </span>
        </div>

        <SplitOnDark
          heading={hero.heading}
          as="h1"
          className="max-w-[16ch] text-balance"
        />

        <p className="mt-7 max-w-[52ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-on-dark-3 md:text-18">
          {hero.body}
        </p>

        <div className="mt-9 flex flex-col items-center gap-3.5 sm:flex-row">
          <Button href={hero.ctas[0].href} variant="solid">
            {hero.ctas[0].label}
          </Button>
          <Button href={hero.ctas[1].href} variant="light">
            {hero.ctas[1].label}
          </Button>
        </div>
      </div>
    </section>
  );
}
