import { defaultTestimonials } from './testimonials'

/**
 * Testimonials are saved in localStorage for zero-latency instant rendering.
 * ZERO runtime dependency on external Supabase databases on page load.
 */

const STORAGE_KEY = 'dhi-testimonials'
const EVENT = 'dhi-testimonials-change'

function fromRow(row) {
  return {
    id: row.id,
    quote: row.quote ?? '',
    names: row.names ?? '',
    date: row.event_date ?? row.date ?? '',
    imageUrl: row.image_url ?? row.imageUrl ?? '',
    custom: true,
  }
}

function readMirror() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

let extras = readMirror()

function setExtras(list) {
  extras = list
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch {
      // Private browsing or quota limits
    }
    window.dispatchEvent(new Event(EVENT))
  }
}

/**
 * Instant synchronous return of testimonials.
 * ZERO network requests on page load.
 */
export function loadTestimonials() {
  return Promise.resolve(extras)
}

export function areTestimonialsLoaded() {
  return true
}

/** Everything published from source, plus everything saved locally */
export function getAllTestimonials() {
  return [...extras, ...defaultTestimonials]
}

export function getCustomTestimonials() {
  return extras
}

function formatToday() {
  return new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export async function addTestimonial({ quote, names, date, imageUrl }) {
  const record = {
    id: `custom-${Date.now()}`,
    names: names.trim(),
    quote: quote.trim(),
    date: date?.trim() || formatToday(),
    imageUrl: imageUrl?.trim() || '',
    custom: true,
  }

  setExtras([record, ...extras])
  return getAllTestimonials()
}

export async function removeTestimonial(id) {
  const next = extras.filter((t) => t.id !== id)
  setExtras(next)
  return getAllTestimonials()
}

export function isCustomTestimonial(id) {
  return extras.some((t) => t.id === id)
}

export function subscribeTestimonials(cb) {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener(EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}

export function getTestimonialsSnapshot() {
  return JSON.stringify({ loaded: true, items: getAllTestimonials() })
}
