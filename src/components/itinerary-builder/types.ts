export type Activity = {
  id: string
  title: string
  duration: string
  costLabel: string
  costValue: number
  rating: number
  image: string
}

export type ItinerarySection = {
  id: string
  dayIndex: number
  title: string
  destination: string
  description: string
  dateFrom: string
  dateTo: string
  budgetLabel: string
  budgetValue: number
  activities: Activity[]
}

export function newId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`
}
