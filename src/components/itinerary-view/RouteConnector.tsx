import { motion } from 'framer-motion'

export function RouteConnector() {
  return (
    <div className="flex items-stretch gap-3 py-2 pl-4 md:pl-6" aria-hidden>
      <div className="flex w-6 flex-col items-center md:w-8">
        <div className="w-px flex-1 min-h-[28px] bg-gradient-to-b from-traveloop-sky/80 via-traveloop-ice/45 to-traveloop-sky/50 shadow-[0_0_10px_rgba(136,189,242,0.35)]" />
      </div>
      <motion.div
        className="flex flex-1 items-center gap-2"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="hidden h-[2px] flex-1 max-w-[100px] rounded-full bg-gradient-to-r from-traveloop-sky/10 via-traveloop-ice to-traveloop-sky/25 sm:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          style={{ originX: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="rounded-full border border-traveloop-sky/35 bg-[#080c16] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-traveloop-sky shadow-[0_0_14px_rgba(136,189,242,0.2)]">
          Next · route
        </span>
      </motion.div>
    </div>
  )
}
