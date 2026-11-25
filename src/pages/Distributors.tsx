import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Distributors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Distributors & Wholesalers
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Partner with us for reliable leather goods manufacturing. We support distributors 
              and wholesalers with competitive pricing, consistent quality, and flexible order quantities.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Partner With Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Competitive Wholesale Pricing",
                description: "Volume-based pricing that improves your margins",
                features: ["Tiered pricing structure", "Bulk order discounts", "Transparent costs"]
              },
              {
                title: "Consistent Quality",
                description: "27-point quality control ensures every piece meets standards",
                features: ["Quality certifications", "Pre-shipment photos", "Defect guarantee"]
              },
              {
                title: "Flexible MOQs",
                description: "Lower minimum orders to help you test new markets",
                features: ["Product-specific MOQs", "Mixed orders allowed", "Sample programs"]
              }
            ].map((benefit, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-6">{benefit.description}</p>
                  <ul className="text-sm space-y-2">
                    {benefit.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Product Categories Available</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Small Leather Goods</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Wallets (bi-fold, tri-fold, minimalist)</li>
                <li>• Card holders (business, credit card)</li>
                <li>• Key chains and accessories</li>
                <li>• Phone cases and tech accessories</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Larger Items</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Handbags and totes</li>
                <li>• Backpacks (business, casual, travel)</li>
                <li>• Belts (dress, casual, reversible)</li>
                <li>• Briefcases and portfolios</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Partner Support</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Dedicated Account Manager", description: "Personal contact for all your needs" },
              { title: "Marketing Materials", description: "Product photos and descriptions" },
              { title: "Training & Support", description: "Product knowledge and sales training" },
              { title: "Flexible Payment Terms", description: "Net 30/60 terms for qualified partners" }
            ].map((support, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-semibold mb-2">{support.title}</h3>
                <p className="text-muted-foreground">{support.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Become a Partner</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our network of successful distributors and wholesalers. 
            Let's discuss how we can support your business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/quote">Apply for Partnership</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/#lead">Download Catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Distributors;