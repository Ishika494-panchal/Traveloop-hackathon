import { useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { type PointerEvent as ReactPointerEvent, useCallback, useRef } from 'react'

const spring = { stiffness: 220, damping: 22, mass: 0.35 }

export function useCardTilt(maxDeg = 6) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, spring)
  const sry = useSpring(ry, spring)

  const onMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      ry.set(px * maxDeg * 2)
      rx.set(-py * maxDeg * 2)
    },
    [maxDeg, rx, ry],
  )

  const onLeave = useCallback(() => {
    rx.set(0)
    ry.set(0)
  }, [rx, ry])

  const transform = useMotionTemplate`perspective(1200px) rotateX(${srx}deg) rotateY(${sry}deg)`

  return { ref, onPointerMove: onMove, onPointerLeave: onLeave, transform }
}
