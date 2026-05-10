import { motion } from 'framer-motion'

import type { ExpenseRow } from '@/components/expense-billing/types'

export function ExpenseTable({ rows }: { rows: ExpenseRow[] }) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-traveloop-sky/20 bg-[#0B0F1A]/65 backdrop-blur-xl md:block">
        <table className="w-full text-left">
          <thead className="bg-[#101827]/85">
            <tr className="text-xs uppercase tracking-[0.16em] text-traveloop-steel">
              {['#', 'Category', 'Description', 'Qty / Details', 'Unit Cost', 'Amount'].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.22) }}
                className="border-t border-traveloop-sky/12 transition hover:bg-traveloop-sky/10"
              >
                <td className="px-4 py-3 text-sm text-traveloop-ice/60">{row.id}</td>
                <td className="px-4 py-3 text-sm font-medium text-traveloop-ice">{row.category}</td>
                <td className="px-4 py-3 text-sm text-traveloop-ice/90">{row.description}</td>
                <td className="px-4 py-3 text-sm text-traveloop-ice/75">{row.details}</td>
                <td className="px-4 py-3 text-sm text-traveloop-ice/80">{money(row.unitCost)}</td>
                <td className="px-4 py-3 text-sm font-semibold text-white">{money(row.amount)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {rows.map((row, i) => (
          <motion.article
            key={row.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.2) }}
            className="rounded-xl border border-traveloop-sky/20 bg-[#0B0F1A]/70 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{row.category}</p>
              <p className="text-sm font-bold text-traveloop-ice">{money(row.amount)}</p>
            </div>
            <p className="mt-1 text-sm text-traveloop-ice/85">{row.description}</p>
            <p className="mt-2 text-xs text-traveloop-ice/65">{row.details} · Unit {money(row.unitCost)}</p>
          </motion.article>
        ))}
      </div>
    </>
  )
}

function money(v: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
}
