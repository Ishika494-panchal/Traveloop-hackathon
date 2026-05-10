import { AnimatePresence, motion, useTransform } from 'framer-motion'
import { Calendar, CloudSun, Coins, Timer, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useMouseParallax } from '@/hooks/useMouseParallax'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const destinations = [
  {
    name: 'Bali',
    tagline: 'Rice terraces, temple light, ocean calm.',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80',
    weather: '29°C · Humid',
    budget: '$2.4k',
    travelers: '4',
    duration: '9 days',
  },
  {
    name: 'Switzerland',
    tagline: 'Alpine air, precision peaks, quiet lakes.',
    image:
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80',
    weather: '18°C · Clear',
    budget: '$4.1k',
    travelers: '2',
    duration: '6 days',
  },
  {
    name: 'Goa',
    tagline: 'Palm shade, salt breeze, golden hours.',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80',
    weather: '31°C · Breezy',
    budget: '$1.2k',
    travelers: '5',
    duration: '5 days',
  },
  {
    name: 'Tokyo',
    tagline: 'Neon rivers, quiet alleys, future rhythm.',
    image:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80',
    weather: '24°C · Mild',
    budget: '$3.6k',
    travelers: '3',
    duration: '8 days',
  },
  {
    name: 'Santorini',
    tagline: 'White cliffs, Aegean blue, slow sunsets.',
    image:
      'https://images.unsplash.com/photo-1613395877344-13d4c79d31e6?auto=format&fit=crop&w=1600&q=80',
    weather: '26°C · Windy',
    budget: '$3.2k',
    travelers: '2',
    duration: '7 days',
  },
] as const

const mini = [
  { icon: CloudSun, label: 'Weather', key: 'weather' as const },
  { icon: Coins, label: 'Budget', key: 'budget' as const },
  { icon: Users, label: 'Travelers', key: 'travelers' as const },
  { icon: Timer, label: 'Duration', key: 'duration' as const },
]

export function HeroBanner() {
  const reduced = usePrefersReducedMotion()
  const [i, setI] = useState(0)
  const { x, y } = useMouseParallax(reduced ? 0 : 8)
  const shiftX = useTransform(x, (v) => v * 0.35)
  const shiftY = useTransform(y, (v) => v * 0.35)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setI((n) => (n + 1) % destinations.length), 5200)
    return () => clearInterval(id)
  }, [reduced])

  const d = destinations[i]

  return (
    <motion.section
      layout
      className="relative overflow-hidden rounded-3xl border border-traveloop-sky/25 shadow-[0_0_48px_rgba(136,189,242,0.12)]"
    >
      <div className="relative h-[240px] sm:h-[280px] md:h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={d.name}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: reduced ? 0.15 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="h-full w-full overflow-hidden"
              style={reduced ? undefined : { x: shiftX, y: shiftY }}
            >
              <img src={d.image} alt="" className="h-full w-full scale-105 object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/65 to-[#0B0F1A]/35" />
            <div className="absolute inset-0 bg-gradient-to-br from-traveloop-sky/25 via-transparent to-traveloop-slate/50 mix-blend-soft-light" />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(136,189,242,0.2),transparent_55%)]"
              animate={reduced ? undefined : { opacity: [0.35, 0.55, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end gap-4 p-5 md:flex-row md:items-end md:justify-between md:p-8">
          <div className="max-w-xl">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-traveloop-sky/35 bg-[#0B0F1A]/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-traveloop-ice/85 shadow-inner-glow backdrop-blur-md"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CloudSun className="h-3.5 w-3.5 text-traveloop-sky" />
              {d.weather}
            </motion.span>
            <motion.h1
              className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.35rem]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
            >
              Travel Planning, Reimagined
            </motion.h1>
            <motion.p
              className="mt-2 max-w-md text-sm leading-relaxed text-traveloop-ice/80 md:text-[15px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Organize journeys, discover destinations,
              <br />
              and manage trips effortlessly.
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
            {mini.map((m, idx) => {
              const Icon = m.icon
              const val =
                m.key === 'weather'
                  ? d.weather
                  : m.key === 'budget'
                    ? d.budget
                    : m.key === 'travelers'
                      ? d.travelers
                      : d.duration
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22 + idx * 0.06 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex min-w-[140px] items-center gap-2.5 rounded-2xl border border-white/10 bg-[#0B0F1A]/55 px-3 py-2 shadow-glow-sm backdrop-blur-xl md:min-w-[168px]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-traveloop-sky/30 bg-white/[0.06] text-traveloop-sky">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-traveloop-ice/60">{m.label}</p>
                    <p className="text-sm font-medium text-white">{val}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute left-6 top-6 md:left-8 md:top-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-traveloop-ice/75">Featured</p>
              <p className="mt-1 text-2xl font-semibold text-white md:text-3xl">{d.name}</p>
              <p className="mt-1 max-w-xs text-sm text-traveloop-ice/85">{d.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-traveloop-ice/70">
                <span className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-1 backdrop-blur-sm">
                  Live routing
                </span>
                <span className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-1 backdrop-blur-sm">
                  Smart spend
                </span>
                <span className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.06] px-2 py-1 backdrop-blur-sm">
                  <Calendar className="h-3 w-3" />
                  Synced
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}
