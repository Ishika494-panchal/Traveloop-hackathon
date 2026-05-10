import { motion } from 'framer-motion'
import { Loader2, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

type GenerateItineraryWithAIButtonProps = {
  loading?: boolean
  onClick: () => void
  className?: string
}

export function GenerateItineraryWithAIButton({ loading, onClick, className }: GenerateItineraryWithAIButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={loading}
      onClick={onClick}
      whileHover={loading ? undefined : { scale: 1.02, y: -1 }}
      whileTap={loading ? undefined : { scale: 0.98 }}
      className={cn(
        'inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-traveloop-sky/40 bg-gradient-to-r from-traveloop-slate/40 via-traveloop-sky/20 to-traveloop-slate/40 px-5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(136,189,242,0.2)] backdrop-blur-md transition-shadow',
        'hover:border-traveloop-ice/35 hover:shadow-[0_0_40px_rgba(136,189,242,0.35)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traveloop-sky/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1A]',
        'disabled:cursor-wait disabled:opacity-85',
        'md:w-auto md:min-w-[220px]',
        className,
      )}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-traveloop-ice" strokeWidth={2} />
      ) : (
        <Sparkles className="h-4 w-4 shrink-0 text-traveloop-ice" strokeWidth={1.85} />
      )}
      {loading ? 'Composing…' : 'Generate itinerary with AI'}
    </motion.button>
  )
}
