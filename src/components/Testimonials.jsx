import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { usePageImages } from '../hooks/usePageImages'
import { useTestimonials } from '../hooks/useTestimonials'
import { useOwnerMode } from '../hooks/useOwnerMode'
import { AddImageButton } from './AddImageButton'

const AUTOPLAY_MS = 6000

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const { images } = usePageImages('testimonials')
  const { items, remove, isCustom } = useTestimonials()
  const { unlocked } = useOwnerMode()
  const item = items[Math.min(index, Math.max(0, items.length - 1))]

  useEffect(() => {
    if (index >= items.length) setIndex(Math.max(0, items.length - 1))
  }, [items.length, index])

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      AUTOPLAY_MS,
    )
    return () => window.clearInterval(id)
  }, [paused, items.length])

  if (!item) return null

  const photo = item.imageUrl || images[item.imageKey] || images[0]

  return (
    <section id="testimonials" className="relative bg-blush py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <motion.div
          {...fadeUp}
          className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end"
        >
          <div>
            <p className="font-script text-2xl text-rose-dust md:text-3xl">Kind words</p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-ink md:text-3xl">
              Words of people who trust us
            </h2>
          </div>
          <AddImageButton path="testimonials" label="Testimonial image" />
        </motion.div>

        <div
          className="grid items-stretch gap-0 md:grid-cols-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[300px]"
          >
            <AnimatePresence mode="wait">
              {photo && (
                <motion.img
                  key={`${item.id}-${photo}`}
                  src={photo}
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex flex-col justify-center bg-white px-6 py-8 md:px-9 md:py-10"
          >
            {unlocked && isCustom(item.id) && (
              <button
                type="button"
                onClick={() => {
                  remove(item.id)
                  setIndex(0)
                }}
                className="absolute right-4 top-4 text-[0.6rem] uppercase tracking-wider text-ink-muted hover:text-ink"
              >
                Remove
              </button>
            )}

            <span className="font-serif text-3xl leading-none text-rose-dust/50" aria-hidden>
              “
            </span>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-serif text-base italic leading-relaxed text-ink md:text-lg">
                  {item.quote}
                </p>
                <footer className="mt-5">
                  <p className="font-script text-2xl text-rose-dust">{item.names}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-muted">
                    {item.date}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-6 flex gap-2">
              {items.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 w-2 rounded-full transition ${
                    i === index ? 'bg-rose-dust' : 'bg-cream-deep hover:bg-rose-dust/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
