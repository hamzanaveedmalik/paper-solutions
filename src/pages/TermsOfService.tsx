import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-luxury-dark/5 via-luxury-navy/5 to-luxury-purple/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Terms and conditions for using Forth & Vale's services
            </p>
            <p className="text-sm text-muted-foreground/70 mt-4">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-luxury bg-gradient-to-br from-background to-muted/30">
            <CardContent className="p-8 lg:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Agreement to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using Forth & Vale Limited's website and
                    services, you accept and agree to be bound by the terms and
                    provision of this agreement. If you do not agree to abide by
                    the above, please do not use this service.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Company Information
                  </h2>
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 mb-4">
                    <p className="text-foreground font-medium">
                      Forth & Vale Limited
                    </p>
                    <p className="text-muted-foreground">
                      Company Registration: 16639558
                    </p>
                    <p className="text-muted-foreground">
                      Registered in England & Wales
                    </p>
                    <p className="text-muted-foreground">
                      Address: Milton Keynes, United Kingdom
                    </p>
                    <p className="text-muted-foreground">
                      Email: info@forthandvale.com
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Services Description
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Forth & Vale Limited provides premium leather goods
                    manufacturing services, including:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Custom leather goods manufacturing and private labeling
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Design consultation and product development</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Sample production and quality control</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Bulk manufacturing with volume discounts</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Orders and Pricing
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Minimum Order Quantities
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Minimum order quantities are 100 units for all products.
                        Volume discounts are available for larger orders.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Pricing
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        All prices are quoted in GBP and exclude VAT unless
                        otherwise stated. Prices are subject to change without
                        notice until an order is confirmed.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Payment Terms
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Payment terms are typically 50% deposit upon order
                        confirmation and 50% upon completion before shipping.
                        Alternative payment terms may be negotiated for
                        established customers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Production and Delivery
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Production Timeline
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Standard production time is 4-6 weeks from order
                        confirmation and sample approval. Rush orders may be
                        accommodated at additional cost.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Quality Control
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        All products undergo rigorous quality control at
                        multiple stages. We maintain stage-gate quality control
                        processes to ensure consistent quality.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Shipping and Delivery
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Shipping costs are calculated based on destination and
                        order size. We provide firm delivery windows and
                        tracking information for all shipments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Intellectual Property
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    All designs, specifications, and proprietary information
                    remain the property of their respective owners. Forth & Vale
                    respects intellectual property rights and expects clients to
                    do the same.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Client designs and specifications remain client property
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Forth & Vale's manufacturing processes and techniques
                        are proprietary
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Unauthorized reproduction of designs is prohibited
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Warranties and Returns
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Product Warranty
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We warrant that our products will be free from defects
                        in materials and workmanship for 12 months from
                        delivery, under normal use and care.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Returns Policy
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Returns are accepted within 30 days of delivery for
                        defective products. Custom orders cannot be returned
                        unless defective. Return shipping costs are the
                        responsibility of the customer unless the return is due
                        to our error.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Limitation of Liability
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To the maximum extent permitted by law, Forth & Vale
                    Limited's liability for any claim arising from our services
                    shall not exceed the total amount paid by the customer for
                    the specific order giving rise to the claim.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Force Majeure
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We shall not be liable for any delay or failure to perform
                    due to circumstances beyond our reasonable control,
                    including but not limited to acts of God, natural disasters,
                    war, terrorism, labor disputes, or government actions.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Governing Law
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These terms shall be governed by and construed in accordance
                    with the laws of England and Wales. Any disputes shall be
                    subject to the exclusive jurisdiction of the courts of
                    England and Wales.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Changes to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time.
                    Changes will be effective immediately upon posting on our
                    website. Continued use of our services constitutes
                    acceptance of the modified terms.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these Terms of Service, please contact
                    us:
                  </p>
                  <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-foreground font-medium">
                      Forth & Vale Limited
                    </p>
                    <p className="text-muted-foreground">
                      Milton Keynes, United Kingdom
                    </p>
                    <p className="text-muted-foreground">
                      Email:{' '}
                      <a
                        href="mailto:info@forthandvale.com"
                        className="text-primary hover:underline"
                      >
                        info@forthandvale.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
