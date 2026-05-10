import { motion } from 'framer-motion'
import {
  Building2,
  Compass,
  Mountain,
  Moon,
  Palmtree,
  Sparkles,
  Trees,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'

export type PreferenceId =
  | 'adventure'
  | 'luxury'
  | 'food'
  | 'nightlife'
  | 'nature'
  | 'mountains'
  | 'beaches'
  | 'culture'

const OPTIONS: { id: PreferenceId; label: string; icon: LucideIcon }[] = [
  { id: 'adventure', label: 'Adventure', icon: Compass },
  { id: 'luxury', label: 'Luxury', icon: Sparkles },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'nightlife', label: 'Nightlife', icon: Moon },
  { id: 'nature', label: 'Nature', icon: Trees },
  { id: 'mountains', label: 'Mountains', icon: Mountain },
  { id: 'beaches', label: 'Beaches', icon: Palmtree },
  { id: 'culture', label: 'Culture', icon: Building2 },
]

type PreferenceChipsProps = {
  selected: PreferenceId[]
  onToggle: (id: PreferenceId) => void
}

export function PreferenceChips({ selected, onToggle }: PreferenceChipsProps) {
  return (
    <div className="flex flex-wrap gap-2.5 md:gap-3">
      {OPTIONS.map((opt, i) => {
        const active = selected.includes(opt.id)
        const Icon = opt.icon
        return (
          <motion.button
            key={opt.id}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.35 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(opt.id)}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-all duration-300 md:px-4 md:py-3 ${
              active
                ? 'border-traveloop-sky/70 bg-gradient-to-br from-traveloop-sky/25 to-traveloop-slate/40 text-white shadow-[0_0_24px_rgba(136,189,242,0.35)]'
                : 'border-traveloop-sky/25 bg-[#0B0F1A]/40 text-traveloop-ice/85 hover:border-traveloop-ice/35 hover:bg-white/[0.06]'
            }`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-traveloop-ice' : 'text-traveloop-steel'}`} strokeWidth={1.6} />
            {opt.label}
          </motion.button>
        )
      })}
    </div>
  )
}
