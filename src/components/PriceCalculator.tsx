import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCurrency } from '@/contexts/CurrencyContext';

const PriceCalculator = () => {
  const [quantity, setQuantity] = useState(100);
  const { formatPrice, convertPrice } = useCurrency();

  // Volume pricing slabs (base prices in USD)
  const pricingSlabs = [
    { min: 100, max: 249, price: 30.35, label: '100-249 units' },
    { min: 250, max: 499, price: 28.5, label: '250-499 units' },
    { min: 500, max: 999, price: 26.87, label: '500-999 units' },
    { min: 1000, max: 9999, price: 24.5, label: '1000+ units' },
  ];

  // Find current pricing slab based on quantity
  const getCurrentSlab = (qty: number) => {
    // If quantity is less than 100, show MOQ warning but use 100-249 pricing
    if (qty < 100) {
      return { ...pricingSlabs[0], isBelowMOQ: true, isAboveMax: false };
    }

    // Find the appropriate pricing slab
    const slab = pricingSlabs.find((s) => qty >= s.min && qty <= s.max);

    // If quantity is above the highest tier, use the highest tier
    if (!slab) {
      return {
        ...pricingSlabs[pricingSlabs.length - 1],
        isAboveMax: true,
        isBelowMOQ: false,
      };
    }

    return { ...slab, isAboveMax: false, isBelowMOQ: false };
  };

  const currentSlab = getCurrentSlab(quantity);

  // Calculate total cost (excluding VAT) - convert from USD to selected currency
  const unitPrice = convertPrice(currentSlab.price);
  const totalCost = quantity * unitPrice;

  // Handle quantity input change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value); // Allow any integer value
  };

  // Handle quick quantity selection
  const handleQuickSelect = (qty: number) => {
    setQuantity(qty);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-luxury-dark via-luxury-navy to-luxury-purple">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-cream-gold mb-6">
              Volume Pricing
            </h2>
            <p className="text-xl text-cream-gold/80 font-body leading-relaxed">
              Choose your quantity and get instant pricing. The more you order,
              the better the price.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Volume Pricing Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-cream-gold mb-6">
                Choose Your Quantity
              </h3>

              {/* Quantity Input */}
              <div className="mb-6">
                <label className="block text-cream-gold font-medium mb-2">
                  Enter Quantity:
                </label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="bg-luxury-navy/50 border-accent/20 text-cream-gold text-lg py-3"
                  placeholder="Enter quantity"
                />
              </div>

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[100, 250, 500, 1000].map((qty) => (
                  <Button
                    key={qty}
                    variant={quantity === qty ? 'default' : 'outline'}
                    onClick={() => handleQuickSelect(qty)}
                    className={`py-3 text-lg font-medium ${
                      quantity === qty
                        ? 'bg-accent text-luxury-dark hover:bg-accent/90'
                        : 'border-cream-gold/50 text-cream-gold bg-luxury-navy/30 hover:bg-luxury-navy/50 hover:border-cream-gold'
                    }`}
                  >
                    {qty} units
                  </Button>
                ))}
              </div>

              {/* Pricing Slabs */}
              <div className="space-y-3">
                {pricingSlabs.map((slab, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      (quantity >= slab.min && quantity <= slab.max) ||
                      (quantity > 1000 && slab.min === 1000)
                        ? 'bg-accent border-accent text-luxury-dark'
                        : 'bg-luxury-navy/50 border-cream-gold/30 text-cream-gold'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{slab.label}</div>
                        <div className="text-sm opacity-90">
                          {slab.min === 1000
                            ? '1000+ units'
                            : `${slab.min}-${slab.max} units`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {formatPrice(convertPrice(slab.price))}
                        </div>
                        <div className="text-sm opacity-90">per unit</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="lg:sticky lg:top-8">
              <Card className="bg-luxury-navy/50 border-accent/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-display font-semibold text-cream-gold text-center">
                    Your Price
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="text-center">
                    <div className="text-sm text-cream-gold/80 mb-1">
                      Minimum Order Quantity:
                    </div>
                    <div className="text-lg font-semibold text-accent">100</div>
                    {quantity < 100 && (
                      <div className="text-sm text-red-400 mt-2">
                        ⚠️ MOQ is 100 units
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-cream-gold/80 mb-1">
                      Your unit price:
                    </div>
                    <div className="text-2xl font-bold text-accent">
                      {formatPrice(unitPrice)} per unit
                    </div>
                    <div className="text-sm text-cream-gold/60 mt-1">
                      {currentSlab.isAboveMax
                        ? '1000+ units pricing'
                        : currentSlab.label}
                    </div>
                    {currentSlab.isBelowMOQ && (
                      <div className="text-xs text-yellow-400 mt-1">
                        *Pricing shown for 100+ units
                      </div>
                    )}
                  </div>

                  <div className="text-center border-t border-accent/20 pt-6">
                    <div className="text-lg text-cream-gold/80 mb-2">
                      Your Subtotal:
                    </div>
                    <div className="text-4xl font-bold text-cream-gold">
                      {formatPrice(totalCost)}
                    </div>
                    <div className="text-sm text-cream-gold/60 mt-1">
                      excl VAT
                    </div>
                    {quantity < 100 && (
                      <div className="text-xs text-yellow-400 mt-2">
                        *Quote based on 100+ unit pricing
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-cream-gold/60 text-center">
                    Prices are per unit including setup and delivery charges to
                    UK mainland
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button className="w-full bg-accent text-luxury-dark font-semibold py-3">
                      Get Quote for {quantity} Units
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-accent/30 text-accent hover:bg-accent/10 py-3"
                    >
                      Request Samples
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
