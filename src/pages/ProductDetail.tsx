import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/catalogue/ProductCard';
import ProductImage from '@/components/catalogue/ProductImage';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import ProductStructuredData from '@/components/ProductStructuredData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  getCategoryBySlug,
  getProductBySlug,
  getRelatedProducts,
} from '@/data/catalogue';
import { formatPriceInfo } from '@/lib/pricing';
import { useQuote } from '@/contexts/QuoteContext';
import useSEO from '@/hooks/useSEO';
import { toast } from 'sonner';
import { SITE_URL } from '@/config/site';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addItem } = useQuote();

  const [variantId, setVariantId] = useState(product?.variants[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    return product.variants.find((v) => v.id === variantId) || null;
  }, [product, variantId]);

  const category = product?.primaryCategorySlug
    ? getCategoryBySlug(product.primaryCategorySlug)
    : undefined;
  const related = product ? getRelatedProducts(product, 4) : [];
  const gallery = product
    ? selectedVariant?.images?.length
      ? selectedVariant.images
      : product.images
    : [];
  const activeImage = gallery[imageIndex] || gallery[0];
  const price = selectedVariant ? selectedVariant.price : product?.price;
  const packQty = selectedVariant?.packQuantity ?? product?.packQuantity;
  const packUnit = selectedVariant?.packUnit ?? product?.packUnit ?? 'pack';

  useSEO({
    title: product?.name || 'Product',
    description:
      product?.shortDescriptionText ||
      product?.descriptionText?.slice(0, 160) ||
      'PCS UK catering packaging product.',
    ogImage: activeImage?.src || undefined,
    canonical: product ? `${SITE_URL}/products/${product.slug}` : undefined,
  });

  if (!product || !price) {
    return <Navigate to="/catalogue" replace />;
  }

  const specs = [
    product.sku ? { label: 'SKU', value: product.sku } : null,
    selectedVariant?.sku ? { label: 'Variant SKU', value: selectedVariant.sku } : null,
    product.material ? { label: 'Material', value: product.material } : null,
    product.colour ? { label: 'Colour', value: product.colour } : null,
    product.capacity ? { label: 'Capacity', value: product.capacity } : null,
    product.dimensions ? { label: 'Dimensions', value: product.dimensions } : null,
    packQty ? { label: 'Pack / case quantity', value: String(packQty) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const onAdd = () => {
    const result = addItem({
      productId: product.id,
      variantId: product.variants.length ? variantId : null,
      quantity,
    });
    if (result.ok === false) {
      toast.error(result.error);
      return;
    }
    toast.success('Added to quote list');
  };

  return (
    <Layout>
      <ProductStructuredData
        name={product.name}
        description={product.shortDescriptionText || product.descriptionText || product.name}
        image={activeImage?.src}
        sku={selectedVariant?.sku || product.sku || product.slug}
        category={category?.displayName}
        material={product.material || undefined}
        price={price}
        url={`${SITE_URL}/products/${product.slug}`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Catalogue', url: `${SITE_URL}/catalogue` },
          ...(category
            ? [
                {
                  name: category.displayName,
                  url: `${SITE_URL}/catalogue?category=${category.slug}`,
                },
              ]
            : []),
          { name: product.name, url: `${SITE_URL}/products/${product.slug}` },
        ]}
      />

      <div className="container mx-auto py-8 md:py-10">
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-1">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link to="/catalogue" className="hover:text-foreground">
                Catalogue
              </Link>
            </li>
            {category && (
              <>
                <li aria-hidden>/</li>
                <li>
                  <Link
                    to={`/catalogue?category=${category.slug}`}
                    className="hover:text-foreground"
                  >
                    {category.displayName}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <ProductImage
              src={activeImage?.src}
              alt={activeImage?.alt || product.name}
              className="aspect-square rounded-md"
              priority
            />
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {gallery.slice(0, 5).map((image, idx) => (
                  <button
                    key={`${image.src}-${idx}`}
                    type="button"
                    className={`rounded-md overflow-hidden border ${idx === imageIndex ? 'border-primary' : 'border-border'}`}
                    onClick={() => setImageIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <ProductImage
                      src={image.src}
                      alt=""
                      className="aspect-square"
                      imgClassName="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            {category && (
              <p className="text-sm text-muted-foreground mb-2">{category.displayName}</p>
            )}
            <h1 className="text-3xl md:text-4xl">{product.name}</h1>
            <p className="mt-4 text-2xl font-semibold">{formatPriceInfo(price)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Guide price from catalogue data. VAT treatment is not stated here unless separately
              confirmed.
            </p>

            {product.variants.length > 0 && (
              <div className="mt-6 space-y-2">
                <Label htmlFor="product-variant">Options</Label>
                <select
                  id="product-variant"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={variantId}
                  onChange={(e) => {
                    setVariantId(e.target.value);
                    setImageIndex(0);
                  }}
                >
                  {product.variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.label} — {formatPriceInfo(variant.price)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mt-6 space-y-2 max-w-xs">
              <Label htmlFor="product-qty">
                Quantity ({packUnit}
                {packQty ? `s of ${packQty}` : 's'})
              </Label>
              <Input
                id="product-qty"
                type="number"
                min={1}
                max={9999}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" size="lg" onClick={onAdd}>
                Add to quote
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/quote">View quote list</Link>
              </Button>
            </div>

            {(product.shortDescriptionText || product.descriptionText) && (
              <div className="mt-8 prose prose-sm max-w-none text-foreground">
                <h2 className="font-display text-xl mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.shortDescriptionText || product.descriptionText}
                </p>
              </div>
            )}

            {specs.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-xl mb-3">Specifications</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {specs.map((spec) => (
                    <div key={spec.label} className="rounded-md border border-border bg-card px-3 py-2">
                      <dt className="text-muted-foreground">{spec.label}</dt>
                      <dd className="font-medium mt-0.5">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl mb-6">Related products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
