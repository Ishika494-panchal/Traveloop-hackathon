import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { ActivityCard } from './ActivityCard'
import type { Activity } from './types'

type SortableActivityCardProps = {
  activity: Activity
}

export function SortableActivityCard({ activity }: SortableActivityCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: activity.id,
    data: { type: 'activity' },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <ActivityCard activity={activity} dragHandleProps={{ ...attributes, ...listeners }} isDragging={isDragging} />
    </div>
  )
}
