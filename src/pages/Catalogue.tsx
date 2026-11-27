import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/catalogue/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCategories, queryCatalogue, type CatalogueQuery } from '@/data/catalogue';
import useSEO from '@/hooks/useSEO';
import { X } from 'lucide-react';

function updateParam(
  params: URLSearchParams,
  key: string,
  value: string | null
): URLSearchParams {
  const next = new URLSearchParams(params);
  if (!value) next.delete(key);
  else next.set(key, value);
  if (key !== 'page') next.delete('page');
  return next;
}

export default function Catalogue() {
  const [params, setParams] = useSearchParams();
  const categories = useMemo(() => getCategories(), []);

  const query: CatalogueQuery = {
    q: params.get('q') || undefined,
    category: params.get('category') || undefined,
    material: params.get('material') || undefined,
    capacity: params.get('capacity') || undefined,
    pack: params.get('pack') || undefined,
    audience: params.get('audience') || undefined,
    sort: (params.get('sort') as CatalogueQuery['sort']) || 'name-asc',
    page: Number(params.get('page') || '1') || 1,
    pageSize: 24,
  };

  const result = queryCatalogue(query);
  const category = categories.find((c) => c.slug === query.category);

  useSEO({
    title: category
      ? `${category.displayName} | Catalogue`
      : query.q
        ? `Search: ${query.q}`
        : 'Shop all products',
    description: category
      ? `Browse ${category.displayName} from PCS UK catering packaging.`
      : 'Search and filter PCS UK catering packaging and supplies.',
  });

  const activeFilters = [
    query.q ? { key: 'q', label: `Search: ${query.q}` } : null,
    query.category
      ? { key: 'category', label: category?.displayName || query.category }
      : null,
    query.material ? { key: 'material', label: `Material: ${query.material}` } : null,
    query.capacity ? { key: 'capacity', label: `Capacity: ${query.capacity}` } : null,
    query.pack ? { key: 'pack', label: `Pack: ${query.pack}` } : null,
    query.audience ? { key: 'audience', label: `For: ${query.audience}` } : null,
  ].filter(Boolean) as { key: string; label: string }[];

  const set = (key: string, value: string | null) => {
    setParams(updateParam(params, key, value), { replace: false });
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 md:py-10">
        <nav className="text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
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
                <li className="text-foreground">{category.displayName}</li>
              </>
            )}
          </ol>
        </nav>

        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl md:text-4xl">
            {category ? category.displayName : 'Shop all products'}
          </h1>
          <p className="text-muted-foreground">
            {result.total} product{result.total === 1 ? '' : 's'}
            {query.q ? ` matching “${query.q}”` : ''}
          </p>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="space-y-6 shop-filter-panel" aria-label="Filters">
            <div>
              <Label htmlFor="catalogue-search">Search</Label>
              <Input
                id="catalogue-search"
                className="mt-2"
                defaultValue={query.q || ''}
                placeholder="Title, SKU, attributes"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    set('q', (e.target as HTMLInputElement).value.trim() || null);
                  }
                }}
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Category</p>
              <ul className="space-y-1 text-sm">
                <li>
                  <button
                    type="button"
                    className={`text-left w-full rounded px-2 py-1 ${!query.category ? 'bg-secondary font-medium' : 'hover:bg-muted'}`}
                    onClick={() => set('category', null)}
                  >
                    All categories
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <button
                      type="button"
                      className={`text-left w-full rounded px-2 py-1 ${query.category === cat.slug ? 'bg-secondary font-medium' : 'hover:bg-muted'}`}
                      onClick={() => set('category', cat.slug)}
                    >
                      {cat.displayName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {result.materials.length > 0 && (
              <div>
                <Label htmlFor="filter-material">Material</Label>
                <select
                  id="filter-material"
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={query.material || ''}
                  onChange={(e) => set('material', e.target.value || null)}
                >
                  <option value="">Any</option>
                  {result.materials.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {result.capacities.length > 0 && (
              <div>
                <Label htmlFor="filter-capacity">Capacity</Label>
                <select
                  id="filter-capacity"
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={query.capacity || ''}
                  onChange={(e) => set('capacity', e.target.value || null)}
                >
                  <option value="">Any</option>
                  {result.capacities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {result.packs.length > 0 && (
              <div>
                <Label htmlFor="filter-pack">Pack quantity</Label>
                <select
                  id="filter-pack"
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={query.pack || ''}
                  onChange={(e) => set('pack', e.target.value || null)}
                >
                  <option value="">Any</option>
                  {result.packs.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </aside>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs"
                    onClick={() => set(filter.key, null)}
                  >
                    {filter.label}
                    <X className="h-3 w-3" aria-hidden />
                  </button>
                ))}
                {activeFilters.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setParams(new URLSearchParams())}
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="sort" className="sr-only">
                  Sort
                </Label>
                <select
                  id="sort"
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={query.sort}
                  onChange={(e) => set('sort', e.target.value)}
                >
                  <option value="name-asc">Name A–Z</option>
                  <option value="name-desc">Name Z–A</option>
                  <option value="price-asc">Price: low to high (known only)</option>
                  <option value="price-desc">Price: high to low (known only)</option>
                </select>
              </div>
            </div>

            {query.sort?.startsWith('price') && (
              <p className="text-xs text-muted-foreground mb-4">
                Products with unknown or “Request price” values sort after known prices.
              </p>
            )}

            {result.items.length === 0 ? (
              <div className="rounded-md border border-dashed border-border p-10 text-center">
                <h2 className="text-xl font-display">No products match</h2>
                <p className="mt-2 text-muted-foreground">
                  Try clearing filters or searching a different term.
                </p>
                <Button className="mt-4" variant="outline" onClick={() => setParams(new URLSearchParams())}>
                  Reset catalogue
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
                {result.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {result.pageCount > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
                <Button
                  type="button"
                  variant="outline"
                  disabled={result.page <= 1}
                  onClick={() => set('page', String(result.page - 1))}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {result.page} of {result.pageCount}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  disabled={result.page >= result.pageCount}
                  onClick={() => set('page', String(result.page + 1))}
                >
                  Next
                </Button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
