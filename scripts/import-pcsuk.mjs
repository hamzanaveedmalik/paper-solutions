#!/usr/bin/env node
/**
 * PCS UK catalogue importer
 *
 * Sources (in priority order when flags allow):
 *  1. Live WooCommerce Store API (default when --fetch)
 *  2. Cached JSON under data/raw-wc-*.json
 *  3. WooCommerce product CSV export (--csv path)
 *
 * Usage:
 *   node scripts/import-pcsuk.mjs [--dry-run] [--fetch] [--csv path] [--download-images]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const doFetch = args.includes('--fetch');
const downloadImages = args.includes('--download-images');
const csvIdx = args.indexOf('--csv');
const csvPath = csvIdx >= 0 ? args[csvIdx + 1] : null;

const SOURCE_BASE = 'https://pcsuk.co.uk';
const STORE_API = `${SOURCE_BASE}/wp-json/wc/store/v1`;

const DISPLAY_NAMES = {
  'bagasse-packaging': 'Bagasse Packaging',
  'cups-accessories': 'Cups & Accessories',
  'cutlery-napkins': 'Cutlery & Napkins',
  extras: 'Extras',
  'fish-chips': 'Fish & Chips',
  'food-containers-and-sauce-pots': 'Food Containers & Sauce Pots',
  'paper-bags': 'Paper Bags',
  packaging: 'Packaging',
  'paper-boxes': 'Paper Boxes',
  'pizza-boxes': 'Pizza Boxes',
  'paper-straws': 'Paper Straws',
  'wrapping-paper': 'Wrapping Paper',
};

const FEATURED_SLUGS = [
  'plain-brown-fish-and-chips-boxes',
  'brown-grab-delivery-bags',
  'pp-hinged-sauce-pots',
  'pp-rectangular-container',
  'black-medium-large-twisted-handle-bag',
  'birchwood-cutlery-kit-3-in-1-recyclable-compostable-case-of-250',
  '12oz-black-ripple-cups',
  'pizza-box',
];

const report = {
  startedAt: new Date().toISOString(),
  mode: dryRun ? 'dry-run' : 'write',
  source: null,
  counts: {
    productsIn: 0,
    productsOut: 0,
    variationsIn: 0,
    variationsOut: 0,
    categories: 0,
    skipped: 0,
    duplicates: 0,
    missingImages: 0,
    ambiguousPricing: 0,
    conflictingInfo: 0,
    zeroPricesTreatedAsRequest: 0,
    imagesDownloaded: 0,
    imagesFailed: 0,
  },
  skipped: [],
  conflicts: [],
  ambiguousPricing: [],
  missingImages: [],
  notes: [],
};

function stripHtml(html) {
  if (!html) return null;
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim() || null;
}

function parseMinor(raw, minorUnit = 2) {
  if (raw === null || raw === undefined || raw === '') return null;
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  return Math.round(n);
}

function money(amountMinor, currency = 'GBP', minorUnit = 2) {
  return { amountMinor, currency, minorUnit };
}

function parsePriceHtmlAmount(html) {
  if (!html) return null;
  const text = stripHtml(html) || '';
  const matches = [...text.matchAll(/£\s*([\d,.]+)/g)].map((m) =>
    Math.round(parseFloat(m[1].replace(/,/g, '')) * 100)
  );
  const valid = matches.filter((n) => Number.isFinite(n));
  return valid.length ? valid : null;
}

function buildPrice(prices, priceHtml, contextLabel) {
  const minorUnit = prices?.currency_minor_unit ?? 2;
  const currency = prices?.currency_code || 'GBP';
  const raw = parseMinor(prices?.price, minorUnit);
  const range = prices?.price_range;
  const minR = range ? parseMinor(range.min_amount, minorUnit) : null;
  const maxR = range ? parseMinor(range.max_amount, minorUnit) : null;
  const htmlAmounts = parsePriceHtmlAmount(priceHtml);

  // Valid range with positive bounds takes precedence for variable display
  if (minR !== null && maxR !== null && minR > 0 && maxR > 0) {
    if (raw === 0) {
      report.ambiguousPricing.push({
        item: contextLabel,
        detail: `Structured price is 0 but price_range is ${minR}-${maxR}; using range.`,
      });
      report.counts.ambiguousPricing += 1;
    }
    if (minR === maxR) {
      return { kind: 'exact', money: money(minR, currency, minorUnit), source: 'price_range' };
    }
    return {
      kind: 'range',
      min: money(minR, currency, minorUnit),
      max: money(maxR, currency, minorUnit),
      source: 'price_range',
    };
  }

  if (raw === null || raw === 0) {
    if (htmlAmounts && htmlAmounts.some((a) => a > 0)) {
      report.conflicts.push({
        item: contextLabel,
        detail: `prices.price is ${raw ?? 'null'} but price_html suggests £${(htmlAmounts[0] / 100).toFixed(2)}. Using Request price.`,
      });
      report.counts.conflictingInfo += 1;
    }
    report.counts.zeroPricesTreatedAsRequest += 1;
    return {
      kind: 'request',
      reason: raw === 0 ? 'Source listed £0.00 / zero structured price' : 'Missing structured price',
    };
  }

  return {
    kind: 'exact',
    money: money(raw, currency, minorUnit),
    source: 'prices.price',
  };
}

function inferPack(text) {
  if (!text) return { packQuantity: null, packUnit: null };
  const caseMatch = text.match(/case\s+of\s+(\d+)/i) || text.match(/\(case\s+of\s+(\d+)\)/i);
  if (caseMatch) return { packQuantity: Number(caseMatch[1]), packUnit: 'case' };
  const packMatch = text.match(/pack\s+of\s+(\d+)/i) || text.match(/x\s*(\d+)\b/i);
  if (packMatch) return { packQuantity: Number(packMatch[1]), packUnit: 'pack' };
  return { packQuantity: null, packUnit: null };
}

function inferMaterial(attrs, text) {
  const fromAttr = attrs.find((a) => /material/i.test(a.name));
  if (fromAttr?.options?.[0]) return fromAttr.options.join(', ');
  const t = text || '';
  if (/bagasse/i.test(t)) return 'Bagasse';
  if (/kraft/i.test(t)) return 'Kraft paper';
  if (/nitrile/i.test(t)) return 'Nitrile';
  if (/vinyl/i.test(t)) return 'Vinyl';
  if (/pet\b/i.test(t)) return 'PET';
  if (/pp\b|polypropylene/i.test(t)) return 'PP';
  if (/birchwood|wood/i.test(t)) return 'Wood';
  return null;
}

function inferColour(attrs, text) {
  const fromAttr = attrs.find((a) => /colou?r/i.test(a.name));
  if (fromAttr?.options?.[0]) return fromAttr.options.join(', ');
  const t = (text || '').toLowerCase();
  const colours = ['black', 'white', 'brown', 'blue', 'green', 'red', 'kraft', 'clear'];
  const found = colours.filter((c) => t.includes(c));
  return found.length ? found.join(', ') : null;
}

function inferCapacity(text) {
  if (!text) return null;
  const m = text.match(/(\d+(?:\.\d+)?\s?(?:ml|l|oz)\b)/i);
  return m ? m[1].replace(/\s+/g, ' ') : null;
}

function inferDimensions(text, formatted) {
  if (formatted && formatted !== 'N/A') return formatted;
  if (!text) return null;
  const m = text.match(/(\d+(?:\.\d+)?\s*[x×]\s*\d+(?:\.\d+)?(?:\s*[x×]\s*\d+(?:\.\d+)?)?\s*(?:cm|mm|in|")?)/i);
  return m ? m[1].replace(/×/g, 'x') : null;
}

function audienceTags(name, cats) {
  const tags = new Set();
  const blob = `${name} ${cats.join(' ')}`.toLowerCase();
  if (/cup|lid|coffee|sauce|napkin|straw/.test(blob)) tags.add('cafes');
  if (/fish|chip|pizza|burger|foil|delivery bag|carrier|takeaway/.test(blob)) tags.add('takeaways');
  if (/container|box|cutlery|tray|bowl/.test(blob)) tags.add('restaurants');
  if (/case of|bulk|bin bag|gloves|wrapping/.test(blob)) tags.add('caterers');
  if (!tags.size) {
    tags.add('cafes');
    tags.add('restaurants');
  }
  return [...tags];
}

function mapImages(images = []) {
  if (!images.length) {
    report.counts.missingImages += 1;
    return [];
  }
  return images.map((img) => ({
    src: img.src,
    alt: img.alt || img.name || '',
    sourceUrl: img.src,
    localPath: undefined,
  }));
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'PCS-UK-Catalogue-Importer/1.0',
    },
  });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} ${url}`);
  return res.json();
}

async function loadFromApi() {
  report.source = 'woocommerce-store-api-live';
  const categories = await fetchJson(`${STORE_API}/products/categories?per_page=100`);
  let page = 1;
  const products = [];
  while (true) {
    const batch = await fetchJson(`${STORE_API}/products?per_page=100&page=${page}`);
    if (!batch.length) break;
    products.push(...batch);
    page += 1;
  }
  page = 1;
  const variations = [];
  while (true) {
    const batch = await fetchJson(
      `${STORE_API}/products?type=variation&per_page=100&page=${page}`
    );
    if (!batch.length) break;
    variations.push(...batch);
    page += 1;
  }
  return { categories, products, variations };
}

function loadFromCache() {
  report.source = 'woocommerce-store-api-cache';
  const products = JSON.parse(
    fs.readFileSync(path.join(root, 'data/raw-wc-products.json'), 'utf8')
  );
  const variations = JSON.parse(
    fs.readFileSync(path.join(root, 'data/raw-wc-variations.json'), 'utf8')
  );
  const catPath = path.join(root, 'data/raw-wc-categories.json');
  let categories = [];
  if (fs.existsSync(catPath)) {
    categories = JSON.parse(fs.readFileSync(catPath, 'utf8'));
  }
  return { categories, products, variations };
}

function parseCsv(content) {
  const rows = [];
  let i = 0;
  let field = '';
  let row = [];
  let inQuotes = false;
  while (i < content.length) {
    const c = content[i];
    if (inQuotes) {
      if (c === '"') {
        if (content[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += c;
      i += 1;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (c === ',') {
      row.push(field);
      field = '';
      i += 1;
      continue;
    }
    if (c === '\n' || c === '\r') {
      if (c === '\r' && content[i + 1] === '\n') i += 1;
      row.push(field);
      field = '';
      if (row.some((cell) => cell.trim() !== '')) rows.push(row);
      row = [];
      i += 1;
      continue;
    }
    field += c;
    i += 1;
  }
  if (field.length || row.length) {
    row.push(field);
    if (row.some((cell) => cell.trim() !== '')) rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = r[idx] ?? '';
    });
    return obj;
  });
}

function loadFromCsv(filePath) {
  report.source = 'woocommerce-csv';
  report.notes.push(
    'CSV import used. Variation-level pricing depends on CSV columns; missing fields stay unknown.'
  );
  const content = fs.readFileSync(filePath, 'utf8');
  const rows = parseCsv(content);
  const products = [];
  const variations = [];
  const categoriesMap = new Map();

  for (const row of rows) {
    const type = (row.Type || row.type || 'simple').toLowerCase();
    const id = Number(row.ID || row.Id || row.id);
    if (!id) {
      report.skipped.push({ reason: 'Missing ID', row: row.Name || row.name });
      report.counts.skipped += 1;
      continue;
    }
    const cats = String(row.Categories || row.categories || '')
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    cats.forEach((name) => {
      const slug = name
        .toLowerCase()
        .replace(/&/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      if (!categoriesMap.has(slug)) {
        categoriesMap.set(slug, {
          id: categoriesMap.size + 1,
          name,
          slug,
          description: '',
          parent: 0,
          count: 0,
          image: null,
          permalink: `${SOURCE_BASE}/product-category/${slug}/`,
        });
      }
      categoriesMap.get(slug).count += 1;
    });

    const price = String(row['Regular price'] || row.price || row.Price || '').replace(/[£,]/g, '');
    const sale = String(row['Sale price'] || row.sale_price || '').replace(/[£,]/g, '');
    const amount = sale || price;
    const amountMinor = amount ? Math.round(parseFloat(amount) * 100) : 0;
    const images = String(row.Images || row.images || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((src) => ({ id: 0, src, name: '', alt: '' }));

    if (type === 'variation') {
      variations.push({
        id,
        parent: Number(row.Parent || row.parent || 0),
        name: row.Name || row.name || '',
        variation: row.Name || '',
        sku: row.SKU || row.sku || '',
        prices: {
          price: String(amountMinor),
          regular_price: String(amountMinor),
          sale_price: String(amountMinor),
          price_range: null,
          currency_code: 'GBP',
          currency_minor_unit: 2,
        },
        price_html: amount ? `£${(amountMinor / 100).toFixed(2)}` : '',
        images,
        attributes: [],
        is_in_stock: (row.Stock || row.stock || '1') !== '0',
        permalink: row['Product URL'] || '',
      });
      continue;
    }

    products.push({
      id,
      name: row.Name || row.name || '',
      slug: row.Slug || row.slug || String(id),
      type: type === 'variable' ? 'variable' : 'simple',
      sku: row.SKU || row.sku || '',
      description: row.Description || row.description || '',
      short_description: row['Short description'] || '',
      permalink: row['Product URL'] || `${SOURCE_BASE}/product/${row.Slug || id}/`,
      categories: cats.map((name) => {
        const slug = name
          .toLowerCase()
          .replace(/&/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        return { id: 0, name, slug };
      }),
      images,
      attributes: [],
      variations: [],
      prices: {
        price: String(amountMinor),
        regular_price: String(amountMinor),
        sale_price: String(amountMinor),
        price_range: null,
        currency_code: 'GBP',
        currency_minor_unit: 2,
      },
      price_html: amount ? `£${(amountMinor / 100).toFixed(2)}` : '',
      is_in_stock: true,
      has_options: type === 'variable',
      dimensions: { length: '', width: '', height: '' },
      formatted_dimensions: 'N/A',
    });
  }

  return {
    categories: [...categoriesMap.values()],
    products,
    variations,
  };
}

function transform({ categories, products, variations }) {
  report.counts.productsIn = products.length;
  report.counts.variationsIn = variations.length;

  const variationsByParent = new Map();
  for (const v of variations) {
    const list = variationsByParent.get(v.parent) || [];
    list.push(v);
    variationsByParent.set(v.parent, list);
  }

  const seenSlugs = new Set();
  const outProducts = [];
  const redirects = [];

  for (const p of products) {
    if (p.type === 'variation') continue;
    const slug = p.slug || String(p.id);
    if (seenSlugs.has(slug)) {
      report.counts.duplicates += 1;
      report.skipped.push({ reason: 'Duplicate slug', slug, id: p.id });
      continue;
    }
    seenSlugs.add(slug);

    const attrs = (p.attributes || []).map((a) => ({
      name: a.name,
      options: (a.terms || a.options || []).map((t) => (typeof t === 'string' ? t : t.name)),
    }));

    const descText = stripHtml(p.description);
    const shortText = stripHtml(p.short_description);
    const blob = `${p.name} ${descText || ''} ${shortText || ''}`;
    const pack = inferPack(blob);
    const images = mapImages(p.images);
    if (!images.length) {
      report.missingImages.push({ id: p.id, name: p.name, slug });
    }

    const reviewFlags = [];
    const parentPrice = buildPrice(p.prices, p.price_html, `product:${slug}`);

    const childVars = variationsByParent.get(p.id) || [];
    // Also honour embedded variation stubs without prices
    const embedded = p.variations || [];
    const byId = new Map(childVars.map((v) => [v.id, v]));
    for (const stub of embedded) {
      if (!byId.has(stub.id)) {
        byId.set(stub.id, {
          id: stub.id,
          parent: p.id,
          name: p.name,
          variation: (stub.attributes || [])
            .map((a) => `${a.name}: ${a.value}`)
            .join(', '),
          sku: '',
          prices: p.prices,
          price_html: p.price_html,
          images: p.images,
          attributes: stub.attributes || [],
          is_in_stock: null,
          permalink: p.permalink,
          _incomplete: true,
        });
      }
    }

    const mappedVariants = [...byId.values()].map((v) => {
      const label =
        v.variation ||
        (Array.isArray(v.attributes)
          ? v.attributes.map((a) => a.value || a.option || '').filter(Boolean).join(' / ')
          : '') ||
        `Variant ${v.id}`;
      const vPrice = v._incomplete
        ? { kind: 'request', reason: 'Variation price not available in source payload' }
        : buildPrice(v.prices, v.price_html, `variation:${slug}:${v.id}`);
      if (v._incomplete) {
        report.ambiguousPricing.push({
          item: `${slug}#${v.id}`,
          detail: 'Variation present without full Store API price payload',
        });
        report.counts.ambiguousPricing += 1;
      }
      const vPack = inferPack(`${label} ${p.name}`);
      report.counts.variationsOut += 1;
      return {
        id: `var-${v.id}`,
        sourceVariationId: v.id,
        label,
        sku: v.sku || null,
        attributes: Array.isArray(v.attributes)
          ? v.attributes.map((a) => ({
              name: a.name,
              value: a.value || a.option || '',
            }))
          : [],
        price: vPrice,
        images: mapImages(v.images?.length ? v.images : p.images),
        packQuantity: vPack.packQuantity ?? pack.packQuantity,
        packUnit: vPack.packUnit ?? pack.packUnit,
        isInStock: typeof v.is_in_stock === 'boolean' ? v.is_in_stock : null,
      };
    });

    if (parentPrice.kind === 'request') reviewFlags.push('request-price');
    if (!images.length) reviewFlags.push('missing-image');

    const categorySlugs = (p.categories || []).map((c) => c.slug);
    const product = {
      id: `prod-${p.id}`,
      sourceProductId: p.id,
      slug,
      name: p.name,
      sourceUrl: p.permalink || `${SOURCE_BASE}/product/${slug}/`,
      sku: p.sku || null,
      descriptionHtml: p.description || null,
      descriptionText: descText,
      shortDescriptionText: shortText,
      categorySlugs,
      primaryCategorySlug: categorySlugs[0] || null,
      images,
      material: inferMaterial(attrs, blob),
      colour: inferColour(attrs, blob),
      dimensions: inferDimensions(blob, p.formatted_dimensions),
      capacity: inferCapacity(blob),
      packQuantity: pack.packQuantity,
      packUnit: pack.packUnit,
      attributes: attrs,
      variants: mappedVariants,
      price: parentPrice,
      featured: FEATURED_SLUGS.includes(slug),
      audienceTags: audienceTags(p.name, categorySlugs),
      provenance: {
        importedAt: new Date().toISOString(),
        source: report.source.includes('csv') ? 'woocommerce-csv' : 'woocommerce-store-api',
      },
      reviewFlags,
    };

    outProducts.push(product);
    redirects.push({
      from: `/product/${slug}/`,
      to: `/products/${slug}`,
    });
    redirects.push({
      from: `/product/${slug}`,
      to: `/products/${slug}`,
    });
  }

  const catCounts = new Map();
  for (const p of outProducts) {
    for (const s of p.categorySlugs) {
      catCounts.set(s, (catCounts.get(s) || 0) + 1);
    }
  }

  const outCategories = (categories.length
    ? categories
    : [...catCounts.keys()].map((slug) => ({
        id: null,
        name: DISPLAY_NAMES[slug] || slug,
        slug,
        description: '',
        permalink: `${SOURCE_BASE}/product-category/${slug}/`,
        image: null,
        count: catCounts.get(slug) || 0,
      }))
  ).map((c) => {
    const image = c.image?.src
      ? {
          src: c.image.src,
          alt: c.image.alt || c.name,
          sourceUrl: c.image.src,
        }
      : null;
    // Prefer a product image when category has no image
    let resolvedImage = image;
    if (!resolvedImage) {
      const sample = outProducts.find((p) => p.categorySlugs.includes(c.slug) && p.images[0]);
      if (sample) {
        resolvedImage = {
          ...sample.images[0],
          alt: `${DISPLAY_NAMES[c.slug] || c.name} category`,
        };
      }
    }
    return {
      id: `cat-${c.id ?? c.slug}`,
      sourceCategoryId: c.id ?? null,
      slug: c.slug,
      name: c.name,
      displayName: DISPLAY_NAMES[c.slug] || c.name,
      description: stripHtml(c.description),
      sourceUrl: c.permalink || null,
      image: resolvedImage,
      productCount: catCounts.get(c.slug) || c.count || 0,
    };
  });

  // Document missing "Packaging" category from the brief
  if (!outCategories.some((c) => c.slug === 'packaging')) {
    report.notes.push(
      'Source site has no product_cat “Packaging” in the Store API. Listed categories preserved without fabricating a Packaging category.'
    );
  }

  report.counts.productsOut = outProducts.length;
  report.counts.categories = outCategories.length;

  for (const c of outCategories) {
    redirects.push({
      from: `/product-category/${c.slug}/`,
      to: `/catalogue?category=${c.slug}`,
    });
    redirects.push({
      from: `/product-category/${c.slug}`,
      to: `/catalogue?category=${c.slug}`,
    });
  }

  return {
    version: 1,
    importedAt: new Date().toISOString(),
    source: report.source,
    categories: outCategories.sort((a, b) => a.displayName.localeCompare(b.displayName)),
    products: outProducts.sort((a, b) => a.name.localeCompare(b.name)),
    redirects,
  };
}

async function maybeDownloadImages(catalogue) {
  if (!downloadImages) {
    report.notes.push(
      'Images retained as remote pcsuk.co.uk URLs. Re-run with --download-images when network access to the origin is available.'
    );
    return;
  }
  const dir = path.join(root, 'public/catalogue/images');
  fs.mkdirSync(dir, { recursive: true });
  const seen = new Set();
  for (const p of catalogue.products) {
    for (const img of [...p.images, ...p.variants.flatMap((v) => v.images)]) {
      if (!img.src || seen.has(img.src)) continue;
      seen.add(img.src);
      try {
        const ext = path.extname(new URL(img.src).pathname) || '.jpg';
        const file = `${p.sourceProductId}-${seen.size}${ext}`;
        const dest = path.join(dir, file);
        const res = await fetch(img.src, {
          headers: { Referer: SOURCE_BASE, 'User-Agent': 'PCS-UK-Catalogue-Importer/1.0' },
        });
        if (!res.ok) throw new Error(String(res.status));
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buf);
        img.localPath = `/catalogue/images/${file}`;
        img.src = img.localPath;
        report.counts.imagesDownloaded += 1;
      } catch (err) {
        report.counts.imagesFailed += 1;
        report.notes.push(`Image download failed for ${img.sourceUrl}: ${err.message || err}`);
      }
    }
  }
}

function writeOutputs(catalogue) {
  const dataDir = path.join(root, 'src/data');
  const reportsDir = path.join(root, 'reports');
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.mkdirSync(path.join(root, 'data'), { recursive: true });

  const cataloguePath = path.join(dataDir, 'catalogue.json');
  const reportPath = path.join(reportsDir, 'import-report.json');
  const markdownPath = path.join(reportsDir, 'content-review.md');

  if (dryRun) {
    console.log('[dry-run] Would write', cataloguePath);
    console.log(JSON.stringify(report.counts, null, 2));
    return;
  }

  fs.writeFileSync(cataloguePath, JSON.stringify(catalogue, null, 2));
  fs.writeFileSync(path.join(root, 'data/catalogue.snapshot.json'), JSON.stringify(catalogue, null, 2));
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  const md = `# PCS UK content review

Generated: ${report.startedAt}
Source: ${report.source}

## Counts
- Products in: ${report.counts.productsIn}
- Products out: ${report.counts.productsOut}
- Variations in: ${report.counts.variationsIn}
- Variations out: ${report.counts.variationsOut}
- Categories: ${report.counts.categories}
- Zero/missing prices → Request price: ${report.counts.zeroPricesTreatedAsRequest}
- Ambiguous pricing: ${report.counts.ambiguousPricing}
- Conflicting information: ${report.counts.conflictingInfo}
- Missing images: ${report.counts.missingImages}
- Duplicates skipped: ${report.counts.duplicates}

## Business conflicts (do not silently resolve)
- Phone (header): 07479 311847
- Phone (footer): 07359 638847
- Delivery claim seen: “Free delivery over £59” on homepage feature strip — treat as unconfirmed; do not advertise free shipping thresholds until confirmed.

## Conflicting product pricing
${report.conflicts.map((c) => `- ${c.item}: ${c.detail}`).join('\n') || '_None_'}

## Ambiguous pricing
${report.ambiguousPricing.map((c) => `- ${c.item}: ${c.detail}`).join('\n') || '_None_'}

## Missing images
${report.missingImages.map((m) => `- ${m.slug} (${m.id})`).join('\n') || '_None_'}

## Notes
${report.notes.map((n) => `- ${n}`).join('\n') || '_None_'}

## Categories not present on source
- “Packaging” was listed in the project brief but is not a Store API product category on pcsuk.co.uk.
`;

  fs.writeFileSync(markdownPath, md);
  console.log('Wrote', cataloguePath);
  console.log('Wrote', reportPath);
  console.log('Wrote', markdownPath);
  console.log(JSON.stringify(report.counts, null, 2));
}

async function main() {
  let payload;
  if (csvPath) {
    payload = loadFromCsv(path.resolve(csvPath));
  } else if (doFetch) {
    try {
      payload = await loadFromApi();
      fs.mkdirSync(path.join(root, 'data'), { recursive: true });
      fs.writeFileSync(
        path.join(root, 'data/raw-wc-products.json'),
        JSON.stringify(payload.products)
      );
      fs.writeFileSync(
        path.join(root, 'data/raw-wc-variations.json'),
        JSON.stringify(payload.variations)
      );
      fs.writeFileSync(
        path.join(root, 'data/raw-wc-categories.json'),
        JSON.stringify(payload.categories)
      );
    } catch (err) {
      console.error('Live fetch failed, falling back to cache:', err.message || err);
      report.notes.push(`Live fetch failed: ${err.message || err}`);
      payload = loadFromCache();
    }
  } else {
    payload = loadFromCache();
  }

  // Persist categories cache if missing
  if (payload.categories?.length) {
    fs.writeFileSync(
      path.join(root, 'data/raw-wc-categories.json'),
      JSON.stringify(payload.categories, null, 2)
    );
  }

  const catalogue = transform(payload);
  await maybeDownloadImages(catalogue);
  writeOutputs(catalogue);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
