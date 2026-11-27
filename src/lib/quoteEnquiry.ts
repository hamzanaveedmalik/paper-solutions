import { z } from 'zod';
import { getProductById, getVariant } from '@/data/catalogue';
import { formatPriceInfo } from '@/lib/pricing';
import { siteConfig } from '@/config/site';
import type { QuoteLineItem } from '@/data/types';

export const quoteEnquirySchema = z.object({
  requestType: z.enum(['quote', 'order']).optional(),
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  businessName: z.string().trim().min(2, 'Please enter your business name').max(160),
  email: z.string().trim().email('Enter a valid email address').max(160),
  phone: z.string().trim().min(7, 'Enter a contact phone number').max(40),
  postcode: z
    .string()
    .trim()
    .min(2, 'Enter a delivery postcode')
    .max(16)
    .regex(/^[A-Za-z0-9\s]+$/, 'Enter a valid UK postcode'),
  notes: z.string().trim().max(2000).optional().or(z.literal('')),
  marketingConsent: z.boolean().default(false),
  /** Honeypot — must stay empty */
  companyWebsite: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
  /** Simple timing token set when form mounts */
  formStartedAt: z.number().int().positive(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        variantId: z.string().nullable(),
        quantity: z.number().int().min(1).max(9999),
      })
    )
    .min(1, 'Add at least one product to your quote list'),
});

export type QuoteEnquiryInput = z.infer<typeof quoteEnquirySchema>;

export type QuoteEnquiryResult =
  | { success: true; reference: string; mode: 'formspree' }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string>;
      /** Present when the form validated but no delivery endpoint is configured */
      needsManualSend?: {
        reference: string;
        summary: string;
      };
    };

const RATE_KEY = 'pcsuk-quote-rate-v1';
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;

function checkRateLimit(): boolean {
  try {
    const raw = sessionStorage.getItem(RATE_KEY);
    const now = Date.now();
    const stamps: number[] = raw ? JSON.parse(raw) : [];
    const recent = stamps.filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_MAX) return false;
    recent.push(now);
    sessionStorage.setItem(RATE_KEY, JSON.stringify(recent));
    return true;
  } catch {
    return true;
  }
}

export function revalidateQuoteItems(items: QuoteLineItem[]): {
  ok: boolean;
  error?: string;
  lines: {
    productId: string;
    variantId: string | null;
    quantity: number;
    name: string;
    variantLabel: string | null;
    packLabel: string | null;
    priceLabel: string;
    sourceUrl: string;
  }[];
} {
  const lines = [];
  for (const item of items) {
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 9999) {
      return { ok: false, error: 'Choose a whole number of packs or cases between 1 and 9999.', lines: [] };
    }
    const product = getProductById(item.productId);
    if (!product) {
      return { ok: false, error: 'One or more products are no longer in the catalogue.', lines: [] };
    }
    if (product.variants.length > 0) {
      if (!item.variantId) {
        return {
          ok: false,
          error: `Select an option for ${product.name}.`,
          lines: [],
        };
      }
      const variant = getVariant(product, item.variantId);
      if (!variant) {
        return {
          ok: false,
          error: `An option for ${product.name} is no longer available.`,
          lines: [],
        };
      }
      const packQty = variant.packQuantity ?? product.packQuantity;
      const packUnit = variant.packUnit ?? product.packUnit;
      lines.push({
        productId: product.id,
        variantId: variant.id,
        quantity: item.quantity,
        name: product.name,
        variantLabel: variant.label,
        packLabel: packQty ? `${packQty} per ${packUnit || 'pack'}` : null,
        priceLabel: formatPriceInfo(variant.price),
        sourceUrl: product.sourceUrl,
      });
    } else {
      const packQty = product.packQuantity;
      const packUnit = product.packUnit;
      lines.push({
        productId: product.id,
        variantId: null,
        quantity: item.quantity,
        name: product.name,
        variantLabel: null,
        packLabel: packQty ? `${packQty} per ${packUnit || 'pack'}` : null,
        priceLabel: formatPriceInfo(product.price),
        sourceUrl: product.sourceUrl,
      });
    }
  }
  return { ok: true, lines };
}

export function buildEnquirySummary(
  data: QuoteEnquiryInput,
  lines: ReturnType<typeof revalidateQuoteItems>['lines'],
  reference: string
): string {
  const itemBlock = lines
    .map(
      (line, idx) =>
        `${idx + 1}. ${line.name}${line.variantLabel ? ` — ${line.variantLabel}` : ''}
   Qty: ${line.quantity} ${line.packLabel ? `(${line.packLabel})` : 'packs/cases'}
   Price guide: ${line.priceLabel}
   ${line.sourceUrl}`
    )
    .join('\n\n');

  return `PCS UK ${data.requestType === 'order' ? 'order request' : 'quote enquiry'}
Reference: ${reference}

Contact
- Name: ${data.name}
- Business: ${data.businessName}
- Email: ${data.email}
- Phone: ${data.phone}
- Delivery postcode: ${data.postcode}
- Marketing updates: ${data.marketingConsent ? 'Yes' : 'No'}

Notes
${data.notes?.trim() || 'None'}

Requested items
${itemBlock}

— Prepared via PCS UK catalogue (not a confirmed order)
`.trim();
}

export async function submitQuoteEnquiry(
  raw: QuoteEnquiryInput
): Promise<QuoteEnquiryResult> {
  const parsed = quoteEnquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.') || 'form';
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { success: false, error: 'Please check the form and try again.', fieldErrors };
  }

  const data = parsed.data;

  // Spam heuristics
  if (data.companyWebsite) {
    return { success: false, error: 'Unable to submit this enquiry.' };
  }
  if (Date.now() - data.formStartedAt < 2500) {
    return { success: false, error: 'Please take a moment to review your enquiry, then submit again.' };
  }
  if (!checkRateLimit()) {
    return {
      success: false,
      error: 'Too many submissions from this browser. Please wait a minute and try again.',
    };
  }

  const validated = revalidateQuoteItems(
    data.items.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      addedAt: new Date().toISOString(),
    }))
  );
  if (!validated.ok) {
    return { success: false, error: validated.error || 'Quote items could not be validated.' };
  }

  const reference = `PCS-${Date.now().toString(36).toUpperCase()}`;
  const summary = buildEnquirySummary(data, validated.lines, reference);

  const endpoint = siteConfig.formspreeEndpoint;
  if (endpoint) {
    try {
      const formData = new FormData();
      formData.append('_subject', `PCS UK ${data.requestType === 'order' ? 'order request' : 'quote enquiry'} ${reference}`);
      formData.append('_replyto', data.email);
      formData.append('reference', reference);
      formData.append('requestType', data.requestType || 'quote');
      formData.append('name', data.name);
      formData.append('businessName', data.businessName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('postcode', data.postcode);
      formData.append('notes', data.notes || '');
      formData.append('marketingConsent', data.marketingConsent ? 'Yes' : 'No');
      formData.append('items_json', JSON.stringify(validated.lines, null, 2));
      formData.append('summary', summary);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || `Submission failed (${response.status})`);
      }

      return { success: true, reference, mode: 'formspree' };
    } catch (err) {
      console.error('Quote submission failed', err);
      return {
        success: false,
        error:
          'We could not confirm delivery of your request. Check with the team before resending. You can copy the summary below for reference.',
        needsManualSend: { reference, summary },
      };
    }
  }

  // Honest fallback when delivery infrastructure is not configured —
  // do not report success; provide a copyable summary for manual email.
  return {
    success: false,
    error:
      'Enquiry delivery is not configured in this environment. Copy the summary and email it to us — nothing was submitted automatically.',
    needsManualSend: { reference, summary },
  };
}

export function isEnquiryDeliveryConfigured(): boolean {
  return Boolean(siteConfig.formspreeEndpoint);
}
