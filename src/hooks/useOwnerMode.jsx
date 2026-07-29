import { createContext, useCallback, useContext, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'dhi-owner-unlocked'
const EVENT = 'dhi-owner-change'

function readUnlocked() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function writeUnlocked(value) {
  try {
    if (value) sessionStorage.setItem(STORAGE_KEY, '1')
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVENT))
}

function subscribe(cb) {
  window.addEventListener(EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}

const OwnerModeContext = createContext({
  unlocked: false,
  unlock: () => {},
  lock: () => {},
  toggle: () => {},
})

export function OwnerModeProvider({ children }) {
  const unlocked = useSyncExternalStore(
    subscribe,
    readUnlocked,
    () => false,
  )

  const unlock = useCallback(() => writeUnlocked(true), [])
  const lock = useCallback(() => writeUnlocked(false), [])
  const toggle = useCallback(() => writeUnlocked(!readUnlocked()), [])

  return (
    <OwnerModeContext.Provider value={{ unlocked, unlock, lock, toggle }}>
      {children}
    </OwnerModeContext.Provider>
  )
}

export function useOwnerMode() {
  return useContext(OwnerModeContext)
}
