import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'

export function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-zinc-900 bg-[#080808] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          {...fadeUp}
          className="grid gap-12 md:grid-cols-2 md:gap-16"
        >
          <div>
            <p className="font-serif text-2xl text-white">Deepak Gupta Design</p>
            <p className="mt-4 max-w-md text-zinc-400 leading-relaxed">
              Luxury interior design studio. New projects, press, and collaborations—reach out
              and we will respond within two business days.
            </p>
          </div>
          <div className="flex flex-col gap-6 md:items-end">
            <a
              href="mailto:hello@dhi.studio"
              className="text-lg font-medium text-[#26a69a] transition-colors hover:text-[#2dd4bf]"
            >
              hello@dhi.studio
            </a>
            <p className="text-sm text-zinc-500">New York · London · Remote</p>
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-fit rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:border-[#26a69a]/50 hover:text-white"
            >
              Back to top
            </motion.a>
          </div>
        </motion.div>
        <p className="mt-16 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} DHI Atelier. Crafted for demonstration.
        </p>
      </div>
    </footer>
  )
}
