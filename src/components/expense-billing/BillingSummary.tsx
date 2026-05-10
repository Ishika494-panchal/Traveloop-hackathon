import { motion } from 'framer-motion'

type Props = {
  subtotal: number
  tax: number
  discount: number
  total: number
}

export function BillingSummary({ subtotal, tax, discount, total }: Props) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="ml-auto w-full max-w-sm rounded-2xl border border-traveloop-sky/25 bg-[#0B0F1A]/75 p-4 shadow-inner-glow backdrop-blur-xl"
    >
      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Billing Summary</h4>
      <div className="mt-3 space-y-2.5 text-sm">
        <Row label="Subtotal" value={fmt(subtotal)} />
        <Row label="Tax" value={fmt(tax)} />
        <Row label="Discount" value={`-${fmt(discount)}`} />
      </div>
      <div className="mt-3 rounded-xl border border-traveloop-sky/30 bg-gradient-to-r from-traveloop-sky/14 to-traveloop-slate/35 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-traveloop-ice">Grand Total</span>
          <motion.span initial={{ opacity: 0.7 }} animate={{ opacity: [0.7, 1, 0.8] }} transition={{ repeat: Infinity, duration: 1.8 }} className="text-lg font-bold text-white">
            {fmt(total)}
          </motion.span>
        </div>
      </div>
    </motion.aside>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-traveloop-slate/35 bg-white/[0.03] px-3 py-2">
      <span className="text-traveloop-ice/70">{label}</span>
      <span className="font-semibold text-traveloop-ice">{value}</span>
    </div>
  )
}

function fmt(v: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
}
