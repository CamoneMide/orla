import type { MetadataRoute } from "next";
import { product } from "@/config/product";
import { cases } from "@/content/cases";
import { legal } from "@/content/legal";

/**
 * Every content route. Dynamic ones come from the same content modules their
 * pages are generated from, so a new case study or legal page is listed
 * without touching this file. /404-preview is left out: it is noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/cases",
    ...cases.map((c) => `/cases/${c.slug}`),
    "/updates",
    "/waitlist",
    "/contact",
    ...legal.map((d) => `/legal/${d.slug}`),
  ];
  return paths.map((path) => ({
    url: `${product.url}${path === "/" ? "" : path}`,
  }));
}
