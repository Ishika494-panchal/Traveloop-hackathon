import { motion } from 'framer-motion'
import { Compass, Sparkles } from 'lucide-react'

type PersonalityCardProps = {
  title: string
  description: string
  traits: string[]
}

export function PersonalityCard({ title, description, traits }: PersonalityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative overflow-hidden rounded-2xl border border-traveloop-sky/35 bg-gradient-to-br from-traveloop-slate/25 via-[#0B0F1A]/60 to-traveloop-sky/10 p-5 shadow-[0_0_40px_rgba(136,189,242,0.15)] backdrop-blur-xl md:p-6"
    >
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(120deg, transparent 40%, rgba(136,189,242,0.12) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-traveloop-ice/30 bg-traveloop-sky/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-traveloop-ice">
            <Sparkles className="h-3.5 w-3.5 text-traveloop-sky" strokeWidth={1.75} />
            Travel personality
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white md:text-2xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-traveloop-ice/70">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {traits.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-lg border border-traveloop-slate/45 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-traveloop-ice/90"
            >
              <Compass className="h-3 w-3 text-traveloop-sky" strokeWidth={1.75} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
