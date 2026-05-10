import { ActivityCard } from '@/components/itinerary-view/ActivityCard'
import { ExpenseCard } from '@/components/itinerary-view/ExpenseCard'
import type { ItineraryActivity } from '@/components/itinerary-view/itineraryViewMock'
import { RouteConnector } from '@/components/itinerary-view/RouteConnector'

type ActivityExpenseRowsProps = {
  activities: ItineraryActivity[]
}

export function ActivityExpenseRows({ activities }: ActivityExpenseRowsProps) {
  return (
    <div className="min-w-0 flex-1 space-y-3">
      {activities.map((a, idx) => (
        <div key={a.id} className="space-y-1">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_220px]">
            <ActivityCard activity={a} index={idx} />
            <div className="lg:self-start">
              <ExpenseCard expense={a.expense} index={idx} />
            </div>
          </div>
          {idx < activities.length - 1 ? <RouteConnector /> : null}
        </div>
      ))}
    </div>
  )
}
