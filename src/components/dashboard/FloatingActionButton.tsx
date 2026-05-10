import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function FloatingActionButton() {
  const navigate = useNavigate()

  return (
    <motion.button
      type="button"
      onClick={() => navigate('/plan')}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.06, boxShadow: '0 0 56px rgba(136,189,242,0.55)' }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-4 z-[60] flex items-center gap-2 rounded-full border border-white/15 bg-gradient-to-r from-traveloop-sky via-traveloop-steel to-traveloop-slate px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(136,189,242,0.45)] md:bottom-10 md:right-8"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
        <Plus className="h-5 w-5" strokeWidth={2.2} />
      </span>
      Plan a Trip
    </motion.button>
  )
}
