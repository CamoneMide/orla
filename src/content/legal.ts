import { product } from "@/config/product";

export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  standfirst: string;
  sections: { h: string; p: string[] }[];
};

const demoNotice =
  "This site is a front-end demonstration. It has no server, takes no payment and stores nothing. The text below is written to show the shape of the page, and is not legal advice or an operative agreement.";

export const legal: LegalDoc[] = [
  {
    slug: "privacy-and-cookies",
    title: "Privacy & cookies",
    updated: "2026-09-01",
    standfirst: `What ${product.name} would collect, why, and for how long.`,
    sections: [
      {
        h: "The short version",
        p: [
          demoNotice,
          `The lamp itself is the point here: it has no camera and no microphone, and the occupancy signal it produces never leaves the device. Nothing about what happens in a room is transmitted anywhere.`,
        ],
      },
      {
        h: "What the device holds",
        p: [
          "A coarse occupancy count, the current colour temperature and output, battery state, and a local model of the daily rhythm it has learned. All of it lives in flash on the lamp and is erased by a factory reset.",
          "None of it is uploaded, and there is no account to attach it to.",
        ],
      },
      {
        h: "What this website would hold",
        p: [
          "If the forms on this site were connected, they would hold the name, email and location you typed into them, for the purpose of replying to you and nothing else.",
          "As shipped, the forms validate in the browser, simulate a delay, and discard what you typed when the page unloads.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "This build sets no cookies and runs no analytics. There is no consent banner because there is nothing to consent to.",
        ],
      },
      {
        h: "Firmware updates",
        p: [
          "Updates are opt-in and can be declined indefinitely. A lamp that never updates keeps every behaviour it shipped with.",
        ],
      },
      {
        h: "Getting in touch",
        p: [`Questions about any of this go to ${product.contact.email}.`],
      },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of service",
    updated: "2026-09-01",
    standfirst: "The terms that would apply to a reservation, a purchase and a warranty claim.",
    sections: [
      {
        h: "The short version",
        p: [
          demoNotice,
          "No reservation made on this site is binding, because no reservation made on this site is recorded.",
        ],
      },
      {
        h: "Reservations",
        p: [
          `A reservation would place a refundable €${product.price.deposit.amount} deposit against a lamp from a production run, refundable in full until the lamp leaves the workshop.`,
          "Allocation runs in the order reservations were taken. We would confirm a delivery window before charging anything beyond the deposit.",
        ],
      },
      {
        h: "Returns",
        p: [
          "Sixty days from delivery, for any reason, with return shipping paid. The shell may be washed and the lamp may have been used — that is what the sixty days are for.",
        ],
      },
      {
        h: "Warranty",
        p: [
          `${product.figures.warrantyYears} years on the lamp, the dock and the driver, covering defects rather than accidents.`,
          "The cell is treated as a consumable and is sold at cost for as long as the lamp is in production. A cell that fails inside the warranty period is replaced free.",
        ],
      },
      {
        h: "Repair",
        p: [
          "Four parts, eight screws, no glue. Opening the lamp does not void the warranty, and a repair guide is published alongside it.",
        ],
      },
      {
        h: "Ownership",
        p: [
          "The lamp is bought outright. There is no subscription, no feature behind a paywall, and no behaviour that stops working if a company does.",
        ],
      },
    ],
  },
];

export const getLegal = (slug: string) => legal.find((d) => d.slug === slug);
