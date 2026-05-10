import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

type MiniMapCardProps = {
  label: string
}

export function MiniMapCard({ label }: MiniMapCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative h-28 w-full overflow-hidden rounded-2xl border border-traveloop-sky/25 bg-gradient-to-br from-traveloop-slate/40 to-[#0B0F1A]/80 shadow-inner-glow backdrop-blur-sm md:h-32 lg:h-36"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(136,189,242,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(136,189,242,0.1) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <motion.path
          d="M 12 80 Q 45 45, 88 62 T 160 38"
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#88BDF2" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#BDDDFC" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6A89A7" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        className="absolute left-[42%] top-[38%] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-traveloop-ice/80 bg-[#0B0F1A]/90 text-traveloop-sky shadow-[0_0_20px_rgba(136,189,242,0.75)]"
        animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 16px rgba(136,189,242,0.5)', '0 0 28px rgba(189,221,252,0.55)', '0 0 16px rgba(136,189,242,0.5)'] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MapPin className="h-4 w-4" strokeWidth={1.8} />
      </motion.div>
      <div className="absolute bottom-2 left-2 right-2 rounded-lg border border-white/10 bg-[#0B0F1A]/75 px-2 py-1 text-[10px] font-medium text-traveloop-ice/90 backdrop-blur-md">
        <span className="line-clamp-1">{label}</span>
      </div>
    </motion.div>
  )
}
