import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#gallery' },
  { label: 'Assets', href: '#about' },
  { label: 'Our Clients', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '#how' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40)
  })

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-zinc-950/90 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a
          href="#home"
          className="font-serif text-2xl font-semibold tracking-tight text-white md:text-3xl"
        >
          Deepak Gupta Design
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-300 lg:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-[#26a69a]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href="#contact"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Sign Up
          </a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-[#26a69a] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#26a69a]/25 transition-shadow hover:shadow-[#26a69a]/40"
          >
            Login
          </motion.a>
        </div>

        <button
          type="button"
          aria-label="Menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-zinc-700/80 lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`block h-0.5 w-5 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`block h-0.5 w-5 bg-white ${open ? 'opacity-0' : ''}`} />
          <span
            className={`block h-0.5 w-5 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0 }}
          className="border-t border-zinc-800 bg-zinc-950/98 px-5 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-3 text-sm font-medium text-zinc-200">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1 hover:text-[#26a69a]"
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="pt-2 text-[#26a69a]" onClick={() => setOpen(false)}>
              Sign Up
            </a>
            <a
              href="#contact"
              className="rounded-full bg-[#26a69a] px-4 py-2 text-center text-white"
              onClick={() => setOpen(false)}
            >
              Login
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
