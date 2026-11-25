import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-luxury-dark/5 via-luxury-navy/5 to-luxury-purple/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              How we collect, use, and protect your personal information at
              Forth & Vale
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
                    Introduction
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Forth & Vale Limited ("we," "our," or "us") is committed to
                    protecting your privacy. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when
                    you visit our website or use our services.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Information We Collect
                  </h2>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Personal Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may collect personal information that you voluntarily
                    provide to us, including:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-6">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Name and contact information (email, phone, address)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Company information and business details</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Product specifications and requirements</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Payment and billing information</span>
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Automatically Collected Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may automatically collect certain information about your
                    device and usage, including:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>IP address and browser information</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Pages visited and time spent on our website</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Referring website and search terms</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Provide and improve our leather goods manufacturing
                        services
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Process orders and manage customer relationships
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Communicate about products, services, and updates
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Comply with legal obligations and protect our rights
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Information Sharing
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, trade, or rent your personal information to
                    third parties. We may share your information only in the
                    following circumstances:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mt-4">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        With service providers who assist in our operations
                        (under strict confidentiality agreements)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        When required by law or to protect our legal rights
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>With your explicit consent</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Data Security
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate technical and organizational
                    measures to protect your personal information against
                    unauthorized access, alteration, disclosure, or destruction.
                    However, no method of transmission over the internet is 100%
                    secure.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Your Rights
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Under UK GDPR, you have the right to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Access your personal data</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Correct inaccurate data</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Request deletion of your data</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Object to processing of your data</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Data portability</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Cookies
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies and similar technologies to enhance your
                    experience on our website. For detailed information about
                    our cookie usage, please see our
                    <a
                      href="/cookie-policy"
                      className="text-primary hover:underline ml-1"
                    >
                      Cookie Policy
                    </a>
                    .
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Contact Us
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy or our
                    data practices, please contact us:
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

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Changes to This Policy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last updated" date.
                  </p>
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

export default PrivacyPolicy;
