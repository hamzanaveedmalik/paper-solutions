# PCS UK catalogue — setup guide

## Stack

- Vite + React + TypeScript
- Tailwind CSS + existing shadcn/ui components
- Static catalogue JSON generated from the PCS UK WooCommerce Store API (or CSV)
- Quote list persisted in `localStorage` (no customer accounts)
- Enquiry delivery via Formspree when configured

## Quick start

```bash
npm install
cp env.example .env.local
npm run import:pcsuk
npm run generate:sitemap
npm run dev
```

Open the printed local URL (default `http://localhost:8080`).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SITE_URL` | Recommended | Canonical site origin for SEO (`https://pcsuk.co.uk`) |
| `VITE_FORMSPREE_QUOTES_ENDPOINT` | For live enquiry delivery | Formspree endpoint for quote/contact submissions |
| `VITE_ENQUIRY_EMAIL` | Recommended | Fallback / mailto address (`Office@pcsuk.co.uk`) |

If `VITE_FORMSPREE_QUOTES_ENDPOINT` is missing, the quote form **does not fake success**. It validates the enquiry and shows a copyable summary to email manually.

## Importing catalogue data

### From cached / live WooCommerce Store API

```bash
# Use checked-in raw JSON under data/
npm run import:pcsuk

# Dry-run (no writes)
npm run import:pcsuk:dry-run

# Refresh from https://pcsuk.co.uk (requires network)
npm run import:pcsuk:fetch

# Also download product images locally
node scripts/import-pcsuk.mjs --fetch --download-images
```

### From a WooCommerce product CSV export

```bash
node scripts/import-pcsuk.mjs --csv ./path/to/wc-product-export.csv
```

Outputs:

- `src/data/catalogue.json` — app catalogue
- `reports/import-report.json` — machine-readable counts
- `reports/content-review.md` — human review notes (pricing conflicts, missing Packaging category, phone/delivery conflicts)

## Business settings that stay unconfirmed

Configured in `src/config/site.ts`:

- Conflicting phone numbers (header vs footer on source site)
- Unverified free-delivery / shipping threshold claims

Customer-facing copy stays neutral until these are confirmed.

## Scripts

```bash
npm run dev
npm run test
npm run lint
npm run typecheck
npm run build
```

## Notes on images

This environment could not download PCS-owned product binaries (origin returned 403 to the importer). Catalogue entries keep remote `pcsuk.co.uk` image URLs with provenance. Re-run with `--download-images` where network access to the origin works, then commit `public/catalogue/images` if desired.

Official brand mark: `public/brand/pcsuk-logo.png` (with generated `favicon.png` / `apple-touch-icon.png`).
