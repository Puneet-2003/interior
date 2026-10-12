import { useEffect, useState } from 'react'

const ROUTE_EVENT = 'dhi-route-change'

export function parseRoute(pathname = typeof window !== 'undefined' ? window.location.pathname : '/') {
  const clean = (pathname || '/').replace(/\/+$/, '') || '/'
  const parts = clean.split('/').filter(Boolean)

  if (parts[0] === 'destinations' || parts[0] === 'destination-wedding') {
    return {
      page: 'gallery',
      section: 'destinations',
      slug: parts[1] || null,
    }
  }

  if (parts[0] === 'honeymoon' || parts[0] === 'honeymoons') {
    return {
      page: 'gallery',
      section: 'honeymoon',
      slug: parts[1] || null,
    }
  }

  return {
    page: 'home',
    section: null,
    slug: null,
  }
}

export function navigateTo(target, event) {
  if (event) {
    // Allow standard browser behavior for new-tab / modified clicks
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
  }

  if (typeof window === 'undefined') return

  const url = new URL(target, window.location.origin)
  const nextPath = url.pathname + url.search + url.hash
  const currentPath = window.location.pathname + window.location.search + window.location.hash

  if (nextPath !== currentPath) {
    window.history.pushState({}, '', nextPath)
    window.dispatchEvent(new Event(ROUTE_EVENT))
  }

  if (url.hash) {
    const id = url.hash.slice(1)
    // Wait a frame in case we just switched back to the home page
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 40)
    })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseRoute())

  useEffect(() => {
    const handleChange = () => {
      setRoute(parseRoute(window.location.pathname))
    }

    window.addEventListener('popstate', handleChange)
    window.addEventListener(ROUTE_EVENT, handleChange)
    return () => {
      window.removeEventListener('popstate', handleChange)
      window.removeEventListener(ROUTE_EVENT, handleChange)
    }
  }, [])

  return route
}
