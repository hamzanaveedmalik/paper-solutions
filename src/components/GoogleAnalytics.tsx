import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

type DataLayerEvent = unknown[];

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
    gtag?: (...args: DataLayerEvent) => void;
  }
}

const scriptId = 'ga4-gtag';

const GoogleAnalytics = () => {
  const location = useLocation();
  const { pathname, search, hash } = location;
  const { preferences } = useCookieConsent();
  const [isInitialized, setIsInitialized] = useState(false);
  const measurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? '').trim();
  const isDev = import.meta.env.DEV;

  // Check if analytics is enabled based on consent
  const analyticsEnabled = preferences?.analytics === true;

  // Initialize Google Analytics when consent is granted
  useEffect(() => {
    if (isDev || !measurementId || !analyticsEnabled) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.id = scriptId;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      ((...args: DataLayerEvent) => {
        window.dataLayer?.push(args);
      });

    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });
    setIsInitialized(true);
  }, [isDev, measurementId, analyticsEnabled]);

  // Track page views when analytics is enabled and initialized
  useEffect(() => {
    if (isDev || !measurementId || !analyticsEnabled || !isInitialized) {
      return;
    }

    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return;
    }

    const pagePath = `${pathname}${search}${hash}`;

    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href,
      send_to: measurementId,
    });
  }, [
    hash,
    isDev,
    measurementId,
    pathname,
    search,
    analyticsEnabled,
    isInitialized,
  ]);

  // Listen for consent changes and reload if needed
  useEffect(() => {
    const handleConsentChange = () => {
      // If consent was previously denied and now granted, page needs to reload
      // to properly initialize GA
      if (analyticsEnabled && !isInitialized) {
        window.location.reload();
      }
    };

    window.addEventListener('cookiePreferencesChanged', handleConsentChange);

    return () => {
      window.removeEventListener(
        'cookiePreferencesChanged',
        handleConsentChange
      );
    };
  }, [analyticsEnabled, isInitialized]);

  return null;
};

export default GoogleAnalytics;
