import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import { QuoteProvider } from '@/contexts/QuoteContext';
import LegacyRedirect from '@/components/LegacyRedirect';
import Index from './pages/Index';
import Catalogue from './pages/Catalogue';
import ProductDetail from './pages/ProductDetail';
import Quote from './pages/Quote';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <QuoteProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/product/:slug" element={<LegacyRedirect />} />
            <Route path="/product-category/:slug" element={<LegacyRedirect />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="/terms-of-service" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QuoteProvider>
  </QueryClientProvider>
);

export default App;
