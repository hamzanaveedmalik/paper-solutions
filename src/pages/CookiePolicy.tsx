import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-luxury-dark/5 via-luxury-navy/5 to-luxury-purple/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              How we use cookies and similar technologies on our website
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
                    What Are Cookies?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Cookies are small text files that are placed on your
                    computer or mobile device when you visit a website. They are
                    widely used to make websites work more efficiently and to
                    provide information to website owners.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    How We Use Cookies
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Forth & Vale Limited uses cookies and similar technologies
                    to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Ensure our website functions properly and securely
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Remember your preferences and settings</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Analyze how our website is used to improve user
                        experience
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        Provide personalized content and recommendations
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Types of Cookies We Use
                  </h2>

                  <div className="space-y-6">
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Essential Cookies
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        These cookies are necessary for the website to function
                        and cannot be switched off. They are usually only set in
                        response to actions made by you which amount to a
                        request for services.
                      </p>
                      <div className="text-sm text-muted-foreground">
                        <p>
                          <strong>Examples:</strong> Form submissions, security
                          features, basic website functionality
                        </p>
                        <p>
                          <strong>Duration:</strong> Session or up to 1 year
                        </p>
                        <p>
                          <strong>Can be disabled:</strong> No (required for
                          website operation)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Analytics Cookies
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        These cookies help us understand how visitors interact
                        with our website by collecting and reporting information
                        anonymously. This helps us improve our website
                        performance.
                      </p>
                      <div className="text-sm text-muted-foreground">
                        <p>
                          <strong>Examples:</strong> Google Analytics, page
                          views, user behavior tracking
                        </p>
                        <p>
                          <strong>Duration:</strong> Up to 2 years
                        </p>
                        <p>
                          <strong>Can be disabled:</strong> Yes (via cookie
                          settings)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Functional Cookies
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        These cookies enable enhanced functionality and
                        personalization, such as remembering your preferences
                        and settings.
                      </p>
                      <div className="text-sm text-muted-foreground">
                        <p>
                          <strong>Examples:</strong> Language preferences, form
                          data, user settings
                        </p>
                        <p>
                          <strong>Duration:</strong> Up to 1 year
                        </p>
                        <p>
                          <strong>Can be disabled:</strong> Yes (may affect
                          website functionality)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Marketing Cookies
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        These cookies are used to track visitors across websites
                        to display relevant and engaging advertisements.
                      </p>
                      <div className="text-sm text-muted-foreground">
                        <p>
                          <strong>Examples:</strong> Social media integration,
                          advertising networks
                        </p>
                        <p>
                          <strong>Duration:</strong> Up to 1 year
                        </p>
                        <p>
                          <strong>Can be disabled:</strong> Yes (via cookie
                          settings)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Third-Party Cookies
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may use third-party services that set their own cookies.
                    These include:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        <strong>Google Analytics:</strong> Website analytics and
                        performance monitoring (requires your consent)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        <strong>Crisp Chat:</strong> Live chat support
                        functionality
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        <strong>Calendly:</strong> Appointment scheduling
                        functionality
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>
                        <strong>EmailJS:</strong> Contact form functionality
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Managing Your Cookie Preferences
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have several options for managing cookies:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Browser Settings
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Most web browsers allow you to control cookies through
                        their settings. You can set your browser to refuse
                        cookies or delete certain cookies.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Cookie Consent
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        When you first visit our website, you'll see a cookie
                        consent banner where you can choose which types of
                        cookies to accept. You can also change your preferences
                        at any time by clicking "Cookie Preferences" in the
                        footer.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Opt-Out Links
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        For specific third-party services, you can opt out
                        directly:
                      </p>
                      <ul className="space-y-1 text-muted-foreground mt-2 ml-4">
                        <li>
                          •{' '}
                          <a
                            href="https://tools.google.com/dlpage/gaoptout"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Google Analytics Opt-out
                          </a>
                        </li>
                        <li>
                          •{' '}
                          <a
                            href="https://www.linkedin.com/psettings/guest-controls"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            LinkedIn Privacy Settings
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Impact of Disabling Cookies
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you choose to disable cookies, some features of our
                    website may not function properly:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Contact forms may not work correctly</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Appointment scheduling may be affected</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Your preferences may not be remembered</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span>Website performance may be reduced</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Updates to This Policy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Cookie Policy from time to time to
                    reflect changes in our practices or for other operational,
                    legal, or regulatory reasons. We will notify you of any
                    material changes by posting the updated policy on our
                    website.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Contact Us
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about our use of cookies, please
                    contact us:
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

export default CookiePolicy;
