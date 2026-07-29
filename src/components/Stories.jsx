import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { usePageImages } from '../hooks/usePageImages'
import { useOwnerMode } from '../hooks/useOwnerMode'
import { AddImageButton } from './AddImageButton'

export function Stories() {
  const { images, remove, isAdded } = usePageImages('stories')
  const { unlocked } = useOwnerMode()

  return (
    <section id="stories" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp} className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-script text-3xl text-rose-dust md:text-4xl">Amazing work</p>
            <h2 className="mt-1 font-serif text-4xl font-medium uppercase tracking-[0.08em] text-ink md:text-5xl">
              Featured Wedding Story
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
              Moments from weddings and celebrations we have been trusted to shape.
            </p>
          </div>
          <AddImageButton path="stories" label="Add Cloudinary image" />
        </motion.div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((src, i) => (
            <motion.figure
              key={`${src}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (i % 6) * 0.05 }}
              className="group relative mb-4 break-inside-avoid overflow-hidden"
            >
              <img
                src={src}
                alt={`Story ${i + 1}`}
                className={`w-full object-cover transition duration-700 group-hover:scale-[1.03] ${
                  i % 5 === 0 ? 'aspect-[3/4]' : i % 3 === 0 ? 'aspect-square' : 'aspect-[4/5]'
                }`}
              />
              {unlocked && isAdded(src) && (
                <button
                  type="button"
                  onClick={() => remove(src)}
                  className="absolute right-2 top-2 bg-ink/70 px-2 py-1 text-[0.6rem] uppercase tracking-wider text-white opacity-0 transition group-hover:opacity-100"
                >
                  Remove
                </button>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
