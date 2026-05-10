import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

import { cn } from '@/lib/utils'

type DiscoverSearchBarProps = {
  value: string
  onChange: (v: string) => void
  className?: string
}

export function DiscoverSearchBar({ value, onChange, className }: DiscoverSearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.45 }}
      className={cn('relative', className)}
    >
      <motion.span
        className="pointer-events-none absolute left-4 top-1/2 z-[1] -translate-y-1/2 text-traveloop-sky"
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Search className="h-5 w-5" strokeWidth={1.7} />
      </motion.span>
      <motion.input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search activities, destinations, or adventures…"
        autoComplete="off"
        whileFocus={{ boxShadow: '0 0 0 2px rgba(136,189,242,0.35), 0 0 32px rgba(136,189,242,0.15)' }}
        transition={{ duration: 0.25 }}
        className="w-full rounded-xl border border-traveloop-sky/28 bg-[#0B0F1A]/5 py-3.5 pl-12 pr-4 text-sm text-traveloop-ice shadow-inner-glow backdrop-blur-xl transition-colors placeholder:text-traveloop-ice/45 focus:border-traveloop-sky/65 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/30 hover:border-traveloop-ice/35 md:py-4 md:text-[15px]"
      />
      <span className="pointer-events-none absolute bottom-3 right-5 hidden h-4 w-px animate-pulse bg-traveloop-sky/50 md:block" aria-hidden />
    </motion.div>
  )
}
