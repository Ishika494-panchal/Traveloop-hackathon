import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, CloudSun, Clock, MapPin, Wallet } from 'lucide-react'

export type ItineraryDay = {
  day: number
  city: string
  activities: string[]
  budget: string
  weather: string
  duration: string
}

export type ItineraryPhase = 'idle' | 'loading' | 'done'

type AIItineraryPreviewProps = {
  phase: ItineraryPhase
  progress: number
  typingLine: string
  days: ItineraryDay[]
}

function ShimmerBlock({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-traveloop-sky/20 bg-[#0B0F1A]/50 ${className ?? ''}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-traveloop-sky/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export function AIItineraryPreview({ phase, progress, typingLine, days }: AIItineraryPreviewProps) {
  const showResults = phase === 'done' && days.length > 0
  const showLoading = phase === 'loading'

  return (
    <section className="relative mt-10 md:mt-12">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">Live itinerary</h2>
          <p className="mt-1 text-sm text-traveloop-ice/55">AI-structured days with spend, weather, and pacing.</p>
        </div>
      </div>

      <div className="relative min-h-[200px] overflow-hidden rounded-2xl border border-traveloop-sky/22 bg-[#0B0F1A]/40 p-5 shadow-inner-glow backdrop-blur-xl md:p-7">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(136,189,242,0.12),transparent)]"
          aria-hidden
        />

        <AnimatePresence mode="wait">
          {showLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-sm text-traveloop-ice/80 md:text-base">
                  <span className="text-traveloop-sky">▸</span> {typingLine}
                  <motion.span
                    className="ml-0.5 inline-block h-4 w-px bg-traveloop-sky align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                  />
                </p>
                <span className="text-xs font-medium uppercase tracking-widest text-traveloop-steel">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-traveloop-slate/60">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-traveloop-sky"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 22 }}
                />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <ShimmerBlock className="h-28" />
                <ShimmerBlock className="h-28" />
                <ShimmerBlock className="h-28" />
              </div>
            </motion.div>
          ) : null}

          {phase === 'idle' && !showResults ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="relative flex min-h-[160px] flex-col items-center justify-center gap-2 text-center"
            >
              <p className="max-w-md text-sm text-traveloop-ice/60">
                Your smart itinerary will materialize here — timelines, micro-budgets, and weather-aware blocks.
              </p>
            </motion.div>
          ) : null}

          {showResults ? (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative grid gap-4 md:grid-cols-2"
            >
              {days.map((d, i) => (
                <ItineraryDayCard key={d.day} day={d} index={i} />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  )
}

function ItineraryDayCard({ day, index }: { day: ItineraryDay; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: '0 0 32px rgba(136,189,242,0.28)' }}
      style={{ transformPerspective: 900 }}
      className="group relative overflow-hidden rounded-xl border border-traveloop-sky/28 bg-gradient-to-br from-[#0B0F1A]/90 to-traveloop-slate/35 p-4 shadow-[0_0_24px_rgba(56,73,89,0.35)] md:p-5"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-traveloop-sky/20 blur-2xl transition-opacity group-hover:opacity-100" />
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-traveloop-sky/15 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-traveloop-sky/25 text-sm font-bold text-white ring-1 ring-traveloop-ice/30">
            {day.day}
          </span>
          <div>
            <h3 className="flex items-center gap-1.5 text-base font-semibold text-white">
              <MapPin className="h-4 w-4 text-traveloop-sky" strokeWidth={1.8} />
              {day.city}
            </h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-traveloop-ice/55">
              <Clock className="h-3.5 w-3.5" />
              {day.duration}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-traveloop-sky/35 bg-traveloop-sky/15 px-2.5 py-1 text-xs font-medium text-traveloop-ice">
          <CloudSun className="h-3.5 w-3.5" />
          {day.weather}
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {day.activities.map((a, j) => (
          <li key={`${day.day}-${j}`} className="flex gap-2 text-sm text-traveloop-ice/88">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-traveloop-steel" strokeWidth={1.6} />
            {a}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-traveloop-sky/15 pt-3 text-sm">
        <span className="flex items-center gap-1.5 text-traveloop-ice/70">
          <Wallet className="h-4 w-4 text-traveloop-sky" />
          Est. day budget
        </span>
        <span className="font-semibold text-white">{day.budget}</span>
      </div>
    </motion.article>
  )
}
