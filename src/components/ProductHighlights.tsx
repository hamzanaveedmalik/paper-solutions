import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductHighlights = () => {
  const products = [
    {
      name: 'Totes & Bags',
      slug: 'totes-bags',
      description: 'Professional and lifestyle carry solutions',
      image: '/products/totebag.png',
      features: [
        'Structured design',
        'Interior organization',
        'Hardware options',
      ],
    },
    {
      name: 'Leather Jackets',
      slug: 'jackets',
      description: 'Classic leather jackets with modern styling',
      image: '/products/Acessories/Jackets/jacket.png',
      features: [
        'Full-grain leather',
        'Timeless design',
        'Durable construction',
      ],
    },
    {
      name: 'Wallets',
      slug: 'wallets',
      description: 'Bifold, trifold, and minimalist designs',
      image: '/products/wallet.png',
      features: ['Premium leather', 'RFID blocking', 'Custom branding'],
    },
    {
      name: 'Backpacks',
      slug: 'backpacks',
      description: 'Modern backpacks for urban professionals',
      image: '/products/backpack.png',
      features: ['Laptop compartment', 'Water resistant', 'Ergonomic design'],
    },
    {
      name: 'Gloves',
      slug: 'gloves',
      description: 'Premium leather gloves for all seasons',
      image: '/products/Acessories/Gloves/gloves.png',
      features: [
        'Premium materials',
        'Comfortable fit',
        'Professional appearance',
      ],
    },
    {
      name: 'Belts',
      slug: 'belts',
      description: 'Classic and contemporary belt designs',
      image: '/products/belt.png',
      features: ['Italian leather', 'Quality buckles', 'Size customization'],
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-6">
            Our Product Range
          </h2>
          <p className="text-xl text-muted-foreground font-body leading-relaxed">
            From wallets to backpacks, every piece is crafted with precision and
            attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col h-full"
            >
              <div className="aspect-[4/3] bg-muted relative overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/40 via-transparent to-transparent"></div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-semibold text-primary mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4 font-body flex-shrink-0">
                  {product.description}
                </p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {product.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mt-auto"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="flex items-center justify-center"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/catalogue">
              View Full Catalogue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Browse our complete product catalogue with specifications and
            pricing
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
