import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Jackets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Premium Leather Jackets
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Handcrafted leather jackets that combine timeless style with
              modern functionality. From classic bikers to formal blazers, each
              piece is crafted to perfection.
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
                name: 'Classic Leather Jacket',
                description: 'Timeless leather jacket with modern styling',
                features: [
                  'Full-grain leather',
                  'YKK zippers',
                  'Reinforced stitching',
                ],
                image: '/products/Acessories/Jackets/jacket 1_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Bomber Style Jacket',
                description: 'Modern bomber style with leather construction',
                features: [
                  'Ribbed cuffs',
                  'Interior pockets',
                  'Contemporary fit',
                ],
                image: '/products/Acessories/Jackets/jacket 2_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Suede Finish Jacket',
                description: 'Soft suede finish for sophisticated look',
                features: ['Premium suede', 'Soft texture', 'Elegant drape'],
                image: '/products/Acessories/Jackets/jacket 3_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Formal Leather Blazer',
                description: 'Business-appropriate leather blazers',
                features: [
                  'Professional cut',
                  'Premium finish',
                  'Versatile styling',
                ],
                image: '/products/Acessories/Jackets/jacket 4_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Long Leather Coat',
                description: 'Full-length coats for ultimate sophistication',
                features: [
                  'Full-length design',
                  'Premium lining',
                  'Weather protection',
                ],
                image: '/products/Acessories/Jackets/jacket 5_detail.webp',
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
            Timeless Style, Premium Quality
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Minimum order quantity: 10 units for jackets. Custom sizing and
            personalization available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sample-kit?product=jackets">Request Samples</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Jackets;
