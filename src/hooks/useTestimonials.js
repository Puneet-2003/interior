import { useCallback, useEffect, useSyncExternalStore } from 'react'
import {
  addTestimonial,
  getTestimonialsSnapshot,
  isCustomTestimonial,
  loadTestimonials,
  removeTestimonial,
  subscribeTestimonials,
} from '../data/testimonialStore'

export function useTestimonials() {
  const serialized = useSyncExternalStore(
    subscribeTestimonials,
    getTestimonialsSnapshot,
    getTestimonialsSnapshot,
  )
  const { loaded, items } = JSON.parse(serialized)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const add = useCallback((payload) => addTestimonial(payload), [])

  // Called straight from an onClick, so failure resolves false rather than
  // rejecting. The store puts the testimonial back if the delete fails.
  const remove = useCallback(async (id) => {
    try {
      await removeTestimonial(id)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }, [])

  const isCustom = useCallback((id) => isCustomTestimonial(id), [])

  return { items, loaded, add, remove, isCustom }
}
