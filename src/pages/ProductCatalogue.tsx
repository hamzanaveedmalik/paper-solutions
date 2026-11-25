import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Filter, Search } from 'lucide-react';
import { productDetails } from '@/data/productDetails';
import { useState } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';

const ProductCatalogue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { formatPrice, convertPrice } = useCurrency();

  // Helper function to parse price strings like "$120" to numbers
  const parsePriceString = (priceStr: string): number => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  };

  // Helper function to format product price
  const formatProductPrice = (priceStr: string): string => {
    const priceValue = parsePriceString(priceStr);
    const convertedPrice = convertPrice(priceValue);
    return formatPrice(convertedPrice);
  };

  // Categories based on the product data
  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'wallets', label: 'Wallets' },
    { value: 'bags', label: 'Bags' },
    { value: 'office-lifestyle', label: 'Office & Lifestyle' },
    { value: 'keychains', label: 'Keychains' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'travel-essentials', label: 'Travel Essentials' },
    { value: 'jackets', label: 'Jackets' },
    { value: 'gloves', label: 'Gloves' },
  ];

  // Filter products based on search and category
  const filteredProducts = productDetails.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      product.slug === selectedCategory ||
      (selectedCategory === 'bags' && product.slug.includes('totes'));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Product Catalogue
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore our complete range of premium leather goods. From wallets
              to backpacks, discover the perfect products for your brand or
              business needs.
            </p>

            {/* Search and Filter Controls */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Badge
                    key={category.value}
                    variant={
                      selectedCategory === category.value
                        ? 'default'
                        : 'outline'
                    }
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredProducts.length} Product
              {filteredProducts.length !== 1 ? 's' : ''} Found
            </h2>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card
                  key={product.slug}
                  className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/70 backdrop-blur-sm"
                >
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-display font-semibold text-primary mb-2">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {product.description}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-foreground mb-3">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center text-sm text-foreground"
                          >
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                        {product.features.length > 3 && (
                          <li className="text-xs text-muted-foreground">
                            +{product.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Pricing Info */}
                    <div className="mb-6 p-3 bg-muted/50 rounded-lg">
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Pricing:
                      </h4>
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Starting from:
                          </span>
                          <span className="font-medium text-primary">
                            {formatProductPrice(
                              product.pricing[product.pricing.length - 1].price
                            )}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {product.pricing[product.pricing.length - 1].range}{' '}
                          units
                        </div>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="mb-6 text-xs text-muted-foreground">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-medium">Material:</span>{' '}
                          {product.specs.material}
                        </div>
                        <div>
                          <span className="font-medium">Dimensions:</span>{' '}
                          {product.specs.dimensions}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button asChild className="w-full">
                        <Link to={`/product/${product.slug}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full">
                        <Link to="/quote">Get Quote</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Need Custom Solutions?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Don't see exactly what you're looking for? We specialize in custom
            leather goods tailored to your specific requirements and brand
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/quote">Request Custom Quote</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/sample-kit">Order Sample Kit</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductCatalogue;
