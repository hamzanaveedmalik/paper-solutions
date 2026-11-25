import { writeFileSync } from 'fs';

const baseUrl = 'https://www.forthandvale.com';

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/catalogue', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/quote', priority: '0.9', changefreq: 'monthly' },
  { path: '/sample-kit', priority: '0.8', changefreq: 'monthly' },

  // Product pages
  { path: '/products/wallets', priority: '0.9', changefreq: 'monthly' },
  { path: '/products/bags', priority: '0.9', changefreq: 'monthly' },
  { path: '/products/keychains', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/accessories', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/travel-essentials', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/office-lifestyle', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/jackets', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/gloves', priority: '0.7', changefreq: 'monthly' },

  // Service pages
  { path: '/private-labeling', priority: '0.9', changefreq: 'monthly' },
  { path: '/custom-design', priority: '0.9', changefreq: 'monthly' },
  { path: '/samples', priority: '0.8', changefreq: 'monthly' },

  // Who we serve
  { path: '/fashion-brands', priority: '0.8', changefreq: 'monthly' },
  { path: '/corporate-gifting', priority: '0.8', changefreq: 'monthly' },
  { path: '/distributors', priority: '0.8', changefreq: 'monthly' },

  // Legal pages
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
];

const lastmod = new Date().toISOString();

const urlSet = routes
  .map((route) => {
    const url = `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    return url;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlSet}\n</urlset>`;

writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully!');
