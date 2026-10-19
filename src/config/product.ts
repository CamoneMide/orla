/**
 * THE SWAP POINT.
 *
 * Everything project-specific about Orla lives here or in `src/content/*`.
 * Components never hardcode a brand name, a price, a colour or a claim — they
 * read from this file. To retarget the template at a different product:
 *
 *   1. edit this file
 *   2. rewrite `src/content/*` (same shapes, new words)
 *   3. replace the photographs in `public/orla-product-images/` (same keys)
 *      and run `pnpm images`
 *
 * No component should need to change.
 */

export type Money = { amount: number; currency: string };

export const product = {
  /** Brand */
  name: "Orla",
  /** Canonical origin, no trailing slash. Feeds metadataBase, the sitemap and robots. */
  url: "https://orla.vercel.app",
  /** Shown in <title> after a dash, and in the footer legal line. */
  legalName: "Orla Light",
  /** Who actually makes it. Appears in the colophon. */
  studio: "Camone",
  /** One line. Used in the nav panel and the footer. */
  tagline: "The quiet light company.",
  /** Registered-mark glyph next to the wordmark. Set to "" to drop it. */
  markSuffix: "®",

  /** What the thing is, in one sentence, for metadata. */
  summary:
    "A cordless lamp that follows the daylight, senses a room without a camera, and runs for forty hours on a charge.",

  /** Launch */
  launch: {
    /** Drives the live countdown in the nav panel and the waitlist page. */
    date: "2026-11-03T09:00:00Z",
    /** Shown as the countdown's label. */
    label: "Time until launch",
    /** Replaces the label, and the countdown disappears, once `date` passes. */
    afterLabel: "Now shipping",
    year: "2026",
  },

  /** Commerce — front-end only, nothing is charged. */
  price: {
    from: { amount: 240, currency: "EUR" } as Money,
    deposit: { amount: 30, currency: "EUR" } as Money,
  },

  /** The headline numbers. Every one is labelled as illustrative in the UI. */
  figures: {
    batteryHours: 40,
    betaHomes: 120,
    warrantyYears: 3,
    recycledPercent: 82,
    wakeSeconds: 0.4,
    setupMinutes: 6,
    finishes: 3,
  },

  /** Contact + places. Invented, and clearly a demo. */
  contact: {
    email: "hello@mail.orla.com",
    press: "hello@mail.orla.com",
    studios: [
      {
        label: "Orla Light",
        lines: ["Kaisaniemenkatu 4", "00100 Helsinki", "Finland"],
      },
      {
        label: "Orla Workshop",
        lines: ["Via Garibaldi 18", "31015 Conegliano TV", "Italy"],
      },
    ],
  },

  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "X (Twitter)", href: "https://x.com" },
  ],

  /**
   * Art direction for `scripts/generate-art.py`. The generator renders every
   * image on the site from these values — change them and the whole visual
   * set re-renders in the new key.
   */
  art: {
    /** Warm neutral grounds, lightest to deepest. */
    grounds: ["#f4efe7", "#ece5da", "#e0d6c8", "#cdbfad", "#b3a48f"],
    /** The emitted light. */
    glow: ["#fff6d8", "#ffe9ae", "#f7d489"],
    /** Shell finishes, in the order they appear on the finishes strip. */
    finishes: [
      { key: "chalk", label: "Chalk", hex: "#e8e2d6" },
      { key: "clay", label: "Clay", hex: "#c9a892" },
      { key: "slate", label: "Slate", hex: "#6f7276" },
    ],
    /** Deep tone for dark panels. */
    ink: "#262626",
  },
} as const;

export type Product = typeof product;
