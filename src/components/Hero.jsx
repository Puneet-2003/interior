import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { usePageImages } from '../hooks/usePageImages'
import { isVideoUrl } from '../data/images'
import { AddImageButton } from './AddImageButton'

export function Hero() {
  const ref = useRef(null)
  const [activeVideo, setActiveVideo] = useState(0)
  const { images } = usePageImages('home.hero')
  const heroVideos = images.filter(isVideoUrl)
  const heroVideo = heroVideos[activeVideo % heroVideos.length]
  const heroBg = images.find((url) => url && !isVideoUrl(url))
  const showNextVideo = () => {
    setActiveVideo((current) => (current + 1) % heroVideos.length)
  }
  const showPreviousVideo = () => {
    setActiveVideo((current) => (current - 1 + heroVideos.length) % heroVideos.length)
  }

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const overlayY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink">
      <motion.div style={{ scale: scaleBg, y: yBg }} className="absolute inset-0">
        {heroVideo ? (
          <AnimatePresence initial={false}>
            <motion.video
              key={heroVideo}
              className="absolute inset-0 h-full w-full object-cover object-top"
              src={heroVideo}
              poster={heroBg}
              autoPlay
              muted
              loop={heroVideos.length === 1}
              playsInline
              preload="auto"
              onEnded={showNextVideo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        ) : (
          heroBg && (
            <div
              className="absolute inset-0 bg-cover bg-top"
              style={{ backgroundImage: `url(${heroBg})` }}
            />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/20 to-ink/55" />
      </motion.div>

      {heroVideos.length > 1 && (
        <div className="absolute inset-x-0 bottom-20 z-20 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={showPreviousVideo}
            aria-label="Previous hero video"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <div className="flex gap-2" aria-label="Hero video slides">
            {heroVideos.map((video, index) => (
              <button
                key={video}
                type="button"
                onClick={() => setActiveVideo(index)}
                aria-label={`Play hero video ${index + 1}`}
                aria-current={index === activeVideo % heroVideos.length ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeVideo % heroVideos.length
                    ? 'w-7 bg-white'
                    : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={showNextVideo}
            aria-label="Next hero video"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      )}

      <div className="absolute right-4 top-24 z-20 md:right-8 md:top-28">
        <AddImageButton path="home.hero" label="Hero image" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-2xl items-center justify-center px-5 py-28 md:px-8">
        <motion.div
          style={{ y: overlayY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl bg-transparent px-4 py-6 text-center md:px-6"
        >
          <div className="mx-auto mb-5 h-px w-14 bg-white/60" />
          <p className="font-script text-2xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] md:text-3xl">
            Celebrations, crafted
          </p>
          <h1 className="mt-2 font-serif text-4xl font-medium leading-[1.15] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] md:text-5xl">
            Plan Your Dream With Us
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] md:text-base">
            Wedding, family, and sacred gatherings — designed with warmth, ritual, and an editorial eye for every moment.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-7 inline-flex rounded-full bg-rose-dust px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-rose-deep md:text-sm"
          >
            Contact Now
          </motion.a>
          <div className="mx-auto mt-7 h-px w-14 bg-white/60" />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center border border-white/35 text-white"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.a>
    </section>
  )
}
