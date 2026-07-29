import { motion } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { usePageImages } from '../hooks/usePageImages'
import { AddImageButton } from './AddImageButton'

const stats = [
  { value: '200+', label: 'Celebrations' },
  { value: '45', label: 'Cities served' },
  { value: '12', label: 'Years of craft' },
  { value: '100%', label: 'Heartfelt care' },
]

export function About() {
  const { images } = usePageImages('home.about')
  const [main, ...rest] = images

  return (
    <section id="about" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-blush blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 flex justify-end">
          <AddImageButton path="home.about" label="About images" />
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div {...fadeUp}>
            <p className="font-script text-3xl text-rose-dust md:text-4xl">About us</p>
            <h2 className="mt-2 font-serif text-4xl font-medium text-ink md:text-5xl lg:leading-tight">
              Spaces and ceremonies that feel luminous and unmistakably yours
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
              From first conversation to final farewell, we orchestrate weddings, baby celebrations,
              and religious gatherings with calm structure and beautiful detail — so you can be
              present for every blessing.
            </p>

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="mt-10 grid grid-cols-2 gap-8 sm:gap-10"
            >
              {stats.map((s) => (
                <motion.div key={s.value} variants={staggerChild}>
                  <p className="font-serif text-4xl text-ink md:text-5xl">{s.value}</p>
                  <p className="mt-1 text-base text-ink-muted">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 inline-flex bg-rose-dust px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-rose-deep"
            >
              Contact Us
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-12 gap-3 md:gap-4"
          >
            {main && (
              <div className="col-span-7 row-span-2">
                <img
                  src={main}
                  alt="Celebration moment"
                  className="h-full min-h-[280px] w-full object-cover shadow-xl md:min-h-[420px]"
                />
              </div>
            )}
            <div className="col-span-5 grid grid-rows-2 gap-3 md:gap-4">
              {rest.slice(0, 2).map((src) => (
                <img key={src} src={src} alt="" className="h-full min-h-[130px] w-full object-cover" />
              ))}
            </div>
            {rest.slice(2, 4).map((src) => (
              <div key={src} className="col-span-6">
                <img src={src} alt="" className="h-full min-h-[120px] w-full object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
