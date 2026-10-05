import { useRef } from 'react'
import { useOwnerMode } from '../hooks/useOwnerMode'

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

export default SecretOwnerTrigger
