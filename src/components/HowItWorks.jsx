import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'

const SECTION_IMG =
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80'
const CHAIR =
  'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80'

const steps = [
  {
    title: 'Discovery & brief',
    body: 'We map how you live, work, and gather—then translate it into a clear creative direction.',
  },
  {
    title: 'Concept & materials',
    body: 'Mood, palette, and samples come together in a cohesive story you can see and touch.',
  },
  {
    title: 'Design development',
    body: 'Layouts, lighting, and bespoke pieces are refined with technical drawings and schedules.',
  },
  {
    title: 'Build & styling',
    body: 'We coordinate trades and finishing touches so reveal day feels effortless.',
  },
]

function StepIcon() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

export function HowItWorks() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yChair = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])

  return (
    <section id="how" ref={ref} className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 min-h-[320px] lg:order-1 lg:min-h-[480px]"
          >
            <motion.div style={{ y: yImg }} className="relative z-0 overflow-hidden rounded-2xl md:rounded-3xl">
              <img
                src={SECTION_IMG}
                alt="Modern living space with glass partition"
                className="h-[min(420px,55vw)] w-full object-cover lg:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
            </motion.div>
            <motion.div
              style={{ y: yChair }}
              className="absolute -bottom-6 -left-4 z-10 w-[55%] max-w-xs drop-shadow-2xl md:-left-12 md:bottom-4 md:w-[48%]"
            >
              <img
                src={CHAIR}
                alt=""
                className="rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
              />
            </motion.div>
          </motion.div>

          <motion.div {...fadeUp} className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#26a69a]">
              How It Works
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              A calm, structured path from first conversation to installed space
            </h2>

            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-10 space-y-8"
            >
              {steps.map((step, i) => (
                <motion.li
                  key={step.title}
                  variants={staggerChild}
                  className="flex gap-4"
                >
                  {i === 0 ? (
                    <StepIcon />
                  ) : (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-xs font-semibold text-zinc-400">
                      {i + 1}
                    </span>
                  )}
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-zinc-500">Step {i + 1}</span>
                    <h3 className="mt-1 font-sans text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.body}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mt-12 inline-flex rounded-full bg-[#26a69a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#26a69a]/20"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
