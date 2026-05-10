import { motion } from 'framer-motion'
import { CalendarRange, LayoutList } from 'lucide-react'

export type ItineraryViewMode = 'timeline' | 'calendar'

type ViewToggleProps = {
  mode: ItineraryViewMode
  onChange: (m: ItineraryViewMode) => void
}

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-2xl border border-traveloop-sky/28 bg-[#080c16] p-1 shadow-inner-glow backdrop-blur-md [color-scheme:dark]">
      {([
        { id: 'timeline' as const, label: 'Timeline View', icon: LayoutList },
        { id: 'calendar' as const, label: 'Calendar View', icon: CalendarRange },
      ]).map(({ id, label, icon: Icon }) => {
        const active = mode === id
        return (
          <motion.button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold md:px-5 md:py-3"
          >
            {active ? (
              <motion.span
                layoutId="itinerary-view-toggle"
                className="absolute inset-0 rounded-xl border border-traveloop-sky/45 bg-gradient-to-br from-traveloop-sky/25 to-traveloop-slate/35 shadow-[0_0_24px_rgba(136,189,242,0.25)]"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span className="relative z-[1] flex items-center gap-2">
              <Icon className={`h-4 w-4 ${active ? 'text-traveloop-ice' : 'text-traveloop-steel'}`} strokeWidth={1.75} />
              <span className={active ? 'text-white' : 'text-traveloop-ice/65'}>{label}</span>
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
