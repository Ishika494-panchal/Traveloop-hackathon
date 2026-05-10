import { motion } from 'framer-motion'
import { CloudSun, Compass, Flame, Trophy } from 'lucide-react'

const widgets = [
  { label: 'Trending', value: 'Kyoto alley eats', detail: '+34% searches', icon: Compass },
  { label: 'Top rated', value: 'Swiss alpine trek', detail: '4.9 avg', icon: Trophy },
  { label: 'Live weather', value: '22°C · calm', detail: 'Manali corridor', icon: CloudSun },
  { label: 'For you', value: 'Golden hour ridge', detail: 'Book before 48h', icon: Flame },
]

export function DiscoverFloatingWidgets() {
  return (
    <div className="pointer-events-none fixed bottom-24 right-3 z-40 hidden flex-col gap-2.5 xl:flex xl:right-6">
      {widgets.map((w, i) => (
        <motion.div
          key={w.label}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 + i * 0.06 }}
          className="w-[204px] rounded-2xl border border-traveloop-sky/22 bg-[#0B0F1A]/55 px-3.5 py-2.5 shadow-glow backdrop-blur-xl"
        >
          <motion.div animate={{ y: [0, -2.5, 0] }} transition={{ duration: 4 + i * 0.35, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-traveloop-steel">
              <w.icon className="h-3.5 w-3.5 text-traveloop-sky" strokeWidth={1.7} />
              {w.label}
            </div>
            <p className="mt-1 text-sm font-bold text-white">{w.value}</p>
            <p className="text-[11px] text-traveloop-ice/55">{w.detail}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
