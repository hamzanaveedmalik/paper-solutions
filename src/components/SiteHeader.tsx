import { FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBasket, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getCategories } from '@/data/catalogue';
import { useQuote } from '@/contexts/QuoteContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function SiteHeader() {
  const navigate = useNavigate();
  const { itemCount } = useQuote();
  const categories = useMemo(() => getCategories(), []);
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/catalogue?q=${encodeURIComponent(q)}` : '/catalogue');
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 py-3 lg:gap-6">
          <Link to="/" className="shrink-0" aria-label={`${siteConfig.brandName} home`}>
            <img
              src={siteConfig.logoPath}
              alt={siteConfig.legalName}
              className="h-12 w-auto md:h-14"
              width={168}
              height={112}
            />
          </Link>

          <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-xl relative">
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
            <Input
              id="site-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or SKU"
              className="pl-9"
            />
          </form>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            <Button asChild variant="ghost" size="sm">
              <Link to="/catalogue">Catalogue</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/contact">Contact</Link>
            </Button>
          </nav>

          <Button asChild className="relative shrink-0">
            <Link to="/quote" aria-label={`Quote list, ${itemCount} items`}>
              <ShoppingBasket className="h-4 w-4 mr-2" aria-hidden />
              Quote
              {itemCount > 0 && (
                <span className="ml-2 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-primary-foreground/15 px-1.5 text-xs font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,22rem)]">
              <SheetHeader>
                <SheetTitle>Browse</SheetTitle>
              </SheetHeader>
              <form onSubmit={onSearch} className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products"
                  className="pl-9"
                />
              </form>
              <div className="mt-6 space-y-1">
                <Link
                  to="/catalogue"
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  All products
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/catalogue?category=${cat.slug}`}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat.displayName}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <nav
          className="hidden lg:flex items-center gap-1 pb-3 -mx-1 overflow-x-auto"
          aria-label="Categories"
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/catalogue?category=${cat.slug}`}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {cat.displayName}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
