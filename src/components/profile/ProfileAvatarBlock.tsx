import { motion } from 'framer-motion'
import { Camera, MapPin, Plane } from 'lucide-react'
import { useRef } from 'react'

type ProfileAvatarBlockProps = {
  onPhotoChange?: (file: File | null) => void
}

export function ProfileAvatarBlock({ onPhotoChange }: ProfileAvatarBlockProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center"
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <motion.span
          className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-tr from-traveloop-sky/50 via-traveloop-ice/30 to-traveloop-slate/50 opacity-80 blur-md"
          animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.04, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative h-40 w-40 rounded-full border-2 border-traveloop-sky/40 bg-gradient-to-br from-traveloop-slate/60 to-[#0B0F1A] p-1 shadow-[0_0_40px_rgba(136,189,242,0.35)] md:h-48 md:w-48">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-traveloop-sky/50 to-traveloop-slate text-3xl font-bold text-white md:text-4xl">
            AK
          </div>
          <span className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full border-2 border-[#0B0F1A] bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" title="Online" />
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onPhotoChange?.(e.target.files?.[0] ?? null)}
        />
        <motion.button
          type="button"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => inputRef.current?.click()}
          className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-traveloop-sky/35 bg-[#0B0F1A]/85 px-3 py-1.5 text-xs font-semibold text-traveloop-ice shadow-lg backdrop-blur-md transition-colors hover:border-traveloop-ice/40 hover:text-white"
        >
          <Camera className="h-3.5 w-3.5" strokeWidth={1.75} />
          Photo
        </motion.button>
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-traveloop-sky/30 bg-traveloop-sky/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-traveloop-ice"
      >
        <Plane className="h-3.5 w-3.5 text-traveloop-sky" strokeWidth={1.75} />
        Explorer
      </motion.span>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-traveloop-slate/40 bg-white/[0.04] px-3 py-1.5 text-xs text-traveloop-ice/85 backdrop-blur-sm"
      >
        <MapPin className="h-3.5 w-3.5 text-traveloop-sky" strokeWidth={1.75} />
        Mumbai, India
      </motion.div>
    </motion.div>
  )
}
