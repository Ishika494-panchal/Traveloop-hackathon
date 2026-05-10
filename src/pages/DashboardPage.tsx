import { motion } from 'framer-motion'

import { AnimatedBackground } from '@/components/dashboard/AnimatedBackground'
import { FloatingActionButton } from '@/components/dashboard/FloatingActionButton'
import { FloatingWidgets } from '@/components/dashboard/FloatingWidgets'
import { HeroBanner } from '@/components/dashboard/HeroBanner'
import { Navbar } from '@/components/dashboard/Navbar'
import { QuickStats } from '@/components/dashboard/QuickStats'
import { RegionCard } from '@/components/dashboard/RegionCard'
import { SearchFilters } from '@/components/dashboard/SearchFilters'
import { TripCard } from '@/components/dashboard/TripCard'

const regions = [
  { title: 'Europe', subtitle: 'Cities, rails, culture', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80' },
  { title: 'Asia', subtitle: 'Temples to skylines', image: 'https://images.unsplash.com/photo-1493976040374-85c8e88f0d1b?auto=format&fit=crop&w=800&q=80' },
  { title: 'Beaches', subtitle: 'Coastlines & islands', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { title: 'Mountains', subtitle: 'Summits & trails', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
  { title: 'Adventure', subtitle: 'Raft, dive, trek', image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=800&q=80' },
]

const trips = [
  {
    title: 'Himachal Backpacking',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80',
    dates: 'Mar 12 – Mar 24, 2026',
    budget: '$1,840',
    progress: 72,
    status: 'Active' as const,
    travelers: ['AK', 'MJ', 'S'],
  },
  {
    title: 'Bali Escape',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
    dates: 'Jun 3 – Jun 14, 2026',
    budget: '$2,260',
    progress: 38,
    status: 'Planning' as const,
    travelers: ['AK', 'L'],
  },
  {
    title: 'Swiss Adventure',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80',
    dates: 'Sep 1 – Sep 9, 2025',
    budget: '$4,020',
    progress: 100,
    status: 'Completed' as const,
    travelers: ['AK', 'MJ', 'R', 'T'],
  },
]

export function DashboardPage() {
  return (
    <motion.div
      className="relative min-h-screen bg-[#0B0F1A] text-traveloop-ice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <AnimatedBackground />
      <Navbar />
      <FloatingWidgets />

      <main className="relative z-10 mx-auto max-w-[1600px] px-4 pb-28 pt-4 md:px-8 md:pb-32 lg:pl-28">
        <HeroBanner />

        <div className="mt-6 md:mt-8">
          <SearchFilters />
        </div>

        <section className="mt-8 md:mt-10">
          <QuickStats />
        </section>

        <section className="mt-10 md:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-4 md:mb-5"
          >
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">Top Regional Destinations</h2>
            <p className="mt-1 text-sm text-traveloop-ice/75 md:text-[15px]">Explore curated travel experiences</p>
          </motion.div>
          <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {regions.map((r) => (
              <RegionCard key={r.title} title={r.title} subtitle={r.subtitle} image={r.image} />
            ))}
          </div>
        </section>

        <section className="mt-10 md:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-4 md:mb-5"
          >
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">Previous Trips</h2>
            <p className="mt-1 text-sm text-traveloop-ice/75 md:text-[15px]">Pick up where you left off</p>
          </motion.div>
          <div className="flex flex-col items-stretch gap-5 md:flex-row md:gap-6 md:overflow-x-auto md:pb-2">
            {trips.map((t) => (
              <TripCard key={t.title} {...t} />
            ))}
          </div>
        </section>
      </main>

      <FloatingActionButton />
    </motion.div>
  )
}
