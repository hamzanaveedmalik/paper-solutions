import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductImage from '@/components/catalogue/ProductImage';
import { getCategories, getProducts } from '@/data/catalogue';
import useSEO from '@/hooks/useSEO';

export default function Categories() {
  useSEO({
    title: 'All categories | PCS UK',
    description: 'Browse every PCS UK catering packaging category — cups, containers, bags, boxes and more.',
  });

  const categories = getCategories();
  const products = getProducts();

  return (
    <Layout>
      <div className="container py-8 md:py-10">
        <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-1">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground">All categories</li>
          </ol>
        </nav>

        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl">All categories</h1>
          <p className="text-muted-foreground">
            {categories.length} categories · Find the packaging that fits your service
          </p>
        </div>

        <div className="shop-category-grid">
          {categories.map((c) => {
            const sample = products.find(
              (p) => p.categorySlugs.includes(c.slug) && p.images[0]?.src.startsWith('/')
            );
            return (
              <Link
                key={c.id}
                to={`/catalogue?category=${c.slug}`}
                className="shop-category-tile"
              >
                <ProductImage
                  src={sample?.images[0]?.src ?? c.image?.src}
                  alt={c.displayName}
                  className="aspect-square"
                />
                <h3>{c.displayName}</h3>
                <p>{c.productCount} products</p>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Prefer to browse everything?{' '}
          <Link to="/catalogue" className="font-semibold text-foreground underline-offset-4 hover:underline">
            Shop all products
          </Link>
        </p>
      </div>
    </Layout>
  );
}
