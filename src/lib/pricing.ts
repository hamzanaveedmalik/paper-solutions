import type { MoneyMinor, PriceInfo } from '@/data/types';

export function formatMoney(money: MoneyMinor): string {
  const value = money.amountMinor / Math.pow(10, money.minorUnit);
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: money.currency,
  }).format(value);
}

export function formatPriceInfo(price: PriceInfo): string {
  if (price.kind === 'request') return 'Request price';
  if (price.kind === 'exact') return formatMoney(price.money);
  return `${formatMoney(price.min)} – ${formatMoney(price.max)}`;
}

export function isComparablePrice(price: PriceInfo): boolean {
  return price.kind === 'exact';
}

export function comparableAmount(price: PriceInfo): number | null {
  if (price.kind === 'exact') return price.money.amountMinor;
  if (price.kind === 'range') return price.min.amountMinor;
  return null;
}

export function priceForSort(price: PriceInfo): number {
  const amount = comparableAmount(price);
  // Unknown / request prices sort after known prices
  return amount === null ? Number.POSITIVE_INFINITY : amount;
}
