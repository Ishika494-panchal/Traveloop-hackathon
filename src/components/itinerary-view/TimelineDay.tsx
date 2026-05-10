import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { ActivityExpenseRows } from '@/components/itinerary-view/ActivityExpenseRows'
import type { ItineraryActivity } from '@/components/itinerary-view/itineraryViewMock'
import { cn } from '@/lib/utils'

type TimelineDayProps = {
  day: number
  activities: ItineraryActivity[]
  expanded: boolean
  onToggle: () => void
}

export function TimelineDay({ day, activities, expanded, onToggle }: TimelineDayProps) {
  return (
    <motion.section
      layout
      className="relative overflow-hidden rounded-3xl border border-traveloop-sky/18 bg-[#0B0F1A]/2 p-5 shadow-inner-glow backdrop-blur-xl md:p-8"
    >
      <div className="mb-5 flex items-center justify-between gap-4 md:hidden">
        <span className="rounded-full border border-traveloop-sky/30 bg-[#080c16] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-traveloop-steel">
          Day {day}
        </span>
        <motion.button
          type="button"
          aria-expanded={expanded}
          onClick={onToggle}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-xl border border-traveloop-sky/25 bg-[#080c16] px-3 py-2 text-xs font-semibold text-traveloop-ice"
        >
          {expanded ? 'Collapse' : 'Expand'}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </div>

      <div className={cn(!expanded ? 'hidden md:block' : '')}>
        <div className="flex flex-col gap-8 md:flex-row md:gap-10">
            <div className="hidden w-28 shrink-0 flex-col items-center border-r border-traveloop-sky/18 pr-6 md:flex">
              <motion.div
                layout
                className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-traveloop-sky/45 bg-gradient-to-br from-traveloop-sky/25 to-traveloop-slate/40 text-center shadow-[0_0_30px_rgba(136,189,242,0.25)]"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Day</span>
                <span className="text-xl font-bold text-white">{day}</span>
              </motion.div>
              <div className="mt-4 h-full min-h-[60px] w-px shrink-0 bg-gradient-to-b from-traveloop-sky/50 via-traveloop-steel/30 to-transparent" />
            </div>

            <ActivityExpenseRows activities={activities} />
          </div>
      </div>

      {!expanded ? <p className="text-center text-xs text-traveloop-ice/50 md:hidden">Tap expand to see Day {day}</p> : null}
    </motion.section>
  )
}
