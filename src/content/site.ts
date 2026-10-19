import { product } from "@/config/product";
import type { Cta, NavItem } from "./types";

/** The seven links in the expanded nav panel, in order. */
export const navLinks: NavItem[] = [
  { label: "Use cases", href: "/cases" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
  { label: "Updates", href: "/updates" },
  { label: "Reserve", href: "/#pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Waitlist", href: "/waitlist" },
];

/** The card sitting beside the links inside the open nav panel. */
export const navFeature = {
  href: "/about",
  label: "Our story",
  image: { key: "nav-story", alt: "An Orla lamp lit low against a dim wall." },
};

export const primaryCta: Cta = {
  label: `Reserve from €${product.price.from.amount}`,
  href: "/#pricing",
  variant: "solid",
};

export const secondaryCta: Cta = {
  label: "See it lit",
  href: "/cases",
  variant: "ghost",
};

export const footer = {
  columns: [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "Use cases", href: "/cases" },
        { label: "About", href: "/about" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Updates", href: "/updates" },
        { label: "Waitlist", href: "/waitlist" },
        { label: "Contact", href: "/contact" },
      ] as NavItem[],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy & cookies", href: "/legal/privacy-and-cookies" },
        { label: "Terms of service", href: "/legal/terms-of-service" },
        { label: "404", href: "/404-preview" },
      ] as NavItem[],
    },
    {
      title: "Follow",
      links: product.social.map((s) => ({ label: s.label, href: s.href })),
    },
  ],
  newsletter: {
    eyebrow: "Once a month, at most.",
    title: `${product.name} Letter`,
    fields: { name: "Your name", email: "Your email" },
    submit: "Subscribe",
    note: "One email a month while we build. Unsubscribe in a click.",
  },
  colophon: `© ${product.launch.year} ${product.legalName}. Built by ${product.studio}.`,
  note: "A front-end demonstration. Nothing here takes a payment.",
};

/**
 * The two blocks every interior page closes on, mirroring the original: three
 * linked cards, then a full-bleed plate carrying the primary call to action.
 */
export const nextStepsHead = {
  eyebrow: "Where most people go",
  heading: { lead: "Try one", trail: "of these." },
  body: "The pages visitors land on most, ordered by real traffic rather than by what we hope you will click.",
};

export const nextSteps = [
  {
    title: "How it works",
    body: "Daylight tracking, presence, and the rhythm the lamp settles into after the first week.",
    foot: "3 min read",
    cta: { label: "Read more", href: "/cases/kitchen" } as Cta,
    image: { key: "step-how", alt: "An Orla lamp part-way through its evening shift." },
  },
  {
    title: "Questions",
    body: "Shipping, returns, warranty, repair and data — the questions people ask before they buy.",
    foot: "7 questions",
    cta: { label: "Read more", href: "/#faq" } as Cta,
    image: { key: "step-faq", alt: "The underside of an Orla lamp, showing its two service screws." },
  },
  {
    title: `Reserve ${product.name}`,
    body: `A €${product.price.deposit.amount} deposit, fully refundable. Two minutes to place, cancel any time before it ships.`,
    foot: "Most visited",
    cta: { label: "Reserve", href: "/waitlist" } as Cta,
    image: { key: "step-reserve", alt: "A boxed Orla lamp waiting by a door." },
  },
];

/** Full-bleed plate above the footer on every interior page. */
export const closer = {
  badge: "You will stop noticing it, which is the idea.",
  heading: { lead: "Make room for", trail: `your ${product.name}.` },
  ctas: [
    { label: `Reserve ${product.name}`, href: "/waitlist", variant: "solid" } as Cta,
    { label: "Get in touch", href: "/contact", variant: "light" } as Cta,
  ],
  image: {
    key: "closer",
    alt: "An Orla lamp boxed and standing on a doorstep in the morning.",
  },
};
