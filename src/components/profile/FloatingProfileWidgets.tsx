import { motion } from 'framer-motion'
import { Flame, Globe2, Plane, Route } from 'lucide-react'

type FloatingProfileWidgetsProps = {
  countriesExplored: number
  miles: string
  activeTrips: number
  streakDays: number
  /** Sticky sidebar in profile layout; `fixed` keeps legacy floating HUD. */
  variant?: 'sidebar' | 'fixed'
  /** `row` wraps tiles for small screens; `column` is the default sidebar stack. */
  orientation?: 'column' | 'row'
  className?: string
}

export function FloatingProfileWidgets({
  countriesExplored,
  miles,
  activeTrips,
  streakDays,
  variant = 'sidebar',
  orientation = 'column',
  className = '',
}: FloatingProfileWidgetsProps) {
  const items = [
    { label: 'Countries explored', value: String(countriesExplored), icon: Globe2 },
    { label: 'Miles traveled', value: miles, icon: Route },
    { label: 'Active trips', value: String(activeTrips), icon: Plane },
    { label: 'Travel streak', value: `${streakDays}d`, icon: Flame },
  ]

  const flow = orientation === 'row' ? 'flex-row flex-wrap justify-center gap-2' : 'flex-col gap-2'

  const base =
    variant === 'fixed'
      ? `pointer-events-none fixed bottom-28 right-4 z-40 hidden w-[200px] lg:flex xl:right-8 ${flow}`
      : `flex w-full max-w-[200px] ${flow} sm:max-w-none`

  return (
    <div className={`${base} ${className}`.trim()}>
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 * i }}
          className="rounded-xl border border-traveloop-sky/22 bg-[#0B0F1A]/55 px-3 py-2.5 shadow-glow-sm backdrop-blur-xl"
        >
          <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-traveloop-steel">
              <it.icon className="h-3.5 w-3.5 text-traveloop-sky" strokeWidth={1.6} />
              {it.label}
            </div>
            <p className="mt-1 text-sm font-bold text-white">{it.value}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
