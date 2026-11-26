#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const siteUrl = (process.env.VITE_SITE_URL || 'https://pcsuk.co.uk').replace(/\/$/, '');
const catalogue = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/catalogue.json'), 'utf8')
);

const urls = [
  { loc: '/', priority: '1.0' },
  { loc: '/catalogue', priority: '0.9' },
  { loc: '/quote', priority: '0.7' },
  { loc: '/contact', priority: '0.6' },
  { loc: '/privacy-policy', priority: '0.3' },
];

for (const category of catalogue.categories) {
  urls.push({
    loc: `/catalogue?category=${encodeURIComponent(category.slug)}`,
    priority: '0.7',
  });
}

for (const product of catalogue.products) {
  urls.push({
    loc: `/products/${product.slug}`,
    priority: '0.8',
  });
}

const today = new Date().toISOString().slice(0, 10);
const body = urls
  .map(
    (u) => `  <url>
    <loc>${siteUrl}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
console.log(`Wrote sitemap with ${urls.length} URLs`);
