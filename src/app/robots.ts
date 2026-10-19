import type { MetadataRoute } from "next";
import { product } from "@/config/product";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${product.url}/sitemap.xml`,
  };
}
