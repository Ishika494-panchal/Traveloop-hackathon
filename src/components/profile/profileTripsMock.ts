export type PreplannedProfileTrip = {
  id: string
  title: string
  image: string
  dates: string
  budget: string
  weather: string
}

export type PastProfileTrip = {
  id: string
  title: string
  image: string
  duration: string
  memories: number
  budget: string
}

export const PREPLANNED_PROFILE: PreplannedProfileTrip[] = [
  {
    id: 'p1',
    title: 'Bali Escape',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
    dates: 'Jun 3 – Jun 14, 2026',
    budget: '$2,260',
    weather: '28°C · Humid',
  },
  {
    id: 'p2',
    title: 'Swiss Adventure',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80',
    dates: 'Sep 1 – Sep 9, 2026',
    budget: '$4,020',
    weather: '18°C · Mild',
  },
  {
    id: 'p3',
    title: 'Tokyo Nights',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80',
    dates: 'Nov 8 – Nov 18, 2026',
    budget: '$3,100',
    weather: '17°C · Clear',
  },
]

export const PAST_PROFILE: PastProfileTrip[] = [
  {
    id: 'c1',
    title: 'Goa Roadtrip',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80',
    duration: '8 nights',
    memories: 186,
    budget: '$980',
  },
  {
    id: 'c2',
    title: 'Himalayan Trek',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80',
    duration: '10 nights',
    memories: 240,
    budget: '$1,420',
  },
  {
    id: 'c3',
    title: 'Paris Getaway',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
    duration: '6 nights',
    memories: 142,
    budget: '$2,650',
  },
]
