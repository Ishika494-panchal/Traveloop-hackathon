import { motion } from 'framer-motion'
import { GripVertical, Star } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import type { Activity } from './types'

type ActivityCardProps = {
  activity: Activity
  dragHandleProps?: ButtonHTMLAttributes<HTMLButtonElement>
  isDragging?: boolean
}

export function ActivityCard({ activity, dragHandleProps, isDragging }: ActivityCardProps) {
  return (
    <motion.div
      layout
      style={{ touchAction: 'none' }}
      className={cn(
        'group relative flex gap-3 overflow-hidden rounded-2xl border border-traveloop-sky/25 bg-[#0B0F1A]/55 p-3 shadow-[0_0_24px_rgba(56,73,89,0.35)] backdrop-blur-md transition-shadow',
        'hover:border-traveloop-sky/45 hover:shadow-[0_0_32px_rgba(136,189,242,0.18)]',
        isDragging && 'z-50 scale-[1.02] border-traveloop-sky/60 shadow-[0_0_40px_rgba(136,189,242,0.35)] ring-2 ring-traveloop-sky/30',
      )}
    >
      <button
        type="button"
        className="mt-0.5 flex h-9 w-7 shrink-0 cursor-grab items-center justify-center rounded-lg border border-traveloop-slate/40 bg-white/[0.04] text-traveloop-steel active:cursor-grabbing hover:border-traveloop-ice/35 hover:text-traveloop-ice"
        {...dragHandleProps}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" strokeWidth={1.75} />
      </button>
      <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl border border-traveloop-sky/20">
        <img src={activity.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/70 to-transparent opacity-80" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-white">{activity.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-traveloop-ice/65">
          <span>{activity.duration}</span>
          <span className="text-traveloop-sky">{activity.costLabel}</span>
          <span className="inline-flex items-center gap-0.5 text-traveloop-ice/80">
            <Star className="h-3 w-3 fill-traveloop-sky/50 text-traveloop-sky" strokeWidth={1.5} />
            {activity.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
