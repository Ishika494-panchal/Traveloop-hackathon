export type JourneyStatus = 'ongoing' | 'upcoming' | 'completed'

export type JourneyTrip = {
  id: string
  name: string
  description: string
  status: JourneyStatus
  image: string
  dates: string
  destinations: string[]
  budget: string
  budgetValue: number
  duration: string
  travelers: number
  weatherTemp: string
  weatherCond: string
  progress: number
  completedDays: number
  totalDays: number
}
