import { motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'

const selectClass =
  'h-12 w-full cursor-pointer appearance-none rounded-xl border border-traveloop-sky/30 bg-[#080c16] px-4 pr-10 text-sm font-medium text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-colors [color-scheme:dark] hover:border-traveloop-ice/35 hover:bg-[#0c111d] focus:border-traveloop-sky/55 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/25 md:min-w-[180px]'

type Props = {
  query: string
  onQuery: (v: string) => void
  filter: string
  onFilter: (v: string) => void
  sort: string
  onSort: (v: string) => void
}

export function BillingSearchFilters({ query, onQuery, filter, onFilter, sort, onSort }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="rounded-2xl border border-traveloop-sky/20 bg-[#080c16]/75 p-4 shadow-inner-glow backdrop-blur-xl md:p-5"
    >
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search invoices, destinations, or bookings..."
            className="h-12 w-full rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/65 py-2.5 pl-11 pr-4 text-sm text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-all placeholder:text-traveloop-ice/45 focus:border-traveloop-sky/70 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/35"
          />
        </div>
        <div className="relative">
          <select value={filter} onChange={(e) => onFilter(e.target.value)} className={selectClass}>
            {['All', 'Hotel', 'Travel', 'Meals', 'Transport', 'Paid', 'Pending', 'Failed'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
        </div>
        <div className="relative">
          <select value={sort} onChange={(e) => onSort(e.target.value)} className={selectClass}>
            {['Newest', 'Amount: High to Low', 'Amount: Low to High', 'Category'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
        </div>
      </div>
    </motion.section>
  )
}
