import { motion } from 'framer-motion'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function AnimatedBackground() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,73,89,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(56,73,89,0.28) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)',
        }}
      />

      {!reduced ? (
        <>
          <motion.div
            className="absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-traveloop-sky/25 via-traveloop-steel/10 to-transparent blur-3xl"
            animate={{ x: [0, 60, -20, 0], y: [0, 30, 10, 0], scale: [1, 1.08, 1.02, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-1/4 bottom-0 h-[560px] w-[560px] rounded-full bg-gradient-to-tl from-traveloop-ice/18 via-traveloop-sky/12 to-transparent blur-3xl"
            animate={{ x: [0, -40, 20, 0], y: [0, -24, 8, 0], scale: [1, 1.06, 0.98, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-1/3 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-traveloop-slate/25 blur-[120px]"
            animate={{ opacity: [0.25, 0.55, 0.3], scale: [0.95, 1.05, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-traveloop-sky/10 via-transparent to-traveloop-slate/15" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/10 via-transparent to-[#0B0F1A]/80" />
    </div>
  )
}
