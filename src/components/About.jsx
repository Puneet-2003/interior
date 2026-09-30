import { motion } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { usePageImages } from '../hooks/usePageImages'
import { AddImageButton } from './AddImageButton'
import { CountUp } from './CountUp'

const stats = [
  { value: '500+', label: 'Weddings Curated' },
  { value: '10+', label: 'Years of Craft' },
]

const whyServices = [
  { title: 'Complete Wedding Planning & Management', text: 'One dedicated team owns your celebration from the first idea to the final farewell.' },
  { title: 'Wedding Card Printing & Invitations', text: 'Elegant cards and invitations designed to match the mood of your big day.' },
  { title: 'Dream Wedding Decoration & Décor', text: 'Themes, florals, lighting and décor crafted into a setting that feels unmistakably yours.' },
  { title: 'Photography & Videography', text: 'Professional storytellers capturing every ritual, glance and celebration.' },
  { title: 'Food & Catering Services', text: 'Curated menus and seamless catering that guests remember long after.' },
  { title: 'Travel & Transportation', text: 'Guest movement, family travel and logistics — planned and managed end to end.' },
  { title: 'Wedding Functions & Coordination', text: 'Every function, from mehendi to reception, coordinated down to the minute.' },
  { title: 'Stage, Entry & Venue Setup', text: 'Grand stages, couple entries and complete venue styling, ready before you arrive.' },
]

export function About() {
  const { images } = usePageImages('home.about')
  const [main, ...rest] = images

  return (
    <section id="about" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-rose-dust/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 flex justify-end">
          <AddImageButton path="home.about" label="About images" />
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div {...fadeUp}>
            <p className="font-script text-3xl text-rose-dust md:text-4xl">Our Story</p>
            <h2 className="mt-2 font-serif text-4xl font-medium text-ink md:text-5xl lg:leading-tight">
              A Legacy of Love, Crafted in Gwalior
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
              Dream City Events began with a simple belief — every wedding deserves to feel like a
              royal chapter. For over a decade, we have orchestrated celebrations inside Gwalior's
              heritage palaces, luxury banquets and intimate family homes with the same reverence.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
              We are not just planners. We are custodians of your story — curating light, scent,
              sound and silence so that when you walk in, the world holds its breath.
            </p>

            <div className="mt-10 flex gap-12 sm:gap-16">
              {stats.map((s) => (
                <div key={s.label}>
                  <CountUp value={s.value} className="font-serif text-4xl text-ink md:text-5xl" />
                  <p className="mt-1 text-base text-ink-muted">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-rose-dust">
              Palace • Heritage • Modern
            </p>
            <blockquote className="mt-4 border-l-2 border-rose-dust/60 pl-5">
              <p className="font-serif text-xl italic leading-relaxed text-ink md:text-2xl">
                “We design moments that feel timeless, not trendy.”
              </p>
              <footer className="mt-2 text-sm text-ink-muted">— Founder, Dream City Events</footer>
            </blockquote>
            <p className="mt-6 text-sm text-ink-muted">
              <span className="font-semibold uppercase tracking-[0.16em] text-ink">Based in</span>{' '}
              Gwalior, MP • Pan-India
            </p>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 inline-flex bg-rose-dust px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-rose-deep"
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
              <div className="col-span-7 row-span-2 overflow-hidden shadow-xl">
                <motion.img
                  src={main}
                  alt="Celebration moment"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  animate={{ scale: [1, 1.09, 1] }}
                  transition={{
                    opacity: { duration: 0.9 },
                    scale: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="h-full min-h-[280px] w-full object-cover md:min-h-[420px]"
                />
              </div>
            )}
            <div className="col-span-5 grid grid-rows-2 gap-3 md:gap-4">
              {rest.slice(0, 2).map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="group overflow-hidden"
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full min-h-[130px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
            {rest.slice(2, 4).map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group col-span-6 overflow-hidden"
              >
                <img
                  src={src}
                  alt=""
                  className="h-full min-h-[120px] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-24 md:mt-32">
          <motion.div {...fadeUp} className="text-center">
            <p className="font-script text-3xl text-rose-dust md:text-4xl">Why choose us</p>
            <div className="velvet-panel mx-auto mt-5 inline-block px-8 py-4 shadow-[0_14px_40px_rgba(0,0,0,0.5)] md:px-10">
              <h2 className="font-serif text-3xl font-medium text-cream md:text-4xl">
                Your Wedding, Completely Managed by Us
              </h2>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
              Dream City Event is not just a decorator — we are your complete wedding partner. From
              the first plan to the final execution, every detail is handled under one roof, so you
              never have to coordinate with multiple vendors.
            </p>
          </motion.div>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5"
          >
            {whyServices.map((service) => (
              <motion.div
                key={service.title}
                variants={staggerChild}
                className="group border border-cream-deep bg-blush p-6 transition hover:border-rose-dust/70"
              >
                <span className="block h-px w-8 bg-rose-dust" aria-hidden />
                <h3 className="mt-4 font-serif text-xl font-medium leading-snug text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{service.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp}
            className="mt-12 grid overflow-hidden border border-cream-deep bg-blush lg:grid-cols-5"
          >
            {rest[4] && (
              <div className="group overflow-hidden lg:col-span-2">
                <img
                  src={rest[4]}
                  alt="A wedding celebration managed by Dream City Event"
                  className="h-full min-h-[220px] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-col items-start justify-center gap-4 p-8 md:p-10 lg:col-span-3">
              <p className="font-script text-2xl text-rose-dust md:text-3xl">One roof, every detail</p>
              <p className="max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
                Planning, décor, invitations, photography, catering, travel and coordination — one
                trusted team manages it all, giving you a seamless, stress-free wedding you can
                simply live and enjoy.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 inline-flex bg-rose-dust px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-rose-deep"
              >
                Plan With Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
