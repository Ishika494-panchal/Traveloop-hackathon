import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { motion } from 'framer-motion'
import { MapPin, Plus } from 'lucide-react'
import type { Ref } from 'react'

import { GlassInput } from '@/components/GlassInput'
import { GlassTextarea } from '@/components/GlassInput'
import { cn } from '@/lib/utils'

import { ActivitiesEndDrop } from './ActivitiesEndDrop'
import { SortableActivityCard } from './SortableActivityCard'
import { newId, type Activity, type ItinerarySection } from './types'

type ItinerarySectionCardProps = {
  section: ItinerarySection
  onPatch: (id: string, patch: Partial<ItinerarySection>) => void
  onAddActivity: (sectionId: string, activity: Activity) => void
  sectionRef?: Ref<HTMLDivElement>
}

function parseMoney(s: string): number {
  const n = parseFloat(s.replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

export function ItinerarySectionCard({ section, onPatch, onAddActivity, sectionRef }: ItinerarySectionCardProps) {
  const activityIds = section.activities.map((a) => a.id)

  const handleAddActivity = () => {
    onAddActivity(section.id, {
      id: newId('act'),
      title: 'New experience',
      duration: '1h',
      costLabel: '$0',
      costValue: 0,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=480&q=80',
    })
  }

  return (
    <motion.article
      ref={sectionRef}
      layout
      id={`itinerary-section-${section.id}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      style={{ transformPerspective: 1200 }}
      className="relative overflow-hidden rounded-3xl border border-traveloop-sky/25 bg-[#0B0F1A]/50 p-5 shadow-[0_0_40px_rgba(56,73,89,0.4)] backdrop-blur-2xl md:p-7"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-traveloop-sky/12 blur-3xl" />

      <header className="relative flex flex-wrap items-start justify-between gap-3 border-b border-traveloop-sky/15 pb-4">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-traveloop-sky/30 bg-traveloop-slate/30 text-traveloop-sky">
            <MapPin className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <div className="min-w-0 flex-1">
            <GlassInput
              value={section.title}
              onChange={(e) => onPatch(section.id, { title: e.target.value })}
              className="border-transparent bg-transparent px-0 py-1 text-lg font-semibold text-white shadow-none focus:ring-0 md:text-xl"
              placeholder="Section title"
            />
            <GlassInput
              value={section.destination}
              onChange={(e) => onPatch(section.id, { destination: e.target.value })}
              className="mt-1 border-transparent bg-transparent px-0 py-0.5 text-sm text-traveloop-steel shadow-none focus:ring-0"
              placeholder="Destination"
            />
          </div>
        </div>
        <span className="rounded-full border border-traveloop-slate/40 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-traveloop-ice/80">
          Day {section.dayIndex}
        </span>
      </header>

      <div className="relative mt-4">
        <GlassTextarea
          label="Description"
          value={section.description}
          onChange={(e) => onPatch(section.id, { description: e.target.value })}
          className="min-h-[100px] border-traveloop-sky/25 bg-[#0B0F1A]/35 text-sm text-traveloop-ice/90"
          placeholder="What happens on this day?"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-traveloop-ice/70">Date range</span>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <GlassInput
              type="date"
              value={section.dateFrom}
              onChange={(e) => onPatch(section.id, { dateFrom: e.target.value })}
              className="text-sm"
            />
            <span className="hidden text-traveloop-steel sm:inline">→</span>
            <GlassInput
              type="date"
              value={section.dateTo}
              onChange={(e) => onPatch(section.id, { dateTo: e.target.value })}
              className="text-sm"
            />
          </div>
        </div>
        <div>
          <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-traveloop-ice/70">Budget (USD)</span>
          <GlassInput
            value={section.budgetLabel}
            onChange={(e) => {
              const v = e.target.value
              onPatch(section.id, { budgetLabel: v, budgetValue: parseMoney(v) })
            }}
            placeholder="0"
            className="text-sm"
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Activities</p>
        <SortableContext items={activityIds} id={`activities-${section.id}`} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2.5">
            {section.activities.map((activity) => (
              <SortableActivityCard key={activity.id} activity={activity} />
            ))}
            <ActivitiesEndDrop sectionId={section.id} />
          </div>
        </SortableContext>
        <motion.button
          type="button"
          layout
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddActivity}
          className={cn(
            'mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-traveloop-slate/45 py-2.5 text-sm font-medium text-traveloop-ice/75 transition-colors',
            'hover:border-traveloop-sky/45 hover:bg-traveloop-sky/10 hover:text-traveloop-ice',
          )}
        >
          <Plus className="h-4 w-4" strokeWidth={1.75} />
          Add activity
        </motion.button>
      </div>
    </motion.article>
  )
}
