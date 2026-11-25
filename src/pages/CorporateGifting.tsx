import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const CorporateGifting = () => {
  useSEO({
    title: 'Corporate Gifting Solutions - Premium Leather Gifts',
    description:
      'Make a lasting impression with premium leather corporate gifts. Employee recognition, client appreciation, and executive gifts with custom branding.',
    keywords:
      'corporate gifts, executive gifts, employee gifts, leather corporate gifts, promotional leather goods, branded gifts',
    ogTitle:
      'Corporate Gifting Solutions - Premium Leather Gifts | Forth & Vale',
    ogDescription:
      'Premium leather corporate gifts with custom branding for employee recognition and client appreciation.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Corporate Gifting Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Make a lasting impression with premium leather gifts. From
              employee recognition to client appreciation, our custom leather
              goods reflect your company's commitment to quality.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Gifts Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Corporate Gifts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Executive Portfolios',
                description:
                  'Professional portfolios for meetings and presentations',
                features: [
                  'Document storage',
                  'Business card slots',
                  'Custom embossing',
                ],
              },
              {
                title: 'Branded Wallets',
                description: 'Premium wallets with subtle company branding',
                features: [
                  'Multiple styles',
                  'RFID protection',
                  'Gift packaging',
                ],
              },
              {
                title: 'Tech Accessories',
                description:
                  'Leather cases and organizers for modern professionals',
                features: [
                  'Device protection',
                  'Cable management',
                  'Custom sizing',
                ],
              },
            ].map((gift, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{gift.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {gift.description}
                  </p>
                  <ul className="text-sm space-y-2">
                    {gift.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Options */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Branding Options
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Make It Uniquely Yours
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                  <div>
                    <strong>Embossing & Debossing:</strong> Your logo elegantly
                    pressed into the leather
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                  <div>
                    <strong>Hot Stamping:</strong> Metallic foil application for
                    premium appearance
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                  <div>
                    <strong>Color Matching:</strong> Custom leather colors to
                    match your brand
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                  <div>
                    <strong>Custom Packaging:</strong> Branded gift boxes and
                    presentation
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-muted rounded-lg p-8">
              <h4 className="text-lg font-semibold mb-4">Volume Pricing</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>100-249 units</span>
                  <span className="font-medium">Standard pricing</span>
                </div>
                <div className="flex justify-between">
                  <span>250-499 units</span>
                  <span className="font-medium">8% discount</span>
                </div>
                <div className="flex justify-between">
                  <span>500-999 units</span>
                  <span className="font-medium">12% discount</span>
                </div>
                <div className="flex justify-between">
                  <span>1000+ units</span>
                  <span className="font-medium">18% discount</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Impress Your Team & Clients?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get a custom quote for your corporate gifting needs. We handle
            everything from design to delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/quote">Get Corporate Quote</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/#lead">View Gift Catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CorporateGifting;
