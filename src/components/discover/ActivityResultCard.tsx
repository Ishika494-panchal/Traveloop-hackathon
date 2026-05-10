import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Clock, MapPin, Plus, Sparkles } from 'lucide-react'

import type { DiscoverActivity } from '@/components/discover/activitiesMock'
import { DiscoverBookmarkButton } from '@/components/discover/DiscoverBookmarkButton'
import { MiniMapCard } from '@/components/discover/MiniMapCard'
import { RatingWidget } from '@/components/discover/RatingWidget'
import { GlassButton } from '@/components/GlassButton'
import { cn } from '@/lib/utils'

type ActivityResultCardProps = {
  activity: DiscoverActivity
  index: number
  bookmarked: boolean
  onToggleBookmark: () => void
  selected: boolean
  onSelect: () => void
}

export function ActivityResultCard({
  activity,
  index,
  bookmarked,
  onToggleBookmark,
  selected,
  onSelect,
}: ActivityResultCardProps) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 320, damping: 28 })
  const springY = useSpring(my, { stiffness: 320, damping: 28 })
  const rotateX = useTransform(springY, [-40, 40], [3.5, -3.5])
  const rotateY = useTransform(springX, [-40, 40], [-3.5, 3.5])
  const glow = useMotionTemplate`radial-gradient(420px circle at ${springX}px ${springY}px, rgba(136,189,242,0.18), transparent 55%)`

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - rect.left - rect.width / 2)
    my.set(e.clientY - rect.top - rect.height / 2)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.07, 0.35), duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onSelect}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={cn(
        'relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-traveloop-sky/22 bg-[#0B0F1A]/35 shadow-[0_20px_60px_rgba(12,17,34,0.65)] backdrop-blur-2xl lg:flex-row lg:items-stretch',
        selected && 'border-traveloop-sky/55 shadow-[0_0_42px_rgba(136,189,242,0.22)]',
      )}
    >
      <motion.div className="pointer-events-none absolute inset-0 rounded-3xl opacity-90" style={{ backgroundImage: glow }} />

      <div className="relative shrink-0 overflow-hidden lg:w-[280px] xl:w-[300px]">
        <motion.img
          src={activity.image}
          alt=""
          className="h-48 w-full object-cover lg:h-full lg:min-h-[220px]"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0B0F1A]/85 via-transparent to-traveloop-sky/25" />
        <span className="absolute left-3 top-3 rounded-full border border-traveloop-ice/30 bg-[#0B0F1A]/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-traveloop-ice backdrop-blur-md">
          {activity.category}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col gap-4 border-t border-traveloop-sky/15 p-5 md:p-6 lg:border-l lg:border-t-0 xl:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <motion.h3
              layout
              className="bg-gradient-to-r from-white via-traveloop-ice to-traveloop-steel bg-clip-text text-xl font-bold tracking-tight text-transparent md:text-2xl"
            >
              {activity.title}
            </motion.h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-traveloop-ice/65">{activity.description}</p>
          </div>
          <DiscoverBookmarkButton bookmarked={bookmarked} onToggle={onToggleBookmark} />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-traveloop-ice/70 md:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0 text-traveloop-sky" strokeWidth={1.6} />
            {activity.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 shrink-0 text-traveloop-steel" strokeWidth={1.6} />
            {activity.duration}
          </span>
        </div>
        <p className="text-xs text-traveloop-steel md:text-[13px]">
          <span className="font-semibold uppercase tracking-wider text-traveloop-steel">Timings · </span>
          {activity.timings}
        </p>

        <RatingWidget rating={activity.rating} reviewCount={activity.reviewCount} popularity={activity.popularity} />
      </div>

      <div className="relative flex w-full flex-col gap-3 border-t border-traveloop-sky/15 p-5 lg:w-[216px] lg:shrink-0 lg:border-l lg:border-t-0 lg:p-5 xl:p-6">
        <MiniMapCard label={activity.location} />
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-traveloop-steel">From</span>
          <motion.span layout className="text-2xl font-bold text-white" key={activity.price}>
            ${activity.price}
          </motion.span>
        </div>
        <div className="mt-auto flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
          <GlassButton variant="primary" size="lg" className="w-full !py-3 text-[13px]" leftIcon={<Sparkles strokeWidth={1.6} />}>
            View Details
          </GlassButton>
          <GlassButton variant="ghost" size="default" className="w-full" leftIcon={<Plus strokeWidth={1.65} />} type="button">
            Add to Trip
          </GlassButton>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation()
              onToggleBookmark()
            }}
            className="w-full rounded-xl border border-traveloop-slate/45 bg-white/[0.04] py-2.5 text-xs font-semibold uppercase tracking-widest text-traveloop-ice/90 backdrop-blur-md transition-colors hover:border-traveloop-sky/40 hover:text-white"
          >
            Save Activity
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
