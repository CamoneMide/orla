import type { Metadata } from "next";
import { DM_Sans, Abel, Fragment_Mono } from "next/font/google";
import "./globals.css";

import { product } from "@/config/product";
import { Providers } from "@/components/system/Providers";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { PageCurtain } from "@/components/system/PageCurtain";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";

/**
 * Three faces, matching the original's three.
 *
 * Display is DM Sans — the original sets its headings in Google Sans 500 with a
 * true italic, which is Google's proprietary brand face and not licensable.
 * Abel and Fragment Mono are the original's own faces and are both OFL, so they
 * are kept exactly. Weights are held to 400/500: the design has no bold axis.
 */
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const abel = Abel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abel",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(product.url),
  title: {
    default: `${product.name} — One light, done right.`,
    template: `%s — ${product.name}`,
  },
  description: product.summary,
  openGraph: {
    title: `${product.name} — One light, done right.`,
    description: product.summary,
    type: "website",
    siteName: product.name,
  },
  // The image itself comes from app/opengraph-image.jpg (a static file, not
  // next/og); X falls back to og:image for the picture.
  twitter: { card: "summary_large_image" },
  // Icons come from the file conventions in this folder (favicon.ico,
  // icon.svg, apple-icon.png). Declaring `icons` here would override them, and
  // drop the apple-touch-icon.
};

/**
 * Sets `js-ready` before first paint, using the same predicate the reveal
 * system uses. Without it the finished page paints, then gets snatched back
 * to its pre-animation state at hydration — a visible flash.
 */
const READY = `(function(){try{var q=new URLSearchParams(location.search);
var skip=q.get('ready')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!skip)document.documentElement.classList.add('js-ready');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${abel.variable} ${fragmentMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: READY }} />
      </head>
      <body>
        <Providers>
          <SmoothScroll />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-on-dark focus:px-4 focus:py-2 focus:rounded-md"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <PageCurtain />
        </Providers>
      </body>
    </html>
  );
}
