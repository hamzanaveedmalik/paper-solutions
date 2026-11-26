import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/catalogue/ProductCard';
import ProductImage from '@/components/catalogue/ProductImage';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { getCategories, getFeaturedProducts } from '@/data/catalogue';
import useSEO from '@/hooks/useSEO';

const audiences = [
  { label: 'Cafés', audience: 'cafes', blurb: 'Cups, lids, napkins and everyday service essentials.' },
  { label: 'Takeaways', audience: 'takeaways', blurb: 'Bags, boxes and packaging for collection and delivery.' },
  { label: 'Restaurants', audience: 'restaurants', blurb: 'Containers, trays and table-ready supplies.' },
  { label: 'Caterers', audience: 'caterers', blurb: 'Case quantities suited to larger service runs.' },
];

export default function Index() {
  useSEO({
    title: `${siteConfig.brandName} — Catering packaging catalogue`,
    description: `${siteConfig.tagline} ${siteConfig.description}`,
  });

  const categories = getCategories();
  const featured = getFeaturedProducts(8);

  return (
    <Layout>
      <section className="border-b border-border bg-[linear-gradient(180deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]">
        <div className="container mx-auto py-12 md:py-16 max-w-3xl text-center">
          <img
            src={siteConfig.logoPath}
            alt={siteConfig.legalName}
            className="mx-auto h-36 w-auto md:h-48"
            width={360}
            height={240}
          />
          <h1 className="mt-8 font-display text-2xl md:text-4xl leading-tight text-foreground">
            {siteConfig.tagline}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/catalogue">Browse products</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/quote">Request a quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-14">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl">Shop by category</h2>
            <p className="mt-2 text-muted-foreground">
              Source categories from the PCS UK range, presented for faster browsing.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/catalogue">View all</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/catalogue?category=${category.slug}`}
              className="group"
            >
              <ProductImage
                src={category.image?.src}
                alt={category.image?.alt || category.displayName}
                className="aspect-[4/3] rounded-md"
              />
              <div className="mt-3">
                <h3 className="font-medium group-hover:underline underline-offset-2">
                  {category.displayName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.productCount} product{category.productCount === 1 ? '' : 's'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 border-y border-border">
        <div className="container mx-auto py-14">
          <h2 className="text-2xl md:text-3xl">Featured products</h2>
          <p className="mt-2 text-muted-foreground mb-8">
            A selection from the live catalogue — prices shown only where verified.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto py-14">
        <h2 className="text-2xl md:text-3xl">Built for foodservice teams</h2>
        <p className="mt-2 text-muted-foreground mb-8 max-w-2xl">
          Jump into curated catalogue filters for common business types.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((item) => (
            <Link
              key={item.audience}
              to={`/catalogue?audience=${item.audience}`}
              className="rounded-md border border-border bg-card p-5 hover:border-primary/40 transition-colors"
            >
              <h3 className="font-display text-xl">{item.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto pb-16">
        <div className="rounded-lg border border-border bg-pcs-deep text-primary-foreground px-6 py-10 md:px-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-display">Need a quote for your list?</h2>
            <p className="mt-3 text-primary-foreground/80">
              Add products as you browse, then send your requirements. We will respond with pricing
              for your delivery area — this phase does not take online payments.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link to="/quote">Request a quote</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
