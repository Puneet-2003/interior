import { useCallback, useSyncExternalStore } from 'react'
import {
  addTestimonial,
  getTestimonialsSnapshot,
  isCustomTestimonial,
  removeTestimonial,
  subscribeTestimonials,
} from '../data/testimonialStore'

export function useTestimonials() {
  const serialized = useSyncExternalStore(
    subscribeTestimonials,
    getTestimonialsSnapshot,
    getTestimonialsSnapshot,
  )
  const items = JSON.parse(serialized)

  const add = useCallback((payload) => {
    addTestimonial(payload)
  }, [])

  const remove = useCallback((id) => {
    removeTestimonial(id)
  }, [])

  const isCustom = useCallback((id) => isCustomTestimonial(id), [])

  return { items, add, remove, isCustom }
}
