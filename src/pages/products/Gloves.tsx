import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Gloves = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Premium Leather Gloves
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Handcrafted leather gloves combining functionality with elegance.
              From winter warmth to driving comfort, each pair is crafted with
              precision.
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
                name: 'Classic Leather Gloves',
                description: 'Timeless leather gloves for all occasions',
                features: [
                  'Premium leather',
                  'Comfortable fit',
                  'Professional appearance',
                ],
                image: '/products/Acessories/Gloves/gloves 1_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Driving Gloves',
                description: 'Enhanced grip and control for driving',
                features: [
                  'Perforated leather',
                  'Enhanced grip',
                  'Comfortable fit',
                ],
                image: '/products/Acessories/Gloves/gloves 2_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Touchscreen-Compatible Gloves',
                description: 'Modern gloves for digital lifestyle',
                features: [
                  'Touchscreen fingertips',
                  'Smartphone compatible',
                  'Flexible design',
                ],
                image: '/products/Acessories/Gloves/gloves 3_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Fashion Gloves (Unisex)',
                description: 'Stylish gloves for fashion-conscious individuals',
                features: [
                  'Contemporary designs',
                  'Unisex styling',
                  'Premium materials',
                ],
                image: '/products/Acessories/Gloves/gloves 4_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Winter Leather Gloves',
                description: 'Warm and stylish gloves for cold weather',
                features: [
                  'Thermal lining',
                  'Water resistant',
                  'Premium leather',
                ],
                image: '/products/Acessories/Gloves/gloves 5_detail.webp',
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
            Perfect Fit, Premium Quality
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Minimum order quantity: 100 pairs for gloves. Custom sizing and
            personalization available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sample-kit?product=gloves">Request Samples</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gloves;
