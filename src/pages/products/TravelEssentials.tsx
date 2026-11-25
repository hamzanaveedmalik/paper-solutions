import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TravelEssentials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Travel Essentials
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Premium leather travel accessories designed to enhance your
              journey. From luggage tags to toiletry bags, crafted for
              durability and style.
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
                name: 'Passport Holders',
                description: 'Elegant protection for travel documents',
                features: [
                  'Full passport coverage',
                  'Card slots',
                  'Premium leather finish',
                ],
                image: '/products/Wallet/Passport/pass 1_detail.webp',
                link: '/product/wallets',
              },
              {
                name: 'Leather Duffel Bags',
                description: 'Spacious bags for weekend getaways',
                features: [
                  'Large capacity',
                  'Durable handles',
                  'Premium materials',
                ],
                image: '/products/Bag/Duffel/duffel 1_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Leather Backpacks',
                description: 'Comfortable backpacks for adventure travel',
                features: [
                  'Ergonomic design',
                  'Laptop compartment',
                  'Water resistant',
                ],
                image: '/products/Bag/backpack/backpack 1_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Travel Wallets',
                description: 'Multi-currency wallets for international travel',
                features: [
                  'Multiple currency slots',
                  'Coin compartments',
                  'RFID blocking',
                ],
                image: '/products/Wallet/Bifold/bi 1_detail.webp',
                link: '/product/wallets',
              },
              {
                name: 'Leather Keychains',
                description: 'Durable keychains for travel organization',
                features: [
                  'Durable construction',
                  'Premium leather',
                  'Secure attachment',
                ],
                image: '/products/Acessories/Keychain/keychain 1_detail.webp',
                link: '/product/accessories',
              },
              {
                name: 'Leather Gloves',
                description: 'Premium gloves for travel comfort',
                features: [
                  'Premium materials',
                  'Comfortable fit',
                  'Weather protection',
                ],
                image: '/products/Acessories/Gloves/gloves 1_detail.webp',
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
            Travel in Style with Premium Leather
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Minimum order quantity: 100 units for travel accessories. Custom
            branding available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sample-kit?product=travel-essentials">
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

export default TravelEssentials;
