import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Download, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const LeadCapture = () => {
  const [catalogueForm, setCatalogueForm] = useState({
    workEmail: '',
    companyName: '',
  });
  const [errors, setErrors] = useState({
    workEmail: '',
    companyName: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCatalogueForm = () => {
    const newErrors = {
      workEmail: '',
      companyName: '',
    };

    if (!catalogueForm.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!validateEmail(catalogueForm.workEmail)) {
      newErrors.workEmail = 'Please enter a valid email address';
    }

    if (!catalogueForm.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    setErrors(newErrors);
    return !newErrors.workEmail && !newErrors.companyName;
  };

  const handleCatalogueDownload = () => {
    if (validateCatalogueForm()) {
      const link = document.createElement('a');
      link.href = '/FV-Catalogue.pdf';
      link.download = 'Forth-Vale-Product-Catalogue.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCatalogueForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  return (
    <section
      id="lead"
      className="py-24 bg-gradient-to-br from-muted/50 to-muted/30"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-body leading-relaxed">
              Whether you need samples, pricing, or want to discuss your
              requirements, we're here to help bring your leather goods vision
              to life.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    Free Consultation
                  </h3>
                  <p className="text-muted-foreground font-body">
                    Discuss your project requirements with our experts
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Download className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    Complete Catalogue
                  </h3>
                  <p className="text-muted-foreground font-body">
                    Access our full product range with specifications and
                    pricing
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Forms */}
          <div className="space-y-6">
            {/* Quick Quote Card */}
            <Card className="border-0 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-display">
                  Get a Quote
                </CardTitle>
                <CardDescription>
                  Tell us about your project and we'll provide a detailed quote
                  within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input placeholder="Work Email" type="email" />
                <Input placeholder="Company Name" />
                <Input placeholder="Phone (Optional)" type="tel" />
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <input type="checkbox" id="consent" className="rounded" />
                  <label htmlFor="consent">
                    I agree to receive communications from Forth & Vale
                  </label>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Get My Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Catalogue Download Card */}
            <Card className="border-0 shadow-card bg-luxury-dark text-cream-gold">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-display text-cream-gold">
                  Download Catalogue
                </CardTitle>
                <CardDescription className="text-cream-gold/80">
                  Get instant access to our complete product catalogue with
                  pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Work Email"
                    type="email"
                    value={catalogueForm.workEmail}
                    onChange={(e) =>
                      handleInputChange('workEmail', e.target.value)
                    }
                    className={`bg-luxury-navy/50 border-accent/30 text-cream-gold placeholder:text-cream-gold/60 ${
                      errors.workEmail ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.workEmail && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.workEmail}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Company Name"
                    value={catalogueForm.companyName}
                    onChange={(e) =>
                      handleInputChange('companyName', e.target.value)
                    }
                    className={`bg-luxury-navy/50 border-accent/30 text-cream-gold placeholder:text-cream-gold/60 ${
                      errors.companyName ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.companyName}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleCatalogueDownload}
                  className="w-full bg-accent text-luxury-dark hover:bg-accent/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Free Catalogue
                </Button>
                <p className="text-xs text-cream-gold/70 text-center">
                  No spam, just valuable product information
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
