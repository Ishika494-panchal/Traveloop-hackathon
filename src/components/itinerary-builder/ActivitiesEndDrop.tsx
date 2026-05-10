import { useDroppable } from '@dnd-kit/core'

import { cn } from '@/lib/utils'

type ActivitiesEndDropProps = {
  sectionId: string
}

export function ActivitiesEndDrop({ sectionId }: ActivitiesEndDropProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `activities-end-${sectionId}`,
    data: { type: 'activities-end', sectionId },
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'mt-1 min-h-10 rounded-xl border border-dashed transition-colors',
        isOver ? 'border-traveloop-sky/70 bg-traveloop-sky/10' : 'border-traveloop-slate/25 bg-transparent',
      )}
    />
  )
}
