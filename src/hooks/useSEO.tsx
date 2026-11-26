import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL, siteConfig } from '@/config/site';

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  type?: string;
};

export const useSEO = ({
  title = `${siteConfig.brandName} — ${siteConfig.legalName}`,
  description = siteConfig.description,
  keywords = 'catering packaging, food containers, paper bags, cups, takeaway supplies, wholesale catering supplies UK',
  ogTitle,
  ogDescription,
  ogImage = siteConfig.logoPath,
  canonical,
  noindex = false,
  type = 'website',
}: SEOProps = {}) => {
  const location = useLocation();
  const fullTitle = title.includes(siteConfig.brandName)
    ? title
    : `${title} | ${siteConfig.brandName}`;
  const currentUrl = `${SITE_URL}${location.pathname}${location.search}`;
  const canonicalUrl = canonical || `${SITE_URL}${location.pathname}`;
  const absoluteImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', ogTitle || fullTitle);
    setMeta('property', 'og:description', ogDescription || description);
    setMeta('property', 'og:url', currentUrl);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', absoluteImage);
    setMeta('property', 'og:site_name', siteConfig.legalName);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', ogTitle || fullTitle);
    setMeta('name', 'twitter:description', ogDescription || description);
    setMeta('name', 'twitter:image', absoluteImage);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    canonical,
    noindex,
    type,
    location.pathname,
    location.search,
    fullTitle,
    currentUrl,
    canonicalUrl,
    absoluteImage,
  ]);
};

export default useSEO;
