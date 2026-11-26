# PCS UK — Premium Catering Supplies catalogue

B2B product catalogue for catering packaging and supplies. Browse categories, search products, build a quote list and submit an enquiry. This phase does **not** include payments or customer accounts.

Live source content is imported from [pcsuk.co.uk](https://pcsuk.co.uk/).

## Features

- Home, catalogue, product detail, quote list and contact experiences
- URL-persisted search, filters, sorting and pagination
- Variant-aware “Add to quote” flow with browser-persisted quote list
- Server-side-style validation for enquiries (Zod), honeypot + rate limiting, catalogue revalidation
- Repeatable WooCommerce Store API / CSV importer with dry-run and review report
- SEO: titles, canonicals, sitemap, robots, Product/Breadcrumb JSON-LD (offers only when price is exact)

## Setup

See [SETUP.md](./SETUP.md) for environment variables and import commands.

```bash
npm install
cp env.example .env.local
npm run import:pcsuk
npm run dev
```

## Project layout

```
src/
  config/site.ts          # Brand + business settings (incl. documented conflicts)
  data/catalogue.json     # Generated catalogue
  data/catalogue.ts       # Query helpers
  contexts/QuoteContext.tsx
  pages/                  # Home, Catalogue, Product, Quote, Contact, Privacy
  components/catalogue/   # Cards, image fallback, variant picker
scripts/import-pcsuk.mjs  # Importer
reports/                  # Import + content review output
```

## Checks

```bash
npm run test
npm run lint
npm run typecheck
npm run build
```
