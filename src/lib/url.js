export function isValidUrl(value) {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Optimizes Cloudinary media URLs with automatic WebP/AVIF format,
 * perceptual quality compression, and width bounding to avoid loading
 * 3000-4000px raw images on cards and mobile viewports.
 */
export function optimizeCloudinary(url, options = {}) {
  if (!url || typeof url !== 'string') return url
  if (!url.includes('res.cloudinary.com')) return url
  if (url.includes('/f_auto') || url.includes('/q_auto')) return url

  const { width = 800, quality = 'auto', format = 'auto' } = options
  const parts = []
  if (format) parts.push(`f_${format}`)
  if (quality) parts.push(`q_${quality}`)
  if (width) parts.push(`w_${width}`)
  const transform = parts.join(',')

  if (url.includes('/image/upload/')) {
    return url.replace('/image/upload/', `/image/upload/${transform}/`)
  }

  return url
}
