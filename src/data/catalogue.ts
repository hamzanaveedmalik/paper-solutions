import catalogueJson from './catalogue.json';
import type {
  CatalogueCategory,
  CatalogueData,
  CatalogueProduct,
  ProductVariant,
} from './types';
import { priceForSort } from '@/lib/pricing';

export const catalogue = catalogueJson as CatalogueData;

export function getCategories(): CatalogueCategory[] {
  return catalogue.categories;
}

export function getCategoryBySlug(slug: string): CatalogueCategory | undefined {
  return catalogue.categories.find((c) => c.slug === slug);
}

export function getProducts(): CatalogueProduct[] {
  return catalogue.products;
}

export function getProductBySlug(slug: string): CatalogueProduct | undefined {
  return catalogue.products.find((p) => p.slug === slug);
}

export function getProductById(id: string): CatalogueProduct | undefined {
  return catalogue.products.find((p) => p.id === id);
}

export function getVariant(
  product: CatalogueProduct,
  variantId: string | null
): ProductVariant | null {
  if (!variantId) return null;
  return product.variants.find((v) => v.id === variantId) || null;
}

export function getFeaturedProducts(limit = 8): CatalogueProduct[] {
  const featured = catalogue.products.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return [...featured, ...catalogue.products.filter((p) => !p.featured)].slice(
    0,
    limit
  );
}

export function getRelatedProducts(
  product: CatalogueProduct,
  limit = 4
): CatalogueProduct[] {
  const primary = product.primaryCategorySlug;
  return catalogue.products
    .filter(
      (p) =>
        p.id !== product.id &&
        (primary
          ? p.categorySlugs.includes(primary)
          : p.categorySlugs.some((s) => product.categorySlugs.includes(s)))
    )
    .slice(0, limit);
}

export type CatalogueQuery = {
  q?: string;
  category?: string;
  material?: string;
  capacity?: string;
  pack?: string;
  audience?: string;
  sort?: 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
  page?: number;
  pageSize?: number;
};

export type CatalogueResult = {
  items: CatalogueProduct[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
  materials: string[];
  capacities: string[];
  packs: string[];
};

function matchesQuery(product: CatalogueProduct, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const hay = [
    product.name,
    product.sku || '',
    product.descriptionText || '',
    product.shortDescriptionText || '',
    product.material || '',
    product.colour || '',
    product.capacity || '',
    product.dimensions || '',
    ...product.variants.map((v) => `${v.label} ${v.sku || ''}`),
  ]
    .join(' ')
    .toLowerCase();
  return hay.includes(needle);
}

export function queryCatalogue(input: CatalogueQuery = {}): CatalogueResult {
  const pageSize = input.pageSize ?? 24;
  const page = Math.max(1, input.page ?? 1);

  let items = catalogue.products.filter((p) => {
    if (input.q && !matchesQuery(p, input.q)) return false;
    if (input.category && !p.categorySlugs.includes(input.category)) return false;
    if (input.material && (p.material || '').toLowerCase() !== input.material.toLowerCase())
      return false;
    if (input.capacity && (p.capacity || '').toLowerCase() !== input.capacity.toLowerCase())
      return false;
    if (input.pack) {
      const packLabel = p.packQuantity ? String(p.packQuantity) : '';
      if (packLabel !== input.pack) return false;
    }
    if (input.audience && !p.audienceTags.includes(input.audience)) return false;
    return true;
  });

  const materials = [
    ...new Set(
      catalogue.products.map((p) => p.material).filter((v): v is string => Boolean(v))
    ),
  ].sort();
  const capacities = [
    ...new Set(
      catalogue.products.map((p) => p.capacity).filter((v): v is string => Boolean(v))
    ),
  ].sort();
  const packs = [
    ...new Set(
      catalogue.products
        .map((p) => (p.packQuantity ? String(p.packQuantity) : null))
        .filter((v): v is string => Boolean(v))
    ),
  ].sort((a, b) => Number(a) - Number(b));

  const sort = input.sort || 'name-asc';
  items = [...items].sort((a, b) => {
    if (sort === 'name-asc') return a.name.localeCompare(b.name);
    if (sort === 'name-desc') return b.name.localeCompare(a.name);
    if (sort === 'price-asc') return priceForSort(a.price) - priceForSort(b.price);
    if (sort === 'price-desc') return priceForSort(b.price) - priceForSort(a.price);
    return 0;
  });

  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    pageCount,
    materials,
    capacities,
    packs,
  };
}

export function getRedirectTarget(pathname: string): string | null {
  const exact = catalogue.redirects.find((r) => r.from === pathname);
  if (exact) return exact.to;
  // Normalise trailing slash
  const alt = pathname.endsWith('/') ? pathname.slice(0, -1) : `${pathname}/`;
  return catalogue.redirects.find((r) => r.from === alt)?.to || null;
}
