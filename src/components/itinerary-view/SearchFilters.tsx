import { motion } from 'framer-motion'
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'

export type GroupByItin = 'day' | 'category' | 'destination'
export type FilterItin = 'all' | 'Food' | 'Adventure' | 'Museums' | 'Nightlife' | 'Leisure'
export type SortItin = 'chronological' | 'cost_desc' | 'duration'

type SearchFiltersProps = {
  query: string
  onQuery: (q: string) => void
  groupBy: GroupByItin
  onGroupBy: (v: GroupByItin) => void
  filter: FilterItin
  onFilter: (v: FilterItin) => void
  sort: SortItin
  onSort: (v: SortItin) => void
  mobileOpen: boolean
  onMobileOpen: (v: boolean) => void
}

const selectBase =
  'w-full cursor-pointer appearance-none rounded-xl border border-traveloop-sky/30 bg-[#080c16] py-2.5 pl-3 pr-9 text-sm font-medium text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-colors [color-scheme:dark] hover:border-traveloop-ice/35 hover:bg-[#0c111d] focus:border-traveloop-sky/55 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/25 md:py-3'

const optClass = 'bg-[#080c16] text-traveloop-ice'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">{label}</span>
      <div className="relative">{children}</div>
    </div>
  )
}

function ChevDown() {
  return (
    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-traveloop-sky/80">
      <ChevronDown className="h-4 w-4" strokeWidth={1.8} />
    </span>
  )
}

export function SearchFilters({
  query,
  onQuery,
  groupBy,
  onGroupBy,
  filter,
  onFilter,
  sort,
  onSort,
  mobileOpen,
  onMobileOpen,
}: SearchFiltersProps) {
  const dropdowns = (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      <Field label="Group by">
        <select value={groupBy} onChange={(e) => onGroupBy(e.target.value as GroupByItin)} className={selectBase}>
          <option className={optClass} value="day">
            Day
          </option>
          <option className={optClass} value="category">
            Category
          </option>
          <option className={optClass} value="destination">
            Destination
          </option>
        </select>
        <ChevDown />
      </Field>
      <Field label="Filter">
        <select value={filter} onChange={(e) => onFilter(e.target.value as FilterItin)} className={selectBase}>
          <option className={optClass} value="all">
            All experiences
          </option>
          <option className={optClass} value="Food">
            Food
          </option>
          <option className={optClass} value="Adventure">
            Adventure
          </option>
          <option className={optClass} value="Museums">
            Museums
          </option>
          <option className={optClass} value="Nightlife">
            Nightlife
          </option>
          <option className={optClass} value="Leisure">
            Leisure
          </option>
        </select>
        <ChevDown />
      </Field>
      <Field label="Sort by">
        <select value={sort} onChange={(e) => onSort(e.target.value as SortItin)} className={selectBase}>
          <option className={optClass} value="chronological">
            Chronological
          </option>
          <option className={optClass} value="cost_desc">
            Cost · High to low
          </option>
          <option className={optClass} value="duration">
            Duration
          </option>
        </select>
        <ChevDown />
      </Field>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <motion.span
          className="pointer-events-none absolute left-4 top-1/2 z-[1] -translate-y-1/2 text-traveloop-sky"
          animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Search className="h-5 w-5" strokeWidth={1.7} />
        </motion.span>
        <motion.input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search itinerary activities or destinations…"
          whileFocus={{
            boxShadow: '0 0 0 2px rgba(136,189,242,0.35), 0 0 28px rgba(136,189,242,0.12)',
          }}
          className="w-full rounded-xl border border-traveloop-sky/28 bg-[#080c16] py-3.5 pl-12 pr-4 text-sm text-traveloop-ice shadow-inner-glow backdrop-blur-xl transition-colors [color-scheme:dark] placeholder:text-traveloop-ice/45 focus:border-traveloop-sky/60 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/25 hover:border-traveloop-ice/35 md:py-4 md:text-[15px]"
        />
      </div>

      <div className="flex items-center justify-between lg:hidden">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => onMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 rounded-xl border border-traveloop-sky/30 bg-[#080c16] px-4 py-2.5 text-sm font-semibold text-traveloop-ice backdrop-blur-md"
        >
          <SlidersHorizontal className="h-4 w-4 text-traveloop-sky" />
          {mobileOpen ? 'Hide filters' : 'Filters & sort'}
          <motion.span animate={{ rotate: mobileOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </div>

      <div className={cn(!mobileOpen && 'max-lg:hidden')}>{dropdowns}</div>
    </div>
  )
}
