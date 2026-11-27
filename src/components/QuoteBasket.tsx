import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBasket, Trash2 } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { getProductById, getVariant } from '@/data/catalogue';
import { formatMoney, formatPriceInfo } from '@/lib/pricing';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ProductImage from '@/components/catalogue/ProductImage';
import { useState } from 'react';

export default function QuoteBasket() {
  const { items, itemCount, updateQuantity, removeItem } = useQuote();
  const [open, setOpen] = useState(false);
  const lines = items.flatMap(item => {
    const product = getProductById(item.productId);
    if (!product) return [];
    const variant = getVariant(product, item.variantId);
    return [{ item, product, variant, price: variant?.price ?? product.price }];
  });
  const subtotal = lines.reduce((total, line) => total + (line.price.kind === 'exact' ? line.price.money.amountMinor * line.item.quantity : 0), 0);
  const hasPricedItems = lines.some(line => line.price.kind === 'exact');
  const allPriced = lines.every(line => line.price.kind === 'exact');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="shop-basket-trigger" aria-label={`Open quote basket, ${itemCount} packs or cases`}>
          <span className="relative"><ShoppingBasket size={25} aria-hidden /><span className="basket-count">{itemCount}</span></span>
          <span className="hidden sm:block text-left"><strong className="block">Your basket</strong><span className="text-sm text-muted-foreground">{items.length} product{items.length === 1 ? '' : 's'} for a quote</span></span>
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg p-0">
        <SheetHeader className="border-b px-6 py-6 text-left">
          <SheetTitle className="text-2xl">Your quote basket</SheetTitle>
          <SheetDescription>Review your packs and cases. Request a quote when you’re ready.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-3">
          {!lines.length ? <div className="py-16 text-center"><ShoppingBasket className="mx-auto mb-5 text-muted-foreground" size={42} /><h3 className="text-xl font-bold">Let’s fill your basket</h3><p className="mt-2 text-muted-foreground">Find the packaging your business needs.</p><Button asChild className="mt-6"><Link to="/catalogue" onClick={() => setOpen(false)}>Shop all products</Link></Button></div> : lines.map(({item, product, variant, price}) => (
            <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 border-b py-5">
              <ProductImage src={(variant?.images[0] ?? product.images[0])?.src} alt={product.name} className="h-20 w-20 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1"><Link to={`/products/${product.slug}`} onClick={() => setOpen(false)} className="font-semibold leading-snug hover:underline">{product.name}</Link>{variant && <p className="mt-1 text-sm text-muted-foreground">{variant.label}</p>}<p className="mt-2 font-bold">{formatPriceInfo(price)}</p><div className="mt-3 flex items-center justify-between"><div className="quantity-stepper"><button aria-label={`Decrease ${product.name} quantity`} disabled={item.quantity <= 1} onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}><Minus size={14}/></button><span>{item.quantity}</span><button aria-label={`Increase ${product.name} quantity`} disabled={item.quantity >= 9999} onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}><Plus size={14}/></button></div><button className="p-2 text-muted-foreground hover:text-destructive" aria-label={`Remove ${product.name}`} onClick={() => removeItem(item.productId, item.variantId)}><Trash2 size={17}/></button></div></div>
            </div>
          ))}
        </div>
        {!!lines.length && <div className="border-t bg-muted/40 p-6"><div className="mb-2 flex justify-between font-semibold"><span>{allPriced ? 'Guide subtotal' : 'Guide subtotal · priced items'}</span><span>{hasPricedItems ? formatMoney({amountMinor: subtotal, currency:'GBP', minorUnit:2}) : 'To be quoted'}</span></div><p className="mb-5 text-sm text-muted-foreground">Final pricing, VAT and delivery confirmed in your quote. No payment is taken online.</p><Button asChild className="w-full h-12"><Link to="/quote" onClick={() => setOpen(false)}>Review & request a quote</Link></Button></div>}
      </SheetContent>
    </Sheet>
  );
}
