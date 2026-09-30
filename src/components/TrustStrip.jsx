import { motion } from 'framer-motion'
import { staggerParent, staggerChild } from '../lib/motion'
import { CountUp } from './CountUp'

const stats = [
  { value: '500+', label: 'Weddings Curated' },
  { value: '10+', label: 'Years of Craft' },
  { value: '45', label: 'Cities Served' },
  { value: '100%', label: 'Personalized Planning' },
]

export function TrustStrip() {
  return (
    <section aria-label="Our track record" className="relative border-b border-cream-deep bg-blush">
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-4 md:px-8 md:py-12"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={staggerChild} className="text-center">
            <CountUp value={s.value} className="font-serif text-3xl text-rose-dust md:text-4xl" />
            <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.16em] text-ink-muted md:text-sm">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
