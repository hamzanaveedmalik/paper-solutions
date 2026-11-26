import { useEffect } from 'react';
import type { PriceInfo } from '@/data/types';
import { SITE_URL, siteConfig } from '@/config/site';

type ProductStructuredDataProps = {
  name: string;
  description: string;
  image?: string;
  sku?: string;
  category?: string;
  material?: string;
  price?: PriceInfo;
  url: string;
};

/**
 * Emits Product + Breadcrumb-safe JSON-LD using verified fields only.
 * Offer markup is omitted when price is unknown / request / range.
 */
export default function ProductStructuredData({
  name,
  description,
  image,
  sku,
  category,
  material,
  price,
  url,
}: ProductStructuredDataProps) {
  useEffect(() => {
    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name,
      description,
      url,
      brand: {
        '@type': 'Brand',
        name: siteConfig.legalName,
      },
    };

    if (image) {
      data.image = image.startsWith('http') ? image : `${SITE_URL}${image}`;
    }
    if (sku) data.sku = sku;
    if (category) data.category = category;
    if (material) {
      data.material = material;
    }

    if (price?.kind === 'exact') {
      data.offers = {
        '@type': 'Offer',
        priceCurrency: price.money.currency,
        price: (price.money.amountMinor / 100).toFixed(2),
        url,
        availability: 'https://schema.org/InStock',
      };
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'pcsuk-product-jsonld';
    script.text = JSON.stringify(data);
    document.getElementById('pcsuk-product-jsonld')?.remove();
    document.head.appendChild(script);

    return () => {
      document.getElementById('pcsuk-product-jsonld')?.remove();
    };
  }, [name, description, image, sku, category, material, price, url]);

  return null;
}
