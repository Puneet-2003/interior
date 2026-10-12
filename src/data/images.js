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

import { image, images, toImageList, getCoverImage } from './image'

export { image, images, toImageList, getCoverImage }

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

function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function buildCategoryDefaults(sourceObj = {}) {
  const result = {}
  if (!sourceObj || typeof sourceObj !== 'object') return result
  for (const [key, value] of Object.entries(sourceObj)) {
    const kebab = toKebabCase(key)
    const list = toImageList(value)
    result[kebab] = list
  }
  return result
}

/** Keys match functionCategories item ids in functions.js, sourced directly from image.js */
const weddingDefaults = buildCategoryDefaults(images.functions?.wedding)

/** Baby & family events category, sourced directly from image.js */
const babyDefaults = buildCategoryDefaults(images.functions?.baby)

/** Religious events category, sourced directly from image.js */
const religiousDefaults = buildCategoryDefaults(images.functions?.religious)

/** Destination wedding categories — sourced directly from images.destinations in image.js */
const destinationsDefaults = buildCategoryDefaults(images.destinations)

/** Honeymoon destination categories — sourced directly from images.honeymoon in image.js */
const honeymoonDefaults = buildCategoryDefaults(images.honeymoon)

/** Default Cloudinary-ready image arrays keyed by page/section id */
export const pageImages = {
  home: {
    hero: toImageList(images.hero),
    about: toImageList(images.about),
  },
  functions: {
    wedding: weddingDefaults,
    baby: babyDefaults,
    religious: religiousDefaults,
  },
  destinations: destinationsDefaults,
  honeymoon: honeymoonDefaults,
  stories: toImageList(images.instagram || images.gallery || images.stories),
  testimonials: toImageList(images.testimonials),
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
    cur = Array.isArray(cur) ? cur : (cur[p] ?? cur[toKebabCase(p)])
  }
  return Array.isArray(cur) ? [...cur] : []
}

/**
 * Collect overview images for a category path like "functions.wedding",
 * "destinations", or "honeymoon" by gathering images from each subcategory.
 */
export function getCategoryOverviewImages(categoryPath, limit = 14) {
  const parts = categoryPath.split('.')
  let cur = pageImages
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return []
    cur = Array.isArray(cur) ? cur : (cur[p] ?? cur[toKebabCase(p)])
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
    cur = Array.isArray(cur) ? cur : (cur[p] ?? cur[toKebabCase(p)])
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
