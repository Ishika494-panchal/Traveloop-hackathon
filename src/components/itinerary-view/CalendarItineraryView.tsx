import { motion } from 'framer-motion'

import type { ItineraryActivity } from '@/components/itinerary-view/itineraryViewMock'

type CalendarItineraryViewProps = {
  groupedByDay: { day: number; activities: ItineraryActivity[] }[]
}

export function CalendarItineraryView({ groupedByDay }: CalendarItineraryViewProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-7">
      {groupedByDay.map(({ day, activities }) => (
        <motion.div
          key={day}
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(day * 0.05, 0.35) }}
          className="flex min-h-[180px] flex-col rounded-2xl border border-traveloop-sky/22 bg-[#080c16]/92 p-4 shadow-inner-glow backdrop-blur-xl xl:col-span-1"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Day</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-traveloop-sky/35 bg-gradient-to-br from-traveloop-sky/20 to-transparent text-lg font-bold text-white shadow-glow-sm">
              {day}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {activities.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-traveloop-slate/35 bg-[#0B0F1A]/4 px-2 py-2 text-[11px] font-medium leading-snug text-traveloop-ice/90 backdrop-blur-sm transition-colors hover:border-traveloop-sky/35 hover:text-white"
              >
                <span className="block truncate">{a.title}</span>
                <span className="mt-1 block text-[10px] font-normal uppercase tracking-wide text-traveloop-steel">{a.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
