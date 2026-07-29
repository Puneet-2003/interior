import { defaultTestimonials } from './testimonials'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

/**
 * Testimonials live in the Supabase `testimonials` table so they survive across
 * browsers and deploys. localStorage is only an offline mirror for fast paint.
 */

const STORAGE_KEY = 'dhi-testimonials'
const EVENT = 'dhi-testimonials-change'
const TABLE = 'testimonials'

function fromRow(row) {
  return {
    id: row.id,
    quote: row.quote ?? '',
    names: row.names ?? '',
    date: row.event_date ?? '',
    imageUrl: row.image_url ?? '',
    custom: true,
  }
}

function readMirror() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

let extras = readMirror()
let loaded = !isSupabaseConfigured
let inFlight = null

function setExtras(list) {
  extras = list
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // Private browsing or a full quota — the in-memory copy still works.
  }
  window.dispatchEvent(new Event(EVENT))
}

const COLUMNS = 'id, names, quote, event_date, image_url'

/**
 * First run against an empty table: copy up anything that was added back when
 * this browser was the only storage, so nothing disappears.
 */
async function copyMirrorToSupabase() {
  if (!extras.length) return []

  const pending = extras.map((t) => ({
    names: t.names ?? '',
    quote: t.quote ?? '',
    event_date: t.date ?? '',
    image_url: t.imageUrl ?? '',
  }))

  const { data, error } = await supabase.from(TABLE).insert(pending).select(COLUMNS)
  if (error) {
    console.error('Could not copy this browser’s testimonials into Supabase.', error)
    return null
  }
  return data ?? []
}

async function fetchTestimonials() {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select(COLUMNS)
      .order('created_at', { ascending: false })
    if (error) throw error

    const rows = data?.length ? data : await copyMirrorToSupabase()
    loaded = true
    setExtras(rows ? rows.map(fromRow) : extras)
  } catch (error) {
    console.error('Could not load testimonials from Supabase.', error)
  }
  return extras
}

/** Fetch every saved testimonial once per page load. */
export function loadTestimonials() {
  if (loaded || !isSupabaseConfigured) return Promise.resolve(extras)
  if (inFlight) return inFlight

  inFlight = fetchTestimonials().finally(() => {
    inFlight = null
  })

  return inFlight
}

export function areTestimonialsLoaded() {
  return loaded
}

/** Everything published from source, plus everything saved in the database. */
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
    names: names.trim(),
    quote: quote.trim(),
    event_date: date?.trim() || formatToday(),
    image_url: imageUrl?.trim() || '',
  }

  if (!isSupabaseConfigured) {
    setExtras([{ ...fromRow(record), id: `custom-${Date.now()}` }, ...extras])
    return getAllTestimonials()
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert(record)
    .select('id, names, quote, event_date, image_url')
    .single()

  if (error) throw new Error(`Could not save the testimonial: ${error.message}`)

  setExtras([fromRow(data), ...extras])
  return getAllTestimonials()
}

export async function removeTestimonial(id) {
  const previous = extras
  setExtras(previous.filter((t) => t.id !== id))

  if (isSupabaseConfigured) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id)
    if (error) {
      setExtras(previous)
      throw new Error(`Could not remove the testimonial: ${error.message}`)
    }
  }

  return getAllTestimonials()
}

export function isCustomTestimonial(id) {
  return extras.some((t) => t.id === id)
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
  return JSON.stringify({ loaded, items: getAllTestimonials() })
}
