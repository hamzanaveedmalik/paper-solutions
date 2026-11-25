import { useEffect } from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbStructuredData = ({
  items,
}: BreadcrumbStructuredDataProps) => {
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('/')
          ? `https://www.forthandvale.com${item.url}`
          : item.url,
      })),
    };

    let script = document.getElementById('breadcrumb-structured-data');
    if (script) {
      script.innerHTML = JSON.stringify(structuredData);
    } else {
      script = document.createElement('script');
      script.id = 'breadcrumb-structured-data';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      script?.remove();
    };
  }, [items]);

  return null;
};

export default BreadcrumbStructuredData;
