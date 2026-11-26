import { useEffect } from 'react';

type Crumb = { name: string; url: string };

export default function BreadcrumbStructuredData({ items }: { items: Crumb[] }) {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'pcsuk-breadcrumb-jsonld';
    script.text = JSON.stringify(data);
    document.getElementById('pcsuk-breadcrumb-jsonld')?.remove();
    document.head.appendChild(script);

    return () => {
      document.getElementById('pcsuk-breadcrumb-jsonld')?.remove();
    };
  }, [items]);

  return null;
}
