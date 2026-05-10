import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useCallback, useLayoutEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

type AddSectionButtonProps = {
  onClick: () => void
  className?: string
}

export function AddSectionButton({ onClick, className }: AddSectionButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 260, damping: 28 })
  const sy = useSpring(my, { stiffness: 260, damping: 28 })
  const glow = useMotionTemplate`radial-gradient(100px circle at ${sx}px ${sy}px, rgba(136,189,242,0.35), transparent 70%)`

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
    <div className={cn('flex justify-center pt-2', className)}>
      <motion.button
        ref={ref}
        type="button"
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="group relative isolate overflow-hidden rounded-2xl border border-traveloop-sky/35 bg-gradient-to-r from-traveloop-slate/50 via-traveloop-sky/25 to-traveloop-slate/50 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(136,189,242,0.25)] transition-shadow hover:shadow-[0_0_48px_rgba(136,189,242,0.4)] md:px-10 md:py-4 md:text-base"
      >
        <motion.span className="pointer-events-none absolute inset-0 opacity-50" style={{ background: glow }} />
        <span className="relative z-[1] flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <Plus className="h-5 w-5" strokeWidth={2.2} />
          </span>
          Add Another Section
        </span>
      </motion.button>
    </div>
  )
}
