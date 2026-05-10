import type { ItinerarySection } from './types'

export function sumActivitySpend(sections: ItinerarySection[]): number {
  return sections.reduce(
    (acc, s) => acc + s.activities.reduce((a, act) => a + (Number.isFinite(act.costValue) ? act.costValue : 0), 0),
    0,
  )
}

export function sumSectionBudgets(sections: ItinerarySection[]): number {
  return sections.reduce((acc, s) => acc + (Number.isFinite(s.budgetValue) ? s.budgetValue : 0), 0)
}

export function countActivities(sections: ItinerarySection[]): number {
  return sections.reduce((acc, s) => acc + s.activities.length, 0)
}

export function uniqueCities(sections: ItinerarySection[]): string[] {
  const set = new Set(sections.map((s) => s.destination.trim()).filter(Boolean))
  return [...set]
}

export function totalTripDays(sections: ItinerarySection[]): number {
  if (!sections.length) return 0
  return sections.length
}
