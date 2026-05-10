import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useCallback, useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export function JourneysFAB() {
  const navigate = useNavigate()
  const ref = useRef<HTMLButtonElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 260, damping: 26 })
  const sy = useSpring(my, { stiffness: 260, damping: 26 })
  const glow = useMotionTemplate`radial-gradient(100px circle at ${sx}px ${sy}px, rgba(189,221,252,0.4), transparent 70%)`

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      mx.set(e.clientX - r.left)
      my.set(e.clientY - r.top)
    },
    [mx, my],
  )

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set(r.width / 2)
    my.set(r.height / 2)
  }, [mx, my])

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set(r.width / 2)
    my.set(r.height / 2)
  }, [mx, my])

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => navigate('/plan')}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="group fixed bottom-6 right-4 z-[60] isolate overflow-hidden rounded-full border border-white/15 bg-gradient-to-r from-traveloop-sky via-traveloop-steel to-traveloop-slate px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_44px_rgba(136,189,242,0.45)] md:bottom-10 md:right-8"
    >
      <motion.span className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen" style={{ background: glow }} />
      <motion.span
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow: 'inset 0 0 24px rgba(136,189,242,0.25)',
        }}
      />
      <span className="relative z-[1] flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
          <Plus className="h-5 w-5" strokeWidth={2.2} />
        </span>
        Plan New Trip
      </span>
    </motion.button>
  )
}
