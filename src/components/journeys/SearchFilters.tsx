import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

import { GlassInput } from '@/components/GlassInput'

const selectClass =
  'w-full cursor-pointer appearance-none rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/45 px-3.5 py-2.5 text-sm text-traveloop-ice/95 shadow-inner-glow backdrop-blur-md transition-all duration-300 focus:border-traveloop-sky/70 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/35 focus:ring-offset-0 hover:border-traveloop-ice/35 focus-visible:animate-border-pulse'

export type GroupBy = 'status' | 'destination'
export type FilterBy = 'all' | 'ongoing' | 'upcoming' | 'completed'
export type SortBy = 'date' | 'name' | 'budget'

type SearchFiltersProps = {
  query: string
  onQueryChange: (q: string) => void
  groupBy: GroupBy
  onGroupByChange: (v: GroupBy) => void
  filterBy: FilterBy
  onFilterChange: (v: FilterBy) => void
  sortBy: SortBy
  onSortChange: (v: SortBy) => void
}

export function SearchFilters({
  query,
  onQueryChange,
  groupBy,
  onGroupByChange,
  filterBy,
  onFilterChange,
  sortBy,
  onSortChange,
}: SearchFiltersProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-10 overflow-hidden rounded-2xl border border-traveloop-sky/22 bg-[#0B0F1A]/45 p-4 shadow-[0_0_40px_rgba(56,73,89,0.35)] backdrop-blur-xl md:p-6"
    >
      <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-traveloop-sky/12 blur-3xl" />
      <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:items-end">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 z-[1] h-4 w-4 -translate-y-1/2 text-traveloop-sky" strokeWidth={1.75} />
          <GlassInput
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search trips, destinations, or dates…"
            className="border-traveloop-sky/30 pl-10"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-traveloop-ice/65">Group by</label>
          <select className={selectClass} value={groupBy} onChange={(e) => onGroupByChange(e.target.value as GroupBy)}>
            <option value="status">Status</option>
            <option value="destination">Destination</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-traveloop-ice/65">Filter</label>
          <select className={selectClass} value={filterBy} onChange={(e) => onFilterChange(e.target.value as FilterBy)}>
            <option value="all">All trips</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-traveloop-ice/65">Sort</label>
          <select className={selectClass} value={sortBy} onChange={(e) => onSortChange(e.target.value as SortBy)}>
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="budget">Budget</option>
          </select>
        </div>
      </div>
    </motion.section>
  )
}
