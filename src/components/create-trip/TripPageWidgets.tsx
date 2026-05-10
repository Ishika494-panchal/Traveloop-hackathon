import { motion } from 'framer-motion'
import { CloudSun, Coins, Hourglass, PiggyBank } from 'lucide-react'
import { useMemo } from 'react'

import type { TripFormValues } from './TripForm'

function daysUntilStart(iso: string): number | null {
  if (!iso) return null
  const t = new Date(iso).getTime()
  if (Number.isNaN(t)) return null
  const start = new Date(iso)
  start.setHours(0, 0, 0, 0)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.ceil((start.getTime() - now.getTime()) / 86400000)
}

type TripPageWidgetsProps = {
  form: TripFormValues
}

export function TripPageWidgets({ form }: TripPageWidgetsProps) {
  const countdown = useMemo(() => daysUntilStart(form.startDate), [form.startDate])

  return (
    <div className="pointer-events-none fixed right-4 top-28 z-40 hidden w-[200px] flex-col gap-3 lg:flex xl:right-8">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/55 px-3 py-2.5 shadow-glow-sm backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-traveloop-steel">
          <CloudSun className="h-3.5 w-3.5 text-traveloop-sky" />
          Weather
        </div>
        <p className="mt-1 text-sm font-medium text-white">24°C · Clear</p>
        <p className="text-[11px] text-traveloop-ice/55">Live corridor blend</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.28 }}
        className="rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/55 px-3 py-2.5 shadow-glow-sm backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-traveloop-steel">
          <Coins className="h-3.5 w-3.5 text-traveloop-sky" />
          FX pulse
        </div>
        <p className="mt-1 text-sm font-medium text-white">EUR / USD 1.082</p>
        <p className="text-[11px] text-traveloop-ice/55">Updated moments ago</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.36 }}
        className="rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/55 px-3 py-2.5 shadow-glow-sm backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-traveloop-steel">
          <Hourglass className="h-3.5 w-3.5 text-traveloop-sky" />
          Countdown
        </div>
        <p className="mt-1 text-sm font-medium text-white">
          {countdown == null ? 'Set start date' : countdown < 0 ? 'In motion' : `${countdown} days`}
        </p>
        <p className="text-[11px] text-traveloop-ice/55">To wheels-up</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.44 }}
        className="rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/55 px-3 py-2.5 shadow-glow-sm backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-traveloop-steel">
          <PiggyBank className="h-3.5 w-3.5 text-traveloop-sky" />
          Budget
        </div>
        <p className="mt-1 truncate text-sm font-medium text-white">{form.budget || 'Add a target'}</p>
        <p className="text-[11px] text-traveloop-ice/55">{form.travelers ? `${form.travelers} travelers` : 'Travelers TBD'}</p>
      </motion.div>
    </div>
  )
}
