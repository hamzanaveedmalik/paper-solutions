import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

const Footer = () => {
  const { resetPreferences } = useCookieConsent();

  return (
    <footer className="bg-luxury-dark text-cream-gold">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <span className="text-2xl font-display font-semibold tracking-tight">
                FORTH
                <span className="text-accent">&</span>
                VALE
              </span>
            </div>
            <p className="text-cream-gold/80 font-body mb-6 leading-relaxed">
              Premium private-label leather goods manufacturing for brands,
              distributors, and corporate clients worldwide.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-accent/20 text-accent border-accent/30"
              >
                Ships Worldwide
              </Badge>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">
              Products
            </h3>
            <ul className="space-y-3 font-body">
              <li>
                <Link
                  to="/products/wallets"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Wallets
                </Link>
              </li>
              <li>
                <Link
                  to="/products/card-holders"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Card Holders
                </Link>
              </li>
              <li>
                <Link
                  to="/products/bags"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Bags & Totes
                </Link>
              </li>
              <li>
                <Link
                  to="/products/backpacks"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Backpacks
                </Link>
              </li>
              <li>
                <Link
                  to="/products/belts"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Belts
                </Link>
              </li>
              <li>
                <Link
                  to="/products/accessories"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">
              Services
            </h3>
            <ul className="space-y-3 font-body">
              <li>
                <Link
                  to="/fashion-brands"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Fashion Brands
                </Link>
              </li>
              <li>
                <Link
                  to="/corporate-gifting"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Corporate Gifting
                </Link>
              </li>
              <li>
                <Link
                  to="/distributors"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Distributors
                </Link>
              </li>
              <li>
                <Link
                  to="/private-labeling"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Private Labeling
                </Link>
              </li>
              <li>
                <Link
                  to="/custom-design"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Custom Design
                </Link>
              </li>
              <li>
                <Link
                  to="/samples"
                  className="text-cream-gold/80 hover:text-accent transition-colors"
                >
                  Sample Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-4 font-body">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <div className="text-cream-gold/80 text-sm">
                  <p>Forth & Vale Limited</p>
                  <p>Milton Keynes, United Kingdom</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <a
                  href="mailto:info@forthandvale.com"
                  className="text-cream-gold/80 hover:text-accent transition-colors text-sm"
                >
                  info@forthandvale.com
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-cream-gold/80 text-sm">
                  Ships to UK, EU & USA
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-cream-gold/20 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Legal Links */}
          <div>
            <h4 className="font-medium mb-3">Legal</h4>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-cream-gold/70 hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-cream-gold/70 hover:text-accent transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="text-cream-gold/70 hover:text-accent transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <button
                  onClick={resetPreferences}
                  className="text-cream-gold/70 hover:text-accent transition-colors text-left"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <Link
                  to="/faq"
                  className="text-cream-gold/70 hover:text-accent transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogue"
                  className="text-cream-gold/70 hover:text-accent transition-colors"
                >
                  Download Catalogue
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Details */}
          <div>
            <h4 className="font-medium mb-3">Company Details</h4>
            <div className="text-sm text-cream-gold/70 space-y-1 font-body">
              <p>Company Registration: 16639558</p>
              <p>Registered in England & Wales</p>
            </div>
          </div>
        </div>

        <Separator className="bg-cream-gold/20 mb-6" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-cream-gold/70 font-body">
          <p>© 2025 Forth & Vale Ltd. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://linkedin.com/company/forth-vale"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/forthandvale/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
