import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const Wallets = () => {
  useSEO({
    title: 'Premium Leather Wallets - Custom Design & OEM',
    description:
      'Handcrafted leather wallets including bi-fold, tri-fold, and passport holders. Custom OEM/private label manufacturing with minimum order quantity of 100 units. Get samples in 7-10 days.',
    keywords:
      'leather wallets, bi-fold wallet, tri-fold wallet, passport holder, custom wallets, OEM wallets, leather wallet manufacturer, wholesale wallets, premium leather wallets',
    ogTitle: 'Premium Leather Wallets - Custom Design & OEM | Forth & Vale',
    ogDescription:
      'Handcrafted leather wallets with custom design and OEM/private label services. Minimum order 100 units. Samples in 7-10 days.',
    ogImage: '/products/Wallet/Bifold/bi 1_detail.webp',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Premium Leather Wallets
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Handcrafted wallets made from full-grain leather. From minimalist
              card holders to traditional bi-fold designs, each piece combines
              functionality with timeless style.
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
                name: 'Bi-Fold Leather Wallet',
                description:
                  'Classic design with multiple card slots and bill compartment',
                features: [
                  '8 card slots',
                  '2 bill compartments',
                  'RFID blocking available',
                ],
                image: '/products/Wallet/Bifold/bi 1_detail.webp',
                link: '/product/wallets',
              },
              {
                name: 'Tri-Fold Leather Wallet',
                description: 'Maximum storage in compact design',
                features: ['12 card slots', 'ID window', 'Coin pocket'],
                image: '/products/Wallet/Trifold/tri 1_detail.webp',
                link: '/product/wallets',
              },
              {
                name: 'Passport Holders',
                description: 'Elegant protection for your travel documents',
                features: [
                  'Full passport coverage',
                  'Card slots',
                  'Premium leather finish',
                ],
                image: '/products/Wallet/Passport/pass 1_detail.webp',
                link: '/product/wallets',
              },
              {
                name: 'Bi-Fold Wallet - Variant 2',
                description: 'Premium leather with refined stitching',
                features: [
                  'Handcrafted details',
                  'Multiple card slots',
                  'Bill compartment',
                ],
                image: '/products/Wallet/Bifold/bi 2_detail.webp',
                link: '/product/wallets',
              },
              {
                name: 'Tri-Fold Wallet - Variant 2',
                description: 'Sophisticated design with enhanced storage',
                features: ['Premium materials', 'ID window', 'Coin pocket'],
                image: '/products/Wallet/Trifold/tri 2_detail.webp',
                link: '/product/wallets',
              },
              {
                name: 'Passport Holder - Variant 2',
                description: 'Travel-ready with secure closure',
                features: [
                  'Travel document slots',
                  'Card storage',
                  'Durable construction',
                ],
                image: '/products/Wallet/Passport/pass 2_detail.webp',
                link: '/product/wallets',
              },
              {
                name: 'Bi-Fold Wallet - Variant 3',
                description: 'Classic elegance with modern functionality',
                features: [
                  'Timeless design',
                  'Multiple compartments',
                  'RFID protection available',
                ],
                image: '/products/Wallet/Bifold/bi 3_detail.webp',
                link: '/product/wallets',
              },
              {
                name: 'Tri-Fold Wallet - Variant 3',
                description: 'Compact yet spacious design',
                features: [
                  'Maximum storage',
                  'Quick access slots',
                  'Premium finish',
                ],
                image: '/products/Wallet/Trifold/tri 3_detail.webp',
                link: '/product/wallets',
              },
              {
                name: 'Passport Holder - Variant 3',
                description: 'Executive style for business travelers',
                features: [
                  'Professional appearance',
                  'Multiple card slots',
                  'Premium leather',
                ],
                image: '/products/Wallet/Passport/pass 3_detail.webp',
                link: '/product/wallets',
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
            Ready to Create Your Custom Wallets?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Minimum order quantity: 100 units. Get samples in 7-10 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sample-kit?product=wallets">Request Samples</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Wallets;
