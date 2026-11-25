import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import mainLogo from '@/assets/logos/main-logo.png';
import CurrencySelector from '@/components/CurrencySelector';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (dropdown: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay to prevent flickering
    setHoverTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center">
              <img src={mainLogo} alt="Forth & Vale" className="h-12 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors">
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      to="/products/wallets"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      Wallets
                    </Link>
                    <Link
                      to="/products/bags"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      Bags
                    </Link>
                    <Link
                      to="/products/office-lifestyle"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      Office & Lifestyle
                    </Link>
                    <Link
                      to="/products/keychains"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      Keychains
                    </Link>
                    <Link
                      to="/products/accessories"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      Accessories
                    </Link>
                    <Link
                      to="/products/travel-essentials"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      Travel Essentials
                    </Link>
                    <Link
                      to="/products/jackets"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      Jackets
                    </Link>
                    <Link
                      to="/products/gloves"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      Gloves
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Who We Serve Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('who-we-serve')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors">
                Who We Serve
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'who-we-serve' && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-background border border-border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      to="/fashion-brands"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">Fashion Brands</span>
                        <span className="text-xs text-muted-foreground">
                          Custom collections & seasonal lines
                        </span>
                      </div>
                    </Link>
                    <Link
                      to="/corporate-gifting"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">Corporate Gifting</span>
                        <span className="text-xs text-muted-foreground">
                          Branded gifts & employee rewards
                        </span>
                      </div>
                    </Link>
                    <Link
                      to="/distributors"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          Distributors & Wholesalers
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Volume orders & trade partnerships
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/about"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <CurrencySelector />
            <Button asChild variant="outline" size="sm" className="font-medium">
              <Link to="/sample-kit">Request Samples</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="font-medium bg-primary hover:bg-primary/90"
            >
              <Link to="/quote">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-foreground hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <div className="text-sm font-medium text-foreground">
                Products
              </div>
              <Link
                to="/products/wallets"
                className="text-sm font-medium text-foreground hover:text-primary pl-4"
              >
                Wallets
              </Link>
              <Link
                to="/products/bags"
                className="text-sm font-medium text-foreground hover:text-primary pl-4"
              >
                Bags
              </Link>
              <Link
                to="/products/office-lifestyle"
                className="text-sm font-medium text-foreground hover:text-primary pl-4"
              >
                Office & Lifestyle
              </Link>
              <Link
                to="/products/keychains"
                className="text-sm font-medium text-foreground hover:text-primary pl-4"
              >
                Keychains
              </Link>
              <Link
                to="/products/accessories"
                className="text-sm font-medium text-foreground hover:text-primary pl-4"
              >
                Accessories
              </Link>
              <Link
                to="/products/travel-essentials"
                className="text-sm font-medium text-foreground hover:text-primary pl-4"
              >
                Travel Essentials
              </Link>
              <Link
                to="/products/jackets"
                className="text-sm font-medium text-foreground hover:text-primary pl-4"
              >
                Jackets
              </Link>
              <Link
                to="/products/gloves"
                className="text-sm font-medium text-foreground hover:text-primary pl-4"
              >
                Gloves
              </Link>
              <Link
                to="/fashion-brands"
                className="text-sm font-medium text-foreground hover:text-primary pl-4"
              >
                Fashion Brands
              </Link>
              <Link
                to="/corporate-gifting"
                className="text-sm font-medium text-foreground hover:text-primary pl-4"
              >
                Corporate Gifting
              </Link>
              <Link
                to="/distributors"
                className="text-sm font-medium text-foreground hover:text-primary pl-4"
              >
                Distributors & Wholesalers
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <div className="pb-2">
                  <CurrencySelector />
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/sample-kit">Request Samples</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Link to="/quote">Get a Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
