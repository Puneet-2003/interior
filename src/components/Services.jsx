import { motion } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { services } from '../data/siteContent'

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="font-script text-3xl text-rose-dust md:text-4xl">What we do</p>
          <h2 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-medium text-ink md:text-5xl">
            Everything You Need to Celebrate Beautifully
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            From the first plan to the final farewell, one team designs and manages every part of
            your celebration.
          </p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.a
              key={service.title}
              variants={staggerChild}
              href="#contact"
              className="group flex flex-col border border-cream-deep bg-blush transition hover:border-rose-dust/70"
            >
              <div className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl font-medium text-ink">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{service.text}</p>
                <span className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-rose-dust transition group-hover:tracking-[0.22em]">
                  Explore Service →
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
