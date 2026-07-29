import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { company } from '../data/company'

const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Functions', href: '#functions' },
  { label: 'Stories', href: '#stories' },
  { label: 'Testimonials', href: '#testimonials' },
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
          ? 'bg-cream/95 shadow-[0_8px_30px_rgba(74,10,22,0.10)] backdrop-blur-md'
          : 'bg-gradient-to-b from-ink/55 via-ink/25 to-transparent'
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-6 px-5 py-4 md:px-8 lg:grid-cols-[auto_1fr_auto]">
        <a href="#home" className="shrink-0 leading-tight">
          <span
            className={`font-script text-4xl transition-colors md:text-5xl ${
              onHero ? 'text-cream' : 'text-rose-dust'
            }`}
          >
            {company.wordmark}
          </span>
          <span
            className={`mt-0.5 block font-serif text-xs font-medium uppercase tracking-[0.35em] transition-colors md:text-sm ${
              onHero ? 'text-cream/80' : 'text-ink'
            }`}
          >
            {company.wordmarkSuffix}
          </span>
        </a>

        <nav
          className={`hidden items-center justify-center gap-7 text-sm font-medium uppercase tracking-[0.18em] transition-colors lg:flex ${
            onHero ? 'text-cream/90' : 'text-ink-muted'
          }`}
        >
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors ${
                onHero ? 'hover:text-white' : 'hover:text-rose-dust'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="hidden bg-rose-dust px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-rose-deep md:inline-flex"
          >
            Inquire
          </motion.a>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 border transition-colors lg:hidden ${
              onHero ? 'border-cream/40' : 'border-cream-deep'
            }`}
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`block h-0.5 w-5 transition-transform ${
                onHero ? 'bg-cream' : 'bg-ink'
              } ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-5 ${onHero ? 'bg-cream' : 'bg-ink'} ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 transition-transform ${
                onHero ? 'bg-cream' : 'bg-ink'
              } ${open ? '-translate-y-2 -rotate-45' : ''}`}
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
              className="mt-2 bg-rose-dust px-4 py-2.5 text-center text-white"
              onClick={() => setOpen(false)}
            >
              Inquire
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
