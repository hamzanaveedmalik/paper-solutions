import { describe, expect, it } from 'vitest';
import { formatPriceInfo, priceForSort } from './pricing';
import type { PriceInfo } from '@/data/types';

describe('formatPriceInfo', () => {
  it('formats exact prices', () => {
    const price: PriceInfo = {
      kind: 'exact',
      money: { amountMinor: 1299, currency: 'GBP', minorUnit: 2 },
      source: 'test',
    };
    expect(formatPriceInfo(price)).toBe('£12.99');
  });

  it('formats ranges without inventing a single price', () => {
    const price: PriceInfo = {
      kind: 'range',
      min: { amountMinor: 799, currency: 'GBP', minorUnit: 2 },
      max: { amountMinor: 999, currency: 'GBP', minorUnit: 2 },
      source: 'test',
    };
    expect(formatPriceInfo(price)).toContain('£7.99');
    expect(formatPriceInfo(price)).toContain('£9.99');
  });

  it('shows request price for unknown values', () => {
    expect(formatPriceInfo({ kind: 'request', reason: 'zero' })).toBe('Request price');
  });
});

describe('priceForSort', () => {
  it('sorts request prices after known amounts', () => {
    const known: PriceInfo = {
      kind: 'exact',
      money: { amountMinor: 500, currency: 'GBP', minorUnit: 2 },
      source: 'test',
    };
    expect(priceForSort(known)).toBeLessThan(
      priceForSort({ kind: 'request', reason: 'missing' })
    );
  });
});
