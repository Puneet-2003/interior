import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerParent, staggerChild } from '../lib/motion'
import { functionCategories, functionImagePath } from '../data/functions'
import { usePageImages } from '../hooks/usePageImages'
import { useOwnerMode } from '../hooks/useOwnerMode'
import { AddImageButton } from './AddImageButton'
import { AutoGallery } from './AutoGallery'

export function Functions() {
  const [active, setActive] = useState(functionCategories[0].id)
  const [selectedItemId, setSelectedItemId] = useState(null)
  const { unlocked } = useOwnerMode()

  const category = functionCategories.find((c) => c.id === active) ?? functionCategories[0]
  const visibleItems = category.items.slice(0, 4)
  const selectedItem = visibleItems.find((item) => item.id === selectedItemId) ?? null

  const imagePath = selectedItem
    ? functionImagePath(category.id, selectedItem.id)
    : `functions.${category.id}`

  const { images, remove, isAdded } = usePageImages(imagePath)

  const selectCategory = (id) => {
    setActive(id)
    setSelectedItemId(null)
  }

  const selectItem = (itemId) => {
    setSelectedItemId((prev) => (prev === itemId ? null : itemId))
  }

  const galleryLabel = selectedItem
    ? selectedItem.label
    : category.label.split(' ')[0]

  return (
    <section id="functions" className="relative overflow-hidden bg-blush py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(155,27,48,0.16), transparent 55%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="font-script text-3xl text-rose-dust md:text-4xl">What we host</p>
          <div className="velvet-panel mx-auto mt-5 inline-block px-10 py-4 shadow-[0_14px_40px_rgba(109,15,33,0.28)]">
            <h2 className="font-serif text-3xl font-medium text-white md:text-4xl">Our Best Services</h2>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            One place for every celebration — wedding rituals, baby & family milestones, and sacred
            gatherings. Choose a function to open its project gallery.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {functionCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => selectCategory(cat.id)}
              className={`px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition ${
                active === cat.id
                  ? 'bg-ink text-cream'
                  : 'bg-white text-ink-muted hover:text-ink'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mt-14"
          >
            <p className="mb-8 text-center font-script text-2xl text-rose-dust md:text-3xl">
              {category.eyebrow}
            </p>

            {/* Project gallery header */}
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-rose-dust md:text-sm">
                  Project Gallery
                </p>
                <h3 className="mt-2 font-serif text-3xl font-medium text-ink md:text-4xl">
                  {selectedItem ? selectedItem.label : `${category.label} overview`}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {selectedItem && (
                  <button
                    type="button"
                    onClick={() => setSelectedItemId(null)}
                    className="px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-muted transition hover:text-ink md:text-sm"
                  >
                    Show all
                  </button>
                )}
                <AddImageButton
                  path={imagePath}
                  label={selectedItem ? `Add ${selectedItem.label} image` : 'Add function image'}
                  categoryLabel={category.label}
                  subcategoryLabel={selectedItem?.label}
                />
              </div>
            </div>

            {/* Auto-moving image strip */}
            <AnimatePresence mode="wait">
              <motion.div
                key={imagePath}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="mb-14"
              >
                {images.length > 0 ? (
                  <AutoGallery
                    images={images}
                    label={galleryLabel}
                    unlocked={unlocked}
                    isAdded={isAdded}
                    onRemove={remove}
                  />
                ) : (
                  <div className="border border-dashed border-cream-deep bg-white/50 px-6 py-16 text-center">
                    <p className="font-serif text-xl text-ink md:text-2xl">
                      {selectedItem
                        ? `${selectedItem.label} gallery coming soon`
                        : `${category.label} gallery coming soon`}
                    </p>
                    <p className="mt-2 text-base text-ink-muted">
                      {unlocked
                        ? 'Use Add image and paste a Cloudinary URL for this subcategory.'
                        : 'We are curating photographs from these celebrations.'}
                    </p>
                    {!unlocked && (
                      <a
                        href="#contact"
                        className="mt-5 inline-block text-sm font-semibold uppercase tracking-[0.14em] text-rose-deep transition hover:text-ink"
                      >
                        Ask to see this portfolio →
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-rose-dust md:text-sm">
              Choose a Function
            </p>

            <motion.ul
              variants={staggerParent}
              initial="hidden"
              animate="visible"
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {visibleItems.map((item) => {
                const isSelected = selectedItemId === item.id
                return (
                  <motion.li key={item.id} variants={staggerChild}>
                    <button
                      type="button"
                      onClick={() => selectItem(item.id)}
                      aria-pressed={isSelected}
                      className={`w-full rounded-md px-4 py-4 text-left text-base transition ${
                        isSelected
                          ? 'bg-rose-dust text-white shadow-sm'
                          : 'bg-white text-ink shadow-sm hover:bg-white hover:text-rose-deep'
                      }`}
                    >
                      <span className="block">{item.label}</span>
                      {unlocked && (
                        <span
                          className={`mt-1 block text-xs uppercase tracking-[0.12em] ${
                            isSelected ? 'text-white/75' : 'text-ink-muted'
                          }`}
                        >
                          {category.id}.{item.id}
                        </span>
                      )}
                    </button>
                  </motion.li>
                )
              })}

              <motion.li
                variants={staggerChild}
                className="sm:col-span-2 lg:col-span-3 xl:col-span-4"
              >
                <a
                  href="#contact"
                  className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-md bg-ink px-4 py-4 text-center text-base text-cream shadow-sm transition hover:bg-rose-deep"
                >
                  <span>We manage all types of events</span>
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-blush">
                    Contact us →
                  </span>
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
