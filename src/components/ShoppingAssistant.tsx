import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Send, ShoppingBasket, RotateCcw, PackageOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductImage from '@/components/catalogue/ProductImage';
import { useQuote } from '@/contexts/QuoteContext';
import { answerCustomer, suggestedPackQuantity, type AssistantReply } from '@/lib/shoppingAssistant';
import { formatPriceInfo } from '@/lib/pricing';
import type { CatalogueProduct } from '@/data/types';
import { toast } from 'sonner';

type Message = { role: 'customer' | 'assistant'; text: string; reply?: AssistantReply; quantity?: number };
const welcome: Message = { role: 'assistant', text: 'Hi! What are you serving? I can help you find packaging, choose quantities and prepare an order request.' };

function AssistantProduct({ product, initialQuantity, onAdded }: { product: CatalogueProduct; initialQuantity: number; onAdded: (text: string) => void }) {
  const { addItem } = useQuote();
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState(initialQuantity);
  const variant = product.variants.find(v => v.id === variantId);
  const pack = variant?.packQuantity ?? product.packQuantity;
  const add = () => {
    if (product.variants.length && !variant) { toast.error('Choose a product option first.'); return; }
    const result = addItem({ productId: product.id, variantId: variant?.id ?? null, quantity });
    if (result.ok === false) { toast.error(result.error); return; }
    onAdded(`Added ${quantity} ${quantity === 1 ? 'pack/case' : 'packs/cases'} of ${product.name}${variant ? ` (${variant.label})` : ''} to your basket. Review it before sending an order request.`);
  };
  return <div className="rounded-xl border bg-white p-3 text-foreground">
    <div className="flex gap-3"><ProductImage src={(variant?.images[0] ?? product.images[0])?.src} alt={product.name} className="h-16 w-16 shrink-0 rounded-lg" /><div className="min-w-0"><Link to={`/products/${product.slug}`} className="text-sm font-semibold hover:underline">{product.name}</Link><p className="mt-1 text-sm font-semibold">{formatPriceInfo(variant?.price ?? product.price)}</p><p className="text-xs text-muted-foreground">{pack ? `${pack} per ${variant?.packUnit ?? product.packUnit ?? 'pack'}` : 'Pack details on product page'}</p></div></div>
    {!!product.variants.length && <label className="mt-3 block text-sm">Option<select className="mt-1 w-full rounded-md border bg-white p-2 text-sm" aria-label={`Option for ${product.name}`} value={variantId} onChange={e => setVariantId(e.target.value)}><option value="">Choose an option</option>{product.variants.map(v => <option key={v.id} value={v.id}>{v.label} · {formatPriceInfo(v.price)}</option>)}</select></label>}
    <div className="mt-3 flex items-end gap-2"><label className="flex-1 text-sm">Packs / cases<Input aria-label={`Packs or cases of ${product.name}`} type="number" min={1} max={9999} step={1} value={quantity} onChange={e => setQuantity(Math.min(9999, Math.max(1, Math.floor(Number(e.target.value) || 1))))} className="mt-1 h-10" /></label><Button type="button" className="h-10" onClick={add} disabled={!!product.variants.length && !variant}>Add to basket</Button></div>
  </div>;
}

export default function ShoppingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [query, setQuery] = useState('');
  const { itemCount } = useQuote();
  const log = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => { if (open && log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, open]);
  const ask = (text: string) => {
    const trimmed = text.trim().slice(0, 300);
    if (!trimmed) return;
    const reply = answerCustomer(trimmed);
    setMessages(previous => [...previous.slice(-23), { role: 'customer', text: trimmed }, { role: 'assistant', text: reply.text, reply, quantity: suggestedPackQuantity(trimmed) }]);
    setQuery('');
  };
  const submit = (event: FormEvent) => { event.preventDefault(); ask(query); };
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><button className="fixed bottom-5 right-5 z-40 flex min-h-14 items-center gap-2 rounded-full bg-[#202322] px-5 py-3 text-white shadow-xl ring-1 ring-white/20 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500" aria-label="Open shopping assistant"><MessageCircle size={22} aria-hidden /><span className="font-semibold">Need a hand?</span></button></DialogTrigger>
    <DialogContent className="!left-auto !top-auto !bottom-4 !right-4 !translate-x-0 !translate-y-0 flex h-[min(730px,calc(100dvh-2rem))] w-[calc(100vw-2rem)] max-w-[430px] [&>button]:text-white flex-col gap-0 overflow-hidden p-0 rounded-2xl">
      <DialogHeader className="bg-[#202322] p-5 pr-12 text-left"><DialogTitle className="flex items-center gap-2 text-xl text-white"><PackageOpen size={22} className="text-amber-300" />Your packaging assistant</DialogTitle><DialogDescription className="text-white/70">Product finder & order requests</DialogDescription></DialogHeader>
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2"><span className="text-xs text-muted-foreground">Catalogue-based answers · no live stock</span><button className="rounded p-2 hover:bg-muted" aria-label="Start a new conversation" onClick={() => setMessages([welcome])}><RotateCcw size={16} /></button></div>
      <div ref={log} role="log" aria-label="Shopping assistant conversation" aria-live="polite" aria-relevant="additions" className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#f6f7f6] p-4">
        {messages.map((m, index) => <div key={index} className={m.role === 'customer' ? 'ml-8' : 'mr-2'}><p className={m.role === 'customer' ? 'rounded-2xl rounded-br-sm bg-[#202322] px-4 py-3 text-sm leading-relaxed text-white whitespace-pre-wrap break-words' : 'rounded-2xl rounded-bl-sm border bg-white px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words'}>{m.text}</p>
          {m.reply?.products && <div className="mt-2 space-y-2">{m.reply.products.map(p => <AssistantProduct key={p.id} product={p} initialQuantity={m.quantity || 1} onAdded={text => setMessages(prev => [...prev.slice(-23), {role: 'assistant', text, reply: {text, action: 'order'}}])} />)}</div>}
          {m.reply?.action && <Button asChild size="sm" variant="outline" className="mt-2"><Link to={m.reply.action === 'order' ? '/order' : m.reply.action === 'checkout' ? '/checkout' : '/contact'} onClick={() => setOpen(false)}>{m.reply.action === 'order' ? 'Review order request' : m.reply.action === 'checkout' ? 'View checkout options' : 'Contact the team'}</Link></Button>}
        </div>)}
        {messages.length === 1 && <div className="flex flex-wrap gap-2">{['Paper bags', '12oz cups', 'Burger boxes', 'Delivery information'].map(text => <button key={text} onClick={() => ask(text)} className="rounded-full border border-amber-300 bg-amber-50 px-3 py-2 text-sm hover:bg-amber-100">{text}</button>)}</div>}
      </div>
      <div className="border-t bg-white px-4 pt-3"><div className="flex items-center justify-between gap-2"><Link to="/order" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm font-semibold hover:underline"><ShoppingBasket size={17} />Review basket ({itemCount})</Link><Link to="/checkout" onClick={() => setOpen(false)} className="text-sm underline underline-offset-4">Checkout options</Link></div><form onSubmit={submit} className="my-3 flex gap-2"><label htmlFor="assistant-question" className="sr-only">Ask about products or orders</label><Input id="assistant-question" value={query} maxLength={300} onChange={e => setQuery(e.target.value)} placeholder="Try ‘brown paper bags’" autoComplete="off" className="h-11 min-w-0 flex-1" /><Button type="submit" className="h-11 px-3" disabled={!query.trim()} aria-label="Send message"><Send size={18} /></Button></form><p className="pb-3 text-xs leading-relaxed text-muted-foreground">Please keep personal and payment details out of chat. Add contact details on the order form. Requests need team confirmation.</p></div>
    </DialogContent>
  </Dialog>;
}
