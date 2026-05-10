import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const destinations = [
  {
    name: 'Switzerland',
    tagline: 'Where peaks whisper and lakes hold time still.',
    image:
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Bali',
    tagline: 'Temple light, jungle hum, ocean calm.',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Tokyo',
    tagline: 'Neon rivers, quiet alleys, infinite rhythm.',
    image:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Paris',
    tagline: 'Golden hours stitched along the Seine.',
    image:
      'https://images.unsplash.com/photo-1502602898536-47a0278431a4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Goa',
    tagline: 'Salt air, palm shade, slow horizons.',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80',
  },
] as const

export function DestinationCarousel() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % destinations.length)
    }, 4800)
    return () => window.clearInterval(id)
  }, [reduced])

  const current = destinations[index]

  return (
    <div className="relative mt-8 w-full max-w-xl overflow-hidden rounded-2xl border border-traveloop-sky/25 bg-[#0B0F1A]/35 shadow-glow-sm backdrop-blur-xl">
      <div className="relative aspect-[16/10] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: reduced ? 0.2 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={current.image}
              alt={current.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-traveloop-sky/25 via-transparent to-traveloop-slate/40 mix-blend-soft-light" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <motion.p
            key={`t-${current.name}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-traveloop-ice/80"
          >
            Signal locked · {current.name}
          </motion.p>
          <motion.h3
            key={`h-${current.name}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            {current.name}
          </motion.h3>
          <motion.p
            key={`s-${current.name}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="mt-2 max-w-md text-sm leading-relaxed text-traveloop-ice/85"
          >
            {current.tagline}
          </motion.p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 bg-[#0B0F1A]/55 px-4 py-3 backdrop-blur-md">
        <div className="flex gap-1.5">
          {destinations.map((d, i) => (
            <button
              key={d.name}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative h-1.5 overflow-hidden rounded-full bg-white/10 transition-all"
              style={{ width: i === index ? 36 : 10 }}
              aria-label={`Show ${d.name}`}
            >
              <span
                className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-traveloop-sky to-traveloop-ice transition-all ${
                  i === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                }`}
                style={{ width: '100%' }}
              />
            </button>
          ))}
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-traveloop-steel/90">
          Live preview
        </span>
      </div>
    </div>
  )
}
