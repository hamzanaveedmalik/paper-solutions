import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhoWeServe from '@/components/WhoWeServe';
import ProductHighlights from '@/components/ProductHighlights';
import Process from '@/components/Process';
import LeadCapture from '@/components/LeadCapture';
import CalendarScheduling from '@/components/CalendarScheduling';
import Footer from '@/components/Footer';
import useSEO from '@/hooks/useSEO';

const Index = () => {
  useSEO({
    title: 'Forth & Vale — Premium Leather Goods Manufacturing',
    description:
      'Forth & Vale designs and manufactures premium leather wallets, card holders, belts, bags and accessories. OEM/Private Label for brands in the UK, EU & USA.',
    keywords:
      'leather goods, premium leather, wallets, bags, OEM manufacturing, private label, leather accessories, custom leather products, UK leather manufacturer, leather belts, leather card holders, wholesale leather goods',
    ogTitle: 'Forth & Vale — Premium Leather Goods & OEM Manufacturing',
    ogDescription:
      'Premium leather goods and OEM/private-label manufacturing for global brands. Custom design, quality craftsmanship, worldwide shipping.',
    ogImage: '/forth-vale-logo.png',
    type: 'website',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <WhoWeServe />
      <ProductHighlights />
      <Process />
      <LeadCapture />
      <CalendarScheduling />
      <Footer />
    </div>
  );
};

export default Index;
