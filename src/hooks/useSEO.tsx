import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  type?: string;
}

export const useSEO = ({
  title = 'Forth & Vale — Premium Leather Goods Manufacturing',
  description = 'Forth & Vale designs and manufactures premium leather wallets, card holders, belts, bags and accessories. OEM/Private Label for brands in the UK, EU & USA.',
  keywords = 'leather goods, premium leather, wallets, bags, OEM manufacturing, private label, leather accessories, custom leather products, UK leather manufacturer',
  ogTitle,
  ogDescription,
  ogImage = '/forth-vale-logo.png',
  canonical,
  noindex = false,
  type = 'website',
}: SEOProps = {}) => {
  const location = useLocation();
  const fullTitle = title.includes('Forth') ? title : `${title} | Forth & Vale`;
  const currentUrl = `https://www.forthandvale.com${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;

  useEffect(() => {
    // Update title
    document.title = fullTitle;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Update or create robots meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute(
      'content',
      noindex ? 'noindex, nofollow' : 'index, follow'
    );

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update Open Graph tags
    const ogTags = {
      'og:title': ogTitle || fullTitle,
      'og:description': ogDescription || description,
      'og:url': currentUrl,
      'og:type': type,
      'og:image': `https://www.forthandvale.com${ogImage}`,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let metaOg = document.querySelector(`meta[property="${property}"]`);
      if (!metaOg) {
        metaOg = document.createElement('meta');
        metaOg.setAttribute('property', property);
        document.head.appendChild(metaOg);
      }
      metaOg.setAttribute('content', content);
    });

    // Update Twitter Card tags
    const twitterTags = {
      'twitter:title': ogTitle || fullTitle,
      'twitter:description': ogDescription || description,
      'twitter:image': `https://www.forthandvale.com${ogImage}`,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let metaTwitter = document.querySelector(`meta[name="${name}"]`);
      if (!metaTwitter) {
        metaTwitter = document.createElement('meta');
        metaTwitter.setAttribute('name', name);
        document.head.appendChild(metaTwitter);
      }
      metaTwitter.setAttribute('content', content);
    });
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
    fullTitle,
    currentUrl,
    canonicalUrl,
  ]);
};

export default useSEO;
