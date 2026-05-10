import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

const springConfig = { stiffness: 120, damping: 18, mass: 0.4 }

export function useMouseParallax(intensity = 14) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      x.set(((e.clientX - cx) / cx) * intensity)
      y.set(((e.clientY - cy) / cy) * intensity)
    }
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [intensity, x, y])

  return { x: sx, y: sy, rawX: x, rawY: y }
}
