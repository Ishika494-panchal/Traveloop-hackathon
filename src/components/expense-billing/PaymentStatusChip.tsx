import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Clock3 } from 'lucide-react'

import type { PaymentStatus } from '@/components/expense-billing/types'
import { cn } from '@/lib/utils'

const styles: Record<PaymentStatus, string> = {
  Pending: 'border-amber-300/45 bg-amber-300/12 text-amber-100',
  Paid: 'border-emerald-300/45 bg-emerald-300/12 text-emerald-100',
  Failed: 'border-rose-300/45 bg-rose-300/12 text-rose-100',
}

const icons = {
  Pending: Clock3,
  Paid: CheckCircle2,
  Failed: AlertTriangle,
}

export function PaymentStatusChip({ status }: { status: PaymentStatus }) {
  const Icon = icons[status]

  return (
    <motion.span
      initial={{ opacity: 0.8 }}
      animate={{ opacity: [0.8, 1, 0.85] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide shadow-[0_0_18px_rgba(136,189,242,0.2)]',
        styles[status],
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </motion.span>
  )
}
