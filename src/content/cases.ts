import { product } from "@/config/product";

export type CaseStudy = {
  slug: string;
  room: string;
  title: string;
  standfirst: string;
  hero: { key: string; alt: string };
  eyebrow: string;
  intro: { heading: { lead: string; trail?: string }; body: string; aside: string };
  facts: { k: string; v: string }[];
  sections: {
    n: string;
    title: string;
    body: string;
    image?: { key: string; alt: string };
  }[];
  pull: string;
  closing: { heading: string; body: string };
};

export const index = {
  eyebrow: "Use cases",
  heading: { lead: `Where ${product.name} actually`, trail: "earns its keep." },
  aside: "One room per entry. Add as many as you like — the layout keeps its rhythm.",
};

/**
 * Rows that appear on the index but have no write-up yet. The original does the
 * same: five rows, three of which open a page. These render as plain cards
 * rather than dead links.
 */
export const upcoming = [
  {
    room: "Workshop",
    title: "Task light that stays put.",
    standfirst: "Full output, held, for as long as your hands are busy.",
    hero: { key: "case-workshop", alt: "An Orla lamp lighting a workbench." },
    note: "Write-up in progress",
  },
  {
    room: "Bedside",
    title: "Down to nothing, slowly.",
    standfirst: "Fades over a minute once the room has settled, rather than snapping off.",
    hero: { key: "case-bedside", alt: "An Orla lamp dimmed low on a bedside table." },
    note: "Write-up in progress",
  },
];

export const cases: CaseStudy[] = [
  {
    slug: "kitchen",
    room: "Kitchen",
    title: "Bright enough to cook by.",
    standfirst: "Six o'clock, and the room has to do three jobs at once.",
    hero: {
      key: "case-kitchen-hero",
      alt: "An Orla lamp lighting a kitchen worktop at the end of the day.",
    },
    eyebrow: "The kitchen",
    intro: {
      heading: { lead: "The one room", trail: "that is never one thing." },
      body: "A kitchen is a workshop at six and a quiet room at ten, and most lighting picks one of those and commits to it. Orla treats the two as different problems and solves them in the same fitting.",
      aside: "Measured across the beta programme: the kitchen is the room an Orla spends the most hours in, by a wide margin.",
    },
    facts: [
      { k: "Typical output", v: "820 lm at the counter" },
      { k: "Evening floor", v: "40 lm, 2200K" },
      { k: "Hours a day", v: "6.1 median" },
      { k: "Distance", v: "Effective to 2.4 m" },
    ],
    sections: [
      {
        n: "01",
        title: "Full output while you are standing there",
        body: "Presence at the counter takes the lamp to full within half a second, at a colour temperature cold enough to tell parsley from coriander. It holds there as long as somebody is working, without a motion timeout cutting out mid-task.",
        image: {
          key: "case-kitchen-1",
          alt: "Bright neutral light falling across a chopping board and worktop.",
        },
      },
      {
        n: "02",
        title: "Down to a pool when the room empties",
        body: "Two minutes after the last person leaves, it falls to a low warm pool — enough to find a glass by, not enough to light the room. It does not switch off, because a kitchen that goes black when you step out of it is worse than one left on.",
        image: {
          key: "case-kitchen-2-dark",
          alt: "A low warm pool of light left on an empty kitchen counter.",
        },
      },
      {
        n: "03",
        title: "It never leaves the kitchen lit at midnight",
        body: "After your stated bedtime the floor drops again, to a level you can walk through but would not read by. This is the single behaviour beta households mention most, and it is the one that took the longest to get right.",
      },
          {
        n: "04",
        title: "It does not flicker when you cross it",
        body: "Early builds re-evaluated the room every few hundred milliseconds, which showed up as a faint pulse whenever somebody walked past the hob. The lamp now holds its level for a full two seconds before it will move, and moves over four.",
        image: {
          key: "case-kitchen-3",
          alt: "Even light held steady across a kitchen island.",
        },
      },
      {
        n: "05",
        title: "One lamp covers a galley, two cover an island",
        body: "Effective reach is about 2.4 metres before the falloff becomes obvious. In a galley kitchen that is the whole room; around an island, two lamps hand the space between them and neither runs at full.",
      },
    ],
    pull: "A kitchen is a workshop at six and a quiet room at ten. Most lighting picks one.",
    closing: {
      heading: "One lamp, two rooms' worth of behaviour.",
      body: "Nothing to schedule and nothing to switch. Put it on the counter and it works the rest out inside a week.",
    },
  },
  {
    slug: "evenings",
    room: "Evenings",
    title: "Goes amber before you do.",
    standfirst: "The hours between dinner and bed, lit like they are actually the evening.",
    hero: {
      key: "case-evenings-hero",
      alt: "A living room lit by a single low amber Orla lamp.",
    },
    eyebrow: "The evening",
    intro: {
      heading: { lead: "Light that admits", trail: "the day is over." },
      body: "Most rooms are lit at the same temperature at eleven at night as at eleven in the morning. Orla treats sunset as a real event and spends the following four hours getting steadily warmer and dimmer.",
      aside: "From 2700K at sunset down to 2200K by the time the house is quiet — a slope slow enough that nobody has ever reported noticing it move.",
    },
    facts: [
      { k: "Sunset temperature", v: "2700K" },
      { k: "Late floor", v: "2200K" },
      { k: "Slope", v: "Over 4 hours" },
      { k: "Blue content", v: "Below 2% after 21:00" },
    ],
    sections: [
      {
        n: "01",
        title: "It starts before you notice",
        body: "The shift begins at local sunset, not at a fixed clock time, so it tracks the season without anybody adjusting it. In December it starts in the afternoon. In June it waits until late.",
        image: {
          key: "case-evenings-1",
          alt: "A window at dusk with an Orla lamp warming beside it.",
        },
      },
      {
        n: "02",
        title: "Nothing bright enough to keep you up",
        body: "After nine the lamp cannot be driven above its evening ceiling, even manually — the control ring stops there. It is the one place the lamp is deliberately stubborn, and it is the reason it works.",
        image: {
          key: "case-evenings-2",
          alt: "A book and a low amber pool of light on a side table.",
        },
      },
      {
        n: "03",
        title: "Then it lets the room go",
        body: "Twenty minutes after the room empties for the last time, it fades out over a full minute rather than snapping off. A room that goes dark gradually reads as settling. One that snaps off reads as a power cut.",
      },
          {
        n: "04",
        title: "It knows the difference between late and early",
        body: "A room that fills at seven in the morning gets daylight. The same room at one in the morning gets the evening floor. The lamp reads the clock and the daylight sensor together, so an early start is never met with amber.",
        image: {
          key: "case-evenings-3",
          alt: "Cool morning light returning to the same side table, the lamp switched off.",
        },
      },
      {
        n: "05",
        title: "You can override it, and it will not argue",
        body: "Turning the ring past the evening ceiling holds full output for an hour, then it drifts back. No setting to undo and no mode to remember you left on.",
      },
    ],
    pull: "It goes amber around nine, and you notice you start winding down.",
    closing: {
      heading: "An evening that looks like an evening.",
      body: "No scene to pick, no scheduling screen. Tell it your bedtime once and it does the rest for as long as you own it.",
    },
  },
  {
    slug: "entryway",
    room: "Entryway",
    title: "Waiting when you get in.",
    standfirst: "The half-metre of hallway that decides how coming home feels.",
    hero: {
      key: "case-entryway-hero",
      alt: "An Orla lamp glowing low on a sideboard in a darkened living room.",
    },
    eyebrow: "The entryway",
    intro: {
      heading: { lead: "Lit before", trail: "you are through the door." },
      body: "A hall is used in ten-second bursts, twenty times a day, which is the worst possible fit for a switch. Orla treats the entryway as an event rather than a room.",
      aside: `Up to a quarter output in ${product.figures.wakeSeconds} seconds, held while you deal with your coat, then released.`,
    },
    facts: [
      { k: "Wake time", v: `${product.figures.wakeSeconds} sec` },
      { k: "Hold", v: "90 sec after last movement" },
      { k: "Entry level", v: "25% output" },
      { k: "Uses a day", v: "18 median" },
    ],
    sections: [
      {
        n: "01",
        title: "It hears the door",
        body: "The pressure change of a front door opening is a cleaner signal than motion, and it arrives earlier. The lamp is already coming up while you are still on the step.",
        image: {
          key: "case-entryway-1",
          alt: "Low light spreading across a hallway floor as a door opens.",
        },
      },
      {
        n: "02",
        title: "A quarter, not the whole thing",
        body: "Full brightness in a hall at eleven at night is an assault. A quarter is enough to hang a coat and find the stairs, and it does not wake the rest of the house.",
        image: {
          key: "case-entryway-2",
          alt: "A coat rail and a set of keys under a low warm light.",
        },
      },
      {
        n: "03",
        title: "Then the hall goes dark again",
        body: "Ninety seconds after the last movement it releases. No timer to set, no motion sensor clicking off while you are still standing there with your arms full.",
      },
          {
        n: "04",
        title: "It ignores the cat",
        body: "The occupancy model is tuned to the thermal signature and gait of a person, so a pet crossing the hall at two in the morning does not light the house. This took most of a winter to get right.",
        image: {
          key: "case-entryway-3",
          alt: "A dark hallway left unlit, with only a doorway glow.",
        },
      },
      {
        n: "05",
        title: "Leaving is treated differently from arriving",
        body: "On the way out it holds until the door closes and then releases immediately, rather than lighting an empty hall for ninety seconds after you have gone.",
      },
    ],
    pull: "A hall is used in ten-second bursts, twenty times a day. That is the worst possible fit for a switch.",
    closing: {
      heading: "The light you never think about.",
      body: "Which, for a hallway, is the highest compliment available.",
    },
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
