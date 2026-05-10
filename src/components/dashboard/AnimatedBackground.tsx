import { motion } from 'framer-motion'

import { ParticleBackground } from '@/components/ParticleBackground'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function AnimatedBackground() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,73,89,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(56,73,89,0.25) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 85% 65% at 50% 18%, black 12%, transparent 72%)',
        }}
      />
      {!reduced ? (
        <>
          <motion.div
            className="absolute -left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-traveloop-sky/20 via-traveloop-steel/10 to-transparent blur-3xl"
            animate={{ x: [0, 40, -10, 0], opacity: [0.35, 0.55, 0.4] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-1/4 bottom-0 h-[480px] w-[480px] rounded-full bg-gradient-to-tl from-traveloop-ice/14 via-traveloop-sky/10 to-transparent blur-3xl"
            animate={{ x: [0, -36, 12, 0], opacity: [0.3, 0.5, 0.35] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-traveloop-sky/8 to-transparent" />
      )}
      <ParticleBackground density={reduced ? 16 : 36} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/40 via-transparent to-[#0B0F1A]" />
    </div>
  )
}
