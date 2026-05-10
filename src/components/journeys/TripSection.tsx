import { motion } from 'framer-motion'

import { TripOverviewCard } from './TripOverviewCard'
import type { JourneyTrip } from './types'

type TripSectionProps = {
  title: string
  subtitle?: string
  trips: JourneyTrip[]
  index: number
}

export function TripSection({ title, subtitle, trips, index }: TripSectionProps) {
  if (!trips.length) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 md:mb-14"
    >
      <div className="mb-5 flex flex-col gap-1 md:mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{title}</h2>
        {subtitle ? <p className="text-sm text-traveloop-ice/55">{subtitle}</p> : null}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.12 + index * 0.05, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 h-px max-w-md origin-left bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-transparent shadow-[0_0_16px_rgba(136,189,242,0.45)]"
        />
      </div>
      <div className="flex flex-col gap-5 md:gap-6">
        {trips.map((trip, i) => (
          <TripOverviewCard key={trip.id} trip={trip} index={i} />
        ))}
      </div>
    </motion.section>
  )
}
