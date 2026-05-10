import { motion } from 'framer-motion'
import { CloudSun } from 'lucide-react'

type WeatherWidgetProps = {
  className?: string
  /** When true, skip mount-in animation so it appears with siblings (e.g. floating panel). */
  syncEnter?: boolean
}

export function WeatherWidget({ className, syncEnter }: WeatherWidgetProps) {
  return (
    <motion.div
      initial={syncEnter ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border border-traveloop-sky/30 bg-[#0B0F1A]/65 px-4 py-3 shadow-glow-sm backdrop-blur-xl ${className ?? ''}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-traveloop-sky/35 bg-white/[0.05] text-traveloop-sky">
          <CloudSun className="h-5 w-5" strokeWidth={1.6} />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-traveloop-ice/60">Live weather</p>
          <p className="text-lg font-semibold text-white">22°C</p>
          <p className="text-xs text-traveloop-ice/70">Zurich · high clarity</p>
        </div>
      </div>
    </motion.div>
  )
}
