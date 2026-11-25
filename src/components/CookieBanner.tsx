import { useState } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Cookie, Settings, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const CookieBanner = () => {
  const { showBanner, acceptAll, acceptEssential, setPreferences } =
    useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  if (!showBanner) {
    return null;
  }

  const handleSavePreferences = () => {
    setPreferences({
      essential: true,
      analytics: analyticsEnabled,
    });
    setShowSettings(false);
  };

  return (
    <>
      {/* Cookie Banner - Bottom positioned without backdrop */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
        <Card className="max-w-5xl mx-auto border-2 border-accent shadow-2xl bg-luxury-dark/95 backdrop-blur-md">
          <CardContent className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              {/* Icon and Content */}
              <div className="flex-1 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent/20 flex items-center justify-center">
                    <Cookie className="w-6 h-6 lg:w-7 lg:h-7 text-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-serif font-bold text-cream-gold mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-sm text-cream-gold/80 leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze
                    site traffic, and provide personalized content. Essential
                    cookies are required for the site to function, while
                    analytics cookies help us improve our services.{' '}
                    <Link
                      to="/cookie-policy"
                      className="text-accent hover:underline font-medium"
                    >
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0">
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2 justify-center bg-luxury-dark border-2 border-cream-gold text-cream-gold hover:bg-cream-gold hover:text-luxury-dark font-medium transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Customize</span>
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  onClick={acceptEssential}
                  className="justify-center bg-luxury-dark border-2 border-cream-gold text-cream-gold hover:bg-cream-gold hover:text-luxury-dark font-medium transition-colors"
                >
                  Essential Only
                </Button>
                <Button
                  size="default"
                  onClick={acceptAll}
                  className="bg-accent hover:bg-accent/90 text-luxury-dark font-semibold justify-center"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display flex items-center gap-2">
              <Cookie className="w-6 h-6 text-primary" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. You can enable or disable
              different types of cookies below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Essential Cookies */}
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <Label
                      htmlFor="essential"
                      className="text-lg font-semibold text-foreground"
                    >
                      Essential Cookies
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    These cookies are necessary for the website to function and
                    cannot be disabled. They are usually only set in response to
                    your actions, such as setting privacy preferences or filling
                    in forms.
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    Examples: Session management, security features, form
                    submissions
                  </p>
                </div>
                <div className="flex items-center">
                  <Switch
                    id="essential"
                    checked={true}
                    disabled
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="p-4 border rounded-lg hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <Label
                      htmlFor="analytics"
                      className="text-lg font-semibold text-foreground cursor-pointer"
                    >
                      Analytics Cookies
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously. This helps us improve our website performance
                    and user experience.
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    Services: Google Analytics
                  </p>
                </div>
                <div className="flex items-center">
                  <Switch
                    id="analytics"
                    checked={analyticsEnabled}
                    onCheckedChange={setAnalyticsEnabled}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Privacy Notice:</strong> We
                respect your privacy and are committed to protecting your
                personal data. You can change your preferences at any time by
                clicking the cookie preferences link in the footer. For more
                information, please read our{' '}
                <Link
                  to="/privacy-policy"
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  to="/cookie-policy"
                  className="text-primary hover:underline font-medium"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setAnalyticsEnabled(false);
                handleSavePreferences();
              }}
              className="flex-1"
            >
              Accept Essential Only
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setAnalyticsEnabled(true);
                handleSavePreferences();
              }}
              className="flex-1"
            >
              Accept All
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieBanner;
