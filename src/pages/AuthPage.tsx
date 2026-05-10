import { motion } from 'framer-motion'

import { AuthPanel } from '@/sections/AuthPanel'
import { HeroSection } from '@/sections/HeroSection'

export function AuthPage() {
  return (
    <motion.div
      className="relative min-h-screen bg-[#0B0F1A] text-traveloop-ice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col-reverse md:h-[100dvh] md:min-h-0 md:max-h-[100dvh] md:flex-row md:overflow-hidden">
        <HeroSection />
        <AuthPanel />
      </div>
    </motion.div>
  )
}
