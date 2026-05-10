export type ExpenseInfo = {
  amount: number
  category: string
  indicator: number
}

export type ItineraryActivity = {
  id: string
  day: number
  title: string
  category: string
  icon: 'utensils' | 'camera' | 'sun' | 'waves' | 'shopping' | 'car' | 'map'
  image: string
  time: string
  duration: string
  note: string
  destination: string
  expense: ExpenseInfo
}

export const CHART_PALETTE = ['#88BDF2', '#BDDDFC', '#6A89A7', '#384959'] as const

export const BUDGET_CHART_ROWS = [
  { name: 'Stay', key: 'stay', value: 420, fill: CHART_PALETTE[0] },
  { name: 'Food', key: 'food', value: 285, fill: CHART_PALETTE[1] },
  { name: 'Transport', key: 'transport', value: 165, fill: CHART_PALETTE[2] },
  { name: 'Activities', key: 'activities', value: 320, fill: CHART_PALETTE[3] },
]

export const BUDGET_SUMMARY = {
  totalBudget: 1600,
  totalSpent: 1190,
  remaining: 410,
  avgDailySpend: 170,
  tripDays: 7,
}

export const TRIP_META = {
  title: 'Himalayan Ridge Escape',
  location: 'Manali corridor, IN',
  weather: '14°C · clear',
  durationLabel: '7 days · 18 activities',
}

export const ITINERARY_ACTIVITIES: ItineraryActivity[] = [
  {
    id: 'i1',
    day: 1,
    title: 'Breakfast at Old Manali Cafe',
    category: 'Food',
    icon: 'utensils',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    time: '8:30 AM',
    duration: '55 min',
    note: 'Riverside deck · local siddu & chai',
    destination: 'Manali',
    expense: { amount: 18, category: 'Dining', indicator: 12 },
  },
  {
    id: 'i2',
    day: 1,
    title: 'Museum of Himalayan Culture',
    category: 'Museums',
    icon: 'camera',
    image: 'https://images.unsplash.com/photo-1566127444979-b3d2badd0f4b?w=600&q=80',
    time: '10:15 AM',
    duration: '2 hr',
    note: 'Curated textiles & instrument hall',
    destination: 'Manali',
    expense: { amount: 14, category: 'Tickets', indicator: -4 },
  },
  {
    id: 'i3',
    day: 1,
    title: 'Sunset Point Ridge',
    category: 'Adventure',
    icon: 'sun',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    time: '5:30 PM',
    duration: '1.5 hr',
    note: 'Golden hour · light trek',
    destination: 'Vashisht',
    expense: { amount: 0, category: 'Free', indicator: 0 },
  },
  {
    id: 'i4',
    day: 2,
    title: 'Beach-style river lounge',
    category: 'Leisure',
    icon: 'waves',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    time: '9:00 AM',
    duration: '2 hr',
    note: 'Beas embankment · cold plunge optional',
    destination: 'Kullu',
    expense: { amount: 22, category: 'Activities', indicator: 8 },
  },
  {
    id: 'i5',
    day: 2,
    title: 'Chef-led food tour',
    category: 'Food',
    icon: 'utensils',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
    time: '1:00 PM',
    duration: '3 hr',
    note: 'Six stops · mountain herbs',
    destination: 'Naggar',
    expense: { amount: 48, category: 'Dining', indicator: 18 },
  },
  {
    id: 'i6',
    day: 2,
    title: 'Night market wander',
    category: 'Nightlife',
    icon: 'shopping',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
    time: '8:00 PM',
    duration: '2.5 hr',
    note: 'Lantern alleys · live folk',
    destination: 'Manali',
    expense: { amount: 35, category: 'Shopping', indicator: 6 },
  },
]

export function groupActivitiesByDay(acts: ItineraryActivity[]) {
  const map = new Map<number, ItineraryActivity[]>()
  for (const a of acts) {
    if (!map.has(a.day)) map.set(a.day, [])
    map.get(a.day)!.push(a)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a - b)
    .map(([day, list]) => ({ day, activities: list }))
}
