import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { usePageImages } from '../hooks/usePageImages'
import { company, companyPhoneHref, whatsappHref } from '../data/company'

export function FinalCta() {
  const { images } = usePageImages('home.about')
  const bg = images[0]

  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      {bg && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-cream/80" aria-hidden />

      <motion.div {...fadeUp} className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <p className="font-script text-3xl text-rose-dust md:text-4xl">Ready when you are</p>
        <h2 className="mt-2 font-serif text-4xl font-medium text-ink md:text-5xl">
          Let's Start Planning Your Celebration
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
          Tell us what you're planning. We'll help you turn your idea into an unforgettable event.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Chat with Dream City Events Gwalior on WhatsApp"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex bg-rose-dust px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-rose-deep"
          >
            WhatsApp Us
          </motion.a>
          <motion.a
            href="#contact"
            aria-label="Request a free event consultation from Dream City Events"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex border border-rose-dust/60 px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-rose-dust/15"
          >
            Get a Free Consultation
          </motion.a>
          <motion.a
            href={companyPhoneHref}
            aria-label={`Call Dream City Events at ${company.phone}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex border border-cream-deep px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted transition hover:border-rose-dust/60 hover:text-ink"
          >
            Call {company.phone}
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
