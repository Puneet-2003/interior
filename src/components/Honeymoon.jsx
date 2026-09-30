import { motion } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { honeymoonPackages } from '../data/siteContent'

export function Honeymoon() {
  return (
    <section id="honeymoon" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp} className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-script text-3xl text-rose-dust md:text-4xl">Honeymoons</p>
            <h2 className="mt-2 max-w-xl font-serif text-4xl font-medium text-ink md:text-5xl">
              Start Your Forever With the Perfect Getaway
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-muted">
            After the last farewell, the story continues. We plan honeymoons with the same care we
            plan weddings — flights, stays and experiences included.
          </p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {honeymoonPackages.map((pkg) => (
            <motion.a
              key={pkg.name}
              variants={staggerChild}
              href="#contact"
              className="group flex flex-col border border-cream-deep bg-blush transition hover:border-rose-dust/70"
            >
              <div className="overflow-hidden">
                <img
                  src={pkg.image}
                  alt={`${pkg.name} honeymoon`}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-2xl font-medium text-ink">{pkg.name}</h3>
                  {pkg.duration && (
                    <span className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                      {pkg.duration}
                    </span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{pkg.text}</p>
                <p className="mt-4 text-sm font-medium text-rose-dust">
                  {pkg.startingPrice
                    ? `Starting from ₹${pkg.startingPrice.toLocaleString('en-IN')}`
                    : 'Itinerary & pricing on request'}
                </p>
                <span className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted transition group-hover:text-rose-dust">
                  View Package →
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
