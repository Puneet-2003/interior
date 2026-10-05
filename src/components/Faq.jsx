import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { faqs } from '../data/siteContent'

export function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="font-script text-3xl text-rose-dust md:text-4xl">Good to know</p>
          <h2 className="mt-2 font-serif text-4xl font-medium text-ink md:text-5xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div {...fadeUp} className="mt-12 border-t border-cream-deep">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={faq.q}
                className="border-b border-cream-deep"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <h3 itemProp="name" className="font-serif text-lg text-ink md:text-xl">
                    {faq.q}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-xl text-rose-dust"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <p itemProp="text" className="pb-6 pr-10 text-base leading-relaxed text-ink-muted">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
