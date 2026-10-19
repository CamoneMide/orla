import { product } from "@/config/product";

export const updates = {
  eyebrow: "Updates",
  heading: { lead: "What changed,", trail: "and when." },
  body: `Every firmware release and every workshop decision worth writing down. Posted whether the month went well or not.`,
  aside: "Roughly monthly. No launch theatre.",
  posts: [
    {
      slug: "evening-slope",
      date: "2026-08-14",
      tag: "Firmware 1.4",
      title: "The evening slope got slower",
      body: "Beta homes told us the drop to amber was noticeable at around half past eight, which meant it was too fast. It now runs over four hours instead of two, and nobody has mentioned it since — which is the result we wanted.",
      image: { key: "update-1", alt: "An Orla lamp warming through the evening beside a window." },
    },
    {
      slug: "shell-wash",
      date: "2026-07-02",
      tag: "Materials",
      title: "The shell survives a 30° wash",
      body: "It was always removable. It is now genuinely washable — forty cycles with no measurable change in dimension or colour. The care label changed accordingly.",
      image: { key: "update-2", alt: "A pressed felt shell drying flat on a workshop bench." },
    },
    {
      slug: "hall-hold",
      date: "2026-06-09",
      tag: "Firmware 1.3",
      title: "Hallways hold ninety seconds now",
      body: "The old hold was sixty and it cut out on people mid-coat. Ninety covers the long tail without leaving halls burning. A small change that removed most of our entryway complaints.",
      image: { key: "update-3", alt: "A hallway held at low light beside a coat rail." },
    },
    {
      slug: "cell-module",
      date: "2026-05-21",
      tag: "Hardware",
      title: "The cell is a two-screw module",
      body: "It was four screws and a connector that needed a tool we would have had to sell you. It is now two screws and a keyed connector, and we will post you a cell at cost for as long as we make the lamp.",
      image: { key: "update-4", alt: "The replaceable battery module lifted clear of the spine." },
    },
    {
      slug: "beta-round-two",
      date: "2026-04-03",
      tag: "Programme",
      title: `The beta programme reached ${product.figures.betaHomes} homes`,
      body: "Second round shipped. Reporting stays weekly and stays unfiltered — the numbers on the home page move whichever way the week went.",
      image: { key: "update-5", alt: "Boxed Orla lamps ready to ship from the workshop." },
    },
  ],
};
