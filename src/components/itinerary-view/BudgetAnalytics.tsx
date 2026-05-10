import { motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { BUDGET_CHART_ROWS } from '@/components/itinerary-view/itineraryViewMock'

type Row = (typeof BUDGET_CHART_ROWS)[number]

type BudgetAnalyticsProps = {
  data: Row[]
}

const tip = {
  backgroundColor: 'rgba(8, 11, 22, 0.94)',
  border: '1px solid rgba(136, 189, 242, 0.38)',
  borderRadius: 12,
  color: '#BDDDFC',
  backdropFilter: 'blur(10px)',
}

export function BudgetAnalytics({ data }: BudgetAnalyticsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-traveloop-sky/20 bg-[#080c16]/75 p-5 shadow-[0_0_36px_rgba(56,73,89,0.35)] backdrop-blur-xl md:p-6"
      >
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Spend mix</h3>
        <p className="mt-1 text-xs text-traveloop-ice/50">Stay, food, transport, and activities</p>
        <div className="mt-4 h-[280px] w-full md:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 8, bottom: 8 }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={108}
                paddingAngle={3}
                stroke="rgba(11,15,26,0.9)"
                strokeWidth={2}
                animationDuration={900}
              >
                {data.map((entry) => (
                  <Cell key={entry.key} fill={entry.fill} className="drop-shadow-[0_0_12px_rgba(136,189,242,0.25)]" />
                ))}
              </Pie>
              <Tooltip contentStyle={tip} formatter={(v) => [`$${Number(v ?? 0)}`, 'Amount']} />
              <Legend
                verticalAlign="bottom"
                formatter={(value) => <span className="text-xs font-medium text-traveloop-ice/90">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 }}
        className="rounded-3xl border border-traveloop-sky/20 bg-[#080c16]/75 p-5 shadow-[0_0_36px_rgba(56,73,89,0.35)] backdrop-blur-xl md:p-6"
      >
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Category bars</h3>
        <p className="mt-1 text-xs text-traveloop-ice/50">Comparative footprint</p>
        <div className="mt-4 h-[280px] w-full md:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 12, right: 8, left: 4, bottom: 4 }} barSize={28}>
              <CartesianGrid strokeDasharray="4 8" stroke="rgba(106,137,167,0.2)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#BDDDFC', fontSize: 11 }} axisLine={{ stroke: 'rgba(136,189,242,0.25)' }} />
              <YAxis tick={{ fill: '#6A89A7', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tip} formatter={(v) => [`$${Number(v ?? 0)}`, '']} />
              <Bar dataKey="value" radius={[10, 10, 4, 4]} animationDuration={900}>
                {data.map((d) => (
                  <Cell key={d.key} fill={d.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
