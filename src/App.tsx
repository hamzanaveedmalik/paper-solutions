import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CrispChat from '@/components/CrispChat';
import CookieBanner from '@/components/CookieBanner';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

// Product Pages
import WalletsPage from './pages/products/Wallets';
import BagsPage from './pages/products/Bags';
import OfficeLifestylePage from './pages/products/OfficeLifestyle';
import KeychainsPage from './pages/products/Keychains';
import AccessoriesPage from './pages/products/Accessories';
import TravelEssentialsPage from './pages/products/TravelEssentials';
import JacketsPage from './pages/products/Jackets';
import GlovesPage from './pages/products/Gloves';

// Who We Serve Pages
import FashionBrandsPage from './pages/FashionBrands';
import CorporateGiftingPage from './pages/CorporateGifting';
import DistributorsPage from './pages/Distributors';

// Service Pages
import PrivateLabelingPage from './pages/PrivateLabeling';
import CustomDesignPage from './pages/CustomDesign';
import SampleServicePage from './pages/SampleService';

// Other Pages
import AboutPage from './pages/About';
import QuotePage from './pages/Quote';
import SampleKitPage from './pages/SampleKit';
import ProductDetailPage from './pages/ProductDetail';
import ProductCataloguePage from './pages/ProductCatalogue';

// Legal Pages
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import TermsOfServicePage from './pages/TermsOfService';
import CookiePolicyPage from './pages/CookiePolicy';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CookieConsentProvider>
      <CurrencyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <GoogleAnalytics />
            <CrispChat />
            <CookieBanner />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Product Routes */}
              <Route path="/products/wallets" element={<WalletsPage />} />
              <Route path="/products/bags" element={<BagsPage />} />
              <Route
                path="/products/office-lifestyle"
                element={<OfficeLifestylePage />}
              />
              <Route path="/products/keychains" element={<KeychainsPage />} />
              <Route
                path="/products/accessories"
                element={<AccessoriesPage />}
              />
              <Route
                path="/products/travel-essentials"
                element={<TravelEssentialsPage />}
              />
              <Route path="/products/jackets" element={<JacketsPage />} />
              <Route path="/products/gloves" element={<GlovesPage />} />

              {/* Who We Serve Routes */}
              <Route path="/fashion-brands" element={<FashionBrandsPage />} />
              <Route
                path="/corporate-gifting"
                element={<CorporateGiftingPage />}
              />
              <Route path="/distributors" element={<DistributorsPage />} />

              {/* Service Routes */}
              <Route
                path="/private-labeling"
                element={<PrivateLabelingPage />}
              />
              <Route path="/custom-design" element={<CustomDesignPage />} />
              <Route path="/samples" element={<SampleServicePage />} />

              {/* Other Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/quote" element={<QuotePage />} />
              <Route path="/sample-kit" element={<SampleKitPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/catalogue" element={<ProductCataloguePage />} />

              {/* Legal Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route
                path="/terms-of-service"
                element={<TermsOfServicePage />}
              />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CurrencyProvider>
    </CookieConsentProvider>
  </QueryClientProvider>
);

export default App;
