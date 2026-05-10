import { motion } from 'framer-motion'
import { Bell, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

const item = {
  rest: { scale: 1 },
  hover: { scale: 1.06 },
  tap: { scale: 0.96 },
}

export function ProfileNavbar() {
  return (
    <motion.header
      initial={{ y: -14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
          {[
            { icon: Bell, label: 'Notifications' },
            { icon: Settings, label: 'Settings' },
          ].map(({ icon: Icon, label }) => (
            <motion.button
              key={label}
              type="button"
              aria-label={label}
              variants={item}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-traveloop-sky/25 bg-white/[0.04] text-traveloop-ice/90 shadow-inner-glow transition-colors hover:border-traveloop-ice/35 hover:bg-white/[0.08] hover:text-white md:h-11 md:w-11"
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.header>
  )
}
