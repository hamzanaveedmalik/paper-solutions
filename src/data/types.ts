export type MoneyMinor = {
  amountMinor: number;
  currency: 'GBP';
  minorUnit: 2;
};

export type PriceInfo =
  | { kind: 'exact'; money: MoneyMinor; source: string }
  | { kind: 'range'; min: MoneyMinor; max: MoneyMinor; source: string }
  | { kind: 'request'; reason: string };

export type ProductImage = {
  src: string;
  alt: string;
  sourceUrl: string;
  localPath?: string;
  width?: number;
  height?: number;
};

export type ProductAttribute = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  sourceVariationId: number;
  label: string;
  sku: string | null;
  attributes: ProductAttribute[];
  price: PriceInfo;
  images: ProductImage[];
  packQuantity: number | null;
  packUnit: 'pack' | 'case' | null;
  isInStock: boolean | null;
};

export type CatalogueProduct = {
  id: string;
  sourceProductId: number;
  slug: string;
  name: string;
  sourceUrl: string;
  sku: string | null;
  descriptionHtml: string | null;
  descriptionText: string | null;
  shortDescriptionText: string | null;
  categorySlugs: string[];
  primaryCategorySlug: string | null;
  images: ProductImage[];
  material: string | null;
  colour: string | null;
  dimensions: string | null;
  capacity: string | null;
  packQuantity: number | null;
  packUnit: 'pack' | 'case' | null;
  attributes: { name: string; options: string[] }[];
  variants: ProductVariant[];
  price: PriceInfo;
  featured: boolean;
  audienceTags: string[];
  provenance: {
    importedAt: string;
    source: 'woocommerce-store-api' | 'woocommerce-csv';
  };
  reviewFlags: string[];
};

export type CatalogueCategory = {
  id: string;
  sourceCategoryId: number | null;
  slug: string;
  name: string;
  displayName: string;
  description: string | null;
  sourceUrl: string | null;
  image: ProductImage | null;
  productCount: number;
};

export type CatalogueData = {
  version: number;
  importedAt: string;
  source: string;
  categories: CatalogueCategory[];
  products: CatalogueProduct[];
  redirects: { from: string; to: string }[];
};

export type QuoteLineItem = {
  productId: string;
  variantId: string | null;
  quantity: number;
  addedAt: string;
};
