import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { isVideoUrl } from '../data/images'
import { optimizeCloudinary } from '../lib/url'

/**
 * Returns the responsive grid span classes for each position in the 7-image
 * editorial mosaic block matching the reference design:
 *
 * Desktop (4 columns × 3 rows per 7-image block, grid-auto-flow: dense):
 *   [0: 2x2][0: 2x2][1: 1x1][2: 1x1]
 *   [0: 2x2][0: 2x2][3: 1x2][4: 1x2]
 *   [5: 1x1][6: 1x1][3: 1x2][4: 1x2]
 *
 * Mobile / Small screens (2 columns × 6 rows per 7-image block, grid-auto-flow: dense):
 *   [0: 2x2][0: 2x2]
 *   [0: 2x2][0: 2x2]
 *   [1: 1x1][2: 1x1]
 *   [3: 1x2][4: 1x2]
 *   [3: 1x2][4: 1x2]
 *   [5: 1x1][6: 1x1]
 */
function getMosaicSpanClass(index) {
  const slot = index % 7
  switch (slot) {
    case 0:
      // Top-left large portrait feature image (2 columns wide, 4 rows tall on desktop)
      return 'col-span-2 row-span-3 md:row-span-4'
    case 1:
    case 2:
      // Top-right pair of portrait images (1 column wide, 3 rows tall on desktop)
      return 'col-span-1 row-span-2 md:row-span-3'
    case 3:
    case 4:
      // Bottom-right pair of portrait images (1 column wide, 3 rows tall on desktop)
      return 'col-span-1 row-span-2 md:row-span-3'
    case 5:
    case 6:
    default:
      // Bottom-left pair of portrait images under the 2x4 feature (1 column wide, 2 rows tall on desktop)
      return 'col-span-1 row-span-2 md:row-span-2'
  }
}

export function BentoImageGrid({
  images = [],
  categoryLabel = 'Gallery',
  unlocked = false,
  isAdded,
  onRemove,
}) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % images.length))
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + images.length) % images.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, images.length])

  if (!images.length) return null

  const activeMedia = lightboxIndex !== null ? images[lightboxIndex] : null

  return (
    <>
      <div
        className="grid grid-flow-dense grid-cols-2 gap-2.5 auto-rows-[115px] sm:gap-3.5 sm:auto-rows-[160px] md:grid-cols-4 md:gap-3.5 md:auto-rows-[105px] lg:gap-4 lg:auto-rows-[130px] xl:auto-rows-[155px]"
        role="region"
        aria-label={`${categoryLabel} photo gallery`}
      >
        {images.map((src, i) => {
          const spanClass = getMosaicSpanClass(i)
          const isLarge = i % 7 === 0
          const isTall = i % 7 >= 1 && i % 7 <= 4
          const isVideo = isVideoUrl(src)
          const optimizedWidth = isLarge ? 1200 : isTall ? 800 : 700

          return (
            <motion.figure
              key={`${src}-${i}`}
              initial={{ opacity: 0, scale: 0.97, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: Math.min(i * 0.05, 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative m-0 overflow-hidden bg-blush ${spanClass}`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`View ${categoryLabel} photo ${i + 1} in full screen`}
                className="block h-full w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-dust"
              >
                {isVideo ? (
                  <video
                    src={src}
                    className="block h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={optimizeCloudinary(src, { width: optimizedWidth })}
                    alt={`${categoryLabel} celebration moment ${i + 1} — Dream City Events Gwalior`}
                    loading={i < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="block h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                )}

                {/* Subtle editorial hover vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-cream/85 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-ink opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
                  {categoryLabel}
                </span>
              </button>

              {unlocked && isAdded?.(src) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemove?.(src)
                  }}
                  className="absolute right-2.5 top-2.5 z-10 bg-cream/85 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-ink opacity-0 transition hover:bg-rose-dust hover:text-cream group-hover:opacity-100 focus:opacity-100"
                >
                  Remove
                </button>
              )}
            </motion.figure>
          )
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-cream/95 p-4 backdrop-blur-md md:p-8"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${categoryLabel} image viewer`}
          >
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 md:px-8">
              <p className="font-serif text-sm uppercase tracking-[0.2em] text-ink-muted">
                {categoryLabel} —{' '}
                <span className="text-rose-dust">
                  {lightboxIndex + 1} / {images.length}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close full screen viewer"
                className="border border-cream-deep bg-blush/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition hover:border-rose-dust hover:text-rose-dust"
              >
                Close ✕
              </button>
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-cream-deep bg-blush/85 text-xl text-ink transition hover:border-rose-dust hover:text-rose-dust md:left-6"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((prev) => (prev + 1) % images.length)
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-cream-deep bg-blush/85 text-xl text-ink transition hover:border-rose-dust hover:text-rose-dust md:right-6"
                >
                  ›
                </button>
              </>
            )}

            <motion.div
              key={activeMedia}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[82svh] max-w-5xl overflow-hidden border border-cream-deep bg-blush shadow-[0_25px_70px_rgba(0,0,0,0.75)]"
            >
              {isVideoUrl(activeMedia) ? (
                <video
                  src={activeMedia}
                  className="max-h-[82svh] w-auto max-w-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={optimizeCloudinary(activeMedia, { width: 1600 })}
                  alt={`${categoryLabel} full view ${lightboxIndex + 1}`}
                  className="max-h-[82svh] w-auto max-w-full object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
