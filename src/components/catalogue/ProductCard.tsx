import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Check, ShoppingBasket } from 'lucide-react';
import type { CatalogueProduct } from '@/data/types';
import { formatPriceInfo } from '@/lib/pricing';
import { useQuote } from '@/contexts/QuoteContext';
import { Button } from '@/components/ui/button';
import ProductImage from '@/components/catalogue/ProductImage';
import VariantPickerDialog from '@/components/catalogue/VariantPickerDialog';
import { toast } from 'sonner';

export default function ProductCard({product}:{product:CatalogueProduct}) {
  const {addItem,items}=useQuote();
  const navigate=useNavigate();
  const [pickerOpen,setPickerOpen]=useState(false);
  const [quantity,setQuantity]=useState(1);
  const count=items.filter(i=>i.productId===product.id).reduce((n,i)=>n+i.quantity,0);
  const needsOptions=product.variants.length>0;
  const category=product.primaryCategorySlug?.replace(/-/g,' ')??'Catering essentials';
  function addDirect(){const r=addItem({productId:product.id,quantity});if(r.ok === false){toast.error(r.error);return;}toast.success(`Added to your quote basket`,{description:product.name,action:{label:'View basket',onClick:()=>navigate('/quote')}});}
  return <article className="shop-product-card">
    <Link to={`/products/${product.slug}`} className="shop-product-photo"><ProductImage src={product.images[0]?.src} alt={product.images[0]?.alt||product.name} className="aspect-square"/>{count>0&&<span className="shop-in-basket"><Check size={13}/>{count} in basket</span>}</Link>
    <div className="shop-product-info"><p className="shop-product-category">{category}</p><h3><Link to={`/products/${product.slug}`}>{product.name}</Link></h3><p className="shop-product-pack">{product.packQuantity?`${product.packQuantity} per ${product.packUnit||'pack'}`:needsOptions?`${product.variants.length} options available`:'Pack details on product page'}</p><div className="shop-product-price"><strong>{formatPriceInfo(product.price)}</strong><span>{product.price.kind==='request'?'We’ll confirm your price':`Guide price${product.packUnit?` / ${product.packUnit}`:''}`}</span></div><div className="shop-card-actions">{!needsOptions&&<div className="quantity-stepper"><button aria-label={`Decrease ${product.name} quantity`} disabled={quantity<=1} onClick={()=>setQuantity(q=>Math.max(1,q-1))}><Minus size={13}/></button><span aria-live="polite">{quantity}</span><button aria-label={`Increase ${product.name} quantity`} disabled={quantity>=9999} onClick={()=>setQuantity(q=>Math.min(9999,q+1))}><Plus size={13}/></button></div>}<Button className="flex-1 gap-2" onClick={()=>needsOptions?setPickerOpen(true):addDirect()}>{!needsOptions&&<ShoppingBasket size={16}/>}{needsOptions?'Choose options':'Add to basket'}</Button></div></div>
    <VariantPickerDialog product={product} open={pickerOpen} onOpenChange={setPickerOpen}/>
  </article>;
}
