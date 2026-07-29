import { defaultTestimonials } from '../data/testimonials'

const STORAGE_KEY = 'dhi-testimonials'
const EVENT = 'dhi-testimonials-change'

function readExtras() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeExtras(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  window.dispatchEvent(new Event(EVENT))
}

export function getAllTestimonials() {
  return [...defaultTestimonials, ...readExtras()]
}

export function addTestimonial({ quote, names, date, imageUrl }) {
  const extras = readExtras()
  const entry = {
    id: `custom-${Date.now()}`,
    quote: quote.trim(),
    names: names.trim(),
    date: date.trim() || new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    imageUrl: imageUrl?.trim() || '',
    custom: true,
  }
  writeExtras([...extras, entry])
  return getAllTestimonials()
}

export function removeTestimonial(id) {
  writeExtras(readExtras().filter((t) => t.id !== id))
  return getAllTestimonials()
}

export function isCustomTestimonial(id) {
  return readExtras().some((t) => t.id === id)
}

export function subscribeTestimonials(cb) {
  window.addEventListener(EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}

export function getTestimonialsSnapshot() {
  return JSON.stringify(getAllTestimonials())
}
