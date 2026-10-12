import { motion, AnimatePresence } from 'framer-motion'
import { destinations, honeymoonPackages } from '../data/siteContent'
import { company, companyPhoneHref, whatsappHref } from '../data/company'
import { usePageImages } from '../hooks/usePageImages'
import { useOwnerMode } from '../hooks/useOwnerMode'
import { navigateTo } from '../lib/navigation'
import { AddImageButton } from './AddImageButton'
import { BentoImageGrid } from './BentoImageGrid'
import { ContactFooter } from './ContactFooter'
import { MobileCta } from './MobileCta'

const SECTION_CONFIG = {
  destinations: {
    id: 'destinations',
    eyebrow: 'Destination weddings',
    title: 'Destination Wedding Galleries',
    subtitle:
      'Explore curated moments from beachside pheras, royal palace celebrations, mountain vows and forest resorts crafted end to end.',
    allLabel: 'All Destinations',
    backAnchor: '/#destinations',
    backLabel: 'Back to Destinations',
    ctaLabel: 'Plan This Destination Wedding',
    items: destinations,
  },
  honeymoon: {
    id: 'honeymoon',
    eyebrow: 'Honeymoons',
    title: 'Honeymoon Getaway Galleries',
    subtitle:
      'Discover romantic escapes, overwater villas, snow-kissed valleys and private beach retreats planned for two.',
    allLabel: 'All Honeymoons',
    backAnchor: '/#honeymoon',
    backLabel: 'Back to Honeymoons',
    ctaLabel: 'Book This Honeymoon Package',
    items: honeymoonPackages,
  },
}

export function CategoryGalleryPage({ section = 'destinations', slug = null }) {
  const config = SECTION_CONFIG[section] || SECTION_CONFIG.destinations
  const selectedItem = slug ? config.items.find((item) => item.id === slug) ?? null : null

  const imagePath = selectedItem ? `${config.id}.${selectedItem.id}` : config.id
  const { images, remove, isAdded } = usePageImages(imagePath)
  const { unlocked } = useOwnerMode()

  const activeTitle = selectedItem
    ? `${selectedItem.name} — ${section === 'honeymoon' ? 'Honeymoon' : 'Destination Wedding'}`
    : config.title

  const activeDescription = selectedItem ? selectedItem.text : config.subtitle
  const categoryLabel = selectedItem ? selectedItem.name : config.allLabel

  const otherItems = config.items.filter((item) => item.id !== selectedItem?.id)

  return (
    <div className="min-h-svh bg-cream font-sans text-ink antialiased">
      {/* Top sticky navigation header */}
      <header className="sticky top-0 z-50 border-b border-cream-deep bg-cream/95 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href={config.backAnchor}
              onClick={(e) => navigateTo(config.backAnchor, e)}
              className="inline-flex items-center gap-2 border border-cream-deep bg-blush px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition hover:border-rose-dust hover:text-rose-dust"
            >
              <span aria-hidden="true">←</span>
              <span>{config.backLabel}</span>
            </a>

            <a
              href="/"
              onClick={(e) => navigateTo('/', e)}
              className="hidden leading-tight sm:block"
            >
              <span className="block font-script text-2xl text-rose-dust md:text-3xl">
                {company.wordmark}
              </span>
              <span className="block font-serif text-[0.65rem] font-medium uppercase tracking-[0.3em] text-ink/80">
                {company.wordmarkSuffix}
              </span>
            </a>
          </div>

          {/* Switch between Destination Weddings & Honeymoons */}
          <div className="flex items-center gap-2">
            <a
              href="/destinations"
              onClick={(e) => navigateTo('/destinations', e)}
              className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                section === 'destinations'
                  ? 'bg-rose-dust text-cream'
                  : 'border border-cream-deep bg-blush text-ink-muted hover:text-ink'
              }`}
            >
              Destinations
            </a>
            <a
              href="/honeymoon"
              onClick={(e) => navigateTo('/honeymoon', e)}
              className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                section === 'honeymoon'
                  ? 'bg-rose-dust text-cream'
                  : 'border border-cream-deep bg-blush text-ink-muted hover:text-ink'
              }`}
            >
              Honeymoon
            </a>
          </div>

          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={companyPhoneHref}
              className="border border-rose-dust/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-rose-dust/15"
            >
              Call Now
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-rose-dust px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream transition hover:bg-rose-deep"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="pb-20 pt-10 md:pb-28 md:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Page title & category filter bar */}
          <div className="border-b border-cream-deep pb-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-script text-3xl text-rose-dust md:text-4xl">{config.eyebrow}</p>
                <h1 className="mt-1 font-serif text-3xl font-medium text-ink sm:text-4xl md:text-5xl">
                  {activeTitle}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {activeDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <AddImageButton
                  path={imagePath}
                  label={selectedItem ? `Add ${selectedItem.name} photo` : `Add ${config.eyebrow} photo`}
                  categoryLabel={config.title}
                  subcategoryLabel={selectedItem?.name}
                />
                <a
                  href="/#contact"
                  onClick={(e) => navigateTo('/#contact', e)}
                  className="inline-flex bg-rose-dust px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-rose-deep"
                >
                  {config.ctaLabel}
                </a>
              </div>
            </div>

            {/* Category filter pills */}
            <nav
              aria-label={`${config.title} categories`}
              className="mt-7 flex flex-wrap items-center gap-2"
            >
              <a
                href={`/${config.id}`}
                onClick={(e) => navigateTo(`/${config.id}`, e)}
                aria-current={!selectedItem ? 'page' : undefined}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  !selectedItem
                    ? 'bg-rose-dust text-cream'
                    : 'border border-cream-deep bg-blush text-ink-muted hover:border-rose-dust/60 hover:text-ink'
                }`}
              >
                {config.allLabel}
              </a>

              {config.items.map((item) => {
                const isActive = selectedItem?.id === item.id
                return (
                  <a
                    key={item.id}
                    href={`/${config.id}/${item.id}`}
                    onClick={(e) => navigateTo(`/${config.id}/${item.id}`, e)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                      isActive
                        ? 'bg-rose-dust text-cream'
                        : 'border border-cream-deep bg-blush text-ink-muted hover:border-rose-dust/60 hover:text-ink'
                    }`}
                  >
                    {item.name}
                  </a>
                )
              })}
            </nav>
          </div>

          {/* Mosaic Image Grid Section (Matching Reference Layout) */}
          <section className="mt-8 md:mt-10" aria-label="Category photo mosaic">
            <AnimatePresence mode="wait">
              <motion.div
                key={imagePath}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {images.length > 0 ? (
                  <BentoImageGrid
                    images={images}
                    categoryLabel={categoryLabel}
                    unlocked={unlocked}
                    isAdded={isAdded}
                    onRemove={remove}
                  />
                ) : (
                  <div className="border border-dashed border-cream-deep bg-blush/50 px-6 py-20 text-center">
                    <p className="font-serif text-2xl text-ink">
                      {categoryLabel} gallery coming soon
                    </p>
                    <p className="mt-2 text-sm text-ink-muted">
                      {unlocked
                        ? 'Use the Add photo button above to upload or paste a Cloudinary URL.'
                        : 'We are curating photographs from this destination.'}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>

          {/* More Destinations / Honeymoon Categories to Explore */}
          <section className="mt-20 border-t border-cream-deep pt-14">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-script text-2xl text-rose-dust md:text-3xl">Keep exploring</p>
                <h2 className="mt-1 font-serif text-2xl font-medium text-ink md:text-3xl">
                  {section === 'honeymoon'
                    ? 'More Honeymoon Destinations'
                    : 'More Wedding Destinations'}
                </h2>
              </div>
              {selectedItem && (
                <a
                  href={`/${config.id}`}
                  onClick={(e) => navigateTo(`/${config.id}`, e)}
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-dust transition hover:text-ink"
                >
                  View {config.allLabel} →
                </a>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherItems.slice(0, 3).map((item) => (
                <a
                  key={item.id}
                  href={`/${config.id}/${item.id}`}
                  onClick={(e) => navigateTo(`/${config.id}/${item.id}`, e)}
                  className="group relative block overflow-hidden border border-cream-deep bg-blush"
                >
                  <img
                    src={item.image}
                    alt={`${item.name} — ${config.title}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover object-center transition duration-700 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-medium text-ink">{item.name}</h3>
                    <p className="mt-1 text-xs leading-snug text-ink-muted line-clamp-2">{item.text}</p>
                    <span className="mt-2.5 inline-block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-rose-dust transition group-hover:tracking-[0.2em]">
                      Open {item.name} Gallery →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      <ContactFooter />
      <MobileCta />
    </div>
  )
}
