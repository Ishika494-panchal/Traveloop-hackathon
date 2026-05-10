import { animate, motion } from 'framer-motion'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { ExpenseInfo } from '@/components/itinerary-view/itineraryViewMock'
import { cn } from '@/lib/utils'

function TrendIcon({ n }: { n: number }) {
  if (n > 2) return <TrendingUp className="h-3 w-3 text-emerald-300/95" strokeWidth={1.8} />
  if (n < -2) return <TrendingDown className="h-3 w-3 text-rose-300/95" strokeWidth={1.8} />
  return (
    <span className="h-3 w-3 rounded-full border border-traveloop-steel/50" aria-hidden />
  )
}

type ExpenseCardProps = {
  expense: ExpenseInfo
  index: number
}

export function ExpenseCard({ expense, index }: ExpenseCardProps) {
  const [n, setN] = useState(0)

  useEffect(() => {
    setN(0)
    let k: ReturnType<typeof animate> | null = null
    const t = window.setTimeout(() => {
      k = animate(0, expense.amount, {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: setN,
      })
    }, 80 + index * 40)
    return () => {
      window.clearTimeout(t)
      k?.stop()
    }
  }, [expense.amount, index])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={cn(
        'flex flex-col rounded-2xl border border-traveloop-sky/30 bg-[#080c16]/92 p-4 shadow-inner-glow backdrop-blur-xl',
        'min-h-[120px] justify-between hover:border-traveloop-ice/35 hover:shadow-[0_0_24px_rgba(136,189,242,0.15)]',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-traveloop-steel">{expense.category}</span>
        <TrendIcon n={expense.indicator} />
      </div>
      <p className="mt-2 bg-gradient-to-r from-white via-traveloop-ice to-traveloop-sky bg-clip-text text-2xl font-bold text-transparent">
        ${Math.round(n)}
      </p>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-traveloop-slate/60">
        <motion.div
          className={cn(
            'h-full rounded-full',
            expense.indicator >= 5 ? 'bg-gradient-to-r from-emerald-400/70 to-teal-400/50' : 'bg-gradient-to-r from-traveloop-steel via-traveloop-sky to-traveloop-ice',
          )}
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(92, Math.max(22, expense.amount * 3))}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + index * 0.04, duration: 0.75 }}
        />
      </div>
    </motion.div>
  )
}
