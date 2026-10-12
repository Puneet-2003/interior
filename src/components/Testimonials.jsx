import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { usePageImages } from '../hooks/usePageImages'
import { useTestimonials } from '../hooks/useTestimonials'
import { useOwnerMode } from '../hooks/useOwnerMode'
import { AddImageButton } from './AddImageButton'

const AUTOPLAY_MS = 6500

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const { images } = usePageImages('testimonials')
  const { items, loaded, remove } = useTestimonials()
  const { unlocked } = useOwnerMode()
  const safeIndex = items.length > 0 ? Math.min(index, items.length - 1) : 0
  const item = items[safeIndex]

  useEffect(() => {
    if (index >= items.length && items.length > 0) {
      setIndex(Math.max(0, items.length - 1))
    }
  }, [items.length, index])

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      AUTOPLAY_MS,
    )
    return () => window.clearInterval(id)
  }, [paused, items.length])

  const photo = item
    ? item.imageUrl || images[safeIndex % Math.max(1, images.length)] || images[0]
    : null

  const showPrev = () => {
    if (items.length < 2) return
    setIndex((i) => (i - 1 + items.length) % items.length)
  }

  const showNext = () => {
    if (items.length < 2) return
    setIndex((i) => (i + 1) % items.length)
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-blush py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          {...fadeUp}
          className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <p className="font-script text-3xl text-rose-dust md:text-4xl">
              Client Testimonials &amp; Reviews
            </p>
            <h2
              id="testimonials-heading"
              className="mt-2 font-serif text-3xl font-medium text-ink md:text-5xl"
            >
              Why Families Trust the Best Wedding Planner in Gwalior
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              Read verified reviews from couples, families, and corporate leaders across Gwalior,
              Morar, Lashkar, City Centre, and destination wedding venues in India who trusted{' '}
              <strong className="font-medium text-ink">Dream City Events Gwalior</strong> for luxury
              wedding planning, royal stage decoration, Bollywood artist management, Haldi &amp;
              Mehndi decor, and turnkey event management.
            </p>
          </div>
          <AddImageButton path="testimonials" label="Testimonial image" />
        </motion.div>

        {!item ? (
          <div className="border border-dashed border-cream-deep bg-cream/40 px-6 py-12 text-center">
            <p className="font-serif text-base text-ink-muted">
              {loaded
                ? 'No testimonials yet. Use Owner tools → Testimonial to add one.'
                : 'Loading testimonials…'}
            </p>
          </div>
        ) : (
          <>
            {/* Featured Spotlight Carousel */}
            <div
              className="grid items-stretch gap-0 overflow-hidden border border-cream-deep shadow-[0_20px_60px_rgba(0,0,0,0.35)] lg:grid-cols-12"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative aspect-[4/3] overflow-hidden lg:col-span-5 lg:aspect-auto lg:min-h-[380px]"
              >
                <AnimatePresence mode="wait">
                  {photo && (
                    <motion.img
                      key={`${item.id}-${photo}`}
                      src={photo}
                      alt={`${item.names} — ${item.keywordTag || 'Best Wedding Planner in Gwalior'} review for Dream City Events Gwalior`}
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="450"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45 }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-cream/70 via-transparent to-transparent" />
                {item.keywordTag && (
                  <span className="absolute bottom-4 left-4 bg-cream/90 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-rose-dust backdrop-blur-sm">
                    {item.keywordTag}
                  </span>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative flex flex-col justify-between bg-cream px-6 py-8 md:px-10 md:py-12 lg:col-span-7"
              >
                {unlocked && (
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

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div
                      className="flex items-center gap-1 text-rose-dust"
                      aria-label={`${item.rating || 5} out of 5 stars`}
                    >
                      {Array.from({ length: item.rating || 5 }).map((_, starIdx) => (
                        <span key={starIdx} aria-hidden="true" className="text-base">
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                        5.0 Verified Celebration Review
                      </span>
                    </div>
                  </div>

                  <span
                    className="mt-4 block font-serif text-4xl leading-none text-rose-dust/50"
                    aria-hidden="true"
                  >
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
                      <p className="font-serif text-lg italic leading-relaxed text-ink md:text-2xl">
                        {item.quote}
                      </p>
                      <footer className="mt-6 border-t border-cream-deep pt-5">
                        <p className="font-script text-3xl text-rose-dust">{item.names}</p>
                        {item.event && (
                          <p className="mt-1 font-serif text-sm font-medium text-ink">
                            {item.event}
                          </p>
                        )}
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-muted">
                          {item.date}
                        </p>
                      </footer>
                    </motion.blockquote>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {items.map((t, i) => (
                      <button
                        key={t.id}
                        type="button"
                        aria-label={`Show testimonial ${i + 1}: ${t.names}`}
                        aria-current={i === safeIndex ? 'true' : undefined}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === safeIndex
                            ? 'w-7 bg-rose-dust'
                            : 'w-2 bg-cream-deep hover:bg-rose-dust/50'
                        }`}
                      />
                    ))}
                  </div>

                  {items.length > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={showPrev}
                        aria-label="Previous testimonial"
                        className="flex h-9 w-9 items-center justify-center border border-cream-deep text-ink transition hover:border-rose-dust hover:text-rose-dust"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        aria-label="Next testimonial"
                        className="flex h-9 w-9 items-center justify-center border border-cream-deep text-ink transition hover:border-rose-dust hover:text-rose-dust"
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Crawlable SEO Grid of All Client Reviews */}
            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((t, i) => {
                const isActive = i === safeIndex
                return (
                  <motion.article
                    key={t.id}
                    variants={staggerChild}
                    itemScope
                    itemType="https://schema.org/Review"
                    onClick={() => setIndex(i)}
                    className={`group cursor-pointer border p-6 transition ${
                      isActive
                        ? 'border-rose-dust bg-cream shadow-[0_12px_35px_rgba(0,0,0,0.3)]'
                        : 'border-cream-deep bg-cream/70 hover:border-rose-dust/60 hover:bg-cream'
                    }`}
                  >
                    <div
                      itemProp="itemReviewed"
                      itemScope
                      itemType="https://schema.org/LocalBusiness"
                      className="sr-only"
                    >
                      <meta itemProp="name" content="Dream City Events Gwalior" />
                      <meta itemProp="telephone" content="+91 88276 88283" />
                      <meta itemProp="address" content="Morar, Gwalior, Madhya Pradesh, India" />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div
                        itemProp="reviewRating"
                        itemScope
                        itemType="https://schema.org/Rating"
                        className="flex items-center gap-0.5 text-xs text-rose-dust"
                      >
                        <meta itemProp="ratingValue" content={String(t.rating || 5)} />
                        <meta itemProp="bestRating" content="5" />
                        {Array.from({ length: t.rating || 5 }).map((_, starIdx) => (
                          <span key={starIdx} aria-hidden="true">
                            ★
                          </span>
                        ))}
                      </div>
                      {t.keywordTag && (
                        <span className="border border-rose-dust/30 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-rose-dust">
                          {t.keywordTag}
                        </span>
                      )}
                    </div>

                    {t.event && (
                      <h3
                        itemProp="name"
                        className="mt-3 font-serif text-lg font-medium leading-snug text-ink"
                      >
                        {t.event}
                      </h3>
                    )}

                    <p
                      itemProp="reviewBody"
                      className="mt-2.5 text-sm leading-relaxed text-ink-muted"
                    >
                      “{t.quote}”
                    </p>

                    <footer className="mt-5 flex items-center justify-between border-t border-cream-deep pt-3.5">
                      <div
                        itemProp="author"
                        itemScope
                        itemType="https://schema.org/Person"
                      >
                        <p itemProp="name" className="font-serif text-base font-medium text-ink">
                          {t.names}
                        </p>
                        <p className="text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
                          {t.date}
                        </p>
                      </div>
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-rose-dust opacity-80 transition group-hover:opacity-100">
                        {isActive ? 'Viewing' : 'Spotlight →'}
                      </span>
                    </footer>
                  </motion.article>
                )
              })}
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
