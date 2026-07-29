import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOwnerMode } from '../hooks/useOwnerMode'
import { usePageImages } from '../hooks/usePageImages'
import { useTestimonials } from '../hooks/useTestimonials'
import { imageSectionOptions } from '../data/imageSections'

function AddImagePanel({ onDone }) {
  const [path, setPath] = useState(imageSectionOptions[0].path)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const { add } = usePageImages(path)

  const submit = (e) => {
    e.preventDefault()
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
    onDone?.()
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Section
        <select
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="mt-1.5 w-full border border-cream-deep bg-cream px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-ink outline-none focus:border-rose-dust"
        >
          {imageSectionOptions.map((opt) => (
            <option key={opt.path} value={opt.path}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Image URL
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://res.cloudinary.com/..."
          className="mt-1.5 w-full border border-cream-deep bg-cream px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-ink outline-none placeholder:text-ink-muted/60 focus:border-rose-dust"
        />
      </label>
      {error && <p className="text-xs text-rose-700">{error}</p>}
      <button
        type="submit"
        className="w-full bg-rose-dust px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-rose-deep"
      >
        Save image
      </button>
    </form>
  )
}

function AddTestimonialPanel({ onDone }) {
  const { add } = useTestimonials()
  const [form, setForm] = useState({ names: '', quote: '', date: '', imageUrl: '' })
  const [error, setError] = useState('')

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.names.trim() || !form.quote.trim()) {
      setError('Name and quote are required.')
      return
    }
    if (form.imageUrl.trim()) {
      try {
        // eslint-disable-next-line no-new
        new URL(form.imageUrl.trim())
      } catch {
        setError('Image URL is not valid.')
        return
      }
    }
    add(form)
    setForm({ names: '', quote: '', date: '', imageUrl: '' })
    setError('')
    onDone?.()
  }

  const field =
    'mt-1.5 w-full border border-cream-deep bg-cream px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-ink outline-none placeholder:text-ink-muted/60 focus:border-rose-dust'

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Names
        <input
          name="names"
          value={form.names}
          onChange={onChange}
          placeholder="Priya & Rohan"
          className={field}
        />
      </label>
      <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Quote
        <textarea
          name="quote"
          value={form.quote}
          onChange={onChange}
          rows={4}
          placeholder="Their kind words…"
          className={`${field} resize-y`}
        />
      </label>
      <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Date
        <input
          name="date"
          value={form.date}
          onChange={onChange}
          placeholder="12 June 2025"
          className={field}
        />
      </label>
      <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Photo URL (optional)
        <input
          name="imageUrl"
          type="url"
          value={form.imageUrl}
          onChange={onChange}
          placeholder="https://res.cloudinary.com/..."
          className={field}
        />
      </label>
      {error && <p className="text-xs text-rose-700">{error}</p>}
      <button
        type="submit"
        className="w-full bg-rose-dust px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-rose-deep"
      >
        Save testimonial
      </button>
    </form>
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
          className="fixed bottom-5 right-5 z-[60] w-[min(360px,calc(100vw-2rem))] border border-cream-deep bg-white shadow-[0_20px_60px_rgba(60,40,30,0.18)]"
        >
          <div className="flex items-center justify-between border-b border-cream-deep px-4 py-3">
            <div>
              <p className="font-script text-lg text-rose-dust">Owner tools</p>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                Hidden controls
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
              { id: 'testimonial', label: 'Add testimonial' },
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
            {tab === 'image' ? (
              <AddImagePanel onDone={onDone} />
            ) : (
              <AddTestimonialPanel onDone={onDone} />
            )}
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
