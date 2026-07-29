import { useRef, useState, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOwnerMode } from '../hooks/useOwnerMode'
import { usePageImages } from '../hooks/usePageImages'
import { useTestimonials } from '../hooks/useTestimonials'
import { imageSectionGroups, imageSectionOptions } from '../data/imageSections'
import { getAddedImages } from '../data/images'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { uploadMedia } from '../lib/uploadMedia'
import { isValidUrl } from '../lib/url'

const FIELD =
  'mt-1.5 w-full border border-cream-deep bg-cream px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-ink outline-none placeholder:text-ink-muted/60 focus:border-rose-dust'

const LABEL =
  'block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-muted'

const BUTTON =
  'w-full bg-rose-dust px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-rose-deep disabled:cursor-not-allowed disabled:opacity-60'

function FilePicker({ label, busy, onPick, accept = 'image/*,video/*' }) {
  const inputRef = useRef(null)

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          e.target.value = ''
          if (file) onPick(file)
        }}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="w-full border border-rose-dust/50 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition hover:border-rose-dust hover:bg-blush disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? 'Uploading…' : label}
      </button>
    </div>
  )
}

function AddImagePanel({ onDone }) {
  const [path, setPath] = useState(imageSectionOptions[0].path)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const { add, addFile } = usePageImages(path)

  const run = async (task) => {
    setBusy(true)
    setError('')
    try {
      await task()
      setUrl('')
      onDone?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const submit = (e) => {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) {
      setError('Paste an image URL, or upload a file below.')
      return
    }
    if (!isValidUrl(trimmed)) {
      setError('Enter a valid URL.')
      return
    }
    run(() => add(trimmed))
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className={LABEL}>
        Section
        <select
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className={FIELD}
        >
          {imageSectionGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((opt) => (
                <option key={opt.path} value={opt.path}>
                  {opt.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <FilePicker
        label="Upload from this device"
        busy={busy}
        onPick={(file) => run(() => addFile(file))}
      />

      <p className="text-center text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
        or paste a link
      </p>

      <label className={LABEL}>
        Image URL
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://res.cloudinary.com/..."
          className={FIELD}
        />
      </label>
      {error && <p className="text-xs text-rose-700">{error}</p>}
      <button type="submit" disabled={busy} className={BUTTON}>
        {busy ? 'Saving…' : 'Save image'}
      </button>
    </form>
  )
}

function AddTestimonialPanel({ onDone }) {
  const { add } = useTestimonials()
  const [form, setForm] = useState({ names: '', quote: '', date: '', imageUrl: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const pickPhoto = async (file) => {
    setUploading(true)
    setError('')
    try {
      const publicUrl = await uploadMedia(file, 'testimonials')
      setForm((f) => ({ ...f, imageUrl: publicUrl }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!form.names.trim() || !form.quote.trim()) {
      setError('Name and quote are required.')
      return
    }
    if (form.imageUrl.trim() && !isValidUrl(form.imageUrl.trim())) {
      setError('Image URL is not valid.')
      return
    }

    setBusy(true)
    setError('')
    try {
      await add(form)
      setForm({ names: '', quote: '', date: '', imageUrl: '' })
      onDone?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className={LABEL}>
        Names
        <input
          name="names"
          value={form.names}
          onChange={onChange}
          placeholder="Priya & Rohan"
          className={FIELD}
        />
      </label>
      <label className={LABEL}>
        Quote
        <textarea
          name="quote"
          value={form.quote}
          onChange={onChange}
          rows={4}
          placeholder="Their kind words…"
          className={`${FIELD} resize-y`}
        />
      </label>
      <label className={LABEL}>
        Date
        <input
          name="date"
          value={form.date}
          onChange={onChange}
          placeholder="12 June 2025"
          className={FIELD}
        />
      </label>

      <FilePicker
        label={form.imageUrl ? 'Replace photo' : 'Upload their photo'}
        busy={uploading}
        accept="image/*"
        onPick={pickPhoto}
      />

      <label className={LABEL}>
        Photo URL (optional)
        <input
          name="imageUrl"
          type="url"
          value={form.imageUrl}
          onChange={onChange}
          placeholder="https://res.cloudinary.com/..."
          className={FIELD}
        />
      </label>
      {error && <p className="text-xs text-rose-700">{error}</p>}
      <button type="submit" disabled={busy || uploading} className={BUTTON}>
        {busy ? 'Saving…' : 'Save testimonial'}
      </button>
    </form>
  )
}

function subscribeImages(callback) {
  window.addEventListener('dhi-images-change', callback)
  return () => window.removeEventListener('dhi-images-change', callback)
}

function countAddedImages() {
  return String(
    Object.values(getAddedImages()).reduce(
      (sum, urls) => sum + (Array.isArray(urls) ? urls.length : 0),
      0,
    ),
  )
}

function StatusPanel() {
  const imageCount = Number(
    useSyncExternalStore(subscribeImages, countAddedImages, countAddedImages),
  )
  const { items, loaded } = useTestimonials()

  if (!isSupabaseConfigured) {
    return (
      <p className="text-xs leading-relaxed text-ink-muted">
        Not connected to the database yet, so anything you add stays in this browser only. Add{' '}
        <span className="font-mono text-[0.7rem]">VITE_SUPABASE_URL</span> and{' '}
        <span className="font-mono text-[0.7rem]">VITE_SUPABASE_ANON_KEY</span> to{' '}
        <span className="font-mono text-[0.7rem]">.env.local</span> and restart the site.
      </p>
    )
  }

  return (
    <div className="space-y-3 text-xs leading-relaxed text-ink-muted">
      <p className="flex items-center gap-2 font-semibold uppercase tracking-[0.12em] text-ink">
        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
        Saving to the database
      </p>
      <p>
        {imageCount} image{imageCount === 1 ? '' : 's'} and {items.length} testimonial
        {items.length === 1 ? '' : 's'} are stored online
        {loaded ? '' : ' (still loading…)'}. Everything you add here appears for every visitor
        straight away — no publishing step needed.
      </p>
    </div>
  )
}

export function OwnerPanel() {
  const { unlocked, lock } = useOwnerMode()
  const [tab, setTab] = useState('image')
  const [savedFlash, setSavedFlash] = useState(false)

  const onDone = () => {
    setSavedFlash(true)
    window.setTimeout(() => setSavedFlash(false), 1800)
  }

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-[60] w-[min(360px,calc(100vw-2rem))] border border-cream-deep bg-white shadow-[0_20px_60px_rgba(74,10,22,0.20)]"
        >
          <div className="flex items-center justify-between border-b border-cream-deep px-4 py-3">
            <div>
              <p className="font-script text-lg text-rose-dust">Owner tools</p>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                Hidden controls
              </p>
              <p
                className={`mt-1 flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${
                  isSupabaseConfigured ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[0.55rem] text-white ${
                    isSupabaseConfigured ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                  aria-hidden
                >
                  {isSupabaseConfigured ? '✓' : '!'}
                </span>
                {isSupabaseConfigured ? 'Saving to database' : 'Database not connected'}
              </p>
            </div>
            <button
              type="button"
              onClick={lock}
              className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink-muted hover:text-ink"
            >
              Lock
            </button>
          </div>

          <div className="flex border-b border-cream-deep">
            {[
              { id: 'image', label: 'Add image' },
              { id: 'testimonial', label: 'Testimonial' },
              { id: 'status', label: 'Status' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex-1 px-3 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition ${
                  tab === t.id ? 'bg-blush text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === 'image' && <AddImagePanel onDone={onDone} />}
            {tab === 'testimonial' && <AddTestimonialPanel onDone={onDone} />}
            {tab === 'status' && <StatusPanel key="status" />}
            {savedFlash && (
              <p className="mt-3 text-center text-xs text-rose-dust">Saved.</p>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

/**
 * Invisible hot-spot only the owner should know about.
 * Location: bottom-left corner of the footer copyright line — looks like normal text,
 * unlocks after 3 quick clicks on the © year.
 */
export function SecretOwnerTrigger() {
  const { unlocked, unlock } = useOwnerMode()
  const clicksRef = useRef(0)
  const timerRef = useRef(null)

  const onClick = () => {
    if (unlocked) return
    clicksRef.current += 1
    if (timerRef.current) window.clearTimeout(timerRef.current)
    if (clicksRef.current >= 3) {
      clicksRef.current = 0
      unlock()
      return
    }
    timerRef.current = window.setTimeout(() => {
      clicksRef.current = 0
    }, 1200)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-hidden="true"
      tabIndex={-1}
      title=""
      className="cursor-default select-none border-0 bg-transparent p-0 text-inherit"
      style={{ outline: 'none' }}
    >
      {new Date().getFullYear()}
    </button>
  )
}
