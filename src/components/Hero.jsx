import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Furniture3DScene } from './Furniture3DScene'

const HERO_BG =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80'

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const yScene = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-[#0a0a0a]"
    >
      <motion.div style={{ scale: scaleBg, y: yBg }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#0a2a22]/60 to-[#0a0a0a]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pb-16 pt-28 md:px-8 md:pt-32">
        <div className="grid flex-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 56 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <h1 className="font-serif text-4xl font-medium leading-[1.15] text-white md:text-5xl lg:text-6xl">
              Lorem Ipsum is dummy text of the printing
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-300 md:text-lg">
              Curated interiors that balance warmth, light, and timeless craft. We shape
              residential and commercial spaces with a calm, editorial eye and meticulous
              detail from concept to installation.
            </p>
          </motion.div>

          <motion.div
            style={{ y: yScene }}
            className="relative mt-4 h-[min(320px,52vw)] w-full sm:h-[380px] lg:mt-0 lg:h-[min(520px,55vh)]"
            aria-label="Animated 3D furniture preview"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#26a69a]/10 via-white/[0.04] to-transparent ring-1 ring-white/15 md:rounded-3xl" />
            <div className="absolute inset-[1px] overflow-hidden rounded-2xl md:rounded-3xl">
              <Furniture3DScene className="h-full w-full" />
            </div>
          </motion.div>
        </div>

        <div className="relative mt-auto flex justify-center pt-8 lg:pt-4">
          <motion.a
            href="#about"
            aria-label="Scroll to about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-colors hover:border-[#26a69a]/60 hover:bg-[#26a69a]/10"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  )
}
