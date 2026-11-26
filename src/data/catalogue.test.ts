import { describe, expect, it } from 'vitest';
import { getProductBySlug, queryCatalogue, catalogue } from './catalogue';

describe('catalogue data integrity', () => {
  it('uses stable source product ids without duplicate slugs', () => {
    const slugs = catalogue.products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(catalogue.products.every((p) => p.sourceProductId > 0)).toBe(true);
  });

  it('finds products by slug and supports search by name', () => {
    const sample = catalogue.products[0];
    expect(getProductBySlug(sample.slug)?.id).toBe(sample.id);
    const result = queryCatalogue({ q: sample.name.slice(0, 8), pageSize: 50 });
    expect(result.total).toBeGreaterThan(0);
  });

  it('filters by category without duplicating products across result pages incorrectly', () => {
    const category = catalogue.categories[0];
    const result = queryCatalogue({ category: category.slug, pageSize: 100 });
    expect(result.items.every((p) => p.categorySlugs.includes(category.slug))).toBe(true);
    expect(new Set(result.items.map((p) => p.id)).size).toBe(result.items.length);
  });
});
