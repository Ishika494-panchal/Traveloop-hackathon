import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const TICK_MS = 3400

/** Anchored to globe box edges; transforms push cards outside the sphere so they sit in the margin, not on the mesh. */
const SLOTS = [
  {
    pos: 'left-0 top-1/2 -translate-x-full -translate-y-1/2 -ml-2 md:-ml-3',
    title: 'Live sync · itinerary locked',
    body: 'Co-pilot merged 4 route edits.',
  },
  {
    pos: 'right-0 top-1/2 translate-x-full -translate-y-1/2 mr-2 md:mr-3',
    title: 'Weather delta · evening shift',
    body: '−2°C after 19:00 local — layers on.',
  },
  {
    pos: 'left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2 md:-mt-3',
    title: 'Budget pulse · steady',
    body: 'Spend tracking within glide path.',
  },
  {
    pos: 'left-1/2 bottom-0 -translate-x-1/2 translate-y-full mb-2 md:mb-3',
    title: 'Crew link · 3 travelers',
    body: 'Shared canvas updated in real time.',
  },
  {
    pos: 'left-0 top-[16%] -translate-x-full -ml-2 md:-ml-3',
    title: 'Slot open · better fare',
    body: 'Alternate window saves ~2h transit.',
  },
  {
    pos: 'right-0 top-[18%] translate-x-full mr-2 md:mr-3',
    title: 'Visa intel · docs ready',
    body: 'Checklist 100% before submission.',
  },
  {
    pos: 'left-0 bottom-[16%] -translate-x-full -ml-2 md:-ml-3',
    title: 'Night pack · red-eye mode',
    body: 'Comfort kit + quiet hours prefilled.',
  },
  {
    pos: 'right-0 bottom-[18%] translate-x-full mr-2 md:mr-3',
    title: 'Carbon note · offset applied',
    body: 'Trip footprint balanced this segment.',
  },
] as const

const cardClass =
  'max-w-[min(200px,42vw)] rounded-2xl border border-traveloop-sky/35 bg-[#0B0F1A]/75 px-3 py-2.5 shadow-[0_0_24px_rgba(136,189,242,0.2)] backdrop-blur-xl md:max-w-[220px] md:px-3.5 md:py-3'

export function GlobeMessagePopups() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLOTS.length)
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [])

  const slot = SLOTS[index % SLOTS.length]

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-visible" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.82, y: 12 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: reduced ? 0.22 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${slot.pos} ${cardClass}`}
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-traveloop-ice/70">Traveloop OS</p>
          <p className="mt-1 text-[12px] font-semibold leading-snug text-white md:text-[13px]">{slot.title}</p>
          <p className="mt-0.5 text-[10px] leading-relaxed text-traveloop-ice/80 md:text-[11px]">{slot.body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
