import { animate, motion } from 'framer-motion'
import { Globe2, PiggyBank, Plane, Users, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

function StatMini({
  label,
  value,
  icon: Icon,
  delay,
  prefix = '',
}: {
  label: string
  value: number
  icon: LucideIcon
  delay: number
  prefix?: string
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    setDisplay(0)
    let controls: ReturnType<typeof animate> | null = null
    const timer = window.setTimeout(() => {
      controls = animate(0, value, {
        duration: 1.15,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setDisplay(Math.round(v)),
      })
    }, Math.round(delay * 1000))
    return () => {
      window.clearTimeout(timer)
      controls?.stop()
    }
  }, [value, delay])

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45 }}
      className="rounded-xl border border-traveloop-sky/22 bg-[#0B0F1A]/55 px-3 py-2.5 shadow-glow-sm backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-traveloop-steel">
        <Icon className="h-3.5 w-3.5 text-traveloop-sky" strokeWidth={1.6} />
        {label}
      </div>
      <p className="mt-1 text-lg font-bold text-white tabular-nums">
        {prefix}
        {display.toLocaleString()}
      </p>
    </motion.div>
  )
}

type FloatingStatsJourneysProps = {
  countries: number
  totalTrips: number
  totalBudgetSpent: number
  activeTravelers: number
}

export function FloatingStatsJourneys({ countries, totalTrips, totalBudgetSpent, activeTravelers }: FloatingStatsJourneysProps) {
  return (
    <div className="pointer-events-none fixed bottom-28 right-4 z-40 hidden w-[200px] flex-col gap-2 lg:flex xl:right-8">
      <StatMini label="Countries" value={countries} icon={Globe2} delay={0.1} />
      <StatMini label="Total trips" value={totalTrips} icon={Plane} delay={0.16} />
      <StatMini label="Budget spent" value={totalBudgetSpent} icon={PiggyBank} delay={0.22} prefix="$" />
      <StatMini label="Active travelers" value={activeTravelers} icon={Users} delay={0.28} />
    </div>
  )
}
