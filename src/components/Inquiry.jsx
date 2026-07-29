import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'

const initial = {
  name: '',
  email: '',
  phone: '',
  guests: '',
  occasion: '',
  preference: '',
}

export function Inquiry() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const field =
    'w-full border-0 border-b border-cream-deep bg-transparent px-0 py-3.5 text-base text-ink outline-none placeholder:text-ink-muted/55 focus:border-rose-dust'

  return (
    <section id="inquiry" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-blush)_0%,_transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        <motion.div
          {...fadeUp}
          className="border border-cream-deep bg-white px-6 py-12 shadow-[0_20px_60px_rgba(74,10,22,0.10)] md:px-14 md:py-16"
          style={{ borderRadius: '50% / 8%' }}
        >
          <div className="text-center">
            <p className="font-script text-4xl text-rose-dust">Say hello</p>
            <h2 className="mt-2 font-serif text-4xl font-medium text-ink md:text-5xl">
              Tell us about your celebration
            </h2>
          </div>

          {sent ? (
            <p className="mt-10 text-center font-serif text-xl text-ink-muted">
              Thank you — we will be in touch soon.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-md space-y-5">
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                placeholder="Your Name"
                className={field}
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
                placeholder="Your Email"
                className={field}
              />
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                placeholder="Phone Number"
                className={field}
              />
              <input
                name="guests"
                value={form.guests}
                onChange={onChange}
                placeholder="Number of Guests"
                className={field}
              />
              <input
                name="occasion"
                value={form.occasion}
                onChange={onChange}
                placeholder="What will be the celebration?"
                className={field}
              />
              <input
                name="preference"
                value={form.preference}
                onChange={onChange}
                placeholder="Local Preference / Venue city"
                className={field}
              />
              <div className="pt-4 text-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-rose-dust px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-rose-deep"
                >
                  Send
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
