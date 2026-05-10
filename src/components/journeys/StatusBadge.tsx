import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import type { JourneyStatus } from './types'

const styles: Record<
  JourneyStatus,
  { label: string; className: string; pulse: string }
> = {
  ongoing: {
    label: 'Ongoing',
    className: 'border-traveloop-sky/55 bg-traveloop-sky/15 text-traveloop-ice shadow-[0_0_20px_rgba(136,189,242,0.35)]',
    pulse: 'from-traveloop-sky/40 to-transparent',
  },
  upcoming: {
    label: 'Upcoming',
    className: 'border-violet-400/35 bg-violet-500/10 text-violet-100/95 shadow-[0_0_18px_rgba(139,92,246,0.25)]',
    pulse: 'from-violet-400/35 to-transparent',
  },
  completed: {
    label: 'Completed',
    className: 'border-emerald-400/35 bg-emerald-500/10 text-emerald-100/95 shadow-[0_0_16px_rgba(52,211,153,0.2)]',
    pulse: 'from-emerald-400/30 to-transparent',
  },
}

export function StatusBadge({ status }: { status: JourneyStatus }) {
  const s = styles[status]
  return (
    <span className="relative inline-flex">
      <motion.span
        className={cn(
          'pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r opacity-40 blur-md',
          s.pulse,
        )}
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span
        className={cn(
          'relative inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest backdrop-blur-sm',
          s.className,
        )}
      >
        {s.label}
      </span>
    </span>
  )
}
