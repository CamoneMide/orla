import Link from "next/link";
import { cn } from "@/lib/utils";
import { RollText } from "./RollText";

/**
 * The original's buttons are pills: 999px radius, an uppercase Abel label at
 * 14px, and a small chevron glyph on the right. Solid is ink-on-white text,
 * ghost is white with ink text. On hover the label rolls up character by
 * character and the chevron swaps out to the right (see `.roll` in
 * globals.css); the original's lift was dropped on request.
 */
export function Button({
  href,
  children,
  variant = "solid",
  className,
  type,
  disabled,
  onClick,
}: {
  href?: string;
  children: string;
  variant?: "solid" | "ghost" | "light";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-round px-6 py-3.5 font-body text-14 uppercase tracking-[-0.02em] " +
    "transition-[background-color,color,border-color] duration-[350ms] ease-[var(--ease-quint)] " +
    "disabled:opacity-45 disabled:pointer-events-none";

  const skin =
    variant === "solid"
      ? "bg-black text-on-dark hover:bg-black"
      : variant === "light"
        ? "bg-ground text-ink hover:bg-ground"
        : "bg-ground text-ink border border-line hover:border-ink";

  const inner = (
    <>
      <RollText text={children} />
      <Chevron />
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={cn(base, skin, className)}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cn(base, skin, className)}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      className={cn(base, skin, className)}
    >
      {inner}
    </button>
  );
}

function Chevron() {
  return (
    <span aria-hidden="true" className="roll-icon h-2.5 w-2.5 shrink-0">
      <ChevronGlyph />
      <ChevronGlyph />
    </span>
  );
}

function ChevronGlyph() {
  return (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
      <path d="M2 2h2v2H2V2Zm3 3h2v2H5V5Zm3 3h2v2H8V8Z" fill="currentColor" />
      <path d="M2 8h2v2H2V8Zm3-3h2v2H5V5Zm3-3h2v2H8V2Z" fill="currentColor" />
    </svg>
  );
}
