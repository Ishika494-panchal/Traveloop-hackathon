import { motion } from 'framer-motion'

import { ParticleBackground } from '@/components/ParticleBackground'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function BillingAnimatedBackground() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.26]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,73,89,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(56,73,89,0.22) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
          maskImage: 'radial-gradient(ellipse 85% 70% at 50% 15%, black 16%, transparent 75%)',
        }}
      />
      {!reduced && (
        <>
          <motion.div
            className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#88BDF2]/18 via-[#6A89A7]/12 to-transparent blur-3xl"
            animate={{ x: [0, 36, -8, 0], opacity: [0.34, 0.52, 0.4] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-44 bottom-4 h-[460px] w-[460px] rounded-full bg-gradient-to-tl from-[#BDDDFC]/16 via-[#88BDF2]/12 to-transparent blur-3xl"
            animate={{ x: [0, -36, 10, 0], opacity: [0.28, 0.44, 0.32] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
      <ParticleBackground density={reduced ? 16 : 34} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/35 via-transparent to-[#0B0F1A]" />
    </div>
  )
}
