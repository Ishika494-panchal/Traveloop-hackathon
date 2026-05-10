import { motion, useTransform } from 'framer-motion'

import { AnimatedBackground } from '@/components/AnimatedBackground'
import { GlobeAnimation } from '@/components/GlobeAnimation'
import { ParticleBackground } from '@/components/ParticleBackground'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 220, damping: 26 },
  },
}

export function HeroSection() {
  const reduced = usePrefersReducedMotion()
  const { x, y } = useMouseParallax(reduced ? 0 : 10)
  const shiftX = useTransform(x, (v) => v * 0.6)
  const shiftY = useTransform(y, (v) => v * 0.6)

  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-x-clip overflow-y-visible px-5 pb-8 pt-6 md:h-full md:w-[60%] md:justify-center md:px-8 md:pb-8 md:pt-6 lg:px-12">
      <AnimatedBackground />
      <ParticleBackground density={reduced ? 22 : 48} />

      <motion.div
        style={reduced ? undefined : { x: shiftX, y: shiftY }}
        className="relative z-[2] mx-auto flex w-full max-w-xl flex-col md:max-w-2xl"
      >
        <div className="relative shrink-0 overflow-visible py-2 md:py-3">
          <GlobeAnimation />
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="relative z-[2] mt-3 md:mt-4">
          <motion.h1
            variants={item}
            className="whitespace-nowrap text-left text-[clamp(0.95rem,3.6vw+0.35rem,2.65rem)] font-semibold leading-tight tracking-tight text-white"
          >
            <span className="text-gradient-hero">From Dream Trips To Real Adventures</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-traveloop-ice/80 md:mt-3 md:text-[15px]"
          >
            Plan smarter. Travel better.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Build personalized itineraries with AI-powered travel intelligence.
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0F1A] to-transparent md:h-16" />
    </section>
  )
}
