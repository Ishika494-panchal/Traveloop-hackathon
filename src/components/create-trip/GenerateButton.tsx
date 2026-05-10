import { motion } from 'framer-motion'
import { Loader2, Map, Save as SaveIcon, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

const secondaryShell =
  'inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-traveloop-slate/50 bg-[#0B0F1A]/40 px-4 text-sm font-medium text-traveloop-ice backdrop-blur-sm transition-colors'

const secondaryHover =
  'hover:border-traveloop-steel/55 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traveloop-steel/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1A]'

type SaveTripButtonProps = {
  onClick: () => void
  disabled?: boolean
  saving?: boolean
  className?: string
}

export function SaveTripButton({ onClick, disabled, saving, className }: SaveTripButtonProps) {
  const inactive = disabled && !saving
  return (
    <motion.button
      type="button"
      disabled={inactive}
      aria-busy={saving}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={inactive || saving ? undefined : { scale: 1.02 }}
      whileTap={inactive || saving ? undefined : { scale: 0.98 }}
      className={cn(
        secondaryShell,
        secondaryHover,
        inactive && 'pointer-events-none opacity-45',
        saving && 'cursor-wait border-traveloop-sky/35',
        className,
      )}
    >
      {saving ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-traveloop-steel" strokeWidth={2} />
      ) : (
        <SaveIcon className="h-4 w-4 shrink-0 text-traveloop-steel" strokeWidth={1.75} />
      )}
      <span className="whitespace-nowrap">{saving ? 'Saving…' : 'Save'}</span>
    </motion.button>
  )
}

type BuildItineraryButtonProps = {
  onClick: () => void
  className?: string
}

export function BuildItineraryButton({ onClick, className }: BuildItineraryButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(secondaryShell, secondaryHover, className)}
    >
      <Map className="h-4 w-4 shrink-0 text-traveloop-steel" strokeWidth={1.75} />
      <span className="whitespace-nowrap">Build Itinerary</span>
    </motion.button>
  )
}

type GenerateWithAIButtonProps = {
  onClick: () => void
  className?: string
}

export function GenerateWithAIButton({ onClick, className }: GenerateWithAIButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-traveloop-sky/38 bg-traveloop-slate/20 px-4 text-sm font-medium text-traveloop-ice backdrop-blur-sm transition-colors',
        'hover:border-traveloop-sky/50 hover:bg-traveloop-slate/32 hover:text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traveloop-sky/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1A]',
        className,
      )}
    >
      <Sparkles className="h-4 w-4 shrink-0 text-traveloop-sky" strokeWidth={1.75} />
      <span className="whitespace-nowrap">Generate with AI</span>
    </motion.button>
  )
}
