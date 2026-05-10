export type DiscoverActivity = {
  id: string
  title: string
  description: string
  location: string
  city: string
  country: string
  duration: string
  timings: string
  rating: number
  reviewCount: number
  popularity: number
  price: number
  category: string
  image: string
  mapLat: number
  mapLng: number
  /** For sort by duration */
  durationHours: number
}

export const ACTIVITY_CATEGORIES = [
  'Adventure',
  'Nightlife',
  'Cafes',
  'Trekking',
  'Museums',
  'Beaches',
  'Food Tours',
  'Cultural Places',
] as const

export const DISCOVER_ACTIVITIES: DiscoverActivity[] = [
  {
    id: 'a1',
    title: 'Paragliding in Manali',
    description: 'Soar over pine valleys with certified pilots and 4K ridge-line views at golden hour.',
    location: 'Solang Valley, Manali',
    city: 'Manali',
    country: 'India',
    duration: '3 hours',
    timings: '6:30 AM · 10:00 AM · 4:00 PM',
    rating: 4.9,
    reviewCount: 842,
    popularity: 94,
    price: 89,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    mapLat: 32.2396,
    mapLng: 77.1887,
    durationHours: 3,
  },
  {
    id: 'a2',
    title: 'Tokyo Night Food Tour',
    description: 'Neon-lit alleys, izakayas, and chef-led tastings through Shinjuku after dark.',
    location: 'Shinjuku, Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    duration: '4 hours',
    timings: '7:00 PM nightly',
    rating: 4.95,
    reviewCount: 2104,
    popularity: 98,
    price: 120,
    category: 'Food Tours',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    mapLat: 35.6938,
    mapLng: 139.7034,
    durationHours: 4,
  },
  {
    id: 'a3',
    title: 'Swiss Mountain Trek',
    description: 'Guided alpine traverse with cable-car access and panoramic glacier viewpoints.',
    location: 'Grindelwald, Bern',
    city: 'Grindelwald',
    country: 'Switzerland',
    duration: 'Full day',
    timings: '5:45 AM meet',
    rating: 4.88,
    reviewCount: 612,
    popularity: 91,
    price: 220,
    category: 'Trekking',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    mapLat: 46.624,
    mapLng: 8.036,
    durationHours: 10,
  },
  {
    id: 'a4',
    title: 'Bali Beach Club',
    description: 'Infinity pools, curated DJ sets, and sunset sessions on volcanic black sand cues.',
    location: 'Canggu, Bali',
    city: 'Canggu',
    country: 'Indonesia',
    duration: '6 hours',
    timings: '2:00 PM – 11:00 PM',
    rating: 4.75,
    reviewCount: 1530,
    popularity: 89,
    price: 65,
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    mapLat: -8.6595,
    mapLng: 115.151,
    durationHours: 6,
  },
  {
    id: 'a5',
    title: 'Paris Museum Walk',
    description: 'Skip-the-line Louvre highlights plus hidden marais galleries with an art historian.',
    location: '1st Arr., Paris',
    city: 'Paris',
    country: 'France',
    duration: '5 hours',
    timings: '9:30 AM · 2:00 PM',
    rating: 4.82,
    reviewCount: 1762,
    popularity: 93,
    price: 95,
    category: 'Museums',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    mapLat: 48.8606,
    mapLng: 2.3376,
    durationHours: 5,
  },
  {
    id: 'a6',
    title: 'Goa Nightlife Experience',
    description: 'Coastal clubs, live bands, and secret beach parties with local hosts and safe transit.',
    location: 'Baga – Anjuna, Goa',
    city: 'Goa',
    country: 'India',
    duration: '5 hours',
    timings: '9:00 PM – 2:00 AM',
    rating: 4.7,
    reviewCount: 988,
    popularity: 87,
    price: 55,
    category: 'Nightlife',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    mapLat: 15.5593,
    mapLng: 73.7537,
    durationHours: 5,
  },
]
