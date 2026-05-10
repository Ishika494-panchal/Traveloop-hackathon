import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

type RatingWidgetProps = {
  rating: number
  reviewCount: number
  popularity: number
  className?: string
}

export function RatingWidget({ rating, reviewCount, popularity, className = '' }: RatingWidgetProps) {
  const full = Math.floor(rating)
  const partial = rating - full

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span key={i} initial={{ opacity: 0.3, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <Star
                className={`h-4 w-4 ${i < full ? 'fill-traveloop-sky text-traveloop-sky' : i === full && partial > 0 ? 'fill-traveloop-sky/50 text-traveloop-sky' : 'text-traveloop-slate'}`}
                strokeWidth={1.4}
              />
            </motion.span>
          ))}
        </div>
        <span className="text-sm font-semibold text-white">{rating.toFixed(2)}</span>
        <span className="rounded-full border border-traveloop-sky/25 bg-traveloop-sky/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-traveloop-ice/90 shadow-[0_0_12px_rgba(136,189,242,0.2)]">
          {reviewCount.toLocaleString()} reviews
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-traveloop-steel">
          <span>Popularity</span>
          <span className="text-traveloop-sky">{popularity}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-traveloop-slate/50">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-traveloop-steel via-traveloop-sky to-traveloop-ice shadow-[0_0_12px_rgba(136,189,242,0.6)]"
            initial={{ width: 0 }}
            whileInView={{ width: `${popularity}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  )
}
