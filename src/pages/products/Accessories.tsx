import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const Accessories = () => {
  useSEO({
    title: 'Premium Leather Accessories - Tech, Travel & More',
    description:
      'Essential leather accessories including passport holders, tech accessories, cardholders, and more. Custom OEM/private label manufacturing.',
    keywords:
      'leather accessories, passport holders, tech accessories, leather cardholders, travel accessories, OEM accessories',
    ogTitle: 'Premium Leather Accessories - Tech, Travel & More | Forth & Vale',
    ogDescription:
      'Essential leather accessories for modern living. Custom OEM manufacturing with quality craftsmanship.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Premium Leather Accessories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Essential leather accessories for modern living. From passport
              holders to tech accessories, each piece combines functionality
              with premium craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Leather Keychains',
                description: 'Handcrafted keychains for everyday use',
                features: [
                  'Durable construction',
                  'Premium leather',
                  'Multiple designs',
                ],
                image: '/products/Acessories/Keychain/keychain 1_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Personalized Keychains',
                description: 'Custom engraved keychains with your branding',
                features: [
                  'Custom text/logos',
                  'Multiple colors',
                  'Gift-ready packaging',
                ],
                image: '/products/Acessories/Keychain/keychain 2]_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Braided Keychains',
                description: 'Elegant braided design with premium finish',
                features: [
                  'Hand-braided leather',
                  'Durable hardware',
                  'Unique texture',
                ],
                image: '/products/Acessories/Keychain/keychain 3_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Leather Bracelets',
                description: 'Stylish leather bracelets for men and women',
                features: [
                  'Adjustable fit',
                  'Premium leather',
                  'Modern design',
                ],
                image: '/products/Acessories/Keychain/keychain 4_detail.webp',
                link: '/product/accessories',
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                asChild
              >
                <Link to={product.link}>
                  <div className="aspect-square bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <ul className="text-sm text-muted-foreground mb-6 space-y-1">
                      {product.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      View Details
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Custom Leather Accessories
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Minimum order quantities vary by product. Perfect for corporate
            gifts and promotional items.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sample-kit?product=accessories">Request Samples</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Accessories;
