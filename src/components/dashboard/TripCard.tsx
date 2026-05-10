import { motion } from 'framer-motion'

type TripCardProps = {
  title: string
  image: string
  dates: string
  budget: string
  progress: number
  status: 'Active' | 'Completed' | 'Planning'
  travelers: string[]
}

export function TripCard({ title, image, dates, budget, progress, status, travelers }: TripCardProps) {
  const statusColor =
    status === 'Active'
      ? 'border-traveloop-sky/40 bg-traveloop-sky/15 text-traveloop-ice'
      : status === 'Completed'
        ? 'border-white/15 bg-white/[0.06] text-traveloop-ice/85'
        : 'border-traveloop-steel/40 bg-traveloop-steel/15 text-traveloop-ice'

  return (
    <motion.article
      layout
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
      className="group relative flex w-[min(92vw,380px)] shrink-0 flex-col overflow-hidden rounded-2xl border border-traveloop-sky/25 bg-gradient-to-b from-white/[0.06] to-[#0B0F1A]/80 shadow-[0_0_32px_rgba(136,189,242,0.1)] backdrop-blur-xl md:w-[360px]"
    >
      <div className="relative h-44 overflow-hidden md:h-48">
        <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent" />
        <span
          className={`absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${statusColor}`}
        >
          {status}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div>
          <h3 className="text-lg font-semibold text-white md:text-xl">{title}</h3>
          <p className="mt-1 text-sm text-traveloop-ice/75">{dates}</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-traveloop-ice/60">Budget spent</span>
          <span className="font-semibold text-traveloop-sky">{budget}</span>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-[11px] text-traveloop-ice/55">
            <span>Trip progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-traveloop-sky to-traveloop-ice"
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex -space-x-2">
            {travelers.map((t, i) => (
              <div
                key={`${t}-${i}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0B0F1A] bg-gradient-to-br from-traveloop-steel to-traveloop-slate text-[10px] font-semibold text-white"
                title={t}
              >
                {t.slice(0, 2).toUpperCase()}
              </div>
            ))}
          </div>
          <span className="text-xs font-medium text-traveloop-sky opacity-0 transition-opacity group-hover:opacity-100">
            View details →
          </span>
        </div>
      </div>
    </motion.article>
  )
}
