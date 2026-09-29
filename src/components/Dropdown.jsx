import { useEffect, useRef, useState } from 'react'

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0" aria-hidden>
      <path
        d="M4 10.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Dropdown({ placeholder, value, onChange, groups }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!open || !listRef.current) return
    const selected = listRef.current.querySelector('[data-selected="true"]')
    if (!selected) return
    const list = listRef.current
    list.scrollTop = selected.offsetTop - list.clientHeight / 2 + selected.clientHeight / 2
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-cream px-4 py-3.5 text-left text-base outline-none transition ${
          open ? 'border-rose-dust ring-2 ring-rose-dust/15' : 'border-cream-deep hover:border-rose-dust/40'
        } ${value ? 'text-ink' : 'text-ink-muted/55'}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className={`h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          className="dropdown-scroll absolute inset-x-0 top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-cream-deep bg-cream p-2 shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
        >
          {groups.map((group, groupIndex) => (
            <div key={group.label ?? groupIndex}>
              {group.label && (
                <p className="px-3 pb-1.5 pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted/70">
                  {group.icon && <span className="mr-1.5">{group.icon}</span>}
                  {group.label}
                </p>
              )}
              {group.options.map((option) => {
                const selected = option === value
                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    data-selected={selected}
                    onClick={() => {
                      onChange(option)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-base transition ${
                      selected ? 'bg-blush font-medium text-rose-dust' : 'text-ink hover:bg-blush/70'
                    }`}
                  >
                    <span className="truncate">{option}</span>
                    {selected && <CheckIcon />}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
