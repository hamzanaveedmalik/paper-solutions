import { FormEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Menu, Search, PackageOpen, Mail, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getCategories } from '@/data/catalogue';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import QuoteBasket from '@/components/QuoteBasket';

const NAV_CATEGORY_SLUGS = [
  'food-containers-and-sauce-pots',
  'paper-bags',
  'cups-accessories',
  'paper-boxes',
  'bagasse-packaging',
] as const;

type NavItemId = 'all' | 'bulk' | (typeof NAV_CATEGORY_SLUGS)[number];

function navCategoryLabel(displayName: string): string {
  return displayName
    .replace('Food Containers & Sauce Pots', 'Food containers')
    .replace('Cups & Accessories', 'Cups & lids');
}

export default function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const categories = useMemo(() => getCategories(), []);
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.displayName.localeCompare(b.displayName)),
    [categories]
  );
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuCloseTimer = useRef<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Partial<Record<NavItemId, HTMLAnchorElement | null>>>({});
  const indicatorReadyRef = useRef(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false, animate: false });
  const [pressedId, setPressedId] = useState<NavItemId | null>(null);

  const activeCategory = searchParams.get('category');
  const isCatalogue = location.pathname === '/catalogue';
  const isCategoriesPage = location.pathname === '/categories';
  const activeId: NavItemId | null = location.pathname === '/contact'
    ? 'bulk'
    : isCategoriesPage || (isCatalogue && !activeCategory)
      ? 'all'
      : isCatalogue && activeCategory && (NAV_CATEGORY_SLUGS as readonly string[]).includes(activeCategory)
        ? activeCategory as NavItemId
        : null;
  useLayoutEffect(() => {
    const update = (animate: boolean) => {
      if (!activeId || !navRef.current) {
        indicatorReadyRef.current = false;
        setIndicator(prev => ({ ...prev, width: 0, visible: false, animate: false }));
        return;
      }
      const el = itemRefs.current[activeId];
      if (!el) {
        indicatorReadyRef.current = false;
        setIndicator(prev => ({ ...prev, width: 0, visible: false, animate: false }));
        return;
      }
      const navBox = navRef.current.getBoundingClientRect();
      const itemBox = el.getBoundingClientRect();
      const shouldAnimate = animate && indicatorReadyRef.current;
      indicatorReadyRef.current = true;
      setIndicator({
        left: itemBox.left - navBox.left,
        width: itemBox.width,
        visible: true,
        animate: shouldAnimate,
      });
    };
    update(true);
    const onResize = () => update(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeId, categories]);

  useEffect(() => {
    if (!pressedId) return;
    const timer = window.setTimeout(() => setPressedId(null), 180);
    return () => window.clearTimeout(timer);
  }, [pressedId]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => () => {
    if (menuCloseTimer.current) window.clearTimeout(menuCloseTimer.current);
  }, []);

  const openMenu = () => {
    if (menuCloseTimer.current) window.clearTimeout(menuCloseTimer.current);
    setMenuOpen(true);
  };

  const closeMenu = (immediate = false) => {
    if (menuCloseTimer.current) window.clearTimeout(menuCloseTimer.current);
    if (immediate) {
      setMenuOpen(false);
      return;
    }
    menuCloseTimer.current = window.setTimeout(() => setMenuOpen(false), 120);
  };

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    navigate(query.trim() ? `/catalogue?q=${encodeURIComponent(query.trim())}` : '/catalogue');
    setMobileOpen(false);
  };

  const setItemRef = (id: NavItemId) => (el: HTMLAnchorElement | null) => {
    itemRefs.current[id] = el;
  };

  const linkClass = (id: NavItemId) => [
    'shop-category-link',
    activeId === id ? 'is-active' : '',
    pressedId === id ? 'is-pressed' : '',
    id === 'bulk' ? 'shop-category-link--trail' : '',
    id === 'all' ? 'shop-all-trigger' : '',
  ].filter(Boolean).join(' ');

  return <header className="sticky top-0 z-40 bg-white shadow-sm">
    <div className="shop-announcement"><div className="container flex items-center justify-between gap-3 py-2"><span>Packaging for the way you serve.</span><Link to="/contact" className="hidden sm:flex items-center gap-2"><Mail size={14} aria-hidden />Need a hand? Talk to our team</Link></div></div>
    <div className="container">
      <div className="shop-main-header">
        <Link to="/" className="shop-wordmark" aria-label={`${siteConfig.brandName} home`}><span className="shop-logo-monogram">PCS<span>UK</span></span><span className="shop-brand-description">PREMIUM CATERING<br/>SUPPLIES</span></Link>
        <form onSubmit={onSearch} className="shop-search"><label htmlFor="site-search" className="sr-only">Search products</label><input id="site-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search cups, containers, bags & more…" autoComplete="off"/><button aria-label="Search products" type="submit"><Search size={20}/></button></form>
        <QuoteBasket />
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetTrigger asChild><Button variant="outline" size="icon" className="lg:hidden shrink-0" aria-label="Open categories"><Menu size={21}/></Button></SheetTrigger><SheetContent side="left" className="overflow-y-auto"><SheetHeader className="text-left"><SheetTitle>Shop by category</SheetTitle><SheetDescription>Find packaging for your next service.</SheetDescription></SheetHeader><nav className="mt-6 grid gap-1"><Link to="/categories" onClick={() => setMobileOpen(false)} className="p-3 font-bold">All categories</Link>{sortedCategories.map(c => <Link key={c.id} to={`/catalogue?category=${c.slug}`} className="flex justify-between rounded-lg p-3 hover:bg-secondary" onClick={() => setMobileOpen(false)}>{c.displayName}<span className="text-muted-foreground">{c.productCount}</span></Link>)}<Link className="p-3" to="/contact" onClick={() => setMobileOpen(false)}>Contact our team</Link></nav></SheetContent></Sheet>
      </div>
      <nav ref={navRef} className="shop-category-nav" aria-label="Shop categories">
        <span
          className={[
            'shop-category-indicator',
            indicator.visible ? 'is-visible' : '',
            indicator.animate ? 'is-animated' : '',
          ].filter(Boolean).join(' ')}
          aria-hidden
          style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
        />
        <div
          className={`shop-all-menu${menuOpen ? ' is-open' : ''}`}
          onMouseEnter={openMenu}
          onMouseLeave={() => closeMenu()}
          onFocus={openMenu}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeMenu(true);
          }}
        >
          <Link
            to="/categories"
            ref={setItemRef('all')}
            className={linkClass('all')}
            aria-current={activeId === 'all' ? 'page' : undefined}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            onClick={() => setPressedId('all')}
          >
            <Menu size={16} aria-hidden />
            All products
            <ChevronDown size={14} className={`shop-all-chevron${menuOpen ? ' is-open' : ''}`} aria-hidden />
          </Link>
          <div className="shop-all-menu-panel" role="menu" aria-label="All categories">
            <p className="shop-all-menu-heading">Category</p>
            <Link
              to="/categories"
              role="menuitem"
              className="shop-all-menu-item shop-all-menu-item--all"
              onClick={() => closeMenu(true)}
            >
              All categories
            </Link>
            {sortedCategories.map((c) => (
              <Link
                key={c.id}
                to={`/catalogue?category=${c.slug}`}
                role="menuitem"
                className="shop-all-menu-item"
                onClick={() => closeMenu(true)}
              >
                <span>{c.displayName}</span>
                <span className="shop-all-menu-count">{c.productCount}</span>
              </Link>
            ))}
          </div>
        </div>
        {NAV_CATEGORY_SLUGS.map(slug => {
          const c = categories.find(cat => cat.slug === slug);
          if (!c) return null;
          return (
            <Link
              key={c.id}
              to={`/catalogue?category=${c.slug}`}
              ref={setItemRef(slug)}
              className={linkClass(slug)}
              aria-current={activeId === slug ? 'page' : undefined}
              onClick={() => setPressedId(slug)}
            >
              {navCategoryLabel(c.displayName)}
            </Link>
          );
        })}
        <Link
          to="/contact"
          ref={setItemRef('bulk')}
          className={linkClass('bulk')}
          aria-current={activeId === 'bulk' ? 'page' : undefined}
          onClick={() => setPressedId('bulk')}
        >
          Bulk enquiries
        </Link>
      </nav>
    </div>
    <div className="shop-service-strip"><div className="container flex items-center justify-between gap-4 py-2.5"><span className="flex items-center gap-2"><PackageOpen size={16} aria-hidden/>Packs & cases for your business</span><span className="hidden sm:inline">{categories.length} categories. One everyday supply list.</span><span className="hidden lg:inline">Build your basket. Get a tailored quote.</span></div></div>
  </header>;
}
