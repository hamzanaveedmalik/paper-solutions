import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductImage from '@/components/catalogue/ProductImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useQuote } from '@/contexts/QuoteContext';
import { getProductById, getVariant } from '@/data/catalogue';
import { formatPriceInfo } from '@/lib/pricing';
import {
  isEnquiryDeliveryConfigured,
  revalidateQuoteItems,
  submitQuoteEnquiry,
} from '@/lib/quoteEnquiry';
import { siteConfig } from '@/config/site';
import useSEO from '@/hooks/useSEO';
import { toast } from 'sonner';

export default function Quote() {
  useSEO({
    title: 'Request a quote',
    description: 'Review your PCS UK quote list and send an enquiry for catering packaging.',
  });

  const { items, updateQuantity, removeItem, clear, itemCount } = useQuote();
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [notes, setNotes] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [formStartedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [manualSummary, setManualSummary] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const resolvedLines = useMemo(() => {
    const out = [];
    for (const item of items) {
      const product = getProductById(item.productId);
      if (!product) continue;
      const variant = getVariant(product, item.variantId);
      out.push({
        item,
        product,
        variant,
        price: variant ? variant.price : product.price,
        packQty: variant?.packQuantity ?? product.packQuantity,
        packUnit: variant?.packUnit ?? product.packUnit ?? 'pack',
        image: variant?.images[0] || product.images[0],
      });
    }
    return out;
  }, [items]);

  const hasIncompletePrices = resolvedLines.some((line) => line.price.kind !== 'exact');
  const deliveryConfigured = isEnquiryDeliveryConfigured();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});
    setManualSummary(null);
    setSubmitting(true);

    const validated = revalidateQuoteItems(items);
    if (!validated.ok) {
      setFormError(validated.error || 'Quote items could not be validated.');
      setSubmitting(false);
      return;
    }

    const result = await submitQuoteEnquiry({
      name,
      businessName,
      email,
      phone,
      postcode,
      notes,
      marketingConsent,
      companyWebsite,
      formStartedAt,
      items: items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      })),
    });

    setSubmitting(false);

    if (result.success === true) {
      setSuccessRef(result.reference);
      clear();
      toast.success('Enquiry submitted');
      return;
    }

    if (result.needsManualSend) {
      setManualSummary(result.needsManualSend.summary);
      setFormError(result.error);
      return;
    }

    setFormError(result.error);
    if (result.fieldErrors) setFieldErrors(result.fieldErrors);
  };

  if (successRef) {
    return (
      <Layout>
        <div className="container mx-auto py-16 max-w-xl text-center">
          <h1 className="text-3xl">Enquiry received</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you. Your quote request has been accepted with reference{' '}
            <span className="font-semibold text-foreground">{successRef}</span>. We will respond
            using the contact details you provided.
          </p>
          <Button asChild className="mt-8">
            <Link to="/catalogue">Continue browsing</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 md:py-10">
        <h1 className="text-3xl md:text-4xl">Quote list</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Your selections are saved in this browser. Send an enquiry and we will follow up with
          pricing — this is not an online checkout.
        </p>

        {!deliveryConfigured && (
          <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            Enquiry delivery endpoint is not configured (`VITE_FORMSPREE_QUOTES_ENDPOINT`). Valid
            submissions will show a copyable summary to email to {siteConfig.enquiryEmail}.
          </div>
        )}

        <div className="mt-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
          <section aria-label="Quote items">
            {resolvedLines.length === 0 ? (
              <div className="rounded-md border border-dashed border-border p-10 text-center">
                <h2 className="text-xl font-display">Your quote list is empty</h2>
                <p className="mt-2 text-muted-foreground">
                  Browse the catalogue and add the packs or cases you need.
                </p>
                <Button asChild className="mt-4">
                  <Link to="/catalogue">Browse products</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {resolvedLines.map(({ item, product, variant, price, packQty, packUnit, image }) => (
                  <li
                    key={`${item.productId}-${item.variantId || 'base'}`}
                    className="flex gap-4 rounded-md border border-border bg-card p-4"
                  >
                    <ProductImage
                      src={image?.src}
                      alt={product.name}
                      className="h-24 w-24 rounded-md shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${product.slug}`}
                        className="font-medium hover:underline underline-offset-2"
                      >
                        {product.name}
                      </Link>
                      {variant && (
                        <p className="text-sm text-muted-foreground mt-1">{variant.label}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">
                        {packQty
                          ? `${packQty} per ${packUnit} · quantity in ${packUnit}s`
                          : `Quantity in ${packUnit}s`}
                      </p>
                      <p className="text-sm font-semibold mt-2">{formatPriceInfo(price)}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <Label
                          htmlFor={`qty-${item.productId}-${item.variantId}`}
                          className="sr-only"
                        >
                          Quantity
                        </Label>
                        <Input
                          id={`qty-${item.productId}-${item.variantId}`}
                          type="number"
                          min={1}
                          className="w-24"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              Number(e.target.value) || 1
                            )
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.productId, item.variantId)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {resolvedLines.length > 0 && (
              <div className="mt-4 rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground">
                {itemCount} line unit{itemCount === 1 ? '' : 's'} selected.
                {hasIncompletePrices
                  ? ' Some items show Request price or a price range — no payable total is shown.'
                  : ' Guide prices are listed per line; final quotes may differ.'}
              </div>
            )}
          </section>

          <section aria-label="Enquiry form">
            <form
              onSubmit={onSubmit}
              className="relative rounded-md border border-border bg-card p-5 space-y-4"
            >
              <h2 className="font-display text-2xl">Send enquiry</h2>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                {fieldErrors.name && <p className="text-sm text-destructive">{fieldErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="business">Business name</Label>
                <Input
                  id="business"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
                {fieldErrors.businessName && (
                  <p className="text-sm text-destructive">{fieldErrors.businessName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {fieldErrors.email && <p className="text-sm text-destructive">{fieldErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                {fieldErrors.phone && <p className="text-sm text-destructive">{fieldErrors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postcode">Delivery postcode</Label>
                <Input
                  id="postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  required
                />
                {fieldErrors.postcode && (
                  <p className="text-sm text-destructive">{fieldErrors.postcode}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
                <Label htmlFor="companyWebsite">Company website</Label>
                <Input
                  id="companyWebsite"
                  tabIndex={-1}
                  autoComplete="off"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="marketing"
                  checked={marketingConsent}
                  onCheckedChange={(v) => setMarketingConsent(v === true)}
                />
                <Label htmlFor="marketing" className="text-sm font-normal leading-snug">
                  Optional: send me occasional product updates. Left unchecked by default.
                </Label>
              </div>

              <p className="text-xs text-muted-foreground">
                We use your details only to respond to this enquiry. See our{' '}
                <Link to={siteConfig.privacyPath} className="underline underline-offset-2">
                  privacy notice
                </Link>
                .
              </p>

              {formError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {formError}
                </div>
              )}

              {manualSummary && (
                <div className="space-y-2">
                  <Label htmlFor="manual-summary">Copyable enquiry summary</Label>
                  <Textarea id="manual-summary" readOnly rows={12} value={manualSummary} />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(manualSummary);
                        toast.success('Summary copied');
                      } catch {
                        toast.error('Could not copy automatically — select and copy manually.');
                      }
                    }}
                  >
                    Copy summary
                  </Button>
                  <Button asChild variant="secondary">
                    <a
                      href={`mailto:${siteConfig.enquiryEmail}?subject=${encodeURIComponent('PCS UK quote enquiry')}&body=${encodeURIComponent(manualSummary)}`}
                    >
                      Open email to {siteConfig.enquiryEmail}
                    </a>
                  </Button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={submitting || resolvedLines.length === 0}
              >
                {submitting ? 'Sending…' : 'Submit quote enquiry'}
              </Button>
            </form>
          </section>
        </div>
      </div>
    </Layout>
  );
}
