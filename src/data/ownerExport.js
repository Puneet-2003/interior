import { getAddedImages } from './images'
import { getCustomTestimonials } from './testimonialStore'

/**
 * Owner-panel additions live in localStorage, so they are only visible in the
 * browser that created them. These helpers turn them into source code that can
 * be committed to src/data/images.js and src/data/testimonials.js — that is what
 * makes them appear for visitors on the deployed site.
 */

function quote(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

function imageBlocks() {
  return Object.entries(getAddedImages())
    .filter(([, urls]) => Array.isArray(urls) && urls.length > 0)
    .map(([path, urls]) => {
      const lines = urls.map((url) => `  ${quote(url)},`).join('\n')
      return `// ${path}\n${lines}`
    })
}

function testimonialBlock() {
  return getCustomTestimonials().map(
    (t) => `  {
    id: ${quote(t.id)},
    quote: ${quote(t.quote)},
    names: ${quote(t.names)},
    date: ${quote(t.date)},
    imageUrl: ${quote(t.imageUrl || '')},
  },`,
  )
}

export function countPending() {
  const images = Object.values(getAddedImages()).reduce(
    (sum, urls) => sum + (Array.isArray(urls) ? urls.length : 0),
    0,
  )
  return { images, testimonials: getCustomTestimonials().length }
}

/** Pasteable code for everything added on this browser. */
export function buildExportText() {
  const images = imageBlocks()
  const testimonials = testimonialBlock()

  if (!images.length && !testimonials.length) return ''

  const parts = []

  if (images.length) {
    parts.push(
      [
        '/* ---- src/data/images.js ----',
        ' * Paste each group of URLs into the array that matches its path comment.',
        ' */',
        '',
        images.join('\n\n'),
      ].join('\n'),
    )
  }

  if (testimonials.length) {
    parts.push(
      [
        '/* ---- src/data/testimonials.js ----',
        ' * Paste inside the defaultTestimonials array.',
        ' */',
        '',
        testimonials.join('\n'),
      ].join('\n'),
    )
  }

  return parts.join('\n\n\n')
}
