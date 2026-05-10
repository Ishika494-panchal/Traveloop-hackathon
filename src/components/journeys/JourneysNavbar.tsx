import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

export function JourneysNavbar() {
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-traveloop-sky/20 bg-[#0B0F1A]/55 shadow-[0_0_36px_rgba(136,189,242,0.08)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:h-[4rem] md:px-8">
        <Link to="/dashboard" className="group flex items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-traveloop-sky to-traveloop-slate shadow-glow-sm transition-transform group-hover:scale-[1.03]"
            aria-hidden
          />
          <span className="bg-gradient-to-r from-traveloop-ice via-traveloop-sky to-traveloop-steel bg-clip-text text-lg font-semibold tracking-tight text-transparent">
            Traveloop
          </span>
        </Link>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Profile and settings"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-traveloop-sky/30 bg-white/[0.05] text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-colors hover:border-traveloop-ice/40 hover:bg-white/[0.09]"
        >
          <Settings className="h-[18px] w-[18px]" strokeWidth={1.6} />
        </motion.button>
      </div>
    </motion.header>
  )
}
