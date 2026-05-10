import { AnimatePresence, motion } from 'framer-motion'
import { Coins, LayoutDashboard, Plane, X } from 'lucide-react'
import { useState } from 'react'

import { WeatherWidget } from '@/components/dashboard/WeatherWidget'

export function FloatingWidgets() {
  const [open, setOpen] = useState(false)

  return (
    <div className="pointer-events-none fixed left-4 top-24 z-40 md:left-8 md:top-28">
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Travel widgets"
            initial={{ opacity: 0, x: -16, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="pointer-events-auto relative flex w-[min(calc(100vw-2rem),220px)] max-w-[220px] flex-col gap-3"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close widgets"
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-traveloop-sky/30 bg-[#0B0F1A]/70 text-traveloop-ice shadow-glow-sm backdrop-blur-xl transition-colors hover:border-traveloop-ice/40 hover:bg-[#0B0F1A]/90 hover:text-white"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="flex max-h-[min(70dvh,calc(100dvh-12rem))] flex-col gap-3 overflow-y-auto pr-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <WeatherWidget syncEnter />

              <div className="rounded-2xl border border-traveloop-sky/25 bg-[#0B0F1A]/50 px-4 py-3 shadow-inner-glow backdrop-blur-md">
                <div className="flex items-center gap-2 text-traveloop-ice/65">
                  <Coins className="h-4 w-4 text-traveloop-sky" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">FX</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-white">1 USD = 0.91 EUR</p>
                <p className="text-[11px] text-traveloop-ice/65">Updated 2m ago</p>
              </div>

              <div className="rounded-2xl border border-traveloop-sky/25 bg-[#0B0F1A]/50 px-4 py-3 shadow-inner-glow backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-traveloop-ice/60">Countdown</p>
                <p className="mt-1 text-xl font-semibold tabular-nums text-white">04 : 12 : 09</p>
                <p className="text-xs text-traveloop-ice/70">Until Bali wheels up</p>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-2.5 shadow-inner-glow backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <Plane className="h-4 w-4 text-emerald-300" />
                <span className="text-xs font-medium text-emerald-100/95">Active trip · Swiss rail</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="trigger"
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            aria-label="Open travel widgets"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 26 }}
            whileHover={{ scale: 1.06, boxShadow: '0 0 36px rgba(136,189,242,0.35)' }}
            whileTap={{ scale: 0.96 }}
            className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-traveloop-sky/35 bg-gradient-to-br from-[#0B0F1A]/90 to-[#0B0F1A]/70 text-traveloop-sky shadow-[0_0_28px_rgba(136,189,242,0.25)] backdrop-blur-xl"
          >
            <LayoutDashboard className="h-6 w-6" strokeWidth={1.6} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
