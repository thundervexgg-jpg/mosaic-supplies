# Mosaic Supplies

Supplier-facing website for Mosaic Supplies. Live at **[mosaic-supplies.co.uk](https://mosaic-supplies.co.uk)**.

React 18 + Vite + Tailwind + `motion`. Pushing to `main` deploys to production automatically.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
```

## What this site is for

The audience is **a buyer at a wholesaler deciding whether to open a trade account.** When we
email a supplier asking for trade terms, someone there looks us up before replying. They are
answering one question: is this a real business, or a chancer?

That is the whole job. It is not a shop, and it is not aimed at customers.

## What must never appear on it

All copy lives in [`src/lib/copy.ts`](src/lib/copy.ts), which documents these rules at the top.
Edit copy there, not in components.

- **Nothing about how products get chosen.** No screening, no listing analysis, no sales-velocity
  data, no tooling, no minimum-return threshold. It tells a supplier the buying decision is made
  by software rather than by a buyer who knows their category, and it hands them our margin floor
  as a negotiating frame.
- **No claim of scale we do not have.** No customer counts, no revenue, no years trading, no
  testimonials. A supplier checks Companies House; being caught overstating costs more than the
  claim was worth.
- **No internal structure.** How many directors there are is not a buyer's business.
- **No em dashes.** Plain punctuation.
- **No public pricing promises to suppliers.** "We don't undercut" reads as resale price
  maintenance. The site says "availability, not price" instead.

## Still to do

- [ ] **Company number and registered office.** Legally required on a UK company website. Set
      `companyNumber` and `registeredOffice` in `src/lib/copy.ts` and the footer line appears.
      Do not invent them.
- [ ] **Mirror the hero video** (`HERO_VIDEO_URL` in `src/lib/tokens.ts`) into `public/`. It is
      currently hotlinked from a third-party CDN we do not control.
- [ ] **Mirror the route-map images** in `src/components/RouteMap.tsx`. Same problem.
- [ ] **Official Amazon badge.** `src/components/MarketplaceLogos.tsx` uses a hand-built lockup.
      Replace with the licensed "Available at Amazon" asset from Seller Central.
- [ ] **Real trade form endpoint.** `Trade.tsx` composes a pre-filled email because there is no
      backend. Replace `handleSubmit` when there is one.

## Category images

Five files in `public/categories/`: `pet.jpg`, `home.jpg`, `baby.jpg`, `sports.jpg`,
`stationery.jpg`.

- **4:5 portrait** (four wide by five tall, e.g. 480x600 or 1200x1500)
- JPG, under ~250KB each
- Bright, light backgrounds; they sit on cream
- Product-led rather than people-led

A missing file falls back to a Stone tile with the mark on it, so the grid never shows a broken
image. Filenames and alt text are mapped in `src/lib/categoryImages.ts`.

## Brand

Taken from the identity sheet, encoded in [`src/lib/tokens.ts`](src/lib/tokens.ts).

| | |
|---|---|
| Basalt | `#0C0C0D` |
| Bisque | `#F3F0E8` |
| Clay (accent) | `#B0623F` |
| Stone | `#DEDCD7` |

The wordmark is **DM Serif Display** and is always the serif; display headlines are **Barlow
Condensed 800**. The mark is 13 tiles on a fixed 5x5 grid, generated from real geometry in
`src/components/MosaicMark.tsx` rather than an image file, so it stays sharp at any size and can
never drift out of register.
