import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const Bags = () => {
  useSEO({
    title: 'Luxury Leather Bags - Tote, Crossbody & Backpack',
    description:
      'Premium leather bags including totes, crossbody bags, backpacks, duffle bags, and laptop bags. Custom OEM/private label manufacturing with minimum order quantity of 50 units.',
    keywords:
      'leather bags, tote bags, crossbody bags, leather backpacks, duffle bags, laptop bags, custom bags, OEM bags, leather bag manufacturer, wholesale leather bags',
    ogTitle: 'Luxury Leather Bags - Tote, Crossbody & Backpack | Forth & Vale',
    ogDescription:
      'Premium leather bags with custom design and OEM/private label services. Minimum order 50 units. Samples available.',
    ogImage: '/products/Bag/Tote/handbag 1_detail.webp',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Luxury Leather Bags
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From elegant totes to structured handbags, our collection combines
              traditional craftsmanship with contemporary design for the
              discerning customer.
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
                name: "Tote Bags (Women's)",
                description: 'Spacious and elegant for daily use',
                features: [
                  'Large capacity',
                  'Reinforced handles',
                  'Interior organization',
                ],
                image: '/products/Bag/Tote/handbag 1_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Crossbody Bags',
                description: 'Hands-free convenience with style',
                features: [
                  'Adjustable strap',
                  'Secure closure',
                  'Compact design',
                ],
                image: '/products/Bag/Crossbody/crossbody 1_detail.webp',
                link: '/product/fashion-accessories',
              },
              {
                name: 'Backpacks',
                description: 'Modern backpacks for urban professionals',
                features: [
                  'Laptop compartment',
                  'Water resistant',
                  'Ergonomic design',
                ],
                image: '/products/Bag/backpack/backpack 1_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Duffle Bags (Travel)',
                description: 'Perfect companion for travel and gym',
                features: [
                  'Large capacity',
                  'Durable handles',
                  'Premium materials',
                ],
                image: '/products/Bag/Duffel/duffel 1_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Laptop Bags',
                description: 'Professional protection for your technology',
                features: [
                  'Padded compartment',
                  'Professional design',
                  'Durable construction',
                ],
                image: '/products/Bag/Laptop/laptop 1_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Tote Bags - Variant 2',
                description: 'Classic design with modern functionality',
                features: [
                  'Timeless style',
                  'Premium materials',
                  'Interior pockets',
                ],
                image: '/products/Bag/Tote/handbag 2_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Crossbody Bags - Variant 2',
                description: 'Sophisticated design with enhanced features',
                features: [
                  'Premium materials',
                  'Secure closure',
                  'Compact design',
                ],
                image: '/products/Bag/Crossbody/crossbody 2_detail.webp',
                link: '/product/fashion-accessories',
              },
              {
                name: 'Backpacks - Variant 2',
                description: 'Enhanced functionality for professionals',
                features: [
                  'Laptop compartment',
                  'Water resistant',
                  'Ergonomic design',
                ],
                image: '/products/Bag/backpack/backpack 2_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Tote Bags - Variant 3',
                description: 'Elegant design with practical features',
                features: [
                  'Spacious interior',
                  'Reinforced handles',
                  'Premium finish',
                ],
                image: '/products/Bag/Tote/handbag 3_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Duffle Bags - Variant 2',
                description: 'Enhanced travel companion',
                features: [
                  'Large capacity',
                  'Durable construction',
                  'Premium materials',
                ],
                image: '/products/Bag/Duffel/duffel 2_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Laptop Bags - Variant 2',
                description: 'Professional protection with style',
                features: [
                  'Padded compartment',
                  'Modern design',
                  'Durable construction',
                ],
                image: '/products/Bag/Laptop/laptop 2_detail.webp',
                link: '/product/bags',
              },
              {
                name: 'Crossbody Bags - Variant 3',
                description: 'Classic elegance with modern functionality',
                features: [
                  'Timeless design',
                  'Adjustable strap',
                  'Secure closure',
                ],
                image: '/products/Bag/Crossbody/crossbody 3_detail.webp',
                link: '/product/fashion-accessories',
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
            Create Your Signature Bag Collection
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Minimum order quantity: 50 units for bags. Custom colors and
            hardware available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sample-kit?product=totes-bags">Request Samples</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bags;
