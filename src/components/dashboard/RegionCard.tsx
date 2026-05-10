import { motion } from 'framer-motion'

type RegionCardProps = {
  title: string
  image: string
  subtitle?: string
}

export function RegionCard({ title, image, subtitle }: RegionCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
      className="group relative w-[260px] shrink-0 overflow-hidden rounded-2xl border border-traveloop-sky/25 bg-[#0B0F1A]/50 shadow-glow-sm sm:w-[280px] md:w-[300px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-traveloop-sky/25 via-transparent to-traveloop-slate/40 opacity-80 mix-blend-soft-light transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-0 opacity-0 shadow-[inset_0_0_40px_rgba(136,189,242,0.15)] transition-opacity group-hover:opacity-100" />
      </div>
      <div className="relative border-t border-white/5 bg-[#0B0F1A]/60 px-4 py-3 backdrop-blur-md">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle ? <p className="mt-0.5 text-xs text-traveloop-ice/70">{subtitle}</p> : null}
      </div>
    </motion.article>
  )
}
