import type { Metadata } from "next";
import { NotFoundView } from "@/components/sections/NotFoundView";

/**
 * The original links its 404 from the footer's legal column, so the page is
 * reachable without breaking something. This route renders the same view at a
 * real URL; `not-found.tsx` still serves genuine 404s.
 */
export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: true },
};

export default function NotFoundPreview() {
  return <NotFoundView />;
}
