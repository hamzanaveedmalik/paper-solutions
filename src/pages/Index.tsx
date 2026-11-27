import { Link } from 'react-router-dom';
import { PackageCheck, Layers3, MessageSquareText, Coffee, Utensils, ShoppingBag, ChefHat } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/catalogue/ProductCard';
import ProductImage from '@/components/catalogue/ProductImage';
import { Button } from '@/components/ui/button';
import { getCategories, getProducts } from '@/data/catalogue';
import useSEO from '@/hooks/useSEO';

const audienceCards = [
  {label:'The coffee shop',tag:'cafes',text:'Cups, lids & little essentials',icon:Coffee},
  {label:'The takeaway',tag:'takeaways',text:'Ready for the journey home',icon:ShoppingBag},
  {label:'The restaurant',tag:'restaurants',text:'From your kitchen to their table',icon:Utensils},
  {label:'The caterer',tag:'caterers',text:'Big occasions. Everyday service.',icon:ChefHat},
];
export default function Index() {
  useSEO({title:'PCS UK — Catering packaging & foodservice supplies',description:'Shop food containers, cups, bags and everyday catering supplies. Choose your packs and cases, build a basket and request a quote.'});
  const categories=getCategories();
  const products=getProducts();
  const selected=['hb6-single-burger','round-kraft-bowls-pack-of-300','brown-burger-boxes-x-200','foil-containers'];
  const essentials=selected.flatMap(slug => {const p=products.find(p=>p.slug===slug);return p ? [p] : [];});
  const heroProduct=products.find(p=>p.slug==='round-kraft-bowls-pack-of-300');
  const bag=products.find(p=>p.slug==='medium-brown-handle-carrier-bag-2');
  const burger=products.find(p=>p.slug==='hb6-single-burger');
  return <Layout>
    <div className="container py-6 md:py-8">
      <section className="shop-hero">
        <div className="shop-hero-copy"><span className="shop-eyebrow">YOUR EVERYDAY PACKAGING, SORTED</span><h1>Good food.<br/>Great packaging.<br/><span>Ready to serve.</span></h1><p>From the first coffee to the last takeaway. Find the cups, containers and catering essentials that keep your business moving.</p><div className="flex flex-wrap gap-3"><Button asChild size="lg" className="shop-gold-button"><Link to="/catalogue">Shop the range</Link></Button><Button asChild size="lg" variant="outline" className="shop-hero-secondary"><Link to="/contact">Buying in bulk?</Link></Button></div><div className="shop-hero-note"><Layers3 size={17} aria-hidden/>{products.length} products · {categories.length} categories · Packs & cases</div></div>
        <div className="shop-hero-products"><div className="shop-hero-topline"><span>MADE FOR YOUR NEXT SERVICE</span><span>THE EVERYDAY RANGE</span></div>{heroProduct && <Link to={`/products/${heroProduct.slug}`} className="hero-main-product"><ProductImage src={heroProduct.images[0]?.src} alt={heroProduct.name} priority className="h-full w-full"/><span className="hero-product-caption"><strong>Take good food further.</strong><span>Shop food containers</span></span></Link>}<div className="hero-small-products">{[bag,burger].map((p,i)=>p&&<Link key={p.id} to={`/products/${p.slug}`}><ProductImage src={p.images[0]?.src} alt={p.name} priority className="h-full w-full"/><span>{i===0?'Bags that carry more':'Box it. Serve it.'}</span></Link>)}</div></div>
      </section>
      <div className="shop-benefits"><div><PackageCheck size={23}/><span><strong>Your everyday essentials</strong><small>Foodservice packaging, all in one place</small></span></div><div><Layers3 size={23}/><span><strong>Buy by the pack or case</strong><small>Choose the quantity that works for you</small></span></div><div><MessageSquareText size={23}/><span><strong>A quote for your business</strong><small>Final pricing & delivery confirmed with you</small></span></div></div>
    </div>
    <section className="container shop-section"><div className="shop-section-heading"><div><span className="shop-eyebrow">FIND YOUR EVERYDAY ESSENTIALS</span><h2>What are you serving?</h2></div><Link className="shop-text-link" to="/catalogue">Shop all categories</Link></div><div className="shop-category-grid">{categories.map(c => {const sample=products.find(p=>p.categorySlugs.includes(c.slug)&&p.images[0]?.src.startsWith('/'));return <Link to={`/catalogue?category=${c.slug}`} key={c.id} className="shop-category-tile"><ProductImage src={sample?.images[0]?.src??c.image?.src} alt={c.displayName} className="aspect-square"/><h3>{c.displayName}</h3><p>{c.productCount} products</p></Link>;})}</div></section>
    <section className="shop-essentials-section"><div className="container shop-section"><div className="shop-section-heading"><div><span className="shop-eyebrow">START WITH THE ESSENTIALS</span><h2>A little of what you need.</h2></div><Link className="shop-text-link" to="/catalogue">Explore the full range</Link></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">{essentials.map(p=><ProductCard key={p.id} product={p}/>)}</div></div></section>
    <section className="container shop-section"><div className="shop-section-heading"><div><span className="shop-eyebrow">PACKAGING FOR YOUR KIND OF BUSINESS</span><h2>Made for the way you work.</h2></div></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{audienceCards.map(({label,tag,text,icon:Icon})=><Link key={tag} to={`/catalogue?audience=${tag}`} className="shop-audience-card"><Icon size={30} strokeWidth={1.5}/><h3>{label}</h3><p>{text}</p><span>Shop the selection</span></Link>)}</div></section>
    <section className="container pb-16"><div className="shop-bulk-banner"><div><span className="shop-eyebrow">LET’S BUILD YOUR SUPPLY LIST</span><h2>A bigger order?<br/>Let’s talk packaging.</h2><p>Choose what you need, tell us your quantities, and our team will help with your quote.</p></div><div><Button asChild size="lg" className="shop-gold-button"><Link to="/catalogue">Start your basket</Link></Button><p>No payment needed to request a quote.</p></div></div></section>
  </Layout>;
}
