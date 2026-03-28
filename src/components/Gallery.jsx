import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '../lib/motion'

const galleries = {
  images: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600566752355-35742d71309a?auto=format&fit=crop&w=1600&q=80',
  ],
  videos: [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
  ],
  panoramas: [
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=1600&q=80',
  ],
}

const PLANT =
  'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80'

const tabs = [
  { id: 'images', label: 'Images', count: 12 },
  { id: 'videos', label: 'Videos', count: 5 },
  { id: 'panoramas', label: '360° Panoramas', count: 8 },
]

export function Gallery() {
  const [tab, setTab] = useState('images')
  const [index, setIndex] = useState(0)
  const slides = galleries[tab === 'panoramas' ? 'panoramas' : tab]
  const safeIndex = Math.min(index, Math.max(0, slides.length - 1))
  const current = slides[safeIndex] ?? slides[0]

  const go = useCallback(
    (dir) => {
      setIndex((i) => {
        const len = galleries[tab === 'panoramas' ? 'panoramas' : tab].length
        if (len === 0) return 0
        return (i + dir + len) % len
      })
    },
    [tab],
  )

  const switchTab = (id) => {
    setTab(id)
    setIndex(0)
  }

  return (
    <section id="gallery" className="relative bg-[#0a0a0a] py-24 md:py-32">
      <motion.div {...fadeUp} className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
          <div className="relative aspect-[16/9] min-h-[240px] w-full bg-zinc-900 md:aspect-[21/9] md:min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${tab}-${safeIndex}`}
                src={current}
                alt=""
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 md:left-6"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 md:right-6"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-wrap items-center justify-center gap-2 px-2 md:bottom-6"
            >
              <div className="flex flex-wrap justify-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-md md:px-4">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => switchTab(t.id)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all md:text-sm ${
                      tab === t.id
                        ? 'bg-[#26a69a] text-white shadow-md'
                        : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {t.label}
                    <span className="ml-1.5 opacity-70">{t.count} previews</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="pointer-events-none absolute -bottom-6 right-2 z-30 w-[min(200px,42vw)] md:-bottom-10 md:right-8 md:w-[min(280px,28%)]"
          >
            <img
              src={PLANT}
              alt=""
              className="drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
