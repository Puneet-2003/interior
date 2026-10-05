/**
 * Image data and section helpers for Dream City Events Gwalior.
 *
 * All image assets are powered by Cloudinary and defined canonically in ./image.js.
 * ZERO runtime dependency on Supabase for image storage or delivery.
 *
 * Functions use category + subcategory:
 *   functions.wedding.mehendi-haldi
 *   functions.baby.baby-shower-godh-bharai
 *   functions.religious.satyanarayan-katha
 *
 * Any images saved by the owner via the UI are persisted in localStorage for
 * instant, zero-latency delivery without external database network requests.
 */

import { image, images } from './image'

export { image, images }

export const STORAGE_KEY = 'dhi-cloudinary-images'
const EVENT = 'dhi-images-change'

const VIDEO_EXTENSION = /\.(mp4|webm|ogv|mov|m4v)(\?|#|$)/i
const IMAGE_EXTENSION = /\.(gif|jpe?g|png|webp|avif|svg)(\?|#|$)/i

/** True for playable video sources (GIFs stay images — they animate on their own). */
export function isVideoUrl(url) {
  if (typeof url !== 'string' || !url) return false
  if (IMAGE_EXTENSION.test(url)) return false
  return VIDEO_EXTENSION.test(url) || url.includes('/video/upload/')
}

/** Keys match functionCategories item ids in functions.js */
const weddingDefaults = {
  'engagement-ring-ceremony': [
    image.weddingBanner,
    image.festive,
  ],
  'mehendi-haldi': [
    image.haldi,
    image.decor,
  ],
  'wedding-ceremony': [
    image.phere,
    image.florals,
    image.talambralu,
  ],
  'baraat-reception': [
    image.photography,
    image.entry,
    image.stage,
  ],
}

/** Baby & family events category */
const babyDefaults = {
  'baby-shower-godh-bharai': [],
  'naming-ceremony-naamkaran': [],
}

/** Religious events category */
const religiousDefaults = {
  'satyanarayan-katha': [],
  'bhagwat-katha': [],
  'sundarkand-path': [],
}

/** Default Cloudinary-ready image arrays keyed by page/section id */
export const pageImages = {
  home: {
    hero: [
      // Web-friendly H.264 MP4 video delivery URL (compressed with q_auto, w_1280):
      image.heroVideo,
      // High-performance lightweight poster frame (~58 KB) extracted directly from the hero video:
      image.heroPoster,
    ],
    about: images.about,
  },
  functions: {
    wedding: weddingDefaults,
    baby: babyDefaults,
    religious: religiousDefaults,
  },
  stories: images.gallery,
  testimonials: images.testimonials,
}

function readMirror() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

let extrasCache = readMirror()

function readExtras() {
  return extrasCache
}

function setExtras(next) {
  extrasCache = next
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Private browsing or a full quota — in-memory copy still works
    }
    window.dispatchEvent(new Event(EVENT))
  }
}

/**
 * Returns instant synchronous cached images.
 * Zero network requests to Supabase or any remote database.
 */
export function loadImages() {
  return Promise.resolve(extrasCache)
}

export function areImagesLoaded() {
  return true
}

/** Flatten nested defaults for a path like "home.about" or "functions.wedding.haldi" */
export function getDefaultImages(path) {
  const parts = path.split('.')
  let cur = pageImages
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return []
    cur = Array.isArray(cur) ? cur : cur[p]
  }
  return Array.isArray(cur) ? [...cur] : []
}

/**
 * Collect overview images for a category path like "functions.wedding"
 * by gathering images from each subcategory (unique, capped).
 */
export function getCategoryOverviewImages(categoryPath, limit = 8) {
  const parts = categoryPath.split('.')
  let cur = pageImages
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return []
    cur = Array.isArray(cur) ? cur : cur[p]
  }
  if (Array.isArray(cur)) return cur.slice(0, limit)

  if (!cur || typeof cur !== 'object') return []

  const extras = readExtras()
  const collected = []
  const seen = new Set()

  for (const [subId, urls] of Object.entries(cur)) {
    const path = `${categoryPath}.${subId}`
    const added = Array.isArray(extras[path]) ? extras[path] : []
    const list = [...(Array.isArray(urls) ? urls : []), ...added]
    for (const url of list) {
      if (seen.has(url)) continue
      seen.add(url)
      collected.push(url)
      if (collected.length >= limit) return collected
    }
  }
  return collected
}

/** Resolve nested pageImages node for a dotted path */
function resolveNode(path) {
  const parts = path.split('.')
  let cur = pageImages
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return null
    cur = Array.isArray(cur) ? cur : cur[p]
  }
  return cur ?? null
}

/** Defaults + any user-added Cloudinary URLs for a section path */
export function getImages(path) {
  const extras = readExtras()
  const added = Array.isArray(extras[path]) ? extras[path] : []
  const node = resolveNode(path)

  // Category folder (object of subcategories): mosaic + any URLs saved on the category itself
  if (node && typeof node === 'object' && !Array.isArray(node)) {
    const overview = getCategoryOverviewImages(path)
    const seen = new Set(overview)
    const merged = [...overview]
    for (const url of added) {
      if (seen.has(url)) continue
      seen.add(url)
      merged.push(url)
    }
    return merged
  }

  const defaults = Array.isArray(node) ? [...node] : []
  return [...defaults, ...added]
}

/** Save an image URL for a section locally without Supabase dependency */
export async function addImage(path, url) {
  const trimmed = url.trim()
  if (!trimmed) return getImages(path)

  const previous = extrasCache
  const list = Array.isArray(previous[path]) ? previous[path] : []
  if (list.includes(trimmed) || getDefaultImages(path).includes(trimmed)) {
    return getImages(path)
  }

  setExtras({ ...previous, [path]: [...list, trimmed] })
  return getImages(path)
}

/** Remove an added image URL for a section */
export async function removeAddedImage(path, url) {
  const previous = extrasCache
  const list = Array.isArray(previous[path]) ? previous[path] : []
  setExtras({ ...previous, [path]: list.filter((u) => u !== url) })
  return getImages(path)
}

/** Everything added on this browser, keyed by section path */
export function getAddedImages() {
  return readExtras()
}

export function isUserAdded(path, url) {
  const extras = readExtras()
  return Array.isArray(extras[path]) && extras[path].includes(url)
}
