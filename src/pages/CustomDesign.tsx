import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Palette,
  Ruler,
  Lightbulb,
  FileText,
  Users,
  Clock,
  CheckCircle,
  Award,
} from 'lucide-react';
import useSEO from '@/hooks/useSEO';

const CustomDesign = () => {
  useSEO({
    title: 'Custom Design Services for Leather Goods',
    description:
      'Comprehensive custom design services for leather goods including concept development, technical design, CAD drawings, and prototype development. Bring your vision to life.',
    keywords:
      'custom leather design, CAD leather goods, prototype development, technical design, custom leather manufacturing, design services, leather goods R&D',
    ogTitle: 'Custom Design Services for Leather Goods | Forth & Vale',
    ogDescription:
      'Transform your ideas into premium leather goods with our comprehensive design services. Concept development, technical design, and prototyping.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Custom Design Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bring your unique vision to life with our comprehensive custom
              design services. From concept sketches to finished products, we
              turn your ideas into premium leather goods.
            </p>
          </div>
        </div>
      </section>

      {/* Design Services Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Design Capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: 'Concept Development',
                description:
                  'Transform your initial ideas into detailed design concepts with our creative team',
                features: [
                  'Mood boards',
                  'Style exploration',
                  'Brand alignment',
                  'Market research',
                ],
              },
              {
                icon: Ruler,
                title: 'Technical Design',
                description:
                  'Precise technical drawings and specifications for manufacturing',
                features: [
                  'CAD drawings',
                  'Pattern making',
                  'Size specifications',
                  'Material planning',
                ],
              },
              {
                icon: Lightbulb,
                title: 'Innovation & R&D',
                description:
                  'Cutting-edge design solutions and material innovations',
                features: [
                  'New techniques',
                  'Material testing',
                  'Prototype development',
                  'Patent support',
                ],
              },
              {
                icon: FileText,
                title: 'Design Documentation',
                description:
                  'Comprehensive design packages for production and future reference',
                features: [
                  'Technical specs',
                  'Material lists',
                  'Assembly guides',
                  'Quality standards',
                ],
              },
              {
                icon: Users,
                title: 'Collaborative Process',
                description:
                  'Work closely with our design team throughout the entire process',
                features: [
                  'Regular reviews',
                  'Feedback integration',
                  'Design iterations',
                  'Final approval',
                ],
              },
              {
                icon: Award,
                title: 'Design Excellence',
                description:
                  'Award-winning design team with expertise in luxury leather goods',
                features: [
                  'Industry experience',
                  'Trend awareness',
                  'Quality focus',
                  'Innovation mindset',
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

      {/* Design Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Design Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description:
                  'Understanding your vision, requirements, and brand identity',
              },
              {
                step: '02',
                title: 'Concept',
                description: 'Creating initial design concepts and mood boards',
              },
              {
                step: '03',
                title: 'Development',
                description: 'Refining designs with technical specifications',
              },
              {
                step: '04',
                title: 'Prototype',
                description:
                  'Building physical prototypes for testing and approval',
              },
              {
                step: '05',
                title: 'Finalization',
                description: 'Final design approval and production preparation',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-accent text-luxury-dark text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Categories Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Design Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Wallets & Card Holders',
                description:
                  'Bifold, trifold, minimalist, and passport holder designs',
                examples: [
                  'Classic bifolds',
                  'Modern card holders',
                  'Passport wallets',
                  'Money clips',
                ],
              },
              {
                title: 'Bags & Accessories',
                description:
                  'Totes, backpacks, crossbody bags, and travel accessories',
                examples: [
                  'Business totes',
                  'Laptop bags',
                  'Travel backpacks',
                  'Weekend bags',
                ],
              },
              {
                title: 'Belts & Straps',
                description: 'Formal, casual, and specialty belt designs',
                examples: [
                  'Dress belts',
                  'Casual belts',
                  'Watch straps',
                  'Guitar straps',
                ],
              },
              {
                title: 'Corporate Gifts',
                description: 'Custom branded items for corporate clients',
                examples: [
                  'Executive gifts',
                  'Employee awards',
                  'Client presents',
                  'Promotional items',
                ],
              },
              {
                title: 'Fashion Accessories',
                description: 'Trendy accessories for fashion brands',
                examples: ['Handbags', 'Clutches', 'Keychains', 'Phone cases'],
              },
              {
                title: 'Specialty Items',
                description: 'Unique and custom leather goods',
                examples: [
                  'Tool holders',
                  'Gun holsters',
                  'Medical cases',
                  'Tech accessories',
                ],
              },
            ].map((category, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-accent">
                      Examples:
                    </h4>
                    <ul className="space-y-1">
                      {category.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          • {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Design Timeline
          </h2>
          <div className="space-y-8">
            {[
              {
                phase: 'Initial Consultation',
                duration: '1-2 days',
                description:
                  'Understanding your requirements and project scope',
              },
              {
                phase: 'Concept Development',
                duration: '3-5 days',
                description: 'Creating initial design concepts and mood boards',
              },
              {
                phase: 'Design Refinement',
                duration: '5-7 days',
                description:
                  'Refining designs based on feedback and requirements',
              },
              {
                phase: 'Technical Documentation',
                duration: '2-3 days',
                description:
                  'Creating detailed technical drawings and specifications',
              },
              {
                phase: 'Prototype Development',
                duration: '7-10 days',
                description:
                  'Building physical prototypes for testing and approval',
              },
            ].map((phase, index) => (
              <div
                key={index}
                className="flex items-center p-6 bg-background rounded-lg border"
              >
                <div className="flex-shrink-0 mr-6">
                  <div className="bg-accent text-luxury-dark text-lg font-bold w-12 h-12 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold">{phase.phase}</h3>
                    <span className="text-accent font-medium">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Create Something Unique?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss your custom design project and bring your vision to
            life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/quote">Start Your Project</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sample-kit">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomDesign;
