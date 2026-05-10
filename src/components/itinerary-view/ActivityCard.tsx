import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Camera, Car, Map, ShoppingBag, Sun, UtensilsCrossed, Waves } from 'lucide-react'

import type { ItineraryActivity } from '@/components/itinerary-view/itineraryViewMock'
import { cn } from '@/lib/utils'

const icons = {
  utensils: UtensilsCrossed,
  camera: Camera,
  sun: Sun,
  waves: Waves,
  shopping: ShoppingBag,
  car: Car,
  map: Map,
} as const

type ActivityCardProps = {
  activity: ItineraryActivity
  index: number
}

export function ActivityCard({ activity, index }: ActivityCardProps) {
  const Icon = icons[activity.icon]
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 400, damping: 30 })
  const sy = useSpring(my, { stiffness: 400, damping: 30 })
  const rotateX = useTransform(sy, [-24, 24], [2.2, -2.2])
  const rotateY = useTransform(sx, [-24, 24], [-2.2, 2.2])
  const glow = useMotionTemplate`radial-gradient(320px circle at ${sx}px ${sy}px, rgba(136,189,242,0.15), transparent 55%)`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: Math.min(index * 0.06, 0.24), duration: 0.45 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left - r.width / 2)
        my.set(e.clientY - r.top - r.height / 2)
      }}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      whileHover={{ y: -3 }}
      className="relative overflow-hidden rounded-2xl border border-traveloop-sky/24 bg-[#0B0F1A]/4 shadow-[0_12px_40px_rgba(8,11,22,0.55)] backdrop-blur-xl transition-[box-shadow] hover:border-traveloop-sky/42 hover:shadow-[0_0_32px_rgba(136,189,242,0.12)]"
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-95" style={{ backgroundImage: glow }} />
      <div className="relative flex flex-col gap-3 p-4 md:flex-row md:items-stretch md:gap-4 md:p-5">
        <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl border border-traveloop-sky/20 md:h-auto md:w-40">
          <motion.img
            src={activity.image}
            alt=""
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.45 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/75 via-transparent to-traveloop-sky/10" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-xl border border-traveloop-sky/30 bg-traveloop-slate/30 text-traveloop-sky',
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.7} />
            </span>
            <span className="rounded-full border border-traveloop-ice/20 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-traveloop-ice/80">
              {activity.category}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-white md:text-xl">{activity.title}</h3>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-traveloop-ice/70">
            <span>{activity.time}</span>
            <span className="text-traveloop-steel">·</span>
            <span>{activity.duration}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-traveloop-ice/60">{activity.note}</p>
        </div>
      </div>
    </motion.div>
  )
}
