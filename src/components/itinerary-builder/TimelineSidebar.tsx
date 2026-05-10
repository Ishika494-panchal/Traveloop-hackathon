import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'

import type { ItinerarySection } from './types'

function SortableDayDot({
  section,
  active,
  onActivate,
}: {
  section: ItinerarySection
  active: boolean
  onActivate: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    data: { type: 'timeline-section' },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative flex gap-3">
      <button
        type="button"
        onClick={() => onActivate(section.id)}
        className={cn(
          'relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all',
          active
            ? 'border-traveloop-sky/70 bg-traveloop-sky/25 text-white shadow-[0_0_24px_rgba(136,189,242,0.45)]'
            : 'border-traveloop-slate/50 bg-[#0B0F1A]/60 text-traveloop-ice/80 hover:border-traveloop-sky/40',
          isDragging && 'scale-105 ring-2 ring-traveloop-sky/40',
        )}
        {...attributes}
        {...listeners}
      >
        {section.dayIndex}
      </button>
      <div className="min-w-0 pt-1">
        <p className="truncate text-xs font-semibold uppercase tracking-widest text-traveloop-steel">Day {section.dayIndex}</p>
        <p className="truncate text-sm font-medium text-white">{section.destination}</p>
      </div>
    </div>
  )
}

type TimelineSidebarProps = {
  sections: ItinerarySection[]
  activeSectionId: string | null
  onActivate: (id: string) => void
}

export function TimelineSidebar({ sections, activeSectionId, onActivate }: TimelineSidebarProps) {
  return (
    <aside className="relative lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border border-traveloop-sky/22 bg-[#0B0F1A]/45 p-4 shadow-inner-glow backdrop-blur-xl md:p-5">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-traveloop-steel">Trip timeline</p>
        <div className="relative flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
          <div
            className="pointer-events-none absolute left-[22px] top-3 hidden w-px bg-gradient-to-b from-traveloop-sky/50 via-traveloop-slate/40 to-transparent lg:block"
            style={{ height: 'calc(100% - 12px)' }}
            aria-hidden
          />
          <div className="flex min-w-max gap-4 lg:min-w-0 lg:flex-col lg:gap-5">
            {sections.map((section) => (
              <SortableDayDot
                key={section.id}
                section={section}
                active={activeSectionId === section.id}
                onActivate={onActivate}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
