import { useCallback, useState, useSyncExternalStore } from 'react'
import { addImage, getImages, isUserAdded, removeAddedImage } from '../data/images'

function subscribe(callback) {
  window.addEventListener('storage', callback)
  window.addEventListener('dhi-images-change', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('dhi-images-change', callback)
  }
}

function getSnapshot(path) {
  return JSON.stringify(getImages(path))
}

function notify() {
  window.dispatchEvent(new Event('dhi-images-change'))
}

/** Live list of Cloudinary/CDN images for a page section path (e.g. "stories", "home.hero"). */
export function usePageImages(path) {
  const serialized = useSyncExternalStore(
    subscribe,
    () => getSnapshot(path),
    () => JSON.stringify(getImages(path)),
  )
  const images = JSON.parse(serialized)

  const add = useCallback(
    (url) => {
      addImage(path, url)
      notify()
    },
    [path],
  )

  const remove = useCallback(
    (url) => {
      removeAddedImage(path, url)
      notify()
    },
    [path],
  )

  const isAdded = useCallback((url) => isUserAdded(path, url), [path])

  return { images, add, remove, isAdded }
}

export function useAddImageForm(path) {
  const { add } = usePageImages(path)
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e?.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) {
      setError('Paste a Cloudinary or image URL.')
      return
    }
    try {
      // eslint-disable-next-line no-new
      new URL(trimmed)
    } catch {
      setError('Enter a valid URL.')
      return
    }
    add(trimmed)
    setUrl('')
    setError('')
    setOpen(false)
  }

  return { open, setOpen, url, setUrl, error, submit }
}
