import { motion } from 'framer-motion'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'

import { ACTIVITY_CATEGORIES } from '@/components/discover/activitiesMock'
import { cn } from '@/lib/utils'

export type GroupByOption = 'none' | 'city' | 'category' | 'price'
export type RefineOption = 'any' | 'budget' | 'half_day' | 'high_rated' | 'popular'
export type SortOption = 'popularity' | 'rating' | 'price_asc' | 'price_desc' | 'duration'

type DiscoverFilterDropdownsProps = {
  groupBy: GroupByOption
  onGroupBy: (v: GroupByOption) => void
  category: string
  onCategory: (v: string) => void
  refine: RefineOption
  onRefine: (v: RefineOption) => void
  sort: SortOption
  onSort: (v: SortOption) => void
  mobileOpen: boolean
  onMobileOpen: (v: boolean) => void
}

/** Solid dark surface — low-opacity bg lets the OS paint bright form controls. */
const selectBase =
  'w-full cursor-pointer appearance-none rounded-xl border border-traveloop-sky/30 bg-[#080c16] py-2.5 pl-3 pr-9 text-sm font-medium text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-colors [color-scheme:dark] hover:border-traveloop-ice/35 hover:bg-[#0c111d] focus:border-traveloop-sky/55 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/25 md:py-3'

const optClass = 'bg-[#080c16] text-traveloop-ice'

function Label({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">{children}</span>
}

function ChevronWrap() {
  return (
    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-traveloop-sky/80">
      <ChevronDown className="h-4 w-4" strokeWidth={1.8} />
    </span>
  )
}

export function DiscoverFilterDropdowns({
  groupBy,
  onGroupBy,
  category,
  onCategory,
  refine,
  onRefine,
  sort,
  onSort,
  mobileOpen,
  onMobileOpen,
}: DiscoverFilterDropdownsProps) {
  const panel = (
    <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      <div className="relative">
        <Label>Group by</Label>
        <select value={groupBy} onChange={(e) => onGroupBy(e.target.value as GroupByOption)} className={selectBase}>
          <option className={optClass} value="none">
            No grouping
          </option>
          <option className={optClass} value="city">
            City
          </option>
          <option className={optClass} value="category">
            Category
          </option>
          <option className={optClass} value="price">
            Price band
          </option>
        </select>
        <ChevronWrap />
      </div>
      <div className="relative">
        <Label>Filter</Label>
        <select value={category} onChange={(e) => onCategory(e.target.value)} className={selectBase}>
          <option className={optClass} value="all">
            All categories
          </option>
          {ACTIVITY_CATEGORIES.map((c) => (
            <option key={c} className={optClass} value={c}>
              {c}
            </option>
          ))}
        </select>
        <ChevronWrap />
      </div>
      <div className="relative">
        <Label>Refine</Label>
        <select value={refine} onChange={(e) => onRefine(e.target.value as RefineOption)} className={selectBase}>
          <option className={optClass} value="any">
            Any
          </option>
          <option className={optClass} value="budget">
            Cost · Budget friendly
          </option>
          <option className={optClass} value="half_day">
            Duration · Half day or less
          </option>
          <option className={optClass} value="high_rated">
            Rating · 4.8+
          </option>
          <option className={optClass} value="popular">
            Popularity · Top 90%+
          </option>
        </select>
        <ChevronWrap />
      </div>
      <div className="relative">
        <Label>Sort by</Label>
        <select value={sort} onChange={(e) => onSort(e.target.value as SortOption)} className={selectBase}>
          <option className={optClass} value="popularity">
            Popularity
          </option>
          <option className={optClass} value="rating">
            Rating
          </option>
          <option className={optClass} value="price_asc">
            Price · Low to high
          </option>
          <option className={optClass} value="price_desc">
            Price · High to low
          </option>
          <option className={optClass} value="duration">
            Duration
          </option>
        </select>
        <ChevronWrap />
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between lg:hidden">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => onMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 rounded-xl border border-traveloop-sky/30 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-traveloop-ice backdrop-blur-md"
        >
          <SlidersHorizontal className="h-4 w-4 text-traveloop-sky" />
          {mobileOpen ? 'Hide filters' : 'Filters & sort'}
          <motion.span animate={{ rotate: mobileOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </div>

      <div className={cn(!mobileOpen && 'max-lg:hidden')}>{panel}</div>
    </div>
  )
}
