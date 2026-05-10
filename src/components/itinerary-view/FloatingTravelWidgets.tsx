import { motion } from 'framer-motion'
import { CloudSun, MapPin, Route, Tent } from 'lucide-react'

import { TRIP_META } from '@/components/itinerary-view/itineraryViewMock'

type FloatingTravelWidgetsProps = {
  activityCount: number
}

export function FloatingTravelWidgets({ activityCount }: FloatingTravelWidgetsProps) {
  const rows = [
    { icon: CloudSun, label: 'Weather', value: TRIP_META.weather },
    { icon: MapPin, label: 'Pinned', value: TRIP_META.location },
    { icon: Route, label: 'Trip span', value: TRIP_META.durationLabel },
    { icon: Tent, label: 'Activities', value: String(activityCount) },
  ]

  return (
    <div className="pointer-events-none fixed bottom-20 right-3 z-40 hidden w-[206px] flex-col gap-2 md:flex xl:right-8">
      {rows.map((x, i) => (
        <motion.div
          key={x.label}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          className="rounded-xl border border-traveloop-sky/22 bg-[#0B0F1A]/56 px-3 py-2.5 backdrop-blur-xl"
          style={{
            boxShadow: 'inset 0 0 20px rgba(136,189,242,0.08), 0 0 24px rgba(56,73,89,0.35)',
          }}
        >
          <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-traveloop-steel">
              <x.icon className="h-3.5 w-3.5 text-traveloop-sky" strokeWidth={1.7} />
              {x.label}
            </div>
            <p className="mt-1 truncate text-[13px] font-semibold text-white">{x.value}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
