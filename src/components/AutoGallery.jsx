import { useEffect, useState } from 'react'

/**
 * Infinite auto-scrolling image strip. Pauses on hover / focus / reduced motion.
 */
export function AutoGallery({
  images,
  label,
  unlocked = false,
  isAdded,
  onRemove,
}) {
  const [paused, setPaused] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (!images?.length) return null

  // Pad short lists so the strip always feels full
  const base =
    images.length >= 4
      ? images
      : Array.from({ length: Math.ceil(4 / images.length) }, () => images)
          .flat()
          .slice(0, 4)

  const duration = Math.max(24, base.length * 6)

  const renderSet = (copyIndex, interactive) => (
    <div
      className="flex shrink-0 gap-4 pr-4 md:gap-5 md:pr-5"
      aria-hidden={copyIndex > 0 ? true : undefined}
    >
      {base.map((src, i) => (
        <figure
          key={`${copyIndex}-${src}-${i}`}
          className="relative aspect-[3/4] w-[min(78vw,340px)] shrink-0 overflow-hidden rounded-2xl sm:w-[300px] md:w-[340px] lg:w-[380px]"
        >
          <img
            src={src}
            alt={copyIndex === 0 ? `${label} ${i + 1}` : ''}
            className="h-full w-full object-cover"
            draggable={false}
            loading={copyIndex === 0 && i < 4 ? 'eager' : 'lazy'}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/35 to-transparent p-3 pt-12">
            <span className="inline-block bg-white px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink">
              {label}
            </span>
          </div>
          {interactive && unlocked && isAdded?.(src) && (
            <button
              type="button"
              onClick={() => onRemove?.(src)}
              className="absolute right-2 top-2 z-10 bg-ink/70 px-2 py-1 text-[0.6rem] uppercase tracking-wider text-white opacity-0 transition group-hover/gallery:opacity-100 focus:opacity-100"
            >
              Remove
            </button>
          )}
        </figure>
      ))}
    </div>
  )

  return (
    <div
      className="auto-gallery group/gallery relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
    >
      <div className="overflow-hidden">
        <div
          className="auto-gallery__track flex w-max"
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: paused || prefersReduced ? 'paused' : 'running',
          }}
          aria-label={`${label} gallery, auto-scrolling`}
        >
          {renderSet(0, true)}
          {renderSet(1, false)}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-blush to-transparent md:w-12"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-blush to-transparent md:w-12"
        aria-hidden
      />
    </div>
  )
}
