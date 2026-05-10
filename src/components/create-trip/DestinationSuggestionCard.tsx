import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useRef } from 'react'

export type Suggestion = {
  title: string
  tagline: string
  image: string
}

type DestinationSuggestionCardProps = {
  suggestion: Suggestion
  index: number
}

export function DestinationSuggestionCard({ suggestion, index }: DestinationSuggestionCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(40)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 260, damping: 24 })
  const rotateY = useSpring(ry, { stiffness: 260, damping: 24 })
  const glow = useMotionTemplate`radial-gradient(220px circle at ${mx}% ${my}%, rgba(136,189,242,0.35), transparent 65%)`

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      mx.set(px * 100)
      my.set(py * 100)
      rx.set((0.5 - py) * 10)
      ry.set((px - 0.5) * 12)
    },
    [mx, my, rx, ry],
  )

  const onLeave = useCallback(() => {
    rx.set(0)
    ry.set(0)
    mx.set(50)
    my.set(40)
  }, [mx, my, rx, ry])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: 0.06 * index, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformPerspective: 1100, rotateX, rotateY }}
      className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-traveloop-sky/25 bg-[#0B0F1A]/60 shadow-[0_0_28px_rgba(56,73,89,0.45)] will-change-transform md:aspect-[5/3]"
    >
      <motion.img
        src={suggestion.image}
        alt={suggestion.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        loading="lazy"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen transition-opacity group-hover:opacity-90"
        style={{ background: glow }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <h3 className="text-lg font-semibold tracking-tight text-white md:text-xl">{suggestion.title}</h3>
        <p className="mt-1 text-sm text-traveloop-ice/75">{suggestion.tagline}</p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-traveloop-sky/0 transition-[box-shadow] duration-300 group-hover:shadow-[0_0_0_1px_rgba(136,189,242,0.45),0_16px_48px_rgba(136,189,242,0.2)]" />
    </motion.div>
  )
}
