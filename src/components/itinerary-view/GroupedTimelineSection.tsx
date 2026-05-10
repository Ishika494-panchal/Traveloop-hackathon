import { motion } from 'framer-motion'

import { ActivityExpenseRows } from '@/components/itinerary-view/ActivityExpenseRows'
import type { ItineraryActivity } from '@/components/itinerary-view/itineraryViewMock'

type GroupedTimelineSectionProps = {
  title: string
  subtitle?: string
  activities: ItineraryActivity[]
  index?: number
}

export function GroupedTimelineSection({ title, subtitle, activities, index = 0 }: GroupedTimelineSectionProps) {
  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.06, 0.2) }}
      className="rounded-3xl border border-traveloop-sky/18 bg-[#0B0F1A]/2 p-5 shadow-inner-glow backdrop-blur-xl md:p-8"
    >
      <div className="mb-6 border-b border-traveloop-sky/12 pb-5">
        <h3 className="text-lg font-bold text-white md:text-xl">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-traveloop-ice/55">{subtitle}</p> : null}
      </div>
      <ActivityExpenseRows activities={activities} />
    </motion.section>
  )
}
