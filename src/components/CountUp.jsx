import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

/** Animates a number from 0 to `value` the first time it scrolls into view. */
export function CountUp({ value, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const numeric = parseFloat(String(value).replace(/[^\d.]/g, '')) || 0
  const suffix = String(value).replace(/[\d.]/g, '')

  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, numeric, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, numeric])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
