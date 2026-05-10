import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Calendar, CloudSun, Copy, Edit3, Eye, MapPin, Share2, Users } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { StatusBadge } from './StatusBadge'
import type { JourneyTrip } from './types'

type TripOverviewCardProps = {
  trip: JourneyTrip
  index: number
}

export function TripOverviewCard({ trip, index }: TripOverviewCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 280, damping: 28 })
  const rotateY = useSpring(ry, { stiffness: 280, damping: 28 })

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      rx.set((0.5 - py) * 5)
      ry.set((px - 0.5) * 6)
    },
    [rx, ry],
  )

  const onLeave = useCallback(() => {
    rx.set(0)
    ry.set(0)
  }, [rx, ry])

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformPerspective: 1200, rotateX, rotateY }}
      className="group relative overflow-hidden rounded-3xl border border-traveloop-sky/25 bg-[#0B0F1A]/50 shadow-[0_0_48px_rgba(56,73,89,0.45)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-traveloop-sky/12 via-transparent to-traveloop-ice/5" />
      </div>
      <motion.div
        className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{ x: ['-20%', '120%'] }}
        transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 5 }}
      />

      <div className="relative flex flex-col lg:flex-row lg:items-stretch">
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden lg:aspect-auto lg:w-[min(38%,420px)] lg:min-h-[280px]">
          <motion.img
            src={trip.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/45 to-transparent lg:bg-gradient-to-r" />
          <div className="absolute left-4 top-4">
            <StatusBadge status={trip.status} />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center border-t border-traveloop-sky/15 p-5 md:p-6 lg:border-l lg:border-t-0">
          <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{trip.name}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-traveloop-ice/70">{trip.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-traveloop-ice/75">
            <Calendar className="h-4 w-4 text-traveloop-sky" strokeWidth={1.6} />
            {trip.dates}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {trip.destinations.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1 rounded-lg border border-traveloop-slate/45 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-traveloop-ice/85"
              >
                <MapPin className="h-3 w-3 text-traveloop-steel" />
                {d}
              </span>
            ))}
          </div>
          {trip.status === 'ongoing' ? (
            <div className="mt-5">
              <div className="mb-1.5 flex justify-between text-xs text-traveloop-ice/60">
                <span>
                  {trip.completedDays} / {trip.totalDays} days
                </span>
                <span>{trip.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-traveloop-slate/50">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-traveloop-sky shadow-[0_0_16px_rgba(136,189,242,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${trip.progress}%` }}
                  transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.08 * index }}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col justify-center gap-4 border-t border-traveloop-sky/15 p-5 md:p-6 lg:w-[min(280px,32%)] lg:border-l lg:border-t-0">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-traveloop-steel">Budget</p>
              <p className="mt-0.5 font-semibold text-white">{trip.budget}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-traveloop-steel">Duration</p>
              <p className="mt-0.5 font-semibold text-white">{trip.duration}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-traveloop-steel">Travelers</p>
              <p className="mt-0.5 flex items-center gap-1 font-semibold text-white">
                <Users className="h-3.5 w-3.5 text-traveloop-sky" strokeWidth={1.6} />
                {trip.travelers}
              </p>
            </div>
            <div className="rounded-xl border border-traveloop-sky/25 bg-traveloop-sky/10 px-2.5 py-2">
              <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-traveloop-steel">
                <CloudSun className="h-3.5 w-3.5 text-traveloop-sky" />
                Weather
              </p>
              <p className="mt-1 text-xs font-medium text-white">
                {trip.weatherTemp} · {trip.weatherCond}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/plan/itinerary"
              className={cn(
                'inline-flex flex-1 min-w-[calc(50%-4px)] items-center justify-center gap-1.5 rounded-lg border border-traveloop-sky/35 bg-traveloop-slate/25 px-3 py-2 text-xs font-semibold text-traveloop-ice transition-all sm:min-w-0 sm:flex-1',
                'hover:border-traveloop-sky/55 hover:bg-traveloop-sky/15 hover:text-white',
              )}
            >
              <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
              View Trip
            </Link>
            <button
              type="button"
              className="inline-flex min-w-[calc(50%-4px)] flex-1 items-center justify-center gap-1.5 rounded-lg border border-traveloop-slate/40 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-traveloop-ice transition-all hover:border-traveloop-ice/30 hover:bg-white/[0.08] sm:min-w-0"
            >
              <Edit3 className="h-3.5 w-3.5" strokeWidth={1.75} />
              Edit
            </button>
            <button
              type="button"
              className="inline-flex min-w-[calc(50%-4px)] flex-1 items-center justify-center gap-1.5 rounded-lg border border-traveloop-slate/40 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-traveloop-ice transition-all hover:border-traveloop-ice/30 hover:bg-white/[0.08] sm:min-w-0"
            >
              <Share2 className="h-3.5 w-3.5" strokeWidth={1.75} />
              Share
            </button>
            <button
              type="button"
              className="inline-flex min-w-[calc(50%-4px)] flex-1 items-center justify-center gap-1.5 rounded-lg border border-traveloop-slate/40 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-traveloop-ice transition-all hover:border-traveloop-ice/30 hover:bg-white/[0.08] sm:min-w-0"
            >
              <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
              Duplicate
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
