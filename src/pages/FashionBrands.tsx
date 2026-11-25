import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const FashionBrands = () => {
  useSEO({
    title: 'Fashion Brands - Custom Leather Collections',
    description:
      'Partner with Forth & Vale to create custom leather collections for fashion brands. Seasonal lines, signature pieces, and private label solutions with fast turnaround.',
    keywords:
      'fashion brands leather goods, seasonal collections, fashion accessories, custom leather products for brands, private label fashion',
    ogTitle: 'Fashion Brands - Custom Leather Collections | Forth & Vale',
    ogDescription:
      'Partner with us to create custom leather collections. Seasonal lines, signature pieces, and private label solutions with fast turnaround.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Fashion Brands Partnership
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We partner with fashion brands to create custom leather
              collections that reflect your unique aesthetic. From seasonal
              lines to signature pieces, we bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Offer Fashion Brands
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Collections',
                description:
                  'Develop exclusive leather goods that align with your brand identity',
                features: [
                  'Design consultation',
                  'Material selection',
                  'Prototype development',
                ],
              },
              {
                title: 'Seasonal Lines',
                description:
                  'Fast turnaround for seasonal and limited edition collections',
                features: [
                  'Quick sampling',
                  'Flexible quantities',
                  'Trend-focused designs',
                ],
              },
              {
                title: 'Private Label',
                description:
                  'Complete white-label solutions with your branding',
                features: [
                  'Custom packaging',
                  'Brand labeling',
                  'Exclusive designs',
                ],
              },
            ].map((service, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="text-sm space-y-2">
                    {service.features.map((feature, idx) => (
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

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Collaboration Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'Understand your brand and design requirements',
              },
              {
                step: '02',
                title: 'Design',
                description:
                  'Create custom designs and technical specifications',
              },
              {
                step: '03',
                title: 'Sampling',
                description: 'Develop prototypes for your approval',
              },
              {
                step: '04',
                title: 'Production',
                description: 'Manufacturing with quality control at every step',
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Create Your Collection?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how we can bring your leather goods vision to life.
            From concept to delivery, we're your manufacturing partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/#calendar">Schedule Consultation</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/products/fashion-accessories">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FashionBrands;
