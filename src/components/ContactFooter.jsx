import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { SecretOwnerTrigger } from './OwnerPanel'
import { company, companyEmailHref, companyPhoneHref } from '../data/company'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Functions', href: '#functions' },
  { label: 'Stories', href: '#stories' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-cream-deep bg-blush py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp} className="flex flex-col items-center text-center">
          <p className="font-script text-5xl text-rose-dust">{company.wordmark}</p>
          <p className="mt-1 font-serif text-sm uppercase tracking-[0.35em] text-ink">
            {company.wordmarkSuffix}
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
            Weddings, baby celebrations, and sacred gatherings — planned with warmth and refined
            detail. Reach out for new events and collaborations.
          </p>

          <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium uppercase tracking-[0.16em] text-ink-muted">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-rose-dust">
                {l.label}
              </a>
            ))}
          </nav>

          <address className="mt-8 flex flex-col items-center gap-2 not-italic text-base text-ink-muted">
            <p className="max-w-xs leading-relaxed">
              {company.address.line1}
              <br />
              {company.address.line2}
            </p>
            <a
              href={companyPhoneHref}
              className="font-medium text-rose-dust transition hover:text-rose-deep"
            >
              {company.phone}
            </a>
            <a
              href={companyEmailHref}
              className="font-medium text-rose-dust transition hover:text-rose-deep"
            >
              {company.email}
            </a>
          </address>

          <motion.a
            href="#home"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex border border-rose-dust/40 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.14em] text-ink hover:border-rose-dust hover:bg-rose-dust hover:text-white"
          >
            Back to top
          </motion.a>
        </motion.div>

        <p className="mt-16 text-center text-xs text-ink-muted/70">
          © <SecretOwnerTrigger /> {company.name}. Crafted for celebrations.
        </p>
      </div>
    </footer>
  )
}
