import { motion } from 'framer-motion'
import { CheckCircle2, Download, FileText } from 'lucide-react'

export function BillingActionButtons({ onMarkPaid }: { onMarkPaid: () => void }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition md:min-w-[170px]'

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className={`${base} border-traveloop-sky/35 bg-[#0B0F1A]/70 text-traveloop-ice hover:border-traveloop-ice/45`}>
        <Download className="h-4 w-4" />
        Download Invoice
      </motion.button>
      <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className={`${base} border-traveloop-sky/30 bg-gradient-to-r from-traveloop-sky/22 to-traveloop-slate/40 text-white hover:border-traveloop-ice/50`}>
        <FileText className="h-4 w-4" />
        Export as PDF
      </motion.button>
      <motion.button
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onMarkPaid}
        className={`${base} border-emerald-300/45 bg-emerald-400/12 text-emerald-100 hover:border-emerald-200/60`}
      >
        <CheckCircle2 className="h-4 w-4" />
        Mark as Paid
      </motion.button>
    </div>
  )
}
