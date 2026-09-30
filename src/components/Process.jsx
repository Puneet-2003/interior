import { motion } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { processSteps } from '../data/siteContent'

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="font-script text-3xl text-rose-dust md:text-4xl">How it works</p>
          <h2 className="mx-auto mt-2 max-w-xl font-serif text-4xl font-medium text-ink md:text-5xl">
            From First Call to Final Farewell
          </h2>
        </motion.div>

        <motion.ol
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 space-y-0"
        >
          {processSteps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={staggerChild}
              className="relative grid gap-4 border-t border-cream-deep py-8 md:grid-cols-[auto_1fr] md:gap-10"
            >
              <span className="font-serif text-4xl text-rose-dust/70 md:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-serif text-2xl font-medium text-ink">{step.title}</h3>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-ink-muted">{step.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
