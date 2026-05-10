import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Bookmark, CloudSun, Heart, Link as LinkIcon } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

import type { PastProfileTrip, PreplannedProfileTrip } from './profileTripsMock'

type ProfileTripCardProps =
  | {
      variant: 'preplanned'
      trip: PreplannedProfileTrip
      bookmarked: boolean
      onToggleBookmark: () => void
      index: number
    }
  | {
      variant: 'past'
      trip: PastProfileTrip
      bookmarked: boolean
      onToggleBookmark: () => void
      index: number
    }

export function ProfileTripCard(props: ProfileTripCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 260, damping: 30 })
  const rotateY = useSpring(ry, { stiffness: 260, damping: 30 })

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      rx.set((0.5 - (e.clientY - r.top) / r.height) * 6)
      ry.set(((e.clientX - r.left) / r.width - 0.5) * 8)
    },
    [rx, ry],
  )

  const onLeave = useCallback(() => {
    rx.set(0)
    ry.set(0)
  }, [rx, ry])

  const { trip, bookmarked, onToggleBookmark, index } = props

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * index, duration: 0.45 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformPerspective: 1100, rotateX, rotateY }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-traveloop-sky/25 bg-[#0B0F1A]/5 shadow-[0_0_36px_rgba(56,73,89,0.4)] backdrop-blur-xl md:flex-row"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden md:aspect-auto md:w-[42%] md:min-h-[200px]">
        <motion.img
          src={trip.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent md:bg-gradient-to-r" />
        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={(e) => {
            e.preventDefault()
            onToggleBookmark()
          }}
          aria-pressed={bookmarked}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0B0F1A]/55 text-traveloop-ice backdrop-blur-md transition-colors hover:border-traveloop-sky/45 hover:text-white"
        >
          <motion.span
            key={bookmarked ? 'on' : 'off'}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            {props.variant === 'preplanned' ? (
              <Bookmark className={cn('h-5 w-5', bookmarked && 'fill-traveloop-sky text-traveloop-sky')} strokeWidth={1.75} />
            ) : (
              <Heart className={cn('h-5 w-5', bookmarked && 'fill-rose-400/90 text-rose-300')} strokeWidth={1.75} />
            )}
          </motion.span>
        </motion.button>
        {props.variant === 'past' ? (
          <span className="absolute left-3 top-3 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100">
            Completed
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-center p-5 md:p-6">
        <h3 className="text-lg font-semibold text-white md:text-xl">{trip.title}</h3>
        {props.variant === 'preplanned' ? (
          <>
            <p className="mt-2 flex items-center gap-2 text-sm text-traveloop-ice/70">{props.trip.dates}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-traveloop-sky/25 bg-traveloop-sky/10 px-2.5 py-1 text-xs text-traveloop-ice">
                <CloudSun className="h-3.5 w-3.5" strokeWidth={1.65} />
                {props.trip.weather}
              </span>
              <span className="font-medium text-traveloop-sky">{props.trip.budget}</span>
            </div>
            <Link
              to="/plan/itinerary"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl border border-traveloop-sky/35 bg-traveloop-slate/25 px-4 py-2 text-sm font-semibold text-traveloop-ice transition-colors hover:border-traveloop-ice/35 hover:bg-traveloop-sky/15 hover:text-white"
            >
              <LinkIcon className="h-4 w-4" strokeWidth={1.75} />
              View trip
            </Link>
          </>
        ) : (
          <>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-traveloop-ice/70">
              <span>{props.trip.duration}</span>
              <span>{props.trip.memories} memories</span>
              <span className="font-medium text-traveloop-sky">{props.trip.budget}</span>
            </div>
          </>
        )}
      </div>
    </motion.article>
  )
}
