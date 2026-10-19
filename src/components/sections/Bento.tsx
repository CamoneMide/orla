import { bento } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Type";
import { CountUp } from "@/components/ui/CountUp";
import { Parallax } from "@/components/ui/Parallax";

/**
 * The mosaic. Each tile declares its own `kind` in the content module, so the
 * grid can be rearranged by editing content rather than JSX.
 */
export function Bento() {
  return (
    <section className="relative z-10 bg-ground pb-20 md:pb-32">
      <div className="container-page">
        <Reveal
          kind="stagger"
          className="grid auto-rows-[minmax(300px,auto)] gap-6 md:grid-cols-3"
        >
          {bento.tiles.map((t, i) => (
            <Tile key={i} tile={t} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

type Tile = (typeof bento.tiles)[number];

function Tile({ tile }: { tile: Tile }) {
  const shell =
    "relative flex flex-col overflow-hidden rounded-lg border border-line";

  switch (tile.kind) {
    case "dark":
      return (
        <article className={`${shell} border-transparent bg-ink p-8`}>
          <h3 className="h-card text-center text-on-dark">{tile.title}</h3>
          <p className="mx-auto mt-4 max-w-[32ch] text-center font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-on-dark-2">
            {tile.body}
          </p>
          {tile.image && (
            <Media
              slot={tile.image}
              width={480}
              height={360}
              className="mt-auto aspect-[4/3] rounded-md"
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          )}
        </article>
      );

    case "stat":
      return (
        <article className={`${shell} bg-warm p-8`}>
          {tile.tag && <span className="label">{tile.tag}</span>}
          <h3 className="h-card mt-4 max-w-[14ch]">{tile.title}</h3>
          <div className="mt-auto flex items-end justify-between gap-6 pt-10">
            <div>
              <p className="numeral text-ink">
                <CountUp value={tile.value!} />
                <span className="font-body text-forty text-ink-3">{tile.unit}</span>
              </p>
              <p className="mt-3 max-w-[30ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2">
                {tile.body}
              </p>
            </div>
            {tile.image && (
              <Media
                slot={tile.image}
                width={160}
                height={172}
                className="hidden w-[110px] shrink-0 rounded-md md:block"
                sizes="120px"
              />
            )}
          </div>
        </article>
      );

    case "figure":
      return (
        <article className={`${shell} bg-cool`}>
          {tile.image && (
            <Media
              slot={tile.image}
              width={480}
              height={360}
              className="absolute inset-0 h-full w-full"
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          )}
          <div className="relative z-10 mt-auto p-7">
            <p className="numeral text-ink">
              <CountUp value={tile.value!} />
              <span className="font-body text-forty text-ink-3">{tile.unit}</span>
            </p>
            <p className="mt-2 max-w-[22ch] font-body text-14 uppercase leading-[1.4] tracking-[-0.02em] text-ink-2">
              {tile.body}
            </p>
          </div>
        </article>
      );

    case "caption":
      return (
        <article className={`${shell} border-transparent`}>
          {tile.image && (
            <Parallax amount={0.05}>
              <Media
                slot={tile.image}
                width={480}
                height={620}
                className="absolute inset-0 h-full w-full"
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            </Parallax>
          )}
          <div className="relative z-10 mt-auto bg-gradient-to-t from-black/60 to-transparent p-7 pt-16">
            <h3 className="font-display text-24 font-medium text-on-dark">
              {tile.title}
            </h3>
            <p className="mt-2 max-w-[26ch] font-body text-14 uppercase leading-[1.4] tracking-[-0.02em] text-on-dark-3">
              {tile.body}
            </p>
          </div>
        </article>
      );

    case "review":
      return (
        <article className={`${shell} bg-ground p-7`}>
          <div className="flex items-center justify-between">
            <span className="label">{tile.tag}</span>
            <span className="micro rounded-round border border-line px-2.5 py-1 text-ink-3">
              {tile.label}
            </span>
          </div>
          <blockquote className="mt-8 font-display text-20 italic leading-[1.55] text-ink-2">
            {tile.quote}
          </blockquote>
          <p className="mt-auto pt-8 label text-ink-3">{tile.attribution}</p>
        </article>
      );

    case "cta":
      return (
        <article className={`${shell} bg-warm p-8 text-center`}>
          <Eyebrow center>Reserve</Eyebrow>
          <h3 className="h-card mt-5">{tile.title}</h3>
          <p className="mt-3 font-body text-14 uppercase tracking-[-0.02em] text-ink-2">
            {tile.body}
          </p>
          <div className="mt-7 flex justify-center">
            <Button href={tile.cta!.href}>{tile.cta!.label}</Button>
          </div>
          {tile.image && (
            <Media
              slot={tile.image}
              width={480}
              height={300}
              className="mt-auto aspect-[8/5] rounded-md"
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          )}
        </article>
      );

    case "image":
      return (
        <article className={`${shell} border-transparent`}>
          {tile.image && (
            <Parallax amount={0.05}>
              <Media
                slot={tile.image}
                width={480}
                height={420}
                className="absolute inset-0 h-full w-full"
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            </Parallax>
          )}
          {tile.title && (
            <div className="relative z-10 mt-auto bg-gradient-to-t from-black/55 to-transparent p-7 pt-14">
              <h3 className="font-display text-24 font-medium text-on-dark">
                {tile.title}
              </h3>
              {tile.body && (
                <p className="mt-2 font-body text-14 uppercase tracking-[-0.02em] text-on-dark-3">
                  {tile.body}
                </p>
              )}
            </div>
          )}
        </article>
      );

    default:
      return (
        <article className={`${shell} bg-cool p-8`}>
          {tile.tag && <span className="label">{tile.tag}</span>}
          <h3 className="h-card mt-4 max-w-[15ch]">{tile.title}</h3>
          <p className="mt-4 max-w-[34ch] font-body text-14 uppercase leading-[1.5] tracking-[-0.02em] text-ink-2">
            {tile.body}
          </p>
          {tile.image && (
            <Media
              slot={tile.image}
              width={420}
              height={300}
              className="mt-auto aspect-[7/5] rounded-md"
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          )}
        </article>
      );
  }
}
