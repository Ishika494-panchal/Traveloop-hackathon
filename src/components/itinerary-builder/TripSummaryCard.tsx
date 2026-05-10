import { motion } from 'framer-motion'
import { CalendarRange, MapPinned, Sparkles } from 'lucide-react'

type TripSummaryCardProps = {
  days: number
  cities: number
  activities: number
  estimatedCost: number
}

export function TripSummaryCard({ days, cities, activities, estimatedCost }: TripSummaryCardProps) {
  const rows = [
    { icon: CalendarRange, label: 'Days', value: String(days) },
    { icon: MapPinned, label: 'Cities', value: String(cities) },
    { icon: Sparkles, label: 'Activities', value: String(activities) },
  ]

  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-2xl border border-traveloop-sky/22 bg-[#0B0F1A]/55 p-4 shadow-[0_0_28px_rgba(56,73,89,0.35)] backdrop-blur-xl md:p-5"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Trip summary</p>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2 text-traveloop-ice/65">
              <row.icon className="h-4 w-4 text-traveloop-sky" strokeWidth={1.6} />
              {row.label}
            </span>
            <motion.span key={row.value} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} className="font-semibold text-white">
              {row.value}
            </motion.span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-traveloop-sky/15 pt-4">
        <p className="text-xs text-traveloop-ice/55">Estimated activity spend</p>
        <motion.p
          key={estimatedCost}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xl font-bold text-white"
        >
          ${estimatedCost.toLocaleString()}
        </motion.p>
      </div>
    </motion.div>
  )
}
