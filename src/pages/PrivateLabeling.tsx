import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Package,
  Shield,
  Award,
  Users,
  Globe,
} from 'lucide-react';
import useSEO from '@/hooks/useSEO';

const PrivateLabeling = () => {
  useSEO({
    title: 'Private Label Manufacturing Services',
    description:
      'Complete private label leather goods manufacturing with custom branding, packaging, and exclusive designs. Minimum order quantities, quality assurance, and worldwide distribution.',
    keywords:
      'private label manufacturing, white label leather goods, OEM leather products, custom branding, private label bags, private label wallets',
    ogTitle: 'Private Label Manufacturing Services | Forth & Vale',
    ogDescription:
      'Transform your brand with private label leather goods. Custom branding, quality assurance, flexible MOQs, and worldwide distribution.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Private Label Manufacturing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your brand with our comprehensive private labeling
              services. From concept to delivery, we create exclusive leather
              goods that carry your brand identity.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Complete Private Label Solutions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: 'White Label Products',
                description:
                  'Ready-to-brand leather goods with your custom labeling and packaging',
                features: [
                  'Custom branding',
                  'Private packaging',
                  'Exclusive designs',
                ],
              },
              {
                icon: Shield,
                title: 'Brand Protection',
                description:
                  'Complete confidentiality and IP protection throughout the process',
                features: [
                  'NDA agreements',
                  'Secure production',
                  'Exclusive rights',
                ],
              },
              {
                icon: Award,
                title: 'Quality Assurance',
                description:
                  'Rigorous quality control ensuring your brand standards are met',
                features: [
                  'Multi-point inspection',
                  'Quality certifications',
                  'Consistent standards',
                ],
              },
              {
                icon: Users,
                title: 'Dedicated Support',
                description:
                  'Dedicated account management and technical support team',
                features: [
                  'Account manager',
                  'Technical support',
                  'Regular updates',
                ],
              },
              {
                icon: Globe,
                title: 'Global Distribution',
                description:
                  'Worldwide shipping and logistics support for your brand',
                features: [
                  'International shipping',
                  'Customs handling',
                  'Tracking systems',
                ],
              },
              {
                icon: CheckCircle,
                title: 'Flexible MOQs',
                description:
                  'Adaptable minimum order quantities to suit your business needs',
                features: [
                  'Low minimums',
                  'Scalable production',
                  'Seasonal flexibility',
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
            Our Private Label Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Brand Consultation',
                description:
                  'We understand your brand values, target market, and design requirements to create a tailored approach.',
              },
              {
                step: '02',
                title: 'Design & Development',
                description:
                  'Our design team creates exclusive products that align with your brand identity and market positioning.',
              },
              {
                step: '03',
                title: 'Prototype & Approval',
                description:
                  'We develop prototypes for your approval, ensuring every detail meets your brand standards.',
              },
              {
                step: '04',
                title: 'Production & Delivery',
                description:
                  'Full-scale production with quality control, custom packaging, and worldwide delivery to your specifications.',
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

      {/* Industries Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Industries We Serve
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Fashion & Apparel Brands',
              'Corporate Gifting Companies',
              'Luxury Retailers',
              'E-commerce Platforms',
              'Distributors & Wholesalers',
              'Corporate Companies',
              'Gift & Souvenir Shops',
              'Boutique Retailers',
              'Online Marketplaces',
            ].map((industry, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-background rounded-lg border"
              >
                <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                <span className="font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Launch Your Private Label?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how we can help you create exclusive leather goods
            that strengthen your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sample-kit">Request Samples</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivateLabeling;
