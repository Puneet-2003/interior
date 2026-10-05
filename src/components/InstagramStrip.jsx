import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { usePageImages } from '../hooks/usePageImages'
import { company } from '../data/company'

export function InstagramStrip() {
  const { images } = usePageImages('stories')
  const strip = images.slice(0, 6)

  return (
    <section id="instagram" className="relative overflow-hidden bg-blush py-24 md:py-28">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="font-script text-3xl text-rose-dust md:text-4xl">Follow our celebrations</p>
          <h2 className="mx-auto mt-2 max-w-xl font-serif text-3xl font-medium text-ink md:text-4xl">
            Moments We're Proud to Share
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6"
        >
          {strip.map((src, i) => (
            <div key={src} className="group overflow-hidden">
              <img
                src={src}
                alt={`Celebration moment ${i + 1} - Dream City Events Gwalior`}
                loading="lazy"
                decoding="async"
                width="300"
                height="300"
                className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>

        {company.instagram && (
          <motion.div {...fadeUp} className="mt-10 text-center">
            <motion.a
              href={company.instagram}
              target="_blank"
              rel="noreferrer noopener"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex border border-rose-dust/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-rose-dust/15"
            >
              Follow Us on Instagram
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
