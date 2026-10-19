import { product } from "@/config/product";
import type { Card, FaqItem, Figure } from "./types";

const f = product.figures;

export const hero = {
  badge: "Warm at seven. Dim by ten.",
  /** `accent` renders italic in the accent tone — one word, once per page. */
  heading: { lead: "A", accent: "softer", trail: "kind of light at home." },
  body: "Orla carries the daylight indoors and lets it go again, without being asked and without an app.",
  ctas: [
    {
      label: `Reserve from €${product.price.from.amount}`,
      href: "/#pricing",
      variant: "solid" as const,
    },
    { label: "See it lit", href: "/cases", variant: "ghost" as const },
  ],
  image: {
    key: "hero",
    alt: "An Orla lamp on a kitchen counter at dusk, throwing a low warm pool of light.",
  },
};

export const intro = {
  /** Rendered enormous, in the faint tone, as the original does. */
  wordmark: `Hello, I'm ${product.name}.`,
  image: {
    key: "intro",
    alt: "An Orla lamp held in one hand, showing its felt shell and aluminium base.",
  },
};

export const capabilities = {
  eyebrow: "Capabilities",
  heading: { lead: `What ${product.name}`, trail: "does quietly." },
  body: "It learns the shape of your day in about a week — when the room fills, when it empties, and how late you actually stay up — then stops needing instructions.",
  steps: [
    {
      n: "01",
      title: "Follows the daylight",
      body: "Colour temperature tracks the sun outside, from 5000K at noon down to 2200K after dark. The change is slow enough that you never catch it moving.",
    },
    {
      n: "02",
      title: "Knows the room is occupied",
      body: `A low-resolution infrared sensor counts warm bodies, not faces. It cannot resolve a person, it has no camera, and it never leaves the lamp.`,
    },
    {
      n: "03",
      title: "Holds its charge for two days",
      body: `${f.batteryHours} hours of light on one charge, then it tells you with a slow amber pulse rather than a notification.`,
    },
    {
      n: "04",
      title: "Comes apart with a coin",
      body: "Shell, battery and driver are each replaceable. Nothing is glued. The whole lamp is four parts and eight screws.",
    },
  ],
};

export const rooms = {
  eyebrow: "At home",
  heading: { lead: "One lamp.", trail: "Every room." },
  body: "Pick it up, put it down, and it works out where it is. No hub, no wiring, no zones to configure.",
  cards: [
    {
      tag: "The kitchen",
      title: "Bright enough to cook by.",
      body: "Full output while you are standing at the counter, then down to a low pool the moment the room empties. It never leaves the kitchen lit at midnight.",
      foot: "Six hours a day, most days",
      cta: { label: "Read the kitchen note", href: "/cases/kitchen" },
      image: {
        key: "room-kitchen",
        alt: "Warm light pooling across a kitchen worktop.",
      },
    },
    {
      tag: "The evening",
      title: "Goes amber before you do.",
      body: "After sunset it drops below 2500K and stays there. Nothing on the shelf is bright enough to keep you up by accident.",
      foot: "Down to 2200K by ten",
      cta: { label: "Read the evening note", href: "/cases/evenings" },
      image: {
        key: "room-evening",
        alt: "A dim living room with one low amber light on a side table.",
      },
    },
    {
      tag: "The entryway",
      title: "Waiting when you get in.",
      body: "It hears the door, comes up to a quarter, and holds until you have your coat off. Then it lets the hall go dark again.",
      foot: "Up in half a second",
      cta: { label: "Read the entryway note", href: "/cases/entryway" },
      image: {
        key: "room-entry",
        alt: "A hallway lit at low level beside a coat rail.",
      },
    },
  ] satisfies Card[],
  cta: { label: "All use cases", href: "/cases", variant: "solid" as const },
};

export const signals = {
  eyebrow: "Early signals",
  heading: { lead: "The first numbers,", trail: "from the first homes." },
  note: `${product.name} is in beta. These are readings from the ${f.betaHomes} homes living with it now — a small sample, honestly reported, and still moving.`,
  feature: {
    value: "94",
    unit: "%",
    lines: [
      "Run without ever opening the app.",
      `${product.name} reads the day and adjusts before it is asked.`,
    ],
    caption: `Of beta homes still using ${product.name} daily, three months after delivery.`,
    image: {
      key: "signal-feature",
      alt: "An Orla lamp on a windowsill in the late afternoon.",
    },
  },
  stripLabel: "Live beta data",
  stripNote:
    "Updated as the programme grows. Small sample, openly reported, changing week to week.",
  cards: [
    {
      value: "94",
      unit: "%",
      label: "Left alone",
      meta: "So far",
      note: "Homes that have not opened the app in thirty days. The lamp is expected to be boring.",
      foot: `Beta · ${f.betaHomes} homes`,
    },
    {
      value: "8.9",
      unit: "/10",
      label: "Word of mouth",
      meta: "So far",
      note: "Average score when owners are asked how likely they are to recommend it to a friend.",
      foot: "Beta survey",
    },
    {
      value: "2.4",
      unit: "hrs",
      label: "Lights left on",
      meta: "So far",
      note: "Median hours a week of lighting that used to be left burning in an empty room.",
      foot: "Self-reported",
    },
  ] satisfies Figure[],
  measure: {
    title: "How we measure",
    body: "What each number means, where it comes from, and how often it changes.",
    items: [
      {
        q: 'What counts as "left alone"?',
        a: "A home counts if nobody opened the companion app for thirty consecutive days while the lamp stayed in daily use. Opening it to check the battery counts as opening it.",
      },
      {
        q: "Who is in the sample?",
        a: `All ${f.betaHomes} beta households, with no exclusions. Homes that returned a lamp stay in the denominator.`,
      },
      {
        q: "How often does it update?",
        a: "Weekly, on the same day, whether the numbers moved in our favour or not.",
      },
      {
        q: "What we do not measure",
        a: "Nothing about what happens in the room. The lamp reports its own battery, uptime and colour temperature, and that is the whole telemetry set.",
      },
    ] satisfies FaqItem[],
  },
};

export const materials = {
  eyebrow: "Materials & craft",
  heading: { lead: "Pressed in Veneto.", trail: "Soft as a coat sleeve." },
  body: "The shell is a single piece of moulded wool felt over a milled aluminium spine. It is meant to be picked up, so it is finished on every side.",
  chips: [
    "Machine washable",
    "Replaceable",
    `${f.finishes} finishes`,
    "Recycled spine",
  ],
  spec: [
    { k: "Shell", v: "Pressed wool felt · 3mm" },
    { k: "Spine", v: `Recycled aluminium · ${f.recycledPercent}%` },
    { k: "Weight", v: "710 g" },
    { k: "Finishes", v: product.art.finishes.map((x) => x.label).join(" / ") },
    { k: "Care", v: "Shell removable · 30°C wash" },
    { k: "Origin", v: "Conegliano, Italy" },
  ],
  stripNote:
    "Soft against a shelf, warm in the hand, and simple to change when you want something different.",
  swatches: product.art.finishes.map((x) => ({
    key: `swatch-${x.key}`,
    alt: `${x.label} felt shell finish.`,
    label: x.label,
  })),
};

export const inside = {
  eyebrow: "For everyone",
  heading: { lead: "Simple to live with.", trail: "Not simple inside." },
  body: `${product.name} keeps a low profile. Under the felt there is rather more going on than it lets on.`,
  aside:
    "Not the numbers on the box — the things you only notice once it is living with you.",
  cta: {
    label: "Full specification",
    href: "/#spec",
    variant: "solid" as const,
  },
};

/** The bento grid. `span` maps to column spans in a 12-column row. */
export const bento = {
  tiles: [
    {
      kind: "image" as const,
      span: 4,
      title: "Range of light",
      body: "From a reading pool to a whole room, on one dial.",
      image: {
        key: "bento-range",
        alt: "An Orla lamp casting a widening circle of light.",
      },
    },
    {
      kind: "text" as const,
      span: 4,
      tag: "On its feet",
      title: "Moves rooms like the rest of the family.",
      body: "Cordless, 710 grams, and flat-bottomed enough to sit on a stair without being a hazard.",
    },
    {
      kind: "dark" as const,
      span: 4,
      title: "More sense than sensor",
      body: "The presence model runs on the lamp, in real time, and gets a little better every week.",
      image: {
        key: "bento-sense",
        alt: "An abstract field of points describing a lit room.",
      },
    },
    {
      kind: "text" as const,
      span: 4,
      title: "No one gets in.",
      body: "No camera, no microphone, no account. Encrypted on-device, with no back door.",
      image: {
        key: "bento-privacy",
        alt: "The sealed sensor window on an Orla lamp.",
      },
    },
    {
      kind: "image" as const,
      span: 4,
      image: {
        key: "bento-hand",
        alt: "A hand turning the brass ring at the base of an Orla lamp.",
      },
    },
    {
      kind: "stat" as const,
      span: 4,
      tag: "All-day power",
      title: "Two days, then it says so.",
      value: `${f.batteryHours}`,
      unit: "hrs",
      body: "When it runs low it pulses amber for an evening before it needs the dock. No notification, no panic.",
      image: {
        key: "bento-battery",
        alt: "The charging dock with a single amber indicator.",
      },
    },
    {
      kind: "caption" as const,
      span: 4,
      title: "Range of motion",
      body: "The head tilts through 140° and holds anywhere in it.",
      image: {
        key: "bento-tilt",
        alt: "The tilting head of an Orla lamp, shown mid-travel.",
      },
    },
    {
      kind: "figure" as const,
      span: 4,
      value: `${f.recycledPercent}`,
      unit: "%",
      body: "Recycled aluminium in the spine",
      image: {
        key: "bento-metal",
        alt: "Milled aluminium spines stacked in the workshop.",
      },
    },
    {
      kind: "review" as const,
      span: 4,
      tag: "From the beta programme",
      quote:
        "It stopped being a gadget in about a week. Now it is just the light in the corner that happens to know when we have gone to bed.",
      /** Deliberately unattributed — see BRIEF.md. */
      attribution: "A note from a beta household",
      label: "Illustrative, not a review",
    },
    {
      kind: "cta" as const,
      span: 4,
      title: "Bring one home.",
      body: "Reserve now, pay when we ship.",
      cta: {
        label: `Reserve ${product.name}`,
        href: "/#pricing",
        variant: "solid" as const,
      },
      image: {
        key: "bento-cta",
        alt: "An Orla lamp beside a laptop on a desk in the evening.",
      },
    },
  ],
};

export const faq = {
  eyebrow: "Before you reserve",
  heading: { lead: "The practical", trail: "answers." },
  body: "Shipping, returns, warranty, compatibility. What we get asked most, answered without the fluff.",
  items: [
    {
      q: `When will ${product.name} ship?`,
      a: `Beta lamps are in homes now. Reserved lamps ship in allocation order from ${product.launch.year}, and we confirm your window before anything is charged beyond the deposit.`,
    },
    {
      q: "Is it safe around children and pets?",
      a: "The shell stays under 30°C at full output, the base is weighted to right itself, and there is no exposed glass anywhere on the lamp.",
    },
    {
      q: "What happens to my data?",
      a: "There is no camera and no microphone. The presence sensor produces a coarse occupancy count that never leaves the lamp. No account is required to use it.",
    },
    {
      q: "Does it need the internet?",
      a: "No. Everything it does — daylight tracking, presence, scheduling — runs on the lamp. Wi-Fi only exists for firmware updates, and you can decline those.",
    },
    {
      q: "How long does the battery last, and can I replace it?",
      a: `About ${f.batteryHours} hours of light per charge. The cell is a user-replaceable module held in by two screws, sold at cost for as long as we make the lamp.`,
    },
    {
      q: "How hard is it to set up?",
      a: `Around ${f.setupMinutes} minutes, most of which is charging. Take it out, set it down, tell it your bedtime once.`,
    },
    {
      q: "Do I own it, or is there a subscription?",
      a: "You own it outright. There is no subscription, no paywalled feature, and no tier that unlocks brightness.",
    },
  ] satisfies FaqItem[],
};

export const quickStats = {
  eyebrow: "Quick stats",
  heading: { lead: "Designed around behaviour,", trail: "not a spec sheet." },
  body: "Most lamps are engineered to look good in a showroom. Orla is engineered to be tolerable on a Tuesday, which turns out to be the harder problem.",
  cta: {
    label: "Full specification",
    href: "/#spec",
    variant: "solid" as const,
  },
  tiles: [
    {
      value: `${f.wakeSeconds}`,
      unit: "sec",
      label: "From dark to lit when you walk in",
      image: {
        key: "stat-wake",
        alt: "Concentric rings describing the lamp's sensing field.",
      },
    },
    {
      value: `${f.batteryHours}`,
      unit: "h",
      label: "A full waking day of light on one overnight charge",
      tag: "Availability",
    },
    {
      value: `${f.setupMinutes}`,
      unit: "min",
      label: "From opening the box to the first evening",
      tag: "Setup",
    },
  ],
  caption: { title: "Hears the room,", body: "not the command." },
  captionImage: {
    key: "stat-room",
    alt: "The perforated sensor band around an Orla lamp's base.",
  },
};

export const pricing = {
  eyebrow: "Pricing",
  heading: { lead: "Choose how you", trail: "bring it home." },
  body: "No tiers locked behind a subscription. The lamp is yours. The care plan is optional.",
  aside: "Works with what you already have.",
  tiers: [
    {
      name: "One lamp",
      price: 240,
      unit: "one-off",
      body: "A single Orla in the finish of your choice, with the dock and a three-year warranty.",
      features: [
        "One lamp + charging dock",
        `${f.warrantyYears}-year warranty`,
        "Replaceable shell and cell",
        "Free returns for 60 days",
      ],
      cta: { label: "Reserve one", href: "/waitlist" },
      featured: false,
    },
    {
      name: "The pair",
      price: 440,
      unit: "one-off",
      body: "Two lamps that hand the room between them — the common set-up in beta homes.",
      features: [
        "Two lamps + two docks",
        `${f.warrantyYears}-year warranty`,
        "Room handover between lamps",
        "A spare shell in any finish",
        "Free returns for 60 days",
      ],
      cta: { label: "Reserve the pair", href: "/waitlist" },
      featured: true,
    },
    {
      name: "Whole home",
      price: 980,
      unit: "one-off",
      body: "Five lamps, which in most houses is the kitchen, the hall, two bedrooms and the room you actually sit in.",
      features: [
        "Five lamps + five docks",
        `${f.warrantyYears}-year warranty`,
        "Room handover across the set",
        "Two spare shells",
        "Priority allocation",
      ],
      cta: { label: "Reserve the set", href: "/waitlist" },
      featured: false,
    },
  ],
  integrationsLabel: `Works alongside`,
  integrations: [
    "Matter",
    "Thread",
    "HomeKit",
    "Google Home",
    "Alexa",
    "SmartThings",
  ],
};

export const reviews = {
  eyebrow: `Living with ${product.name}`,
  heading: {
    lead: "From the homes already",
    trail: `running ${product.name}.`,
  },
  body: "Beta households have had a lamp since spring. These are the notes they sent back.",
  aside: "In the beta programme? Tell us how it is settling in.",
  cta: { label: "Send a note", href: "/contact", variant: "solid" as const },
  /** Unattributed by design. See BRIEF.md — no invented people. */
  disclaimer:
    "Notes from the beta programme, published unattributed and lightly edited for length.",
  items: [
    {
      quote:
        "The first week I kept checking it. After that I forgot it was doing anything, which I think is the point.",
      meta: "Beta household · kitchen and hall",
    },
    {
      quote:
        "We stopped having the argument about who left the landing light on. It just does not happen any more.",
      meta: "Beta household · two lamps",
    },
    {
      quote:
        "It goes amber around nine and I notice I start winding down. I did not expect a lamp to change my evening.",
      meta: "Beta household · living room",
    },
    {
      quote:
        "Took the shell off and washed it after a very bad week with a toddler. Went back on like nothing happened.",
      meta: "Beta household · whole home set",
    },
  ],
};

export const outro = {
  image: {
    key: "outro",
    alt: "An Orla lamp packed in its box, on a doorstep in the early morning.",
  },
};
