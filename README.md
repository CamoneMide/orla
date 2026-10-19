# Orla

A launch site for Orla, a cordless, presence-aware home lamp. Front-end only:
the forms validate and confirm, but nothing is sent or stored, and nothing is
for sale.

Live at **https://orla.vercel.app**.

## Stack

Next.js 16 (App Router, TypeScript), Tailwind CSS v4, GSAP + ScrollTrigger
with Lenis smooth scrolling, Motion (lazy-loaded), Zustand and TanStack Query.
Every route is prerendered as static HTML.

## Run it

Requires Node 20.9 or later and pnpm.

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm build     # production build
pnpm start     # serve the production build
pnpm lint
```

`?ready=1` on any URL renders the page at rest — no intro curtain, no reveals,
no parallax — as does the system's reduced-motion setting.

## Where things live

| Path | What |
|---|---|
| `src/config/product.ts` | Everything product-specific: name, URL, contact, launch date, prices |
| `src/content/*.ts` | All page copy, in the same shapes the components read |
| `src/components/` | Sections, chrome (nav, footer), UI pieces, system (curtain, scrolling) |
| `public/orla-product-images/` | Every photograph, one WebP per image key |

Components hold no copy. To point the site at a different product, edit
`product.ts`, rewrite `src/content/*` at the same shapes, and replace the
photographs under the same keys.

## Images

Drop a JPEG or PNG into `public/orla-product-images/` named after its key and
run:

```bash
pnpm images          # convert to WebP, delete the original once it passes
pnpm images --keep   # convert, keep the original
```

The script keeps full resolution, checks each result against the original
(at least 40 dB PSNR, stepping quality up where needed) and only deletes the
original once it passes. Pages crop with `object-fit: cover`, so keep the
subject centred.

## Launch countdown

The nav panel and the waitlist page count down to `launch.date` in
`product.ts`. Once that date passes, the countdown disappears and its label
switches to `launch.afterLabel`.
