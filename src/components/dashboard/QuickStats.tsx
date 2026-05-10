import { motion } from 'framer-motion'
import { Calendar, Globe2, Plane, TrendingUp, Wallet } from 'lucide-react'

const stats = [
  {
    label: 'Total Trips',
    value: '24',
    trend: '+12%',
    icon: Plane,
    accent: 'from-traveloop-sky/30 to-transparent',
  },
  {
    label: 'Upcoming Trips',
    value: '5',
    trend: '+2',
    icon: Calendar,
    accent: 'from-traveloop-ice/20 to-transparent',
  },
  {
    label: 'Total Spent',
    value: '$18.2k',
    trend: '+4.1%',
    icon: Wallet,
    accent: 'from-traveloop-steel/35 to-transparent',
  },
  {
    label: 'Countries Visited',
    value: '14',
    trend: '+1',
    icon: Globe2,
    accent: 'from-traveloop-slate/40 to-transparent',
  },
] as const

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 24 } },
}

export function QuickStats() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
    >
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <motion.div
            key={s.label}
            variants={card}
            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
            className="group relative overflow-hidden rounded-2xl border border-traveloop-sky/25 bg-gradient-to-br from-white/[0.07] to-[#0B0F1A]/70 p-4 shadow-inner-glow backdrop-blur-xl md:p-5"
          >
            <div
              className={`pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${s.accent} opacity-70 blur-2xl transition-opacity group-hover:opacity-100`}
            />
            <div className="flex items-start justify-between gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-traveloop-sky/30 bg-[#0B0F1A]/50 text-traveloop-sky shadow-glow-sm [&>svg]:h-5 [&>svg]:w-5">
                <Icon />
              </span>
              <span className="flex items-center gap-0.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300/95">
                <TrendingUp className="h-3 w-3" />
                {s.trend}
              </span>
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-traveloop-ice/65">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-white md:text-[1.65rem]">{s.value}</p>
            <svg className="mt-3 h-8 w-full text-traveloop-sky/35" viewBox="0 0 120 32" preserveAspectRatio="none">
              <motion.path
                d="M0 24 Q30 8 60 18 T120 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
