import { describe, expect, it } from 'vitest';
import { quoteEnquirySchema, revalidateQuoteItems } from './quoteEnquiry';
import { getProducts } from '@/data/catalogue';

describe('quoteEnquirySchema', () => {
  it('requires core contact fields and at least one item', () => {
    const result = quoteEnquirySchema.safeParse({
      name: 'A',
      businessName: 'Cafe',
      email: 'not-an-email',
      phone: '123',
      postcode: 'WS2 8AU',
      formStartedAt: Date.now(),
      items: [],
    });
    expect(result.success).toBe(false);
  });

  it('accepts a valid payload shape', () => {
    const product = getProducts()[0];
    const result = quoteEnquirySchema.safeParse({
      name: 'Alex Example',
      businessName: 'Example Cafe',
      email: 'alex@example.com',
      phone: '07123456789',
      postcode: 'WS2 8AU',
      notes: '',
      marketingConsent: false,
      companyWebsite: '',
      formStartedAt: Date.now() - 5000,
      items: [
        {
          productId: product.id,
          variantId: product.variants[0]?.id || null,
          quantity: 2,
        },
      ],
    });
    expect(result.success).toBe(true);
  });
});

describe('revalidateQuoteItems', () => {
  it('rejects unknown product ids', () => {
    const result = revalidateQuoteItems([
      { productId: 'prod-does-not-exist', variantId: null, quantity: 1, addedAt: new Date().toISOString() },
    ]);
    expect(result.ok).toBe(false);
  });

  it('requires a variant when the product has options', () => {
    const product = getProducts().find((p) => p.variants.length > 0);
    expect(product).toBeTruthy();
    const result = revalidateQuoteItems([
      {
        productId: product!.id,
        variantId: null,
        quantity: 1,
        addedAt: new Date().toISOString(),
      },
    ]);
    expect(result.ok).toBe(false);
  });

  it('accepts a valid product and variant selection', () => {
    const product = getProducts().find((p) => p.variants.length > 0) || getProducts()[0];
    const result = revalidateQuoteItems([
      {
        productId: product.id,
        variantId: product.variants[0]?.id || null,
        quantity: 3,
        addedAt: new Date().toISOString(),
      },
    ]);
    expect(result.ok).toBe(true);
    expect(result.lines[0]?.quantity).toBe(3);
  });
});
