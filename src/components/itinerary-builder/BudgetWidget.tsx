import { motion } from 'framer-motion'
import { Wallet } from 'lucide-react'
import { useId } from 'react'

type BudgetWidgetProps = {
  totalBudget: number
  spent: number
}

export function BudgetWidget({ totalBudget, spent }: BudgetWidgetProps) {
  const gid = useId().replace(/:/g, '')
  const remaining = Math.max(0, totalBudget - spent)
  const pct = totalBudget > 0 ? Math.min(100, (spent / totalBudget) * 100) : 0
  const circumference = 2 * Math.PI * 40
  const dashOffset = circumference * (1 - pct / 100)
  const gradId = `budgetGrad-${gid}`

  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-2xl border border-traveloop-sky/25 bg-[#0B0F1A]/55 p-4 shadow-inner-glow backdrop-blur-xl md:p-5"
    >
      <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full bg-traveloop-sky/15 blur-2xl" />
      <div className="relative flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-traveloop-sky/30 bg-traveloop-slate/25 text-traveloop-sky">
          <Wallet className="h-5 w-5" strokeWidth={1.6} />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Live budget</p>
          <p className="mt-1 text-2xl font-semibold text-white">${spent.toLocaleString()}</p>
          <p className="text-xs text-traveloop-ice/55">of ${totalBudget.toLocaleString()} planned</p>
        </div>
      </div>
      <div className="relative mx-auto mt-5 flex h-36 w-36 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(56,73,89,0.55)" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={false}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#88BDF2" />
              <stop offset="100%" stopColor="#BDDDFC" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-traveloop-steel">Left</p>
          <motion.p key={remaining} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-lg font-bold text-white">
            ${remaining.toLocaleString()}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
