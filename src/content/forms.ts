import { product } from "@/config/product";

const f = product.figures;

export const waitlist = {
  eyebrow: "Private beta",
  eyebrowMeta: `Launching ${product.launch.year}`,
  heading: { lead: `${product.name} is in`, accent: "beta.", trail: "Ask for a place." },
  body: "We invite a small number of homes each round. Tell us a little about yours and we will be in touch.",
  image: {
    key: "waitlist",
    alt: "A single Orla lamp standing against a pale wall.",
  },
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "address", label: "Address", type: "text", required: false },
    { name: "city", label: "City", type: "text", required: true },
    { name: "country", label: "Country", type: "text", required: true },
  ],
  submit: "Request a place",
  note: "No payment now. Places go out in small batches, and a person replies — not an autoresponder.",
  success: {
    title: "You're on the list.",
    body: "We'll write when the next round opens. Nothing was charged and nothing was stored — this is a front-end demonstration.",
  },
  figures: [
    { value: "40", label: "Beta places this round" },
    { value: product.launch.year, label: "First lamps ship" },
    { value: `${f.warrantyYears}`, unit: "years", label: "Warranty included" },
  ],
};

export const contact = {
  ghost: "Say hello",
  heading: { lead: "A person reads", trail: "every one." },
  body: `${product.name} is small. Tell us about your home, and what you would want a light to stop asking you about.`,
  followLabel: "Follow",
  writeLabel: "Or just write",
  businessLabel: `${product.name} business`,
  fields: [
    { n: "01", name: "name", label: "Name", hint: "First name is fine. Keeps it human.", type: "text", required: true },
    { n: "02", name: "email", label: "Email", hint: "The real one. We won't pass it around.", type: "email", required: true },
    { n: "03", name: "city", label: "City", hint: "Where home is. Helps us with timing.", type: "text", required: false },
    { n: "04", name: "household", label: "Household", hint: "Who the lamp would be living with.", type: "text", required: false },
    { n: "05", name: "reason", label: "Reason", hint: "Beta place, a question, or press. Pick one.", type: "text", required: false },
    { n: "06", name: "message", label: "Message", hint: "What's on your mind. No need to polish it.", type: "textarea", required: true },
  ],
  submit: "Send message",
  note: "A real reply, usually within a day or two.",
  success: {
    title: "Message sent.",
    body: "Or it would have been — this is a front-end demonstration, so nothing left the browser.",
  },
};

export const notFound = {
  code: "404",
  heading: { lead: "That page went", trail: "dark." },
  body: "The link is broken or the page has moved. Here are the ones worth your time.",
  cta: { label: "Back home", href: "/", variant: "solid" as const },
  image: { key: "notfound", alt: "An unlit Orla lamp against a pale ground." },
};
