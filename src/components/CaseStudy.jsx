import { motion } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { caseStudy } from '../data/siteContent'

export function CaseStudy() {
  return (
    <section id="case-study" className="relative overflow-hidden bg-blush py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          {...fadeUp}
          className="grid items-stretch gap-0 overflow-hidden border border-cream-deep lg:grid-cols-2"
        >
          <div className="group relative overflow-hidden">
            <img
              src={caseStudy.image}
              alt={`${caseStudy.title} celebration`}
              loading="lazy"
              className="h-full min-h-[320px] w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream/60 to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="font-script text-2xl text-rose-dust md:text-3xl">Featured celebration</p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-ink md:text-4xl">
              {caseStudy.title}
            </h2>
            <p className="mt-3 text-sm text-ink-muted">
              An example of a full-scale Dream City wedding, managed end to end.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-6 border-y border-cream-deep py-6">
              {caseStudy.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl text-rose-dust md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="mt-7 grid gap-x-8 gap-y-2.5 sm:grid-cols-2"
            >
              {caseStudy.scope.map((item) => (
                <motion.li
                  key={item}
                  variants={staggerChild}
                  className="flex items-center gap-2.5 text-sm text-ink-muted"
                >
                  <span className="h-px w-4 bg-rose-dust" aria-hidden />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-9 inline-flex self-start bg-rose-dust px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-rose-deep"
            >
              Plan Something Like This
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
