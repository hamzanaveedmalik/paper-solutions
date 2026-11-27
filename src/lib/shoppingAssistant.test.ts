import { describe, expect, it } from 'vitest';
import { answerCustomer, findAssistantProducts, suggestedPackQuantity } from './shoppingAssistant';
import { getProducts } from '@/data/catalogue';
import { buildEnquirySummary, quoteEnquirySchema, revalidateQuoteItems } from './quoteEnquiry';

describe('catalogue shopping assistant', () => {
  it('finds specific products inside conversational requests', () => {
    const matches = findAssistantProducts('Please show me 2 cases of brown paper bags');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every(p => /brown/i.test(p.name))).toBe(true);
    expect(suggestedPackQuantity('2 cases of brown paper bags')).toBe(2);
  });
  it('finds cup sizes and plural boxes', () => {
    expect(findAssistantProducts('12oz cups').some(p => /12oz/i.test(p.name))).toBe(true);
    expect(findAssistantProducts('burger boxes').some(p => /burger/i.test(p.name))).toBe(true);
  });
  it('finds delivery bags rather than answering a shipping policy question', () => {
    expect(answerCustomer('delivery bags').products?.length).toBeGreaterThan(0);
  });
  it('does not silently recommend unrelated products', () => {
    expect(findAssistantProducts('spaceship batteries')).toEqual([]);
    expect(answerCustomer('spaceship batteries').action).toBe('contact');
  });
  it('does not treat number of units as number of cases', () => {
    expect(suggestedPackQuantity('1000 cups')).toBe(1);
    expect(suggestedPackQuantity('50000 packs')).toBe(9999);
  });
  it('does not promise unconnected stock or delivery', () => {
    expect(answerCustomer('Is this in stock?').text).toContain('Live stock is not connected');
    expect(answerCustomer('Can it arrive tomorrow?').text).toContain('cannot promise a delivery date');
    expect(answerCustomer('Can I pay by card?').action).toBe('checkout');
    expect(answerCustomer('Can I pay by card?').text).toContain('not available yet');
  });
  it('takes order intent to review rather than claiming a booking', () => {
    const reply = answerCustomer('Please book my order');
    expect(reply.action).toBe('order');
    expect(reply.text).toContain('only confirmed when our team accepts');
  });
});

describe('order request boundaries', () => {
  it('labels order summaries clearly and preserves options and quantities', () => {
    const product = getProducts().find(p => p.variants.length > 0)!;
    const data = quoteEnquirySchema.parse({
      requestType: 'order', name: 'Test Customer', businessName: 'Test Cafe', email: 'test@example.com',
      phone: '07123456789', postcode: 'MK1 1AA', formStartedAt: Date.now() - 6000,
      items: [{ productId: product.id, variantId: product.variants[0].id, quantity: 2 }],
    });
    const validated = revalidateQuoteItems(data.items.map(item => ({ productId: item.productId!, variantId: item.variantId ?? null, quantity: item.quantity!, addedAt: new Date().toISOString() })));
    const summary = buildEnquirySummary(data, validated.lines, 'DRAFT-TEST');
    expect(summary).toContain('PCS UK order request');
    expect(summary).toContain(product.variants[0].label);
    expect(summary).toContain('Qty: 2');
    expect(summary).toContain('not a confirmed order');
  });
  it('rejects fractional, nonfinite and excessive quantities', () => {
    for (const quantity of [0, 1.5, NaN, Infinity, 10000]) {
      expect(revalidateQuoteItems([{ productId: getProducts()[0].id, variantId: null, quantity, addedAt: '' }]).ok).toBe(false);
    }
  });
});
