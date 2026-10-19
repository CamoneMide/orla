import { product } from "@/config/product";
import { cn } from "@/lib/utils";

/**
 * The wordmark is drawn, not set — geometric lowercase with a single
 * continuous bowl, so it reads as a mark rather than as a font choice.
 */
export function Wordmark({
  className,
  tone = "light",
  withMark = true,
}: {
  className?: string;
  tone?: "light" | "dark";
  withMark?: boolean;
}) {
  const fill = tone === "light" ? "currentColor" : "currentColor";
  return (
    <span
      className={cn("inline-flex items-start gap-[0.15em]", className)}
      aria-label={product.name}
      role="img"
    >
      <svg
        viewBox="0 0 132 44"
        fill="none"
        className="h-[1em] w-auto"
        aria-hidden="true"
      >
        <g fill={fill}>
          {/* o */}
          <path
            fillRule="evenodd"
            d="M20 6c9.94 0 18 8.06 18 18s-8.06 18-18 18S2 33.94 2 24 10.06 6 20 6Zm0 7c-6.08 0-11 4.92-11 11s4.92 11 11 11 11-4.92 11-11-4.92-11-11-11Z"
          />
          {/* r */}
          <path d="M46 41V7h7v4.6C55.2 8.4 58.6 6.6 63 6.6V14c-6.4 0-10 3.4-10 10.4V41h-7Z" />
          {/* l */}
          <path d="M70 41V0h7v41h-7Z" />
          {/* a */}
          <path
            fillRule="evenodd"
            d="M112 41v-4.2c-2.6 3.2-6.4 5.2-11 5.2-9.4 0-17-8.06-17-18S91.6 6 101 6c4.6 0 8.4 2 11 5.2V7h7v34h-7Zm-11-6c6.08 0 11-4.92 11-11s-4.92-11-11-11-11 4.92-11 11 4.92 11 11 11Z"
          />
        </g>
      </svg>
      {withMark && product.markSuffix ? (
        <span className="font-body text-[0.3em] leading-none pt-[0.15em] opacity-70">
          {product.markSuffix}
        </span>
      ) : null}
    </span>
  );
}
