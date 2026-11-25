import { useMemo, useState, useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  Link,
  useSearchParams,
} from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { productDetails } from '@/data/productDetails';

// Forth & Vale – Clean "Get a Quote" & "Request Samples" forms
// - Single-file React component
// - Tailwind CSS for styling (no external UI libs)
// - Accessible labels, keyboard-friendly controls
// - Light validation + success states with IDs
// - UTM capture + file upload stubs

const PRODUCTS = [
  'Wallets',
  'Totes',
  'Crossbody Bags',
  'Backpacks',
  'Belts',
  'Laptop Sleeves',
  'Passport Covers',
  'Card Holders',
  'Key Fobs',
  'Other',
];

const LEATHERS = [
  'Full-grain',
  'Top-grain',
  'Vegetable-tanned',
  'Pebble grain',
  'Saffiano',
  'Nappa',
  'Suede',
];

const HARDWARES = ['Gold', 'Silver', 'Gunmetal', 'Brass', 'Matte Black'];
const BRANDING = ['Deboss', 'Foil', 'Emboss', 'Screen print', 'None'];

function Chip({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-3 py-1 rounded-full border text-sm mr-2 mb-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        active
          ? 'bg-gray-900 text-white border-gray-900'
          : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="mt-1">{children}</div>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 mb-6 bg-white">
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Success({
  heading,
  sub,
  id,
  onReset,
}: {
  heading: string;
  sub: string;
  id?: string | null;
  onReset: () => void;
}) {
  return (
    <div className="text-center p-10 bg-white rounded-2xl border border-green-200">
      <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
        <span className="text-2xl">✓</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{heading}</h3>
      <p className="mt-2 text-gray-600">{sub}</p>
      {id && (
        <p className="mt-3 text-sm text-gray-700">
          Reference ID: <span className="font-mono font-semibold">{id}</span>
        </p>
      )}
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-gray-900 text-white px-4 py-2 text-sm hover:bg-black"
      >
        Submit another
      </button>
    </div>
  );
}

export default function ForthValeForms({
  initialTab = 'quote',
}: {
  initialTab?: 'quote' | 'samples';
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Determine current tab based on URL path
  const currentTab = location.pathname === '/sample-kit' ? 'samples' : 'quote';

  const handleTabChange = (newTab: 'quote' | 'samples') => {
    if (newTab === 'samples') {
      navigate('/sample-kit');
    } else {
      navigate('/quote');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home Navigation */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Forth & Vale – Start Your Project
          </h1>
          <p className="text-gray-600 mt-2">
            Choose an option below. Quotes typically arrive within 24–48
            business hours. Sample kits ship in 24 hours.
          </p>
        </header>

        <div className="inline-flex rounded-2xl border border-gray-200 bg-white p-1 mb-6">
          <button
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              currentTab === 'quote'
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('quote')}
          >
            Get a Quote
          </button>
          <button
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              currentTab === 'samples'
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('samples')}
          >
            Request Samples
          </button>
        </div>

        {currentTab === 'quote' ? <QuoteForm /> : <SamplesForm />}

        <footer className="mt-10 text-xs text-gray-500">
          <p>
            By submitting, you agree to be contacted about your request and our
            privacy policy.
          </p>
        </footer>
      </div>
    </div>
  );
}

function QuoteForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    products: [] as string[],
    quantity: '',
    timeline: '4–6 weeks',
    date: '',
    country: '',
    incoterm: 'FOB',
    branding: [] as string[],
    colorNotes: '',
    brief: null as File | null,
    nda: false,
    notes: '',
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  const utms = useMemo(() => {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    const keys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
    ];
    const out: Record<string, string> = {};
    keys.forEach((k) => {
      const v = params.get(k);
      if (v) out[k] = v;
    });
    return out;
  }, []);

  function toggleArray(field: keyof typeof form, value: string) {
    setForm((prev) => {
      const arr = new Set(prev[field] as string[]);
      if (arr.has(value)) arr.delete(value);
      else arr.add(value);
      return { ...prev, [field]: Array.from(arr) };
    });
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, brief: file }));
  }

  function validate() {
    const e: Record<string, string> = {};
    console.log('Validating form data:', form);

    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid work email.';
    if (!form.company.trim()) e.company = 'Company is required.';
    if (form.products.length === 0) e.products = 'Select at least one product.';
    if (!form.quantity) e.quantity = 'Quantity is required.';
    if (form.timeline === 'Specific date' && !form.date)
      e.date = 'Choose a target date.';
    if (!form.country.trim()) e.country = 'Shipping country required.';
    if (!form.agree) e.agree = 'Consent required.';

    console.log('Validation errors:', e);
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Form submit triggered');

    if (!validate()) {
      console.log('Validation failed');
      return;
    }

    console.log('Validation passed, generating ID');
    const id = `Q-${Date.now().toString(36).toUpperCase()}`;
    console.log('Generated ID:', id);

    try {
      console.log('Attempting to import email service');
      // Import and call email service directly
      const { sendQuoteEmail } = await import('@/lib/email');
      console.log('Email service imported, calling sendQuoteEmail');

      const result = await sendQuoteEmail({ ...form, utms, reference: id });
      console.log('Email result:', result);

      if (result.success) {
        console.log('Email sent successfully, setting done state');
        setDone(id);
      } else {
        console.error('Failed to send email:', result.error);
        alert('Failed to send quote request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Failed to send quote request. Please try again.');
    }
  }

  if (done) {
    return (
      <Success
        heading="Quote started"
        sub="Thanks — a specialist will review your brief and send pricing & timeline within 24–48 business hours."
        id={done}
        onReset={() => {
          setForm({
            name: '',
            email: '',
            company: '',
            phone: '',
            products: [],
            quantity: '',
            timeline: '4–6 weeks',
            date: '',
            country: '',
            incoterm: 'FOB',
            branding: [],
            colorNotes: '',
            brief: null,
            nda: false,
            notes: '',
            agree: false,
          });
          setErrors({});
          setDone(null);
        }}
      />
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Field id="name" label="Full name" required hint={errors.name}>
          <input
            id="name"
            required
            className={`w-full rounded-xl border px-3 py-2 text-sm ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field id="email" label="Work email" required hint={errors.email}>
          <input
            id="email"
            type="email"
            required
            className={`w-full rounded-xl border px-3 py-2 text-sm ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>
        <Field id="company" label="Company" required hint={errors.company}>
          <input
            id="company"
            required
            className={`w-full rounded-xl border px-3 py-2 text-sm ${
              errors.company ? 'border-red-500' : 'border-gray-300'
            }`}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </Field>
        <Field
          id="phone"
          label="Phone (optional)"
          hint="For quicker clarifications only."
        >
          <input
            id="phone"
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>
      </div>

      <Section title="Project details">
        <div>
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-800">
                Products *
              </label>
              {errors.products && (
                <span className="text-xs text-red-600">{errors.products}</span>
              )}
            </div>
            <div className="mt-2 -m-1">
              {PRODUCTS.map((p) => (
                <Chip
                  key={p}
                  label={p}
                  active={form.products.includes(p)}
                  onToggle={() => toggleArray('products', p)}
                />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Field
              id="quantity"
              label="Quantity (units)"
              required
              hint={errors.quantity ?? 'MOQ 100 units'}
            >
              <input
                id="quantity"
                type="number"
                min={1}
                className={`w-full rounded-xl border px-3 py-2 text-sm ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                }`}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />
            </Field>
            <Field id="timeline" label="Timeline" required>
              <select
                id="timeline"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              >
                <option>4–6 weeks</option>
                <option>6–8 weeks</option>
                <option>Specific date</option>
              </select>
            </Field>
            {form.timeline === 'Specific date' && (
              <Field
                id="date"
                label="Target ship date"
                required
                hint={errors.date}
              >
                <input
                  id="date"
                  type="date"
                  className={`w-full rounded-xl border px-3 py-2 text-sm ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </Field>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Field
              id="country"
              label="Shipping country"
              required
              hint={errors.country}
            >
              <input
                id="country"
                className={`w-full rounded-xl border px-3 py-2 text-sm ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </Field>
            <Field
              id="incoterm"
              label="Incoterm"
              required
              hint="Usually FOB/CIF/DDP"
            >
              <select
                id="incoterm"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                value={form.incoterm}
                onChange={(e) => setForm({ ...form, incoterm: e.target.value })}
              >
                <option>FOB</option>
                <option>CIF</option>
                <option>DDP</option>
                <option>EXW</option>
              </select>
            </Field>
            <div></div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-800">
              Branding
            </label>
            <div className="mt-2 -m-1">
              {BRANDING.map((b) => (
                <Chip
                  key={b}
                  label={b}
                  active={form.branding.includes(b)}
                  onToggle={() => toggleArray('branding', b)}
                />
              ))}
            </div>
          </div>

          <Field
            id="colorNotes"
            label="Colors / leather prefs"
            hint="e.g., black saffiano exterior, tan lining, gold hardware"
          >
            <input
              id="colorNotes"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              value={form.colorNotes}
              onChange={(e) => setForm({ ...form, colorNotes: e.target.value })}
            />
          </Field>

          <Field
            id="brief"
            label="Upload brief (optional)"
            hint={form.brief ? form.brief.name : 'PDF/ZIP/Images; max ~10MB'}
          >
            <input
              id="brief"
              type="file"
              onChange={onFile}
              className="w-full text-sm"
            />
          </Field>

          <Field
            id="notes"
            label="Notes (optional)"
            hint="Share references, target price, packaging needs, etc."
          >
            <textarea
              id="notes"
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </Field>

          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-gray-800">
              <input
                type="checkbox"
                checked={form.nda}
                onChange={(e) => setForm({ ...form, nda: e.target.checked })}
                className="rounded border-gray-300"
              />
              Request NDA
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-gray-800">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                className={`rounded border-gray-300 ${
                  errors.agree ? 'ring-2 ring-red-500' : ''
                }`}
              />
              I agree to be contacted about this project
            </label>
          </div>
        </div>
      </Section>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Trusted by brands across the UK, EU & USA.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-gray-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-black"
        >
          Get Pricing & Timeline →
        </button>
      </div>
    </form>
  );
}

function SamplesForm() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    kit: 'Standard Swatch Kit',
    products: [] as string[],
    leathers: ['Full-grain'] as string[],
    colors: 'Black, Tan, Navy',
    hardware: ['Gold'] as string[],
    stitching: 'Match body',
    logo: 'Deboss',
    name: '',
    company: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    country: '',
    vat: '',
    eori: '',
    billingChoice: 'qualify' as 'qualify' | 'pay',
    website: '',
    notes: '',
    agree: false,
  });

  // Handle URL parameters for pre-selecting products
  useEffect(() => {
    const productParam = searchParams.get('product');
    if (productParam) {
      // Find the product by slug
      const product = productDetails.find((p) => p.slug === productParam);
      if (product) {
        setForm((prev) => ({
          ...prev,
          kit: 'Custom Sample Pack',
          products: [product.slug],
        }));
      }
    }
  }, [searchParams]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  function toggleArray(field: keyof typeof form, value: string) {
    setForm((prev) => {
      const arr = new Set(prev[field] as string[]);
      if (arr.has(value)) arr.delete(value);
      else arr.add(value);
      return { ...prev, [field]: Array.from(arr) };
    });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required.';
    if (!form.company.trim()) e.company = 'Company required.';
    if (!form.address1.trim()) e.address1 = 'Address required.';
    if (!form.city.trim()) e.city = 'City required.';
    if (!form.postcode.trim()) e.postcode = 'Postcode required.';
    if (!form.country.trim()) e.country = 'Country required.';
    if (form.billingChoice === 'qualify' && !form.website.trim())
      e.website = 'Company website or LinkedIn required for verification.';
    if (!form.agree) e.agree = 'Please accept the sample policy.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const id = `S-${Date.now().toString(36).toUpperCase()}`;

    try {
      // Import and call email service directly
      const { sendSampleEmail } = await import('@/lib/email');
      const result = await sendSampleEmail({ ...form, reference: id });

      if (result.success) {
        setDone(id);
      } else {
        console.error('Failed to send email:', result.error);
        alert('Failed to send sample request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting sample request:', error);
      alert('Failed to send sample request. Please try again.');
    }
  }

  if (done) {
    return (
      <Success
        heading="Sample request received"
        sub="Your kit will be prepared within 24 hours. You'll receive tracking details by email."
        id={done}
        onReset={() => {
          setForm({
            kit: 'Standard Swatch Kit',
            products: [],
            leathers: ['Full-grain'],
            colors: 'Black, Tan, Navy',
            hardware: ['Gold'],
            stitching: 'Match body',
            logo: 'Deboss',
            name: '',
            company: '',
            email: '',
            phone: '',
            address1: '',
            address2: '',
            city: '',
            postcode: '',
            country: '',
            vat: '',
            eori: '',
            billingChoice: 'qualify',
            website: '',
            notes: '',
            agree: false,
          });
          setErrors({});
          setDone(null);
        }}
      />
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm"
    >
      <Section title="Choose your kit">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 p-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="kit"
                value="Standard Swatch Kit"
                checked={form.kit === 'Standard Swatch Kit'}
                onChange={(e) => setForm({ ...form, kit: e.target.value })}
              />
              <div>
                <div className="font-medium">Standard Swatch Kit</div>
                <div className="text-sm text-gray-600">
                  Leather swatches + hardware finishes + stitching card.
                </div>
              </div>
            </label>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="kit"
                value="Custom Sample Pack"
                checked={form.kit === 'Custom Sample Pack'}
                onChange={(e) => setForm({ ...form, kit: e.target.value })}
              />
              <div>
                <div className="font-medium">Custom Sample Pack</div>
                <div className="text-sm text-gray-600">
                  Includes a reference unit (e.g., wallet) + selected trims.
                </div>
              </div>
            </label>
          </div>
        </div>
      </Section>

      {form.kit === 'Custom Sample Pack' && (
        <Section title="Select Products">
          <div className="mb-3">
            <div className="mb-1 text-sm font-medium text-gray-800">
              Choose products for your sample pack
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Select one or more products to include in your custom sample pack.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {productDetails.map((product) => (
                <label
                  key={product.slug}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.products.includes(product.slug)}
                    onChange={() => toggleArray('products', product.slug)}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-gray-600">
                      {product.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section title="Selections">
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between">
            <div className="text-sm font-medium text-gray-800">
              Leather types
            </div>
          </div>
          {LEATHERS.map((l) => (
            <Chip
              key={l}
              label={l}
              active={form.leathers.includes(l)}
              onToggle={() => toggleArray('leathers', l)}
            />
          ))}
        </div>
        <Field
          id="colors"
          label="Preferred colors"
          hint="Comma-separated (e.g., Black, Tan, Navy)"
        >
          <input
            id="colors"
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
            value={form.colors}
            onChange={(e) => setForm({ ...form, colors: e.target.value })}
          />
        </Field>
        <div className="mb-3">
          <div className="mb-1 text-sm font-medium text-gray-800">
            Hardware finishes
          </div>
          {HARDWARES.map((h) => (
            <Chip
              key={h}
              label={h}
              active={form.hardware.includes(h)}
              onToggle={() => toggleArray('hardware', h)}
            />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field id="stitching" label="Stitching">
            <input
              id="stitching"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              value={form.stitching}
              onChange={(e) => setForm({ ...form, stitching: e.target.value })}
            />
          </Field>
          <Field id="logo" label="Logo method">
            <select
              id="logo"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              value={form.logo}
              onChange={(e) => setForm({ ...form, logo: e.target.value })}
            >
              {BRANDING.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field
          id="notes"
          label="Notes (optional)"
          hint="Add any special requests or reference links"
        >
          <textarea
            id="notes"
            rows={3}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </Field>
      </Section>

      <Section title="Shipping details">
        <div className="grid md:grid-cols-2 gap-4">
          <Field id="name2" label="Full name" required hint={errors.name}>
            <input
              id="name2"
              className={`w-full rounded-xl border px-3 py-2 text-sm ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Field>
          <Field id="company2" label="Company" required hint={errors.company}>
            <input
              id="company2"
              className={`w-full rounded-xl border px-3 py-2 text-sm ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              required
            />
          </Field>
          <Field id="email2" label="Work email" required hint={errors.email}>
            <input
              id="email2"
              type="email"
              className={`w-full rounded-xl border px-3 py-2 text-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </Field>
          <Field id="phone2" label="Phone (optional)">
            <input
              id="phone2"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field
            id="address1"
            label="Address line 1"
            required
            hint={errors.address1}
          >
            <input
              id="address1"
              className={`w-full rounded-xl border px-3 py-2 text-sm ${
                errors.address1 ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.address1}
              onChange={(e) => setForm({ ...form, address1: e.target.value })}
              required
            />
          </Field>
          <Field id="address2" label="Address line 2 (optional)">
            <input
              id="address2"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              value={form.address2}
              onChange={(e) => setForm({ ...form, address2: e.target.value })}
            />
          </Field>
          <Field id="city" label="City" required hint={errors.city}>
            <input
              id="city"
              className={`w-full rounded-xl border px-3 py-2 text-sm ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
          </Field>
          <Field id="postcode" label="Postcode" required hint={errors.postcode}>
            <input
              id="postcode"
              className={`w-full rounded-xl border px-3 py-2 text-sm ${
                errors.postcode ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
              required
            />
          </Field>
          <Field id="country" label="Country" required hint={errors.country}>
            <input
              id="country"
              className={`w-full rounded-xl border px-3 py-2 text-sm ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              required
            />
          </Field>
          <div></div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-1">
          <Field id="vat" label="VAT (optional)">
            <input
              id="vat"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              value={form.vat}
              onChange={(e) => setForm({ ...form, vat: e.target.value })}
            />
          </Field>
          <Field id="eori" label="EORI (optional)">
            <input
              id="eori"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              value={form.eori}
              onChange={(e) => setForm({ ...form, eori: e.target.value })}
            />
          </Field>
        </div>
      </Section>

      <Section title="Verification & payment">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 p-4">
            <label className="flex items-start gap-3">
              <input
                type="radio"
                name="billing"
                value="qualify"
                checked={form.billingChoice === 'qualify'}
                onChange={(e) =>
                  setForm({
                    ...form,
                    billingChoice: e.target.value as 'qualify' | 'pay',
                  })
                }
              />
              <div>
                <div className="font-medium">Free for qualified businesses</div>
                <div className="text-sm text-gray-600">
                  We verify business details. Fee waived; credited at first
                  order.
                </div>
              </div>
            </label>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <label className="flex items-start gap-3">
              <input
                type="radio"
                name="billing"
                value="pay"
                checked={form.billingChoice === 'pay'}
                onChange={(e) =>
                  setForm({
                    ...form,
                    billingChoice: e.target.value as 'qualify' | 'pay',
                  })
                }
              />
              <div>
                <div className="font-medium">Pay sample fee (£29)</div>
                <div className="text-sm text-gray-600">
                  Fully credited to your first production order.
                </div>
              </div>
            </label>
          </div>
        </div>
        {form.billingChoice === 'qualify' ? (
          <Field
            id="website"
            label="Company website / LinkedIn"
            required
            hint={errors.website}
          >
            <input
              id="website"
              className={`w-full rounded-xl border px-3 py-2 text-sm ${
                errors.website ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </Field>
        ) : (
          <div className="rounded-xl border border-gray-200 p-4 text-sm text-gray-700">
            Payment step will open after submission (Stripe/Invoice). For this
            demo, no card data is collected here.
          </div>
        )}
        <label className="mt-2 inline-flex items-center gap-2 text-sm text-gray-800">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => setForm({ ...form, agree: e.target.checked })}
            className={`rounded border-gray-300 ${
              errors.agree ? 'ring-2 ring-red-500' : ''
            }`}
          />
          I agree to the sample policy (non-returnable; selections may vary
          slightly by batch)
        </label>
      </Section>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Ships from UK/EU within 24 hours (business days).
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-gray-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-black"
        >
          Request Sample Kit →
        </button>
      </div>
    </form>
  );
}
