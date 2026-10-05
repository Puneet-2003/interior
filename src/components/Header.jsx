import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { company, companyPhoneHref, whatsappHref } from '../data/company'

const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40)
  })

  const onHero = !scrolled && !open

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-cream/95 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md'
          : 'bg-gradient-to-b from-cream/70 via-cream/30 to-transparent'
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-6 px-5 py-4 md:px-8 lg:grid-cols-[auto_1fr_auto]">
        <a href="#home" className="shrink-0 leading-tight">
          <span
            className={`block whitespace-nowrap font-script text-3xl transition-colors md:text-5xl ${
              onHero ? 'text-ink' : 'text-rose-dust'
            }`}
          >
            {company.wordmark}
          </span>
          <span
            className={`mt-0.5 block font-serif text-xs font-medium uppercase tracking-[0.35em] transition-colors md:text-sm ${
              onHero ? 'text-ink/80' : 'text-ink'
            }`}
          >
            {company.wordmarkSuffix}
          </span>
        </a>

        <nav
          className={`hidden items-center justify-center gap-7 text-sm font-medium uppercase tracking-[0.18em] transition-colors lg:flex ${
            onHero ? 'text-ink/90' : 'text-ink-muted'
          }`}
        >
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors ${
                onHero ? 'hover:text-ink' : 'hover:text-rose-dust'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <motion.a
            href={companyPhoneHref}
            aria-label={`Call Dream City Events Gwalior at ${company.phone}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="hidden border border-rose-dust/50 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-rose-dust/15 md:inline-flex"
          >
            Call Now
          </motion.a>
          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Chat with Dream City Events Gwalior on WhatsApp"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="hidden bg-rose-dust px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition hover:bg-rose-deep md:inline-flex"
          >
            WhatsApp
          </motion.a>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 border transition-colors lg:hidden ${
              onHero ? 'border-ink/40' : 'border-cream-deep'
            }`}
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`block h-0.5 w-5 bg-ink transition-transform ${
                open ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span className={`block h-0.5 w-5 bg-ink ${open ? 'opacity-0' : ''}`} />
            <span
              className={`block h-0.5 w-5 bg-ink transition-transform ${
                open ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-cream-deep bg-cream px-5 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-3 text-base font-medium uppercase tracking-[0.14em] text-ink">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1 hover:text-rose-dust"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 bg-rose-dust px-4 py-2.5 text-center text-cream"
              onClick={() => setOpen(false)}
            >
              Get Quote
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Chat with Dream City Events Gwalior on WhatsApp"
              className="border border-rose-dust/50 px-4 py-2.5 text-center text-ink"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
