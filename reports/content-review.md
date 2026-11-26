# PCS UK content review

Generated: 2026-11-25T22:37:50.898Z
Source: woocommerce-store-api-cache

## Counts
- Products in: 82
- Products out: 82
- Variations in: 136
- Variations out: 136
- Categories: 11
- Zero/missing prices → Request price: 21
- Ambiguous pricing: 1
- Conflicting information: 2
- Missing images: 0
- Duplicates skipped: 0

## Business conflicts (do not silently resolve)
- Phone (header): 07479 311847
- Phone (footer): 07359 638847
- Delivery claim seen: “Free delivery over £59” on homepage feature strip — treat as unconfirmed; do not advertise free shipping thresholds until confirmed.

## Conflicting product pricing
- product:greaseproof-sheets: prices.price is 0 but price_html suggests £9.99. Using Request price.
- product:newsoffcuts: prices.price is 0 but price_html suggests £8.99. Using Request price.

## Ambiguous pricing
- product:round-kraft-bowls-pack-of-300: Structured price is 0 but price_range is 1899-2499; using range.

## Missing images
_None_

## Notes
- Source site has no product_cat “Packaging” in the Store API. Listed categories preserved without fabricating a Packaging category.
- Images retained as remote pcsuk.co.uk URLs. Re-run with --download-images when network access to the origin is available.

## Categories not present on source
- “Packaging” was listed in the project brief but is not a Store API product category on pcsuk.co.uk.
