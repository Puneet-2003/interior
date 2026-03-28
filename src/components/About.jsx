import { motion } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'

const IMG_MAIN =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80'
const IMG_1 =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&w=400&q=80'
const IMG_2 =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80'
const IMG_3 =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80'
const IMG_4 =
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80'

const stats = [
  { value: '255+', label: 'Lorem Ipsum' },
  { value: '48', label: 'Lorem Ipsum' },
  { value: '12', label: 'Lorem Ipsum' },
  { value: '100%', label: 'Lorem Ipsum' },
]

function RotatingBadge() {
  return (
    <div className="absolute -right-2 -top-2 z-20 h-28 w-28 md:right-4 md:top-4 md:h-32 md:w-32">
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full text-zinc-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path
            id="badgeCircle"
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            fill="none"
          />
        </defs>
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <text fill="currentColor" style={{ fontSize: '7.5px' }} className="font-sans uppercase">
          <textPath href="#badgeCircle" startOffset="0%">
            DESIGN • STUDIO • DHI • INTERIORS •
          </textPath>
        </text>
      </motion.svg>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-sm font-semibold tracking-widest text-white md:text-base">
          DESIGN
        </span>
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-32">
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 -translate-x-1/3 rounded-full bg-[#1a3d36]/30 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div {...fadeUp} className="relative">
            <div
              className="pointer-events-none absolute -left-8 top-0 opacity-[0.07]"
              aria-hidden
            >
              <svg width="200" height="280" viewBox="0 0 200 280" fill="none" className="text-white">
                <path
                  d="M40 240V80h80v160M40 80l40-40 40 40M60 120h80M60 160h80"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#26a69a]">
              About Us
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Spaces that feel lived-in, luminous, and unmistakably yours
            </h2>
            <p className="mt-6 max-w-lg text-zinc-400 leading-relaxed">
              From first sketch to final styling, we collaborate closely with you—balancing
              architecture, material honesty, and the quiet drama of light. Our process is
              transparent, timeline-aware, and tuned to how you actually live.
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
                  <p className="font-serif text-3xl text-white md:text-4xl">{s.value}</p>
                  <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 inline-flex rounded-full bg-[#26a69a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#26a69a]/20 transition-shadow hover:shadow-[#26a69a]/35"
            >
              Contact Us
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <RotatingBadge />
            <div className="grid grid-cols-12 gap-3 md:gap-4">
              <div className="col-span-7 row-span-2">
                <img
                  src={IMG_MAIN}
                  alt="Bright living interior"
                  className="h-full min-h-[280px] w-full rounded-2xl object-cover shadow-xl md:min-h-[420px] md:rounded-3xl"
                />
              </div>
              <div className="col-span-5 grid grid-rows-2 gap-3 md:gap-4">
                <img
                  src={IMG_1}
                  alt=""
                  className="h-full min-h-[130px] w-full rounded-xl object-cover md:rounded-2xl"
                />
                <img
                  src={IMG_2}
                  alt=""
                  className="h-full min-h-[130px] w-full rounded-xl object-cover md:rounded-2xl"
                />
              </div>
              <div className="col-span-6">
                <img
                  src={IMG_3}
                  alt=""
                  className="h-full min-h-[120px] w-full rounded-xl object-cover md:rounded-2xl"
                />
              </div>
              <div className="col-span-6">
                <img
                  src={IMG_4}
                  alt=""
                  className="h-full min-h-[120px] w-full rounded-xl object-cover md:rounded-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
