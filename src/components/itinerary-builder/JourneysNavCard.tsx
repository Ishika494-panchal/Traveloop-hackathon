import { AnimatePresence, motion } from 'framer-motion'
import { Backpack, CalendarFold, Compass, FileText, LayoutList, ReceiptText, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function JourneysNavCard() {
  const [open, setOpen] = useState(false)

  return (
    <div className="h-0">
      <motion.button
        whileHover={{ scale: 1.06, y: -1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((s) => !s)}
        aria-label={open ? 'Hide more options' : 'Show more options'}
        className="fixed bottom-6 right-4 z-[9999] inline-flex h-12 w-12 items-center justify-center rounded-full border border-traveloop-sky/35 bg-gradient-to-br from-[#0f1a2b]/95 to-[#0B0F1A]/95 text-traveloop-ice shadow-[0_0_30px_rgba(136,189,242,0.35)] backdrop-blur-xl transition hover:border-traveloop-ice/55 md:right-8"
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-32 right-4 z-[9999] flex w-[300px] flex-col gap-2 rounded-2xl border border-traveloop-sky/22 bg-[#0B0F1A]/92 p-3 shadow-inner-glow backdrop-blur-xl md:right-8"
          >
            <p className="mb-1 px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-traveloop-steel">More</p>
        <Link
          to="/journeys"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 rounded-xl border border-traveloop-slate/40 bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-traveloop-ice transition-all hover:border-traveloop-sky/45 hover:bg-traveloop-sky/10 hover:text-white"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-traveloop-sky/25 bg-traveloop-slate/25 text-traveloop-sky transition-colors group-hover:border-traveloop-ice/30">
            <LayoutList className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="min-w-0">
            <span className="block truncate">View user listing</span>
            <span className="block truncate text-xs font-normal text-traveloop-ice/50">My travel journeys</span>
          </span>
        </Link>
        <Link
          to="/discover"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 rounded-xl border border-traveloop-slate/40 bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-traveloop-ice transition-all hover:border-traveloop-sky/45 hover:bg-traveloop-sky/10 hover:text-white"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-traveloop-sky/25 bg-traveloop-slate/25 text-traveloop-sky transition-colors group-hover:border-traveloop-ice/30">
            <Compass className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="min-w-0">
            <span className="block truncate">Explore activities and cities</span>
            <span className="block truncate text-xs font-normal text-traveloop-ice/50">Activity & city search</span>
          </span>
        </Link>
        <Link
          to="/itinerary/view"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 rounded-xl border border-traveloop-slate/40 bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-traveloop-ice transition-all hover:border-traveloop-sky/45 hover:bg-traveloop-sky/10 hover:text-white"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-traveloop-sky/25 bg-traveloop-slate/25 text-traveloop-sky transition-colors group-hover:border-traveloop-ice/30">
            <CalendarFold className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="min-w-0">
            <span className="block truncate">View itinerary</span>
            <span className="block truncate text-xs font-normal text-traveloop-ice/50">Journey timeline & budgets</span>
          </span>
        </Link>
        <Link
          to="/packing-checklist"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 rounded-xl border border-traveloop-slate/40 bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-traveloop-ice transition-all hover:border-traveloop-sky/45 hover:bg-traveloop-sky/10 hover:text-white"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-traveloop-sky/25 bg-traveloop-slate/25 text-traveloop-sky transition-colors group-hover:border-traveloop-ice/30">
            <Backpack className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="min-w-0">
            <span className="block truncate">Packing checklist</span>
            <span className="block truncate text-xs font-normal text-traveloop-ice/50">Smart packing assistant</span>
          </span>
        </Link>
        <Link
          to="/trip-notes"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 rounded-xl border border-traveloop-slate/40 bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-traveloop-ice transition-all hover:border-traveloop-sky/45 hover:bg-traveloop-sky/10 hover:text-white"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-traveloop-sky/25 bg-traveloop-slate/25 text-traveloop-sky transition-colors group-hover:border-traveloop-ice/30">
            <FileText className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="min-w-0">
            <span className="block truncate">Trip notes & journal</span>
            <span className="block truncate text-xs font-normal text-traveloop-ice/50">Voice + markdown notes</span>
          </span>
        </Link>
        <Link
          to="/expense-billing"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 rounded-xl border border-traveloop-slate/40 bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-traveloop-ice transition-all hover:border-traveloop-sky/45 hover:bg-traveloop-sky/10 hover:text-white"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-traveloop-sky/25 bg-traveloop-slate/25 text-traveloop-sky transition-colors group-hover:border-traveloop-ice/30">
            <ReceiptText className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="min-w-0">
            <span className="block truncate">Expense invoice & billing</span>
            <span className="block truncate text-xs font-normal text-traveloop-ice/50">Trip expense dashboard</span>
          </span>
        </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
