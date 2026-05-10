import { motion, useTransform } from 'framer-motion'
import { useMemo, useState } from 'react'

import type { DiscoverActivity } from '@/components/discover/activitiesMock'
import { DISCOVER_ACTIVITIES } from '@/components/discover/activitiesMock'
import { ActivityResultCard } from '@/components/discover/ActivityResultCard'
import { DiscoverAnimatedBackground } from '@/components/discover/DiscoverAnimatedBackground'
import {
  DiscoverFilterDropdowns,
  type GroupByOption,
  type RefineOption,
  type SortOption,
} from '@/components/discover/DiscoverFilterDropdowns'
import { DiscoverFloatingWidgets } from '@/components/discover/DiscoverFloatingWidgets'
import { DiscoverNavbar } from '@/components/discover/DiscoverNavbar'
import { DiscoverSearchBar } from '@/components/discover/DiscoverSearchBar'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function priceBand(price: number): string {
  if (price < 75) return 'Budget · $'
  if (price < 130) return 'Mid · $$'
  return 'Premium · $$$'
}

function matchesRefine(a: DiscoverActivity, refine: RefineOption): boolean {
  switch (refine) {
    case 'budget':
      return a.price < 85
    case 'half_day':
      return a.durationHours <= 4
    case 'high_rated':
      return a.rating >= 4.8
    case 'popular':
      return a.popularity >= 90
    default:
      return true
  }
}

function matchesSearch(a: DiscoverActivity, q: string): boolean {
  const s = q.trim().toLowerCase()
  if (!s) return true
  return (
    a.title.toLowerCase().includes(s) ||
    a.description.toLowerCase().includes(s) ||
    a.location.toLowerCase().includes(s) ||
    a.city.toLowerCase().includes(s) ||
    a.country.toLowerCase().includes(s) ||
    a.category.toLowerCase().includes(s)
  )
}

function sortActivities(list: DiscoverActivity[], sort: SortOption): DiscoverActivity[] {
  const next = [...list]
  switch (sort) {
    case 'rating':
      return next.sort((a, b) => b.rating - a.rating)
    case 'price_asc':
      return next.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return next.sort((a, b) => b.price - a.price)
    case 'duration':
      return next.sort((a, b) => a.durationHours - b.durationHours)
    default:
      return next.sort((a, b) => b.popularity - a.popularity)
  }
}

function groupKey(a: DiscoverActivity, groupBy: GroupByOption): string | null {
  if (groupBy === 'none') return null
  if (groupBy === 'city') return a.city
  if (groupBy === 'category') return a.category
  return priceBand(a.price)
}

export function ActivityCitySearchPage() {
  const reduced = usePrefersReducedMotion()
  const { x, y } = useMouseParallax(reduced ? 0 : 8)
  const hx = useTransform(x, (v) => v * 0.22)
  const hy = useTransform(y, (v) => v * 0.22)

  const [query, setQuery] = useState('')
  const [groupBy, setGroupBy] = useState<GroupByOption>('none')
  const [category, setCategory] = useState('all')
  const [refine, setRefine] = useState<RefineOption>('any')
  const [sort, setSort] = useState<SortOption>('popularity')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [bookmarked, setBookmarked] = useState<Set<string>>(() => new Set(['a2', 'a5']))
  const [selectedId, setSelectedId] = useState<string | null>('a3')

  const filtered = useMemo(() => {
    let list = DISCOVER_ACTIVITIES.filter((a) => matchesSearch(a, query))
    if (category !== 'all') list = list.filter((a) => a.category === category)
    list = list.filter((a) => matchesRefine(a, refine))
    return sortActivities(list, sort)
  }, [query, category, refine, sort])

  const grouped = useMemo(() => {
    if (groupBy === 'none') return null
    const m = new Map<string, DiscoverActivity[]>()
    for (const a of filtered) {
      const k = groupKey(a, groupBy)
      if (!k) continue
      if (!m.has(k)) m.set(k, [])
      m.get(k)!.push(a)
    }
    return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered, groupBy])

  const particles = useMemo(
    () =>
      reduced
        ? []
        : Array.from({ length: 14 }, (_, i) => ({
            id: i,
            left: `${8 + ((i * 13) % 84)}%`,
            top: `${12 + ((i * 9) % 40)}%`,
            delay: i * 0.06,
          })),
    [reduced],
  )

  function toggleBm(id: string) {
    setBookmarked((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  function renderCards(list: DiscoverActivity[], offset: number) {
    return list.map((activity, i) => (
      <ActivityResultCard
        key={activity.id}
        activity={activity}
        index={offset + i}
        bookmarked={bookmarked.has(activity.id)}
        onToggleBookmark={() => toggleBm(activity.id)}
        selected={selectedId === activity.id}
        onSelect={() => setSelectedId(activity.id)}
      />
    ))
  }

  return (
    <motion.div
      className="relative min-h-screen bg-[#0B0F1A] text-traveloop-ice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <DiscoverAnimatedBackground />
      <DiscoverNavbar />
      <DiscoverFloatingWidgets />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-6 md:max-w-[1200px] md:px-8 md:pb-32 xl:max-w-[1280px] xl:pr-56">
        <header className="relative mb-10 md:mb-12">
          {!reduced &&
            particles.map((p) => (
              <motion.span
                key={p.id}
                className="pointer-events-none absolute h-1 w-1 rounded-full bg-traveloop-sky/85 shadow-[0_0_12px_rgba(136,189,242,0.95)]"
                style={{ left: p.left, top: p.top }}
                animate={{ opacity: [0.15, 0.92, 0.2], scale: [0.85, 1.15, 0.92] }}
                transition={{ duration: 3 + p.delay * 0.05, repeat: Infinity, delay: p.delay }}
              />
            ))}
          <motion.div style={{ x: hx, y: hy }} className="relative max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-br from-white via-traveloop-ice to-traveloop-steel bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-[2.45rem]"
            >
              Discover Experiences
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.16, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 h-px max-w-xl origin-left bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-transparent shadow-[0_0_22px_rgba(136,189,242,0.45)]"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.48 }}
              className="mt-4 max-w-2xl text-base leading-relaxed text-traveloop-ice/68 md:text-lg"
            >
              Explore activities, destinations, adventures, cafes, nightlife, and unforgettable moments.
            </motion.p>
          </motion.div>
        </header>

        <section className="mb-6 space-y-5 md:mb-8">
          <DiscoverSearchBar value={query} onChange={setQuery} />
          <div className="rounded-2xl border border-traveloop-sky/18 bg-[#0B0F1A]/25 p-4 shadow-inner-glow backdrop-blur-xl md:p-5">
            <DiscoverFilterDropdowns
              groupBy={groupBy}
              onGroupBy={setGroupBy}
              category={category}
              onCategory={setCategory}
              refine={refine}
              onRefine={setRefine}
              sort={sort}
              onSort={setSort}
              mobileOpen={mobileFiltersOpen}
              onMobileOpen={setMobileFiltersOpen}
            />
          </div>
        </section>

        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-end justify-between gap-3"
          >
            <div>
              <h2 className="text-xl font-semibold text-white md:text-2xl">Results</h2>
              <p className="mt-1 text-sm text-traveloop-ice/55">
                {filtered.length} experience{filtered.length === 1 ? '' : 's'} match your journey
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6 md:gap-8">
            {grouped
              ? grouped.map(([key, list], gi) => (
                  <div key={key} className="space-y-4">
                    <motion.h3
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel"
                    >
                      {key}
                    </motion.h3>
                    <div className="flex flex-col gap-5 md:gap-6">{renderCards(list, gi * 12)}</div>
                  </div>
                ))
              : renderCards(filtered, 0)}
          </div>

          {!filtered.length ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-traveloop-slate/35 bg-[#0B0F1A]/4 py-14 text-center text-traveloop-ice/65 backdrop-blur-md">
              Nothing matched — try widening filters or shortening your search.
            </motion.p>
          ) : null}
        </section>
      </main>
    </motion.div>
  )
}
