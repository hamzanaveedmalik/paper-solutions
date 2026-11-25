import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const OfficeLifestyle = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Office & Lifestyle Leather Goods
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional leather accessories designed to enhance your
              workspace and daily routine. From desk organizers to tech
              accessories, crafted with premium materials.
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
                description: 'Professional keychains for office use',
                features: [
                  'Durable construction',
                  'Premium leather',
                  'Custom branding available',
                ],
                image: '/products/Acessories/Keychain/keychain 1_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Leather Gloves',
                description: 'Premium gloves for professional appearance',
                features: [
                  'Premium materials',
                  'Comfortable fit',
                  'Professional styling',
                ],
                image: '/products/Acessories/Gloves/gloves 1_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Leather Jackets',
                description: 'Classic jackets for business casual',
                features: [
                  'Full-grain leather',
                  'Timeless design',
                  'Professional appearance',
                ],
                image: '/products/Acessories/Jackets/jacket 1_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Leather Wallets',
                description: 'Professional wallets for business cards',
                features: [
                  'Multiple card slots',
                  'Business card holder',
                  'Premium construction',
                ],
                image: '/products/Wallet/Bifold/bi 1_detail.webp',
                link: '/product/wallets',
              },
              {
                name: 'Leather Bags',
                description: 'Professional bags for work and travel',
                features: [
                  'Laptop compartment',
                  'Professional design',
                  'Durable construction',
                ],
                image: '/products/Bag/Laptop/laptop 1_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Leather Belts',
                description: 'Professional belts for business attire',
                features: [
                  'Premium leather',
                  'Classic buckle design',
                  'Professional appearance',
                ],
                image: '/products/Belt/Formal/formal 1_detail.webp',
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
            Upgrade Your Office with Premium Leather
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Minimum order quantity: 100 units for office accessories. Custom
            branding available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sample-kit?product=office-lifestyle">
                Request Samples
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OfficeLifestyle;
