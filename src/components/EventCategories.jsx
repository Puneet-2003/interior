import { motion } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { eventCategories } from '../data/siteContent'

export function EventCategories() {
  return (
    <section id="events" className="relative overflow-hidden bg-blush py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.14), transparent 55%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp} className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-script text-3xl text-rose-dust md:text-4xl">Every occasion</p>
            <h2 className="mt-2 max-w-xl font-serif text-4xl font-medium text-ink md:text-5xl">
              The Events We Handle
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-muted">
            Whatever you are celebrating, we bring the same care — from a single intimate function
            to a multi-day wedding.
          </p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2"
        >
          {eventCategories.map((group) => (
            <motion.div key={group.title} variants={staggerChild} className="border-t border-cream-deep pt-6">
              <h3 className="font-serif text-2xl font-medium text-rose-dust">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-cream-deep bg-cream px-4 py-2 text-sm text-ink-muted transition hover:border-rose-dust/60 hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeUp} className="mt-14 text-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex bg-rose-dust px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-rose-deep"
          >
            Plan My Event
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
