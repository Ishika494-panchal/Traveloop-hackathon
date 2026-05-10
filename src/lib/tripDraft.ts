import type { PreferenceId } from '@/components/create-trip/PreferenceChips'
import type { TripFormValues } from '@/components/create-trip/TripForm'

export const TRIP_DRAFT_STORAGE_KEY = 'traveloop-draft-trip'
export const TRIP_PLAN_CONTEXT_KEY = 'traveloop-plan-context'

export function sortedPrefs(preferences: PreferenceId[]): PreferenceId[] {
  return [...preferences].sort()
}

export function serializeTrip(form: TripFormValues, preferences: PreferenceId[]): string {
  return JSON.stringify({ form, preferences: sortedPrefs(preferences) })
}

export function readDraftFromStorage(): { form: TripFormValues; preferences: PreferenceId[] } | null {
  try {
    const raw = localStorage.getItem(TRIP_DRAFT_STORAGE_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as { form?: TripFormValues; preferences?: PreferenceId[] }
    if (!p?.form) return null
    return {
      form: p.form,
      preferences: Array.isArray(p.preferences) ? p.preferences : [],
    }
  } catch {
    return null
  }
}
