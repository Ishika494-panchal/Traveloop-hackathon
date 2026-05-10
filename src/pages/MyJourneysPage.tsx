import { motion, useTransform } from 'framer-motion'
import { useMemo, useState } from 'react'

import { FloatingStatsJourneys } from '@/components/journeys/FloatingStatsJourneys'
import { JourneysAnimatedBackground } from '@/components/journeys/JourneysAnimatedBackground'
import { JourneysFAB } from '@/components/journeys/JourneysFAB'
import { JourneysNavbar } from '@/components/journeys/JourneysNavbar'
import { MOCK_JOURNEYS } from '@/components/journeys/mockTrips'
import {
  type FilterBy,
  type GroupBy,
  SearchFilters,
  type SortBy,
} from '@/components/journeys/SearchFilters'
import { TripSection } from '@/components/journeys/TripSection'
import type { JourneyStatus, JourneyTrip } from '@/components/journeys/types'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function filterAndSort(
  trips: JourneyTrip[],
  query: string,
  filterBy: FilterBy,
  sortBy: SortBy,
): JourneyTrip[] {
  let list = [...trips]
  const q = query.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.dates.toLowerCase().includes(q) ||
        t.destinations.some((d) => d.toLowerCase().includes(q)),
    )
  }
  if (filterBy !== 'all') {
    list = list.filter((t) => t.status === filterBy)
  }
  if (sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy === 'budget') list.sort((a, b) => b.budgetValue - a.budgetValue)
  if (sortBy === 'date') {
    const order: Record<JourneyStatus, number> = { ongoing: 0, upcoming: 1, completed: 2 }
    list.sort((a, b) => order[a.status] - order[b.status] || a.name.localeCompare(b.name))
  }
  return list
}

export function MyJourneysPage() {
  const reduced = usePrefersReducedMotion()
  const { x, y } = useMouseParallax(reduced ? 0 : 10)
  const hx = useTransform(x, (v) => v * 0.28)
  const hy = useTransform(y, (v) => v * 0.28)

  const [query, setQuery] = useState('')
  const [groupBy, setGroupBy] = useState<GroupBy>('status')
  const [filterBy, setFilterBy] = useState<FilterBy>('all')
  const [sortBy, setSortBy] = useState<SortBy>('date')

  const filtered = useMemo(
    () => filterAndSort(MOCK_JOURNEYS, query, filterBy, sortBy),
    [query, filterBy, sortBy],
  )

  const ongoing = useMemo(() => filtered.filter((t) => t.status === 'ongoing'), [filtered])
  const upcoming = useMemo(() => filtered.filter((t) => t.status === 'upcoming'), [filtered])
  const completed = useMemo(() => filtered.filter((t) => t.status === 'completed'), [filtered])

  const stats = useMemo(() => {
    const all = MOCK_JOURNEYS
    const countries = new Set(all.flatMap((t) => t.destinations)).size
    const totalTrips = all.length
    const totalBudgetSpent = all.filter((t) => t.status === 'completed').reduce((a, t) => a + t.budgetValue, 0)
    const activeTravelers = Math.max(...all.map((t) => t.travelers))
    return { countries, totalTrips, totalBudgetSpent, activeTravelers }
  }, [])

  const headerParticles = useMemo(
    () =>
      reduced
        ? []
        : Array.from({ length: 16 }, (_, i) => ({
            id: i,
            left: `${8 + ((i * 9) % 86)}%`,
            top: `${8 + ((i * 6) % 32)}%`,
            delay: i * 0.07,
          })),
    [reduced],
  )

  const groupedSections = useMemo(() => {
    if (groupBy === 'destination') {
      const map = new Map<string, JourneyTrip[]>()
      for (const t of filtered) {
        const key = t.destinations[0] ?? 'Other'
        if (!map.has(key)) map.set(key, [])
        map.get(key)!.push(t)
      }
      return [...map.entries()].map(([title, trips]) => ({ title, trips }))
    }
    return null
  }, [filtered, groupBy])

  return (
    <motion.div
      className="relative min-h-screen bg-[#0B0F1A] text-traveloop-ice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <JourneysAnimatedBackground />
      <JourneysNavbar />
      <FloatingStatsJourneys
        countries={stats.countries}
        totalTrips={stats.totalTrips}
        totalBudgetSpent={stats.totalBudgetSpent}
        activeTravelers={stats.activeTravelers}
      />
      <JourneysFAB />

      <main className="relative z-10 mx-auto max-w-[1200px] px-4 pb-28 pt-6 md:px-8 md:pb-32 md:pt-8 lg:max-w-[1400px] lg:pr-56">
        <header className="relative mb-8 md:mb-10">
          {!reduced
            ? headerParticles.map((p) => (
                <motion.span
                  key={p.id}
                  className="pointer-events-none absolute h-1 w-1 rounded-full bg-traveloop-sky/75 shadow-[0_0_12px_rgba(136,189,242,0.9)]"
                  style={{ left: p.left, top: p.top }}
                  animate={{ opacity: [0.2, 0.95, 0.25], scale: [0.85, 1.2, 0.95] }}
                  transition={{ duration: 3.2 + p.delay * 0.06, repeat: Infinity, delay: p.delay }}
                />
              ))
            : null}
          <motion.div style={{ x: hx, y: hy }} className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.5rem]"
            >
              My Travel Journeys
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 h-px max-w-lg origin-left bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-transparent shadow-[0_0_20px_rgba(136,189,242,0.5)]"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mt-4 max-w-2xl text-base leading-relaxed text-traveloop-ice/70 md:text-lg"
            >
              Manage ongoing adventures, upcoming plans, and completed travel experiences.
            </motion.p>
          </motion.div>
        </header>

        <SearchFilters
          query={query}
          onQueryChange={setQuery}
          groupBy={groupBy}
          onGroupByChange={setGroupBy}
          filterBy={filterBy}
          onFilterChange={setFilterBy}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {groupBy === 'destination' && groupedSections ? (
          <>
            {groupedSections.map(({ title, trips }, i) => (
              <TripSection key={title} title={title} trips={trips} index={i} />
            ))}
          </>
        ) : (
          <>
            <TripSection title="Ongoing" subtitle="Live adventures in motion" trips={ongoing} index={0} />
            <TripSection title="Upcoming" subtitle="Locked dates, flexible details" trips={upcoming} index={1} />
            <TripSection title="Completed" subtitle="Memories archived, learnings kept" trips={completed} index={2} />
          </>
        )}
      </main>
    </motion.div>
  )
}
