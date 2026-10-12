import { defaultTestimonials } from './testimonials'

/**
 * Testimonials are saved in localStorage for zero-latency instant rendering.
 * ZERO runtime dependency on external Supabase databases on page load.
 */

const STORAGE_KEY = 'dhi-testimonials'
const REMOVED_KEY = 'dhi-testimonials-removed'
const EVENT = 'dhi-testimonials-change'

function readMirror(key = STORAGE_KEY) {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

let extras = readMirror(STORAGE_KEY)
let removedIds = readMirror(REMOVED_KEY)

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

function setRemovedIds(ids) {
  removedIds = ids
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(REMOVED_KEY, JSON.stringify(ids))
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
  return Promise.resolve(getAllTestimonials())
}

export function areTestimonialsLoaded() {
  return true
}

/** Everything published from source, plus everything saved locally */
export function getAllTestimonials() {
  const visibleDefaults = defaultTestimonials.filter((t) => !removedIds.includes(t.id))
  return [...extras, ...visibleDefaults]
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

export async function addTestimonial({ quote, names, date, imageUrl, event, keywordTag }) {
  const record = {
    id: `custom-${Date.now()}`,
    names: names.trim(),
    quote: quote.trim(),
    event: event?.trim() || 'Luxury Wedding & Event Celebration — Gwalior',
    keywordTag: keywordTag?.trim() || 'Dream City Events Gwalior',
    date: date?.trim() || formatToday(),
    rating: 5,
    imageUrl: imageUrl?.trim() || '',
    custom: true,
  }

  setExtras([record, ...extras])
  return getAllTestimonials()
}

export async function removeTestimonial(id) {
  if (extras.some((t) => t.id === id)) {
    const next = extras.filter((t) => t.id !== id)
    setExtras(next)
  } else if (!removedIds.includes(id)) {
    setRemovedIds([...removedIds, id])
  }
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
