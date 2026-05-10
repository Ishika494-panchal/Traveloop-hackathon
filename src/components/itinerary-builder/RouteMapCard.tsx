import { motion } from 'framer-motion'
import { Route } from 'lucide-react'
import { useId } from 'react'

import { cn } from '@/lib/utils'

type RouteMapCardProps = {
  cities: string[]
}

export function RouteMapCard({ cities }: RouteMapCardProps) {
  const rid = useId().replace(/:/g, '')
  const gradId = `routeGlow-${rid}`
  const route = cities.length ? cities.join(' → ') : 'Plot your corridor'

  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-2xl border border-traveloop-sky/22 bg-[#0B0F1A]/50 p-4 shadow-inner-glow backdrop-blur-xl md:p-5"
    >
      <div className="relative mb-3 flex items-center gap-2">
        <Route className="h-4 w-4 text-traveloop-sky" strokeWidth={1.75} />
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Route preview</p>
      </div>
      <div className="relative h-28 overflow-hidden rounded-xl border border-traveloop-slate/40 bg-gradient-to-br from-traveloop-slate/30 to-[#0B0F1A]">
        <svg viewBox="0 0 200 80" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#88BDF2" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#BDDDFC" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#88BDF2" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 10 50 Q 60 10 100 45 T 190 35"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          {[30, 100, 170].map((cx, i) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy={i === 1 ? 45 : i === 0 ? 48 : 36}
              r="4"
              fill="#BDDDFC"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
            />
          ))}
        </svg>
      </div>
      <p className={cn('mt-3 truncate text-xs text-traveloop-ice/70')} title={route}>
        {route}
      </p>
    </motion.div>
  )
}
