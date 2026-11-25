import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PriceCalculator from '@/components/PriceCalculator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getProductDetail } from '@/data/productDetails';
import { useState } from 'react';
import useSEO from '@/hooks/useSEO';
import ProductStructuredData from '@/components/ProductStructuredData';

const ProductDetail = () => {
  const { slug } = useParams();
  const product = slug ? getProductDetail(slug) : undefined;
  const [selectedVariant, setSelectedVariant] = useState(0);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  // Get current variant for SEO and product
  const currentVariant =
    product.variants && product.variants.length > 0
      ? product.variants[selectedVariant]
      : product;

  // SEO metadata
  useSEO({
    title: `${product.name} - Premium Leather Goods | Forth & Vale`,
    description: product.description,
    keywords: `leather ${product.name.toLowerCase()}, premium ${product.name.toLowerCase()}, custom ${product.name.toLowerCase()}, OEM ${product.name.toLowerCase()}, wholesale ${product.name.toLowerCase()}`,
    ogTitle: `${product.name} - Premium Leather Goods`,
    ogDescription: product.description,
    ogImage: currentVariant.image,
  });

  return (
    <div className="min-h-screen bg-background">
      <ProductStructuredData
        name={product.name}
        description={product.description}
        image={currentVariant.image}
        sku={product.slug}
        category={`Leather ${product.name}`}
        material={product.specs?.material || 'Premium Leather'}
      />
      <Navigation />
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-luxury-dark/5 via-luxury-navy/5 to-luxury-purple/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-luxury-dark/10 to-luxury-navy/10 rounded-2xl p-8">
                <img
                  src={currentVariant.image}
                  alt={currentVariant.name}
                  className="w-full h-full object-cover rounded-xl shadow-2xl"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-luxury-purple/20 rounded-full blur-xl"></div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Available Colors
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, idx) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(idx)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                          selectedVariant === idx
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-muted-foreground/30 hover:border-accent/50 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full border border-muted-foreground/30"
                            style={{
                              backgroundColor: variant.color
                                .toLowerCase()
                                .includes('brown')
                                ? '#8B4513'
                                : variant.color
                                    .toLowerCase()
                                    .includes('dark brown')
                                ? '#654321'
                                : variant.color.toLowerCase().includes('tan')
                                ? '#D2B48C'
                                : variant.color.toLowerCase().includes('orange')
                                ? '#FFA500'
                                : variant.color.toLowerCase().includes('olive')
                                ? '#808000'
                                : variant.color.toLowerCase().includes('green')
                                ? '#228B22'
                                : variant.color.toLowerCase().includes('plum')
                                ? '#8B008B'
                                : variant.color.toLowerCase().includes('black')
                                ? '#000000'
                                : variant.color.toLowerCase().includes('navy')
                                ? '#000080'
                                : variant.color.toLowerCase().includes('cognac')
                                ? '#9F4B3B'
                                : variant.color
                                    .toLowerCase()
                                    .includes('burgundy')
                                ? '#800020'
                                : variant.color.toLowerCase().includes('gray')
                                ? '#808080'
                                : variant.color
                                    .toLowerCase()
                                    .includes('charcoal')
                                ? '#36454F'
                                : '#8B4513', // default brown
                            }}
                          ></div>
                          <span className="text-sm font-medium">
                            {variant.color}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-medium"
                >
                  <Link to={`/sample-kit?product=${product.slug}`}>
                    Request Samples
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="font-medium bg-primary hover:bg-primary/90"
                >
                  <Link to="/quote">Get Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Product Specifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Detailed specifications and technical information for this premium
              leather product.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Specifications Card */}
            <Card className="bg-gradient-to-br from-luxury-dark/5 to-luxury-navy/5 border-accent/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-accent rounded"></div>
                  </div>
                  Technical Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-accent/10">
                    <span className="font-medium text-foreground">
                      Dimensions
                    </span>
                    <span className="text-muted-foreground">
                      {product.specs.dimensions}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-accent/10">
                    <span className="font-medium text-foreground">Weight</span>
                    <span className="text-muted-foreground">
                      {product.specs.weight}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-accent/10">
                    <span className="font-medium text-foreground">
                      Material
                    </span>
                    <span className="text-muted-foreground">
                      {product.specs.material}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-accent/10">
                    <span className="font-medium text-foreground">Lining</span>
                    <span className="text-muted-foreground">
                      {product.specs.lining}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-foreground">
                      Hardware
                    </span>
                    <span className="text-muted-foreground">
                      {product.specs.hardware}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card className="bg-gradient-to-br from-luxury-navy/5 to-luxury-purple/5 border-accent/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-accent rounded-full"></div>
                  </div>
                  Key Features
                </h3>
                <div className="space-y-4">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start py-2">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span className="text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <PriceCalculator />

      {/* Additional Information Tabs */}
      <section className="py-16 px-4 bg-gradient-to-br from-luxury-dark/5 via-luxury-navy/5 to-luxury-purple/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Additional Information
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn more about this product and get answers to common questions.
            </p>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid grid-cols-3 w-full bg-luxury-navy/10 border border-accent/20">
              <TabsTrigger
                value="description"
                className="data-[state=active]:bg-accent data-[state=active]:text-luxury-dark data-[state=active]:shadow-lg"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="review"
                className="data-[state=active]:bg-accent data-[state=active]:text-luxury-dark data-[state=active]:shadow-lg"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="qa"
                className="data-[state=active]:bg-accent data-[state=active]:text-luxury-dark data-[state=active]:shadow-lg"
              >
                Q & A
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-8">
              <Card className="bg-gradient-to-br from-luxury-dark/5 to-luxury-navy/5 border-accent/20">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {product.description}
                    </p>
                    <div className="mt-6 p-6 bg-accent/10 rounded-xl border border-accent/20">
                      <h4 className="font-semibold text-foreground mb-3">
                        Why Choose This Product?
                      </h4>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                          </div>
                          <span>
                            Handcrafted with premium materials for lasting
                            quality
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                          </div>
                          <span>Customizable branding options available</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                          </div>
                          <span>Perfect for corporate gifting and retail</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                          </div>
                          <span>MOQ from 25 units with volume discounts</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="review" className="pt-8">
              <Card className="bg-gradient-to-br from-luxury-navy/5 to-luxury-purple/5 border-accent/20">
                <CardContent className="p-8 text-center">
                  <div className="py-12">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-accent rounded-full"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Reviews Coming Soon
                    </h3>
                    <p className="text-muted-foreground">
                      Customer reviews will be available once we start receiving
                      feedback from our clients.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qa" className="pt-8">
              <Card className="bg-gradient-to-br from-luxury-purple/5 to-luxury-dark/5 border-accent/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Frequently Asked Questions
                      </h3>
                      <p className="text-muted-foreground">
                        Have a question? Contact us for more information.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-foreground mb-2">
                          What is the minimum order quantity?
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Minimum order quantity is 100 units for most products.
                        </p>
                      </div>
                      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-foreground mb-2">
                          How long does production take?
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Production typically takes 4-6 weeks from order
                          confirmation.
                        </p>
                      </div>
                      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-foreground mb-2">
                          Can I customize the branding?
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Yes, we offer various branding options including
                          embossing, debossing, and custom hardware.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetail;
