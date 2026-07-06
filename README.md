# Charming Sacramento

Custom charm-jewelry shop — pick a base (necklace / bracelet / anklet), drag charms onto it, check out with Stripe. Next.js 16 (App Router), React 19, Tailwind 4, dnd-kit, motion.

## Develop

```bash
npm install
npm run dev   # http://localhost:3000 (webpack — Turbopack panics on the emoji in this repo's parent path)
```

`.env.local` (see `.env.local.example`):

- `STRIPE_SECRET_KEY` — test key for the checkout API route
- `NEXT_PUBLIC_URL` — origin fallback for Stripe redirect URLs

## Layout

- `src/app` — routes: landing, `/shop`, `/customize`, `/checkout/*`, `/api/checkout`
- `src/components/customizer` — drag-and-drop charm customizer (canvas, palette, order summary)
- `src/lib/charms.ts` — charm + base catalog (single source of truth for products/prices)
- `public/charms/web` — 512px WebP charm cutouts served by the site
- `charm-src/` — heavy source assets (2K renders, official inventory photos); not deployed
- `Charming/` — Obsidian notes vault (gitignored)

## Deploys

- **GitHub Pages preview** — `.github/workflows/deploy-pages.yml`: static export under `/Charming`, checkout disabled (`NEXT_PUBLIC_PREVIEW=true`), API route stripped.
- **Production (Vercel)** — full app with the Stripe checkout route.
