import { motion } from 'framer-motion'
import { Settings, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

const circleBtn =
  'flex h-10 w-10 items-center justify-center rounded-full border border-traveloop-sky/30 bg-white/[0.05] text-traveloop-ice shadow-inner-glow backdrop-blur-xl transition-colors hover:border-traveloop-ice/45 hover:bg-white/[0.1] hover:text-white md:h-11 md:w-11'

export function DiscoverNavbar() {
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-traveloop-sky/20 bg-[#0B0F1A]/55 shadow-[0_0_40px_rgba(136,189,242,0.08)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:h-[4.25rem] md:px-8">
        <Link to="/dashboard" className="group flex items-center gap-2" aria-label="Traveloop home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-traveloop-sky to-traveloop-slate shadow-glow-sm" />
          <span className="bg-gradient-to-r from-traveloop-ice via-traveloop-sky to-traveloop-steel bg-clip-text text-lg font-semibold tracking-tight text-transparent">
            Traveloop
          </span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
            <Link to="/profile" className={circleBtn} aria-label="Profile">
              <UserRound className="h-[18px] w-[18px]" strokeWidth={1.65} />
            </Link>
          </motion.div>
          <motion.button
            type="button"
            aria-label="Settings"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className={circleBtn}
          >
            <Settings className="h-[18px] w-[18px]" strokeWidth={1.65} />
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
