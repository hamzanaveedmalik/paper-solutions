import { Card, CardContent } from '@/components/ui/card';
import {
  FileText,
  Package,
  Cog,
  CheckSquare,
  Truck,
  Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Process = () => {
  const handleDownloadProcessGuide = () => {
    const link = document.createElement('a');
    link.href = '/DPG.pdf';
    link.download = 'Forth-Vale-Process-Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const steps = [
    {
      icon: FileText,
      title: 'Brief',
      description:
        "Share your requirements, quantities, and timeline. We'll provide initial guidance and feasibility assessment.",
      duration: '1-2 days',
    },
    {
      icon: Package,
      title: 'Sampling',
      description:
        'We create prototypes based on your specifications. Refine materials, design, and branding until perfect.',
      duration: '5-10 days',
    },
    {
      icon: Cog,
      title: 'Production',
      description:
        'Full manufacturing begins with regular progress updates. Quality control at every stage.',
      duration: '3-4 weeks',
    },
    {
      icon: CheckSquare,
      title: 'QC',
      description:
        'Comprehensive quality inspection ensures every piece meets our premium standards before shipping.',
      duration: '2-3 days',
    },
    {
      icon: Truck,
      title: 'Delivery',
      description:
        'Secure packaging and reliable shipping to your location worldwide. Tracking provided throughout.',
      duration: '3-7 days',
    },
  ];

  return (
    <section className="py-24 bg-luxury-dark text-cream-gold">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-cream-gold/80 font-body leading-relaxed">
            From initial brief to final delivery, our streamlined process
            ensures quality and timeliness at every step.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative flex flex-col h-full">
                  {/* Step number for mobile */}
                  <div className="lg:hidden absolute -top-2 -left-2 w-8 h-8 bg-accent text-luxury-dark rounded-full flex items-center justify-center text-sm font-bold z-10">
                    {index + 1}
                  </div>

                  <Card className="bg-luxury-navy/50 border-accent/20 backdrop-blur-sm hover:bg-luxury-navy/70 transition-all duration-300 flex-grow flex flex-col h-full">
                    <CardContent className="p-6 text-center flex flex-col h-full">
                      {/* Timeline circle for desktop */}
                      <div className="hidden lg:flex absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-accent rounded-full items-center justify-center z-10">
                        <IconComponent className="h-6 w-6 text-luxury-dark" />
                      </div>

                      {/* Mobile icon */}
                      <div className="lg:hidden w-12 h-12 mx-auto mb-4 bg-accent/20 rounded-xl flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-accent" />
                      </div>

                      <div className="lg:mt-8 flex flex-col flex-grow">
                        <h3 className="text-lg font-display font-semibold mb-2 text-cream-gold">
                          {step.title}
                        </h3>
                        <p className="text-sm text-cream-gold/80 mb-3 font-body leading-relaxed flex-grow">
                          {step.description}
                        </p>
                        <div className="inline-block px-3 py-1 bg-accent/20 rounded-full mt-auto">
                          <span className="text-xs font-medium text-accent">
                            {step.duration}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-luxury-navy/30 rounded-2xl p-8 border border-accent/20">
            <h3 className="text-2xl font-display font-semibold mb-4 text-cream-gold">
              Total Timeline: 4-6 Weeks
            </h3>
            <p className="text-cream-gold/80 mb-6 font-body">
              From your initial brief to products in hand. Rush orders available
              for urgent requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sample-kit"
                className="px-6 py-3 bg-accent text-luxury-dark font-semibold rounded-xl hover:bg-accent/90 transition-colors inline-block text-center"
              >
                Start Your Project
              </Link>
              <button
                onClick={handleDownloadProcessGuide}
                className="px-6 py-3 border-2 border-accent text-accent font-semibold rounded-xl hover:bg-accent hover:text-luxury-dark transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Process Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
