import { motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'

const selectClass =
  'h-12 w-full cursor-pointer appearance-none rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/55 px-4 pr-10 text-sm text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-all duration-300 hover:border-traveloop-ice/35 focus:border-traveloop-sky/70 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/35 md:w-auto md:min-w-[160px]'

export function SearchFilters() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
      className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4"
    >
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
        <input
          type="search"
          placeholder="Search destinations, trips, or cities…"
          className="h-12 w-full rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/55 py-2.5 pl-11 pr-4 text-sm text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-all duration-300 placeholder:text-traveloop-ice/45 focus:border-traveloop-sky/70 focus:shadow-[0_0_28px_rgba(136,189,242,0.22)] focus:outline-none focus:ring-2 focus:ring-traveloop-sky/40"
        />
      </div>

      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:shrink-0 md:gap-3">
        {[
          { label: 'Group by', options: ['Destination', 'Date', 'Budget'] },
          { label: 'Filter', options: ['All trips', 'Upcoming', 'Completed'] },
          { label: 'Sort', options: ['Recent', 'Name', 'Spend'] },
        ].map((field) => (
          <div key={field.label} className="relative">
            <select className={selectClass} aria-label={field.label} defaultValue={field.options[0]}>
              {field.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/50" />
            <span className="pointer-events-none absolute -top-2 left-3 bg-[#0B0F1A] px-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-traveloop-ice/55">
              {field.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
