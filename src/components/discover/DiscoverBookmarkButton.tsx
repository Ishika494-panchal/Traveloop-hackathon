import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'

type DiscoverBookmarkButtonProps = {
  bookmarked: boolean
  onToggle: () => void
  'aria-label'?: string
}

export function DiscoverBookmarkButton({ bookmarked, onToggle, 'aria-label': ariaLabel }: DiscoverBookmarkButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel ?? (bookmarked ? 'Remove bookmark' : 'Save bookmark')}
      aria-pressed={bookmarked}
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      whileTap={{ scale: 0.88 }}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-traveloop-sky/30 bg-[#0B0F1A]/5 text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-colors hover:border-traveloop-ice/40"
    >
      <motion.span
        key={bookmarked ? 'on' : 'off'}
        initial={{ scale: 0.6, opacity: 0.6 }}
        animate={{ scale: [1, 1.2, 1], opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <Bookmark
          className={`h-5 w-5 ${bookmarked ? 'fill-traveloop-sky text-traveloop-sky drop-shadow-[0_0_10px_rgba(136,189,242,0.8)]' : 'text-traveloop-steel'}`}
          strokeWidth={1.7}
        />
      </motion.span>
    </motion.button>
  )
}
