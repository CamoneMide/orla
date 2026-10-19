/** Shared content shapes. Copy lives in the sibling modules, never in JSX. */

export type Href = string;

export type NavItem = { label: string; href: Href };

export type Cta = { label: string; href: Href; variant?: "solid" | "ghost" | "light" };

/** A headline split so the second half can render in the muted tone. */
export type SplitHeading = { lead: string; trail?: string; accent?: string };

export type Eyebrow = string;

export type Figure = {
  /** The number itself, as a string so "0.4" and "82" both render right. */
  value: string;
  /** Small unit printed after the number, in Abel. */
  unit?: string;
  label: string;
  note?: string;
  /** Right-hand meta on the stat card. */
  meta?: string;
  /** Small footer line under the rule on a stat card. */
  foot?: string;
};

export type FaqItem = { q: string; a: string };

export type ImageSlot = {
  /** Filename inside /public/orla-product-images, without the .webp extension. */
  key: string;
  alt: string;
};

export type Card = {
  tag?: string;
  title: string;
  body?: string;
  foot?: string;
  cta?: Cta;
  image?: ImageSlot;
};
