import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Package,
  Clock,
  CheckCircle,
  Award,
  Truck,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

const SampleService = () => {
  const { formatPrice, convertPrice } = useCurrency();

  // Sample price ranges (base prices in GBP, convert from GBP to selected currency)
  const formatSamplePrice = (minPrice: number, maxPrice: number): string => {
    const convertedMin = convertPrice(minPrice, 'GBP');
    const convertedMax = convertPrice(maxPrice, 'GBP');
    return `${formatPrice(convertedMin)}-${formatPrice(convertedMax)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Sample Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience our quality firsthand with our comprehensive sample
              service. Get physical samples of our products to evaluate quality,
              materials, and craftsmanship before placing your order.
            </p>
          </div>
        </div>
      </section>

      {/* Sample Types Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Sample Types Available
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: 'Product Samples',
                description: 'Physical samples of our standard product range',
                features: [
                  'Wallets',
                  'Bags',
                  'Belts',
                  'Accessories',
                  'All sizes available',
                ],
              },
              {
                icon: Award,
                title: 'Custom Samples',
                description: 'Samples made to your specific requirements',
                features: [
                  'Custom designs',
                  'Your materials',
                  'Special finishes',
                  'Brand colors',
                ],
              },
              {
                icon: CheckCircle,
                title: 'Quality Samples',
                description: 'Samples showcasing our quality standards',
                features: [
                  'Premium materials',
                  'Craftsmanship details',
                  'Finish quality',
                  'Durability testing',
                ],
              },
            ].map((service, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <service.icon className="h-8 w-8 text-accent mr-3" />
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
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

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Our Sample Service Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Request Samples',
                description:
                  "Tell us which products you'd like to sample and any specific requirements",
              },
              {
                step: '02',
                title: 'Sample Preparation',
                description:
                  'We prepare your samples with attention to detail and quality',
              },
              {
                step: '03',
                title: 'Fast Shipping',
                description:
                  'Samples are shipped worldwide within 3-5 business days',
              },
              {
                step: '04',
                title: 'Evaluation',
                description:
                  'Review samples and provide feedback for your final order',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-accent text-luxury-dark text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Categories Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Available Sample Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Wallets & Card Holders',
              'Bags & Totes',
              'Backpacks',
              'Belts',
              'Keychains',
              'Gloves',
              'Jackets',
              'Travel Accessories',
              'Corporate Gifts',
              'Custom Designs',
              'Leather Types',
              'Color Variations',
            ].map((category, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-background rounded-lg border"
              >
                <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                <span className="font-medium">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Timeline Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Sample Service Details
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-8 w-8 text-accent mr-3" />
                  <h3 className="text-xl font-semibold">Timeline</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    <span>Sample preparation: 2-3 days</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    <span>Shipping: 3-5 business days</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    <span>Rush orders: 1-2 days extra</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    <span>Custom samples: 5-7 days</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Package className="h-8 w-8 text-accent mr-3" />
                  <h3 className="text-xl font-semibold">Pricing</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    <span>
                      Standard samples: {formatSamplePrice(15, 25)} each
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    <span>
                      Custom samples: {formatSamplePrice(25, 50)} each
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    <span>Shipping: {formatSamplePrice(10, 20)} worldwide</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    <span>Bulk samples: Discounted rates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Request Your Samples
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-accent mr-3" />
                  <a
                    href="mailto:samples@forthandvale.com"
                    className="hover:text-accent transition-colors"
                  >
                    samples@forthandvale.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-accent mr-3" />
                  <a
                    href="tel:+441234567890"
                    className="hover:text-accent transition-colors"
                  >
                    +44 123 456 7890
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-accent mr-3 mt-1" />
                  <div>
                    <p>Forth & Vale Limited</p>
                    <p>Milton Keynes, United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Sample Request Form
              </h3>
              <p className="text-muted-foreground mb-4">
                Tell us about your sample requirements and we'll get back to you
                within 24 hours.
              </p>
              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link to="/sample-kit">Request Sample Kit</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/quote">Get Custom Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience Our Quality?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Order your samples today and see why leading brands choose Forth &
            Vale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/sample-kit">Order Samples Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/catalogue">View Full Catalogue</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SampleService;
