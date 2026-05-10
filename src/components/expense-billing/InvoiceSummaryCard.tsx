import { motion } from 'framer-motion'
import { CalendarDays, Hash, User } from 'lucide-react'
import type { ReactNode } from 'react'

import { PaymentStatusChip } from '@/components/expense-billing/PaymentStatusChip'
import type { InvoiceSummary } from '@/components/expense-billing/types'

export function InvoiceSummaryCard({ invoice }: { invoice: InvoiceSummary }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      whileHover={{ y: -3, boxShadow: '0 28px 80px rgba(136,189,242,0.16)' }}
      className="relative overflow-hidden rounded-3xl border border-traveloop-sky/24 bg-gradient-to-br from-[#0B0F1A]/85 via-[#101725]/80 to-[#0B0F1A]/90 p-5 shadow-inner-glow backdrop-blur-xl md:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(136,189,242,0.2),transparent_45%)]" />
      <div className="relative grid gap-5 lg:grid-cols-[1.2fr_1.4fr]">
        <div className="flex gap-4">
          <img src={invoice.imageUrl} alt={invoice.tripTitle} className="h-20 w-20 shrink-0 rounded-2xl border border-traveloop-sky/30 object-cover md:h-24 md:w-24" />
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-white md:text-xl">{invoice.tripTitle}</h2>
            <p className="mt-1 text-sm text-traveloop-ice/70">{invoice.travelDates}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-traveloop-sky/28 bg-traveloop-sky/10 px-2.5 py-1 text-traveloop-ice">{invoice.totalCities} cities visited</span>
              <span className="rounded-full border border-traveloop-slate/45 bg-white/[0.03] px-2.5 py-1 text-traveloop-ice/70">By {invoice.creatorName}</span>
            </div>
            <p className="mt-2 text-xs text-traveloop-ice/55">{invoice.creatorRole}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <InfoTile icon={<Hash className="h-3.5 w-3.5" />} label="Invoice ID" value={invoice.invoiceId} />
          <InfoTile icon={<CalendarDays className="h-3.5 w-3.5" />} label="Generated Date" value={invoice.generatedDate} />
          <InfoTile icon={<User className="h-3.5 w-3.5" />} label="Traveler" value={invoice.traveler} />
          <div className="rounded-xl border border-traveloop-sky/20 bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-traveloop-steel">Payment Status</p>
            <div className="mt-2">
              <PaymentStatusChip status={invoice.status} />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function InfoTile({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-traveloop-sky/20 bg-white/[0.03] p-3">
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-traveloop-steel">
        {icon}
        {label}
      </p>
      <p className="mt-1.5 text-sm font-semibold text-traveloop-ice">{value}</p>
    </div>
  )
}
