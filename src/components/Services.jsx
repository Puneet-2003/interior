import { motion } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { services } from '../data/siteContent'
import { navigateTo } from '../lib/navigation'

function getServiceHref(title) {
  if (title === 'Destination Weddings') return '/destinations'
  if (title === 'Honeymoon Packages') return '/honeymoon'
  return '#contact'
}

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
          {services.map((service) => {
            const href = getServiceHref(service.title)
            const isGalleryPage = href.startsWith('/')

            return (
              <motion.a
                key={service.title}
                variants={staggerChild}
                href={href}
                onClick={isGalleryPage ? (e) => navigateTo(href, e) : undefined}
                className="group flex flex-col border border-cream-deep bg-blush transition hover:border-rose-dust/70"
              >
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} - Dream City Events Gwalior`}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="533"
                    className="aspect-[3/4] w-full object-cover object-center transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-serif text-lg font-medium leading-snug text-ink">{service.title}</h3>
                  <p className="mt-1 flex-1 text-xs leading-snug text-ink-muted line-clamp-2">{service.text}</p>
                  <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-dust transition group-hover:tracking-[0.22em]">
                    {isGalleryPage ? 'View Gallery →' : 'Explore Service →'}
                  </span>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
