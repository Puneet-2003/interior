import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { SecretOwnerTrigger } from './SecretOwnerTrigger'
import { company, companyPhoneHref, companyAddressText, whatsappHref } from '../data/company'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const serviceLinks = [
  'Wedding Planning',
  'Destination Weddings',
  'Decoration',
  'Corporate Events',
  'Birthday Events',
  'Honeymoon Packages',
]

export function ContactFooter() {
  return (
    <footer id="footer" className="border-t border-cream-deep bg-blush pb-24 pt-20 lg:pb-24 md:pt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          {...fadeUp}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]"
        >
          <div>
            <p className="font-script text-4xl text-rose-dust">{company.wordmark}</p>
            <p className="mt-1 font-serif text-sm uppercase tracking-[0.35em] text-ink">
              {company.wordmarkSuffix}
            </p>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-ink-muted">
              Weddings, destination celebrations and every milestone in between — planned, designed
              and managed end to end, from Gwalior to anywhere your story takes you.
            </p>
          </div>

          <nav aria-label="Quick links">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-dust">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-muted">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition hover:text-rose-dust">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-dust">
              Services
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-muted">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a href="#services" className="transition hover:text-rose-dust">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-dust">
              Contact
            </h3>
            <address className="mt-5 space-y-2.5 text-sm not-italic text-ink-muted">
              <p>
                <a
                  href={companyPhoneHref}
                  aria-label={`Call Dream City Events at ${company.phone}`}
                  className="transition hover:text-rose-dust"
                >
                  {company.phone}
                </a>
              </p>
              <p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Chat with Dream City Events on WhatsApp"
                  className="transition hover:text-rose-dust"
                >
                  WhatsApp us
                </a>
              </p>
              <p className="max-w-xs leading-relaxed">
                <a
                  href="https://maps.google.com/?q=Kalpi+Bridge+Colony+Morar+Gwalior+Madhya+Pradesh+474005"
                  target="_blank"
                  rel="noreferrer noopener"
                  title="View Dream City Events office location in Morar, Gwalior on Google Maps"
                  className="transition hover:text-rose-dust"
                >
                  {companyAddressText}
                </a>
              </p>
              {company.instagram && (
                <p>
                  <a
                    href={company.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition hover:text-rose-dust"
                  >
                    Follow on Instagram
                  </a>
                </p>
              )}
              {company.facebook && (
                <p>
                  <a
                    href={company.facebook}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition hover:text-rose-dust"
                  >
                    Follow on Facebook
                  </a>
                </p>
              )}
            </address>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream-deep pt-8 md:flex-row">
          <p className="text-xs text-ink-muted/70">
            © <SecretOwnerTrigger /> {company.name}. Crafted for celebrations.
          </p>
          <motion.a
            href="#home"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex border border-rose-dust/40 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.14em] text-ink hover:border-rose-dust hover:bg-rose-dust hover:text-cream"
          >
            Back to top
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
