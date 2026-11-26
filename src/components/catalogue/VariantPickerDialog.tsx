import { useMemo, useState } from 'react';
import type { CatalogueProduct } from '@/data/types';
import { formatPriceInfo } from '@/lib/pricing';
import { useQuote } from '@/contexts/QuoteContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type VariantPickerDialogProps = {
  product: CatalogueProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function VariantPickerDialog({
  product,
  open,
  onOpenChange,
}: VariantPickerDialogProps) {
  const { addItem } = useQuote();
  const [variantId, setVariantId] = useState(product.variants[0]?.id || '');
  const [quantity, setQuantity] = useState(1);

  const selected = useMemo(
    () => product.variants.find((v) => v.id === variantId),
    [product.variants, variantId]
  );

  const packUnit = selected?.packUnit || product.packUnit || 'pack';
  const packQty = selected?.packQuantity || product.packQuantity;

  const onAdd = () => {
    const result = addItem({
      productId: product.id,
      variantId,
      quantity,
    });
    if (result.ok === false) {
      toast.error(result.error);
      return;
    }
    toast.success('Added to quote list');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose options</DialogTitle>
          <DialogDescription>{product.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`variant-${product.id}`}>Option</Label>
            <select
              id={`variant-${product.id}`}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={variantId}
              onChange={(e) => setVariantId(e.target.value)}
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.label} — {formatPriceInfo(variant.price)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`qty-${product.id}`}>
              Quantity ({packUnit}
              {packQty ? `s of ${packQty}` : 's'})
            </Label>
            <Input
              id={`qty-${product.id}`}
              type="number"
              min={1}
              max={9999}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            />
          </div>

          {selected && (
            <p className="text-sm text-muted-foreground">
              Guide price: {formatPriceInfo(selected.price)}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onAdd}>
            Add to quote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
