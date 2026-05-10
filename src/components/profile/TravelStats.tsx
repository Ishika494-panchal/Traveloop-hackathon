import { animate, motion } from 'framer-motion'
import { Globe2, Heart, PiggyBank, Trophy, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

function StatCard({
  label,
  value,
  prefix = '',
  suffix = '',
  trend,
  icon: Icon,
  delayMs,
}: {
  label: string
  value: number
  prefix?: string
  suffix?: string
  trend: string
  icon: LucideIcon
  delayMs: number
}) {
  const [n, setN] = useState(0)

  useEffect(() => {
    setN(0)
    let c: ReturnType<typeof animate> | null = null
    const t = window.setTimeout(() => {
      c = animate(0, value, {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setN(Math.round(v)),
      })
    }, delayMs)
    return () => {
      window.clearTimeout(t)
      c?.stop()
    }
  }, [value, delayMs])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delayMs / 1000, duration: 0.45 }}
      whileHover={{ y: -3, boxShadow: '0 0 28px rgba(136,189,242,0.2)' }}
      className="rounded-2xl border border-traveloop-sky/22 bg-[#0B0F1A]/5 p-4 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-traveloop-sky/25 bg-traveloop-sky/10 text-traveloop-sky">
          <Icon className="h-4 w-4" strokeWidth={1.65} />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300/90">{trend}</span>
      </div>
      <p className="mt-3 text-2xl font-bold tabular-nums text-white">
        {prefix}
        {n.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-xs text-traveloop-ice/55">{label}</p>
    </motion.div>
  )
}

type TravelStatsProps = {
  countries: number
  favoriteLabel: string
  avgCost: number
  tripsDone: number
}

export function TravelStats({ countries, favoriteLabel, avgCost, tripsDone }: TravelStatsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <StatCard label="Countries visited" value={countries} trend="+2 this year" icon={Globe2} delayMs={80} />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.45 }}
        whileHover={{ y: -3, boxShadow: '0 0 28px rgba(136,189,242,0.2)' }}
        className="rounded-2xl border border-traveloop-sky/22 bg-[#0B0F1A]/5 p-4 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-traveloop-sky/25 bg-traveloop-sky/10 text-traveloop-sky">
            <Heart className="h-4 w-4" strokeWidth={1.65} />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-traveloop-ice/50">Pinned</span>
        </div>
        <p className="mt-3 truncate text-lg font-bold text-white">{favoriteLabel}</p>
        <p className="mt-1 text-xs text-traveloop-ice/55">Favorite destination</p>
      </motion.div>
      <StatCard label="Avg trip cost" value={avgCost} prefix="$" trend="-4% vs LY" icon={PiggyBank} delayMs={200} />
      <StatCard label="Trips completed" value={tripsDone} trend="+1 booked" icon={Trophy} delayMs={260} />
    </div>
  )
}
