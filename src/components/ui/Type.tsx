import { cn } from "@/lib/utils";
import type { SplitHeading } from "@/content/types";

/**
 * The small pill-and-label pair that opens nearly every section in the
 * original: a rounded ink square holding a four-dot glyph, then an uppercase
 * Abel label.
 */
export function Eyebrow({
  children,
  className,
  tone = "dark",
  center,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        center && "justify-center",
        className,
      )}
    >
      <span
        className={cn(
          "grid h-5 w-5 shrink-0 place-items-center rounded-sm",
          tone === "dark" ? "bg-ink" : "bg-ground",
        )}
        aria-hidden="true"
      >
        <Dots tone={tone} />
      </span>
      <span
        className={cn(
          "label",
          tone === "dark" ? "text-ink-2" : "text-on-dark-2",
        )}
      >
        {children}
      </span>
    </div>
  );
}

function Dots({ tone }: { tone: "dark" | "light" }) {
  const f = tone === "dark" ? "#ffffff" : "#262626";
  return (
    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden="true">
      <g fill={f}>
        <rect x="1" y="1" width="2.6" height="2.6" rx="0.6" />
        <rect x="6.4" y="2.6" width="2.6" height="2.6" rx="0.6" />
        <rect x="1" y="6.4" width="2.6" height="2.6" rx="0.6" />
        <rect x="4.4" y="5.2" width="2" height="2" rx="0.5" opacity="0.6" />
      </g>
    </svg>
  );
}

/**
 * Headings in the original are two-tone: the first clause in ink, the rest in
 * the muted tone. Exactly one word per page may take the accent, set italic.
 */
export function Split({
  heading,
  className,
  as: Tag = "h2",
}: {
  heading: SplitHeading;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={cn("h-section text-ink", className)}>
      {heading.lead}
      {heading.accent ? (
        <>
          {" "}
          <em className="font-display font-medium italic text-accent [text-shadow:0_0_1px_rgba(0,0,0,0.18)]">
            {heading.accent}
          </em>
        </>
      ) : null}
      {heading.trail ? <span className="text-ink-3"> {heading.trail}</span> : null}
    </Tag>
  );
}

/** Same split, but tuned for dark panels where the accent stays legible. */
export function SplitOnDark({
  heading,
  className,
  as: Tag = "h1",
}: {
  heading: SplitHeading;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag className={cn("h-display text-on-dark", className)}>
      {heading.lead}
      {heading.accent ? (
        <>
          {" "}
          <em className="font-display font-medium italic text-accent">
            {heading.accent}
          </em>
        </>
      ) : null}
      {heading.trail ? <> {heading.trail}</> : null}
    </Tag>
  );
}

export function Body({
  children,
  className,
  size = "base",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "base" | "lg";
}) {
  return (
    <p
      className={cn(
        "font-body uppercase text-ink-2",
        size === "lg" ? "text-20" : "text-16",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Sentence-case running prose, used inside cards and articles. */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("font-body text-20 leading-[1.6] text-ink-2", className)}>
      {children}
    </p>
  );
}
