import Layout from '@/components/Layout';
import { siteConfig } from '@/config/site';
import useSEO from '@/hooks/useSEO';

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy notice',
    description: 'How PCS UK handles enquiry and catalogue website data.',
  });

  return (
    <Layout>
      <div className="container mx-auto py-10 max-w-3xl prose prose-neutral">
        <h1>Privacy notice</h1>
        <p>
          This notice explains how {siteConfig.legalName} (“PCS UK”, “we”) handles information
          collected through this catalogue website.
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>Quote and contact enquiry details you submit (name, business name, email, phone, postcode and message content).</li>
          <li>Product selections included in a quote enquiry.</li>
          <li>Optional marketing preference if you choose to opt in.</li>
          <li>Basic technical logs that our hosting or form provider may process to deliver the service.</li>
        </ul>
        <h2>Why we use it</h2>
        <p>
          We use enquiry details to respond to quote requests and product questions. Marketing email
          is only sent if you actively opt in.
        </p>
        <h2>Sharing</h2>
        <p>
          Enquiry forms may be delivered through a configured form provider (for example Formspree)
          acting on our instructions. We do not sell your personal information.
        </p>
        <h2>Retention</h2>
        <p>
          Enquiry records are kept only as long as needed to handle your request and maintain
          ordinary business records.
        </p>
        <h2>Your rights</h2>
        <p>
          You may request access, correction or deletion of personal information we hold about you,
          subject to applicable UK data protection law. Contact us at{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
        <h2>Contact</h2>
        <p>
          {siteConfig.legalName}
          <br />
          {siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.postcode}
        </p>
      </div>
    </Layout>
  );
}
