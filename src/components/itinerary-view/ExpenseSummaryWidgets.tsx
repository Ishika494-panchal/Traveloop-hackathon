import { animate, motion } from 'framer-motion'
import { PiggyBank, Scale, TrendingUp, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'

import { BUDGET_SUMMARY } from '@/components/itinerary-view/itineraryViewMock'

function useAnimatedInt(target: number, delay = 0) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    let ctl: ReturnType<typeof animate> | null = null
    const t = window.setTimeout(() => {
      ctl = animate(0, target, {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setN(Math.round(v)),
      })
    }, delay)
    return () => {
      window.clearTimeout(t)
      ctl?.stop()
    }
  }, [target, delay])
  return n
}

const items = [
  { label: 'Total budget', icon: Wallet },
  { label: 'Total spent', icon: TrendingUp },
  { label: 'Remaining', icon: PiggyBank },
  { label: 'Avg daily', icon: Scale },
] as const

export function ExpenseSummaryWidgets() {
  const b = useAnimatedInt(BUDGET_SUMMARY.totalBudget, 80)
  const s = useAnimatedInt(BUDGET_SUMMARY.totalSpent, 120)
  const r = useAnimatedInt(BUDGET_SUMMARY.remaining, 160)
  const a = useAnimatedInt(BUDGET_SUMMARY.avgDailySpend, 200)
  const values = [b, s, r, a]

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-traveloop-sky/24 bg-[#080c16]/88 p-4 shadow-inner-glow backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-traveloop-sky/25 bg-traveloop-slate/35 text-traveloop-sky">
              <it.icon className="h-[18px] w-[18px]" strokeWidth={1.65} />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">{it.label}</span>
          </div>
          <p className="mt-4 bg-gradient-to-r from-white via-traveloop-ice to-traveloop-sky bg-clip-text text-2xl font-bold text-transparent md:text-[1.65rem]">
            ${values[i].toLocaleString()}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
