import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

/**
 * Marks a block for the site-wide reveal system (see lib/useReveal).
 * Server-rendered — the elements exist in the HTML, and only their entry is
 * driven by JS, so the page is complete with scripts disabled.
 */
export function Reveal({
  children,
  kind = "up",
  delay,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  kind?: "up" | "clip" | "stagger" | "wipe";
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      data-reveal={kind}
      data-reveal-delay={delay}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
