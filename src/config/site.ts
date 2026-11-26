/**
 * Centralised PCS UK business and site configuration.
 * Unconfirmed values must not be used in customer-facing delivery/shipping claims.
 */

export type ContactNumberSource = {
  value: string;
  source: string;
  note: string;
};

export type DeliveryClaim = {
  claim: string;
  source: string;
  status: 'unconfirmed' | 'conflict' | 'verified';
};

export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://pcsuk.co.uk';

export const siteConfig = {
  brandName: 'PCS UK',
  legalName: 'Premium Catering Supplies',
  tagline: 'Catering packaging for your everyday service.',
  description:
    'Browse food containers, bags, cups and catering essentials. Build your list and request a quote.',
  email: 'Office@pcsuk.co.uk',
  address: {
    line1: 'Unit 2, North Street',
    city: 'Walsall',
    postcode: 'WS2 8AU',
    country: 'United Kingdom',
  },
  hours: {
    weekdays: 'Monday – Friday: 9:00 – 17:00',
    weekend: 'Saturday – Sunday: Closed',
  },
  /**
   * Conflicting phone numbers found on pcsuk.co.uk (header vs footer).
   * Do not pick one silently for “Call us” CTAs until confirmed.
   */
  phoneNumbers: [
    {
      value: '07479 311847',
      source: 'Homepage header (“Call Us”)',
      note: 'Displayed prominently in the site header.',
    },
    {
      value: '07359 638847',
      source: 'Homepage footer / store location block',
      note: 'Displayed next to the store location section.',
    },
  ] satisfies ContactNumberSource[],
  /**
   * Delivery / shipping claims seen on source site — conflicting and unverified.
   * Customer-facing copy must stay neutral until business confirms rules.
   */
  deliveryClaims: [
    {
      claim: 'Free delivery over £59',
      source: 'Homepage “100% Secure Payment” feature strip',
      status: 'conflict',
    },
    {
      claim: 'Other delivery thresholds may appear elsewhere on the source site',
      source: 'Content review note — confirm before publishing shipping promises',
      status: 'unconfirmed',
    },
  ] satisfies DeliveryClaim[],
  currency: 'GBP' as const,
  currencySymbol: '£',
  privacyPath: '/privacy-policy',
  sourceSite: 'https://pcsuk.co.uk',
  logoPath: '/brand/pcsuk-logo.png',
  faviconPath: '/brand/favicon.png',
  formspreeEndpoint:
    (import.meta.env.VITE_FORMSPREE_QUOTES_ENDPOINT as string | undefined) || '',
  enquiryEmail:
    (import.meta.env.VITE_ENQUIRY_EMAIL as string | undefined) ||
    'Office@pcsuk.co.uk',
} as const;

export function formatAddress(): string {
  const { line1, city, postcode } = siteConfig.address;
  return `${line1}, ${city}, ${postcode}`;
}

export function phoneDisplayNeutral(): string {
  return 'Phone numbers currently differ across the source website — please use email or the contact form and we will confirm the best number to call.';
}
