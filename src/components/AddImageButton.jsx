import { useRef } from 'react'
import { useAddImageForm } from '../hooks/usePageImages'
import { useOwnerMode } from '../hooks/useOwnerMode'

/** Only visible when owner mode is unlocked via the secret trigger. */
export function AddImageButton({
  path,
  label = 'Add image',
  categoryLabel,
  subcategoryLabel,
}) {
  const { unlocked } = useOwnerMode()
  const { open, setOpen, url, setUrl, error, busy, submit, pickFile } = useAddImageForm(path)
  const fileRef = useRef(null)

  if (!unlocked) return null

  const hasTaxonomy = categoryLabel || subcategoryLabel

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 border border-rose-dust/40 bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-ink transition hover:border-rose-dust hover:bg-rose-dust hover:text-white"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4v16m8-8H4" />
        </svg>
        {label}
      </button>

      {open && (
        <form
          onSubmit={submit}
          className="absolute right-0 top-full z-40 mt-2 w-[min(360px,90vw)] border border-cream-deep bg-white p-4 shadow-[0_12px_40px_rgba(60,40,30,0.12)]"
        >
          <p className="font-script text-lg text-rose-dust">Add to this section</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Upload a file from this device, or paste a delivery URL — image, GIF, or video (.mp4 /
            .webm). Saved for everyone.
          </p>

          {hasTaxonomy && (
            <div className="mt-3 space-y-1.5 border border-cream-deep bg-cream px-3 py-2.5 text-xs">
              {categoryLabel && (
                <p>
                  <span className="font-semibold uppercase tracking-[0.1em] text-ink-muted">
                    Category
                  </span>
                  <span className="mt-0.5 block text-ink">{categoryLabel}</span>
                </p>
              )}
              {subcategoryLabel && (
                <p>
                  <span className="font-semibold uppercase tracking-[0.1em] text-ink-muted">
                    Subcategory
                  </span>
                  <span className="mt-0.5 block text-ink">{subcategoryLabel}</span>
                </p>
              )}
              <p className="pt-1 font-mono text-[0.65rem] text-ink-muted">{path}</p>
            </div>
          )}

          {!hasTaxonomy && (
            <p className="mt-2 font-mono text-[0.65rem] text-ink-muted">{path}</p>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              e.target.value = ''
              if (file) pickFile(file)
            }}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="mt-3 w-full border border-rose-dust/50 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition hover:border-rose-dust hover:bg-blush disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? 'Uploading…' : 'Upload from this device'}
          </button>

          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
            className="mt-3 w-full border border-cream-deep bg-cream px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-muted/60 focus:border-rose-dust"
            autoFocus
          />
          {error && <p className="mt-2 text-xs text-rose-700">{error}</p>}
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="flex-1 bg-rose-dust px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-rose-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-xs uppercase tracking-[0.12em] text-ink-muted hover:text-ink"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
