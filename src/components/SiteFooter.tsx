import { Link } from 'react-router-dom';
import { formatAddress, siteConfig } from '@/config/site';

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-pcs-deep text-primary-foreground">
      <div className="container mx-auto py-12 grid gap-10 md:grid-cols-3">
        <div>
          <img
            src={siteConfig.logoPath}
            alt={siteConfig.legalName}
            className="h-24 w-auto mb-4 rounded-md bg-white/95 p-2"
            width={216}
            height={144}
          />
          <p className="mt-2 text-sm text-primary-foreground/80 max-w-sm">
            Wholesale catering packaging catalogue for cafés, takeaways, restaurants and caterers.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
            Contact
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a className="underline-offset-2 hover:underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li>{formatAddress()}</li>
            <li>{siteConfig.hours.weekdays}</li>
            <li>{siteConfig.hours.weekend}</li>
          </ul>
          <p className="mt-4 text-xs text-primary-foreground/70 max-w-sm">
            Phone numbers currently differ across the source website (header vs footer). Until
            confirmed, please use email or the contact form.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
            Explore
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="hover:underline underline-offset-2" to="/catalogue">
                Product catalogue
              </Link>
            </li>
            <li>
              <Link className="hover:underline underline-offset-2" to="/quote">
                Request a quote
              </Link>
            </li>
            <li>
              <Link className="hover:underline underline-offset-2" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:underline underline-offset-2" to="/privacy-policy">
                Privacy notice
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs text-primary-foreground/60">
            Delivery thresholds and shipping promises are not shown here until business rules are
            confirmed.
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto py-4 text-xs text-primary-foreground/60 flex flex-col sm:flex-row gap-2 sm:justify-between">
          <span>© {new Date().getFullYear()} {siteConfig.legalName}</span>
          <span>Catalogue &amp; quote enquiries — no online checkout in this phase.</span>
        </div>
      </div>
    </footer>
  );
}
