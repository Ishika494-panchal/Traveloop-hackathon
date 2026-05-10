import { motion } from 'framer-motion'
import {
  Brain,
  Coins,
  Luggage,
  Map,
  UsersRound,
} from 'lucide-react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const features = [
  {
    title: 'AI itinerary generation',
    body: 'Compose day-by-day flows tuned to pace, taste, and weather.',
    icon: Brain,
  },
  {
    title: 'Smart budget tracking',
    body: 'Forecast spend, catch drift early, and rebalance on the fly.',
    icon: Coins,
  },
  {
    title: 'Collaborative planning',
    body: 'Shared spaces with presence, comments, and live map pins.',
    icon: UsersRound,
  },
  {
    title: 'Smart packing assistant',
    body: 'Climate-aware lists that adapt as your route evolves.',
    icon: Luggage,
  },
  {
    title: 'Interactive timelines',
    body: 'Drag, snap, and simulate your trip like a cinematic storyboard.',
    icon: Map,
  },
] as const

const floatVariants = {
  animate: (i: number) => ({
    y: [0, -10 - (i % 3) * 2, 0],
    rotate: [0, 0.6 - (i % 2) * 0.4, 0],
    transition: {
      duration: 5 + (i % 4),
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay: i * 0.25,
    },
  }),
}

export function FloatingFeatures() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
      {features.map((f, i) => {
        const Icon = f.icon
        const Card = (
          <div className="relative h-full overflow-hidden rounded-2xl border border-traveloop-sky/25 bg-gradient-to-br from-white/[0.07] to-[#0B0F1A]/55 p-4 shadow-inner-glow backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-traveloop-sky/20 blur-2xl" />
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-traveloop-sky/35 bg-[#0B0F1A]/50 text-traveloop-ice shadow-glow-sm">
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <p className="text-sm font-semibold tracking-tight text-white">{f.title}</p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-traveloop-ice/75">{f.body}</p>
          </div>
        )

        if (reduced) {
          return (
            <div key={f.title} className="will-change-transform">
              {Card}
            </div>
          )
        }

        return (
          <motion.div
            key={f.title}
            custom={i}
            variants={floatVariants}
            animate="animate"
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="will-change-transform"
          >
            {Card}
          </motion.div>
        )
      })}
    </div>
  )
}
