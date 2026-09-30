import { motion } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { destinations } from '../data/siteContent'

export function Destinations() {
  return (
    <section id="destinations" className="relative overflow-hidden bg-blush py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="font-script text-3xl text-rose-dust md:text-4xl">Destination weddings</p>
          <h2 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-medium text-ink md:text-5xl">
            Your Wedding. Your Destination. Your Story.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            We take your celebration wherever your heart points — handling venue, décor, guest
            travel, stay and on-ground coordination end to end.
          </p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {destinations.map((dest) => (
            <motion.a
              key={dest.name}
              variants={staggerChild}
              href="#contact"
              className="group relative block overflow-hidden border border-cream-deep"
            >
              <img
                src={dest.image}
                alt={`${dest.name} destination wedding`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-2xl font-medium text-ink">{dest.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{dest.text}</p>
                <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-rose-dust transition group-hover:tracking-[0.22em]">
                  Explore Destination →
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div {...fadeUp} className="mt-14 text-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex bg-rose-dust px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-rose-deep"
          >
            Plan My Destination Wedding
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
