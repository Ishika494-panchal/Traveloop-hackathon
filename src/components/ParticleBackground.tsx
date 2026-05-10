import { motion } from 'framer-motion'
import { useMemo } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Particle = { id: number; x: string; y: string; size: number; delay: number; duration: number }

export function ParticleBackground({ density = 42 }: { density?: number }) {
  const reduced = usePrefersReducedMotion()

  const particles = useMemo(() => {
    const out: Particle[] = []
    for (let i = 0; i < density; i++) {
      out.push({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2.2,
        delay: Math.random() * 4,
        duration: 10 + Math.random() * 18,
      })
    }
    return out
  }, [density])

  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        {particles.slice(0, 18).map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-traveloop-sky/35 blur-[0.5px]"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-traveloop-ice/50 to-traveloop-sky/25 blur-[0.5px] shadow-[0_0_12px_rgba(136,189,242,0.35)]"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.85, 0.2] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
