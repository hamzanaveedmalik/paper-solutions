import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CatalogueProduct } from '@/data/types';
import { formatPriceInfo } from '@/lib/pricing';
import { useQuote } from '@/contexts/QuoteContext';
import { Button } from '@/components/ui/button';
import ProductImage from '@/components/catalogue/ProductImage';
import VariantPickerDialog from '@/components/catalogue/VariantPickerDialog';
import { toast } from 'sonner';

type ProductCardProps = {
  product: CatalogueProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useQuote();
  const [pickerOpen, setPickerOpen] = useState(false);
  const image = product.images[0];
  const needsOptions = product.variants.length > 0;
  const spec =
    product.capacity ||
    product.dimensions ||
    product.material ||
    (product.packQuantity
      ? `${product.packQuantity} per ${product.packUnit || 'pack'}`
      : null);

  const addDirect = () => {
    const result = addItem({ productId: product.id, quantity: 1 });
    if (result.ok === false) {
      toast.error(result.error);
      return;
    }
    toast.success('Added to quote list');
  };

  return (
    <article className="group flex flex-col h-full">
      <Link to={`/products/${product.slug}`} className="block">
        <ProductImage
          src={image?.src}
          alt={image?.alt || product.name}
          className="aspect-square rounded-md"
        />
      </Link>
      <div className="mt-3 flex flex-1 flex-col gap-2">
        <div>
          <h3 className="font-medium leading-snug">
            <Link to={`/products/${product.slug}`} className="hover:underline underline-offset-2">
              {product.name}
            </Link>
          </h3>
          {spec && <p className="mt-1 text-sm text-muted-foreground">{spec}</p>}
          {product.packQuantity && (
            <p className="text-sm text-muted-foreground">
              Pack/case: {product.packQuantity}
              {product.packUnit ? ` (${product.packUnit})` : ''}
            </p>
          )}
        </div>
        <p className="text-sm font-semibold mt-auto">{formatPriceInfo(product.price)}</p>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={() => (needsOptions ? setPickerOpen(true) : addDirect())}
        >
          {needsOptions ? 'Select options' : 'Add to quote'}
        </Button>
      </div>

      <VariantPickerDialog
        product={product}
        open={pickerOpen}
        onOpenChange={setPickerOpen}
      />
    </article>
  );
}
