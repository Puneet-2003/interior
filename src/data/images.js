/**
 * Cloudinary (or CDN) image URL arrays per page/section.
 * Replace any URL with your Cloudinary delivery links, e.g.
 * https://res.cloudinary.com/<cloud_name>/image/upload/v123/folder/photo.jpg
 *
 * Functions use category + subcategory:
 *   functions.wedding.haldi
 *   functions.baby.mehendi
 *   functions.religious.mata-ki-chowki
 *
 * Extra URLs added via the UI are stored in localStorage and merged at runtime.
 */

export const STORAGE_KEY = 'dhi-cloudinary-images'

const VIDEO_EXTENSION = /\.(mp4|webm|ogv|mov|m4v)(\?|#|$)/i
const IMAGE_EXTENSION = /\.(gif|jpe?g|png|webp|avif|svg)(\?|#|$)/i

/** True for playable video sources (GIFs stay images — they animate on their own). */
export function isVideoUrl(url) {
  if (typeof url !== 'string' || !url) return false
  if (IMAGE_EXTENSION.test(url)) return false
  return VIDEO_EXTENSION.test(url) || url.includes('/video/upload/')
}

/** Keys must match functionCategories item ids in functions.js */
const weddingDefaults = {
  'engagement-ring-ceremony': [
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785320822/Celebrations25_Festive25_WeddingWire2026_n3bd94.jpg',
  ],
  'mehendi-haldi': [
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321040/Flower_themed_Haldi___Haldi_Ideas___Haldi_Inspo___yh7xnc.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321039/download_rxyp1x.jpg',
  ],
  'wedding-ceremony': [
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321038/Indian_Wedding_Phere_rwge20.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321706/marriage_talambralu_swh01f.jpg',
  ],
  'baraat-reception': [
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321706/Wedding_Photography_feuc26.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321706/download_2_a80bce.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321706/download_vadwhi.jpg',
  ],
}

/** Empty until real photographs are available — the UI shows a "coming soon" panel. */
const babyDefaults = {
  'baby-shower-godh-bharai': [],
  'naming-ceremony-naamkaran': [],
}

const religiousDefaults = {
  'satyanarayan-katha': [],
  'bhagwat-katha': [],
  'sundarkand-path': [],
}

/** Default Cloudinary-ready image arrays keyed by page/section id */
export const pageImages = {
  home: {
    hero: [
      // Direct video delivery URL (not the player embed page).
      'https://res.cloudinary.com/ddelf4odl/video/upload/v1785309210/15157499-hd_1920_1080_25fps_umckg8.mp4',
      // Poster image while the video loads:
      'https://res.cloudinary.com/ddelf4odl/image/upload/v1785307075/Bride_says_-_The_internet_brought_us_together_destiny_did_the_rest__From_whispered_mentions_by_mutual_friends_to_a_bond_that_felt_just_right_-_every_little_sign_led_us_here__t_f_On_this_day_we_celebrated_love_laugh_srmaa6.jpg',
    ],
    about: [
      'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321038/Indian_Wedding_Phere_rwge20.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/v1785320822/Celebrations25_Festive25_WeddingWire2026_n3bd94.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321040/Flower_themed_Haldi___Haldi_Ideas___Haldi_Inspo___yh7xnc.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321039/download_rxyp1x.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321038/download_1_c1jc3u.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg'
      
    ],
  },
  functions: {
    wedding: weddingDefaults,
    baby: babyDefaults,
    religious: religiousDefaults,
  },
  stories: [
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321706/download_2_a80bce.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321706/download_vadwhi.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321706/marriage_talambralu_swh01f.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321706/download_1_v8uenc.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785321706/Wedding_Photography_feuc26.jpg',
  
  ],
  testimonials: [
    'https://res.cloudinary.com/ddelf4odl/image/upload/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
  ],
}

function readExtras() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeExtras(extras) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(extras))
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

/** Append a Cloudinary (or other) image URL to a section; returns updated list */
export function addImage(path, url) {
  const trimmed = url.trim()
  if (!trimmed) return getImages(path)
  const extras = readExtras()
  const list = Array.isArray(extras[path]) ? extras[path] : []
  if (!list.includes(trimmed) && !getDefaultImages(path).includes(trimmed)) {
    extras[path] = [...list, trimmed]
    writeExtras(extras)
  }
  return getImages(path)
}

export function removeAddedImage(path, url) {
  const extras = readExtras()
  const list = Array.isArray(extras[path]) ? extras[path] : []
  extras[path] = list.filter((u) => u !== url)
  writeExtras(extras)
  return getImages(path)
}

export function isUserAdded(path, url) {
  const extras = readExtras()
  return Array.isArray(extras[path]) && extras[path].includes(url)
}
