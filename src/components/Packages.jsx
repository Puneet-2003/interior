import { motion } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { packages } from '../data/siteContent'

function priceLabel(pkg) {
  return pkg.startingPrice ? `Starting from ₹${pkg.startingPrice.toLocaleString('en-IN')}` : 'Customized quotation'
}

export function Packages() {
  return (
    <section id="packages" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="font-script text-3xl text-rose-dust md:text-4xl">Packages</p>
          <h2 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-medium text-ink md:text-5xl">
            Choose Your Celebration Package
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            Three starting points, endlessly customizable. Every package is quoted for your dates,
            guest count and vision — never a fixed price that doesn't fit.
          </p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid items-stretch gap-6 lg:grid-cols-3"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.tier}
              variants={staggerChild}
              className={`relative flex flex-col p-8 md:p-10 ${
                pkg.featured
                  ? 'border border-rose-dust bg-blush shadow-[0_20px_60px_rgba(0,0,0,0.45)]'
                  : 'border border-cream-deep bg-blush'
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-dust px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cream">
                  Signature
                </span>
              )}
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-dust">
                {pkg.tier}
              </p>
              <h3 className="mt-2 font-serif text-3xl font-medium text-ink">{pkg.name}</h3>
              <p className="mt-3 font-serif text-lg text-ink-muted">{priceLabel(pkg)}</p>

              <ul className="mt-7 flex-1 space-y-3 border-t border-cream-deep pt-7">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                    <span className="mt-0.5 text-rose-dust" aria-hidden>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mt-8 inline-flex justify-center px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition ${
                  pkg.featured
                    ? 'bg-rose-dust text-cream hover:bg-rose-deep'
                    : 'border border-rose-dust/50 text-ink hover:bg-rose-dust/15'
                }`}
              >
                Get Quote
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p {...fadeUp} className="mt-10 text-center text-sm text-ink-muted">
          Need something in between? Every package can be mixed, matched and customized.
        </motion.p>
      </div>
    </section>
  )
}
