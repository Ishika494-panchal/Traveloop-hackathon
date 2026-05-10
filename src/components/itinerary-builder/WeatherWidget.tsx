import { motion } from 'framer-motion'
import { CloudSun } from 'lucide-react'

type WeatherWidgetProps = {
  destination: string
}

export function WeatherWidget({ destination }: WeatherWidgetProps) {
  const label = destination?.trim() || 'Corridor'

  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-2xl border border-traveloop-sky/22 bg-[#0B0F1A]/50 p-4 shadow-[0_0_28px_rgba(56,73,89,0.35)] backdrop-blur-xl md:p-5"
    >
      <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-traveloop-ice/10 blur-2xl" />
      <div className="relative flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-traveloop-sky/35 bg-traveloop-sky/15 text-traveloop-ice">
          <CloudSun className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Weather pulse</p>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-xs text-traveloop-ice/65">22°C · Mostly clear</p>
        </div>
      </div>
    </motion.div>
  )
}
