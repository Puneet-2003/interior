import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import {
  addImage,
  areImagesLoaded,
  getImages,
  isUserAdded,
  loadImages,
  removeAddedImage,
} from '../data/images'
import { uploadMedia } from '../lib/uploadMedia'
import { isValidUrl } from '../lib/url'

function subscribe(callback) {
  window.addEventListener('storage', callback)
  window.addEventListener('dhi-images-change', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('dhi-images-change', callback)
  }
}

function getSnapshot(path) {
  return JSON.stringify({ loaded: areImagesLoaded(), images: getImages(path) })
}

/** Live list of images for a page section path (e.g. "stories", "home.hero"). */
export function usePageImages(path) {
  const serialized = useSyncExternalStore(
    subscribe,
    () => getSnapshot(path),
    () => getSnapshot(path),
  )
  const { loaded, images } = JSON.parse(serialized)

  useEffect(() => {
    loadImages()
  }, [])

  const add = useCallback((url) => addImage(path, url), [path])

  // Remove is wired to bare onClick handlers, so it reports failure by
  // resolving false instead of rejecting. The store restores the image itself.
  const remove = useCallback(
    async (url) => {
      try {
        await removeAddedImage(path, url)
        return true
      } catch (err) {
        console.error(err)
        return false
      }
    },
    [path],
  )

  const addFile = useCallback(
    async (file) => {
      const url = await uploadMedia(file, path)
      await addImage(path, url)
      return url
    },
    [path],
  )

  const isAdded = useCallback((url) => isUserAdded(path, url), [path])

  return { images, loaded, add, remove, addFile, isAdded }
}

export function useAddImageForm(path) {
  const { add, addFile } = usePageImages(path)
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e?.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) {
      setError('Paste an image URL, or choose a file to upload.')
      return
    }
    if (!isValidUrl(trimmed)) {
      setError('Enter a valid URL.')
      return
    }

    setBusy(true)
    setError('')
    try {
      await add(trimmed)
      setUrl('')
      setOpen(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const pickFile = async (file) => {
    if (!file) return
    setBusy(true)
    setError('')
    try {
      await addFile(file)
      setUrl('')
      setOpen(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return { open, setOpen, url, setUrl, error, busy, submit, pickFile }
}
