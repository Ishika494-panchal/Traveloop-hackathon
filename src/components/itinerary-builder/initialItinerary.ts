import { TRIP_PLAN_CONTEXT_KEY } from '@/lib/tripDraft'

import { type ItinerarySection, newId } from './types'

const u = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=480&q=80`

export function createDefaultSections(): ItinerarySection[] {
  return [
    {
      id: newId('sec'),
      dayIndex: 1,
      title: 'Day 1 · Arrival & Old Town',
      destination: 'Manali',
      description: 'Ease into altitude with a soft cultural loop and golden-hour viewpoints.',
      dateFrom: '2026-06-12',
      dateTo: '2026-06-12',
      budgetLabel: '420',
      budgetValue: 420,
      activities: [
        {
          id: newId('act'),
          title: 'Hadimba Temple',
          duration: '2h',
          costLabel: '$18',
          costValue: 18,
          rating: 4.8,
          image: u('1566073771259-6a8506099945'),
        },
        {
          id: newId('act'),
          title: 'Food Street Tour',
          duration: '3h',
          costLabel: '$32',
          costValue: 32,
          rating: 4.6,
          image: u('1540189549336-e6e99c3679fe'),
        },
      ],
    },
    {
      id: newId('sec'),
      dayIndex: 2,
      title: 'Day 2 · Valleys & Vistas',
      destination: 'Solang Valley',
      description: 'Cable vistas, alpine meadows, and a paced afternoon reset.',
      dateFrom: '2026-06-13',
      dateTo: '2026-06-13',
      budgetLabel: '560',
      budgetValue: 560,
      activities: [
        {
          id: newId('act'),
          title: 'Swiss Cable Ride',
          duration: '4h',
          costLabel: '$48',
          costValue: 48,
          rating: 4.9,
          image: u('1506905925346-21bda4d32df4'),
        },
        {
          id: newId('act'),
          title: 'Beach Sunset',
          duration: '1.5h',
          costLabel: '$0',
          costValue: 0,
          rating: 4.7,
          image: u('1507525428034-b723cf961d3e'),
        },
      ],
    },
    {
      id: newId('sec'),
      dayIndex: 3,
      title: 'Day 3 · Departure buffer',
      destination: 'Chandigarh',
      description: 'Light brunch, last souvenirs, and smooth transfer windows.',
      dateFrom: '2026-06-14',
      dateTo: '2026-06-14',
      budgetLabel: '280',
      budgetValue: 280,
      activities: [
        {
          id: newId('act'),
          title: 'Café hop & vinyl market',
          duration: '2.5h',
          costLabel: '$24',
          costValue: 24,
          rating: 4.5,
          image: u('1495474473277-4e4a39796d8e'),
        },
      ],
    },
  ]
}

export function hydrateFromPlanContext(): Partial<{ destination: string }> | null {
  try {
    const raw = sessionStorage.getItem(TRIP_PLAN_CONTEXT_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as { form?: { destination?: string } }
    const dest = p.form?.destination
    if (!dest) return null
    return { destination: dest }
  } catch {
    return null
  }
}

export function emptySection(dayIndex: number): ItinerarySection {
  return {
    id: newId('sec'),
    dayIndex,
    title: `Day ${dayIndex} · New section`,
    destination: 'Destination',
    description: 'Describe the rhythm of this day — pace, anchors, and rest.',
    dateFrom: '',
    dateTo: '',
    budgetLabel: '0',
    budgetValue: 0,
    activities: [],
  }
}
