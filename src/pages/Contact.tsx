import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatAddress, siteConfig } from '@/config/site';
import useSEO from '@/hooks/useSEO';
import { toast } from 'sonner';

export default function Contact() {
  useSEO({
    title: 'Contact',
    description: 'Contact PCS UK about bulk orders, product questions and catering packaging supply.',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('bulk');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [startedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setManual(null);

    if (website) {
      setError('Unable to submit this enquiry.');
      return;
    }
    if (Date.now() - startedAt < 2000) {
      setError('Please review your message, then submit again.');
      return;
    }
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Name, email and message are required.');
      return;
    }

    const summary = `PCS UK contact enquiry
Topic: ${topic}
Name: ${name}
Email: ${email}

${message}
`.trim();

    const endpoint = siteConfig.formspreeEndpoint;
    if (!endpoint) {
      setManual(summary);
      setError(
        'Contact delivery is not configured. Copy the message below and email it — nothing was submitted automatically.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('_subject', `PCS UK contact — ${topic}`);
      formData.append('_replyto', email);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('topic', topic);
      formData.append('message', message);
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Submission failed');
      setSent(true);
      toast.success('Message sent');
    } catch {
      setManual(summary);
      setError(
        'We could not reach the enquiry service. Copy your message and email us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 max-w-4xl">
        <h1 className="text-3xl md:text-4xl">Contact</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Ask about bulk orders, product suitability or catalogue items. For a multi-product list,
          use the <Link className="underline underline-offset-2" to="/quote">quote page</Link>.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <div className="space-y-4 text-sm">
            <div>
              <h2 className="font-display text-xl mb-2">Business details</h2>
              <p>{siteConfig.legalName}</p>
              <p className="mt-1">{formatAddress()}</p>
              <p className="mt-3">
                <a className="underline underline-offset-2" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </p>
              <p className="mt-1">{siteConfig.hours.weekdays}</p>
              <p>{siteConfig.hours.weekend}</p>
            </div>
            <div className="rounded-md border border-border bg-muted/50 p-4 text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Phone numbers</p>
              <p>
                The source website currently shows different numbers in the header and footer. Until
                the correct public number is confirmed, please use email or this form.
              </p>
              <ul className="mt-3 space-y-1 text-xs">
                {siteConfig.phoneNumbers.map((phone) => (
                  <li key={phone.value}>
                    {phone.value} — {phone.source}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="rounded-md border border-border bg-card p-6">
                <h2 className="font-display text-2xl">Message sent</h2>
                <p className="mt-2 text-muted-foreground">
                  Thanks — we will reply to the email address you provided.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="relative space-y-4 rounded-md border border-border bg-card p-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-topic">Topic</Label>
                  <select
                    id="contact-topic"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  >
                    <option value="bulk">Bulk order</option>
                    <option value="product">Product question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                  <Input
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                {manual && (
                  <div className="space-y-2">
                    <Textarea readOnly rows={8} value={manual} />
                    <Button asChild variant="secondary">
                      <a
                        href={`mailto:${siteConfig.enquiryEmail}?subject=${encodeURIComponent('PCS UK contact')}&body=${encodeURIComponent(manual)}`}
                      >
                        Email {siteConfig.enquiryEmail}
                      </a>
                    </Button>
                  </div>
                )}
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? 'Sending…' : 'Send message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
