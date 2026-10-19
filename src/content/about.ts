import { product } from "@/config/product";

const f = product.figures;

export const about = {
  hero: {
    title: `The ${product.name} Story`,
    image: {
      key: "about-hero",
      alt: "An Orla lamp photographed close, showing the grain of its pressed felt shell.",
    },
  },
  opening: {
    eyebrow: product.name,
    heading: { lead: "We would rather", trail: "get one thing right." },
    body: `${product.name} is a lamp. It learns how a house actually uses a room, then takes the switch out of the equation without taking the light away from you.`,
    aside: `We are nine people across two workshops. The shell is pressed in Veneto, the sensing is written in Helsinki. Between them, one product, currently living in ${f.betaHomes} homes.`,
  },
  details: {
    label: "Studio details",
    rows: [
      { k: "Founded", v: "2024" },
      { k: "Workshops", v: "Helsinki, Finland\nConegliano, Italy" },
      { k: "Team", v: "9" },
      { k: "Discipline", v: "Industrial design" },
      { k: "Products", v: "One" },
    ],
  },
  belief: {
    eyebrow: "Why a lamp",
    heading: { lead: "The most-used object", trail: "in the house is a switch." },
    body: "It is touched more often than a tap and thought about less than a doorknob, and it has not meaningfully changed in a century. Almost everything sold to improve it has made it worse — an app where there used to be a click, a voice command where there used to be a hand.",
    body2: "We started from the opposite end: what would a light have to know about a room in order to stop needing to be told anything at all? That question turned out to be four years of work and exactly one product.",
    image: {
      key: "about-belief",
      alt: "A pressed felt shell resting beside a milled aluminium spine on a bench.",
    },
  },
  principles: {
    eyebrow: "How we work",
    heading: { lead: "Four rules,", trail: "and we hold to them." },
    items: [
      {
        n: "01",
        title: "It works with the power off",
        body: "Every behaviour runs on the lamp. No hub, no account, no service to shut down in three years. If we disappeared tomorrow your lamp would carry on exactly as it does today.",
      },
      {
        n: "02",
        title: "No sensor we would not want in our own hall",
        body: "No camera. No microphone. A coarse infrared occupancy count that cannot resolve a person and never leaves the device.",
      },
      {
        n: "03",
        title: "Everything comes apart",
        body: "Four parts, eight screws, no glue. The cell, the shell and the driver are each replaceable at cost for as long as we make the lamp.",
      },
      {
        n: "04",
        title: "One product at a time",
        body: "There is no range and no roadmap of adjacent objects. When this one is genuinely finished we will think about the second.",
      },
    ],
  },
  workshops: {
    eyebrow: "Where it is made",
    heading: { lead: "Two workshops,", trail: "one object." },
    items: [
      {
        place: "Conegliano, Italy",
        title: "The shell",
        body: "Wool felt pressed over a form, trimmed by hand, and checked against a reference piece under daylight. The mill has been pressing felt on the same site since the 1950s.",
        image: { key: "about-workshop-1", alt: "Pressed wool felt shells drying on a rack." },
      },
      {
        place: "Helsinki, Finland",
        title: "The behaviour",
        body: "The daylight model, the presence model and the firmware. Written and tested in a country that takes the difference between four o'clock in June and four o'clock in December seriously.",
        image: { key: "about-workshop-2", alt: "A bench of Orla lamps under test at varying brightness." },
      },
    ],
  },
  /**
   * The original ran four team portraits here. Photographs of people are never
   * carried across, and we will not invent stand-ins for real staff — so this
   * block is roles and no faces. See BRIEF.md.
   */
  team: {
    eyebrow: "The team",
    heading: { lead: "Nine people,", trail: "and no reception desk." },
    note: "Roles, not headshots. We are not going to put stock faces on a page and call them a team.",
    roles: [
      { role: "Industrial design", count: 2 },
      { role: "Optics & electronics", count: 3 },
      { role: "Firmware & sensing", count: 2 },
      { role: "Production", count: 1 },
      { role: "Everything else", count: 1 },
    ],
  },
  closing: {
    heading: { lead: "Still a small company,", trail: "on purpose." },
    body: "We would rather make one lamp that lasts a decade than a catalogue that lasts a season.",
  },
};
