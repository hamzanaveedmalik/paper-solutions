import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Users, Gift, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhoWeServe = () => {
  const segments = [
    {
      icon: TrendingUp,
      title: 'Fashion Brands',
      description:
        'Custom leather collections and seasonal lines that align with your brand aesthetic.',
      features: [
        'MOQs from 100 units',
        'Seasonal collections',
        'Brand customization',
        'Trend-forward designs',
      ],
      href: '/fashion-brands',
    },
    {
      icon: Gift,
      title: 'Corporate Gifting',
      description:
        'Premium branded leather goods for employee rewards and client appreciation.',
      features: [
        'Bulk discounts',
        'Logo embossing',
        'Gift packaging',
        'Executive appeal',
      ],
      href: '/corporate-gifting',
    },
    {
      icon: Users,
      title: 'Distributors & Wholesalers',
      description:
        'Volume orders and trade partnerships with competitive wholesale pricing.',
      features: [
        'Volume pricing',
        'Trade terms',
        'Private labeling',
        'Inventory support',
      ],
      href: '/distributors',
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-6">
            Who We Serve
          </h2>
          <p className="text-xl text-muted-foreground font-body leading-relaxed">
            Premium leather goods manufacturing for discerning brands,
            corporations, and distributors worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {segments.map((segment, index) => {
            const IconComponent = segment.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-card transition-all duration-300 border-0 bg-card/70 backdrop-blur-sm"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-primary mb-2">
                    {segment.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {segment.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {segment.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-foreground"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    asChild
                  >
                    <Link to={segment.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Not sure which category fits your needs?
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <a
              href="https://cal.com/forthandvale/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Speak to Our Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
