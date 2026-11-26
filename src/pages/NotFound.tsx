import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import useSEO from '@/hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: 'Page not found',
    description: 'The page you requested could not be found.',
    noindex: true,
  });

  return (
    <Layout>
      <div className="container mx-auto py-20 text-center max-w-lg">
        <h1 className="text-3xl">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          That address is not part of the PCS UK catalogue. Try searching products or browse by
          category.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild>
            <Link to="/catalogue">Browse catalogue</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
