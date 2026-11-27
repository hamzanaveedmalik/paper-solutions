import { FormEvent, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, PackageOpen, Mail, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getCategories } from '@/data/catalogue';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import QuoteBasket from '@/components/QuoteBasket';

export default function SiteHeader() {
  const navigate = useNavigate();
  const categories = useMemo(() => getCategories(), []);
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    navigate(query.trim() ? `/catalogue?q=${encodeURIComponent(query.trim())}` : '/catalogue');
    setMobileOpen(false);
  };
  return <header className="sticky top-0 z-40 bg-white shadow-sm">
    <div className="shop-announcement"><div className="container flex items-center justify-between gap-3 py-2"><span>Packaging for the way you serve.</span><Link to="/contact" className="hidden sm:flex items-center gap-2"><Mail size={14} aria-hidden />Need a hand? Talk to our team</Link></div></div>
    <div className="container">
      <div className="shop-main-header">
        <Link to="/" className="shop-wordmark" aria-label={`${siteConfig.brandName} home`}><span className="shop-logo-monogram">PCS<span>UK</span></span><span className="shop-brand-description">PREMIUM CATERING<br/>SUPPLIES</span></Link>
        <form onSubmit={onSearch} className="shop-search"><label htmlFor="site-search" className="sr-only">Search products</label><input id="site-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search cups, containers, bags & more…" autoComplete="off"/><button aria-label="Search products" type="submit"><Search size={20}/></button></form>
        <QuoteBasket />
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetTrigger asChild><Button variant="outline" size="icon" className="lg:hidden shrink-0" aria-label="Open categories"><Menu size={21}/></Button></SheetTrigger><SheetContent side="left" className="overflow-y-auto"><SheetHeader className="text-left"><SheetTitle>Shop by category</SheetTitle><SheetDescription>Find packaging for your next service.</SheetDescription></SheetHeader><nav className="mt-6 grid gap-1"><Link to="/catalogue" onClick={() => setMobileOpen(false)} className="p-3 font-bold">All products</Link>{categories.map(c => <Link key={c.id} to={`/catalogue?category=${c.slug}`} className="flex justify-between rounded-lg p-3 hover:bg-secondary" onClick={() => setMobileOpen(false)}>{c.displayName}<span className="text-muted-foreground">{c.productCount}</span></Link>)}<Link className="p-3" to="/contact" onClick={() => setMobileOpen(false)}>Contact our team</Link></nav></SheetContent></Sheet>
      </div>
      <nav className="shop-category-nav" aria-label="Shop categories"><NavLink to="/catalogue" className="shop-all-categories"><Menu size={17}/>All products<ChevronDown size={14}/></NavLink>{['food-containers-and-sauce-pots','paper-bags','cups-accessories','paper-boxes','bagasse-packaging'].map(slug => {const c=categories.find(c => c.slug===slug);return c ? <Link key={c.id} to={`/catalogue?category=${c.slug}`}>{c.displayName.replace('Food Containers & Sauce Pots','Food containers').replace('Cups & Accessories','Cups & lids')}</Link> : null;})}<Link to="/contact" className="ml-auto">Bulk enquiries</Link></nav>
    </div>
    <div className="shop-service-strip"><div className="container flex items-center justify-between gap-4 py-2.5"><span className="flex items-center gap-2"><PackageOpen size={16} aria-hidden/>Packs & cases for your business</span><span className="hidden sm:inline">{categories.length} categories. One everyday supply list.</span><span className="hidden lg:inline">Build your basket. Get a tailored quote.</span></div></div>
  </header>;
}
