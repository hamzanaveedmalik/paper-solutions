import { useEffect } from 'react';

interface ProductStructuredDataProps {
  name: string;
  description: string;
  image?: string;
  sku?: string;
  priceCurrency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  category?: string;
  brand?: string;
  manufacturer?: string;
  material?: string;
}

export const ProductStructuredData = ({
  name,
  description,
  image,
  sku,
  priceCurrency = 'USD',
  availability = 'InStock',
  category,
  brand = 'Forth & Vale',
  manufacturer = 'Forth & Vale',
  material = 'Premium Leather',
}: ProductStructuredDataProps) => {
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name,
      description,
      ...(image && {
        image: image.startsWith('/')
          ? `https://www.forthandvale.com${image}`
          : image,
      }),
      ...(sku && { sku }),
      ...(category && { category }),
      brand: {
        '@type': 'Brand',
        name: brand,
      },
      manufacturer: {
        '@type': 'Organization',
        name: manufacturer,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency,
        availability: `https://schema.org/${availability}`,
        itemCondition: 'https://schema.org/NewCondition',
      },
      ...(material && {
        material: material,
      }),
    };

    let script = document.getElementById('product-structured-data');
    if (script) {
      script.innerHTML = JSON.stringify(structuredData);
    } else {
      script = document.createElement('script');
      script.id = 'product-structured-data';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      script?.remove();
    };
  }, [
    name,
    description,
    image,
    sku,
    category,
    brand,
    manufacturer,
    material,
    priceCurrency,
    availability,
  ]);

  return null;
};

export default ProductStructuredData;
