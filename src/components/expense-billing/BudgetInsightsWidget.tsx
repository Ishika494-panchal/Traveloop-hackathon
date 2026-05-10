import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts'

type Props = {
  totalBudget: number
  totalSpent: number
}

export function BudgetInsightsWidget({ totalBudget, totalSpent }: Props) {
  const remaining = Math.max(totalBudget - totalSpent, 0)
  const usedPct = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0
  const chartData = [{ value: usedPct, fill: '#88BDF2' }]

  return (
    <motion.aside
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-traveloop-sky/24 bg-[#0B0F1A]/75 p-5 shadow-[0_25px_55px_rgba(136,189,242,0.14)] backdrop-blur-xl"
    >
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Budget Insights</h3>
      <div className="mt-4 h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart data={chartData} startAngle={90} endAngle={-270} innerRadius="65%" outerRadius="95%" barSize={12}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" background={{ fill: '#384959', opacity: 0.35 }} cornerRadius={8} animationDuration={1300} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="-mt-28 text-center">
        <p className="text-[10px] uppercase tracking-[0.16em] text-traveloop-steel">Spent</p>
        <p className="text-2xl font-bold text-white">{usedPct}%</p>
      </div>
      <div className="mt-7 space-y-2 text-sm">
        <Line label="Total Budget" value={toMoney(totalBudget)} />
        <Line label="Total Spent" value={toMoney(totalSpent)} />
        <Line label="Remaining Balance" value={toMoney(remaining)} strong />
      </div>
      <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-traveloop-sky/30 bg-gradient-to-r from-traveloop-sky/22 to-traveloop-slate/40 px-3 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.01] hover:border-traveloop-ice/45">
        View Full Budget <ArrowUpRight className="h-4 w-4" />
      </button>
    </motion.aside>
  )
}

function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-traveloop-slate/35 bg-white/[0.03] px-3 py-2">
      <span className="text-traveloop-ice/70">{label}</span>
      <span className={strong ? 'font-bold text-white' : 'font-semibold text-traveloop-ice'}>{value}</span>
    </div>
  )
}

function toMoney(v: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
}
