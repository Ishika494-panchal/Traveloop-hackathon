import { motion } from 'framer-motion'

export function BillingFloatingWidgets() {
  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-40 hidden w-[220px] flex-col gap-2 2xl:flex">
      {[
        ['Payment success rate', '96.4%'],
        ['Monthly expense trend', '+12.8%'],
        ['Exchange rate (USD/EUR)', '0.92'],
        ['Active invoices', '14'],
      ].map(([k, v], i) => (
        <motion.div
          key={k}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.05 }}
          className="rounded-xl border border-traveloop-sky/20 bg-[#0B0F1A]/55 px-3 py-2.5 shadow-glow backdrop-blur-xl"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-traveloop-steel">{k}</p>
          <p className="mt-1 text-sm font-bold text-white">{v}</p>
        </motion.div>
      ))}
    </div>
  )
}
