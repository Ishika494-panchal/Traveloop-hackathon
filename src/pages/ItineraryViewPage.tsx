import { motion, useTransform } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'

import { BudgetAnalytics } from '@/components/itinerary-view/BudgetAnalytics'
import { CalendarItineraryView } from '@/components/itinerary-view/CalendarItineraryView'
import { ExpenseSummaryWidgets } from '@/components/itinerary-view/ExpenseSummaryWidgets'
import { FloatingTravelWidgets } from '@/components/itinerary-view/FloatingTravelWidgets'
import { GroupedTimelineSection } from '@/components/itinerary-view/GroupedTimelineSection'
import type { FilterItin, GroupByItin, SortItin } from '@/components/itinerary-view/SearchFilters'
import { SearchFilters } from '@/components/itinerary-view/SearchFilters'
import { TimelineDay } from '@/components/itinerary-view/TimelineDay'
import type { ItineraryActivity } from '@/components/itinerary-view/itineraryViewMock'
import {
  BUDGET_CHART_ROWS,
  groupActivitiesByDay,
  ITINERARY_ACTIVITIES,
  TRIP_META,
} from '@/components/itinerary-view/itineraryViewMock'
import { ItineraryViewAnimatedBackground } from '@/components/itinerary-view/ItineraryViewAnimatedBackground'
import { ItineraryViewNavbar } from '@/components/itinerary-view/ItineraryViewNavbar'
import type { ItineraryViewMode } from '@/components/itinerary-view/ViewToggle'
import { ViewToggle } from '@/components/itinerary-view/ViewToggle'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function parseDurationMinutes(raw: string): number {
  if (/full day/i.test(raw)) return 480
  const minM = raw.match(/(\d+)\s*min/i)
  const hrM = raw.match(/(\d+\.?\d*)\s*hr/i)
  let n = 0
  if (hrM) n += Number(hrM[1]) * 60
  if (minM) n += Number(minM[1])
  return n || 90
}

function matchesQuery(a: ItineraryActivity, q: string) {
  const s = q.trim().toLowerCase()
  if (!s) return true
  return (
    a.title.toLowerCase().includes(s) ||
    a.note.toLowerCase().includes(s) ||
    a.destination.toLowerCase().includes(s) ||
    a.category.toLowerCase().includes(s)
  )
}

function filterCategory(a: ItineraryActivity, f: FilterItin) {
  if (f === 'all') return true
  return a.category === f
}

function sortActivities(list: ItineraryActivity[], sort: SortItin): ItineraryActivity[] {
  const next = [...list]
  if (sort === 'cost_desc') return next.sort((a, b) => b.expense.amount - a.expense.amount)
  if (sort === 'duration') return next.sort((a, b) => parseDurationMinutes(b.duration) - parseDurationMinutes(a.duration))
  return next.sort((a, b) => (a.day !== b.day ? a.day - b.day : a.time.localeCompare(b.time)))
}

function groupByCategory(acts: ItineraryActivity[], sort: SortItin) {
  const m = new Map<string, ItineraryActivity[]>()
  for (const a of acts) {
    if (!m.has(a.category)) m.set(a.category, [])
    m.get(a.category)!.push(a)
  }
  return Array.from(m.entries())
    .sort(([x], [y]) => x.localeCompare(y))
    .map(([title, list]) => ({ title, activities: sortActivities(list, sort) }))
}

function groupByDestination(acts: ItineraryActivity[], sort: SortItin) {
  const m = new Map<string, ItineraryActivity[]>()
  for (const a of acts) {
    const k = a.destination
    if (!m.has(k)) m.set(k, [])
    m.get(k)!.push(a)
  }
  return Array.from(m.entries())
    .sort(([x], [y]) => x.localeCompare(y))
    .map(([title, list]) => ({ title, activities: sortActivities(list, sort) }))
}

export function ItineraryViewPage() {
  const reduced = usePrefersReducedMotion()
  const { x, y } = useMouseParallax(reduced ? 0 : 8)
  const hx = useTransform(x, (v) => v * 0.2)
  const hy = useTransform(y, (v) => v * 0.2)

  const [query, setQuery] = useState('')
  const [groupBy, setGroupBy] = useState<GroupByItin>('day')
  const [filterCat, setFilterCat] = useState<FilterItin>('all')
  const [sort, setSort] = useState<SortItin>('chronological')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ItineraryViewMode>('timeline')

  const dayNums = useMemo(() => [...new Set(ITINERARY_ACTIVITIES.map((a) => a.day))].sort((a, b) => a - b), [])
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(dayNums.map((d) => [d, true])),
  )

  const toggleDay = useCallback((d: number) => {
    setExpandedDays((p) => ({ ...p, [d]: !p[d] }))
  }, [])

  const filteredSorted = useMemo(() => {
    let list = ITINERARY_ACTIVITIES.filter((a) => matchesQuery(a, query) && filterCategory(a, filterCat))
    list = sortActivities(list, sort)
    return list
  }, [query, filterCat, sort])

  const groupedByDay = useMemo(() => groupActivitiesByDay(filteredSorted), [filteredSorted])
  const byCategorySections = useMemo(() => groupByCategory(filteredSorted, sort), [filteredSorted, sort])
  const byDestinationSections = useMemo(() => groupByDestination(filteredSorted, sort), [filteredSorted, sort])

  const particles = useMemo(
    () =>
      reduced
        ? []
        : Array.from({ length: 14 }, (_, i) => ({
            id: i,
            left: `${6 + ((i * 13) % 86)}%`,
            top: `${10 + ((i * 11) % 38)}%`,
            delay: i * 0.055,
          })),
    [reduced],
  )

  return (
    <motion.div
      className="relative min-h-screen bg-[#0B0F1A] text-traveloop-ice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <ItineraryViewAnimatedBackground />
      <ItineraryViewNavbar />
      <FloatingTravelWidgets activityCount={filteredSorted.length} />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-32 pt-6 md:max-w-[1200px] md:px-8 md:pb-40 xl:max-w-[1280px] xl:pr-60">
        <header className="relative mb-10 md:mb-12">
          {!reduced &&
            particles.map((p) => (
              <motion.span
                key={p.id}
                className="pointer-events-none absolute h-1 w-1 rounded-full bg-traveloop-sky/85 shadow-[0_0_12px_rgba(136,189,242,0.95)]"
                style={{ left: p.left, top: p.top }}
                animate={{ opacity: [0.15, 0.94, 0.18], scale: [0.86, 1.12, 0.93] }}
                transition={{ duration: 2.8 + p.delay * 0.04, repeat: Infinity, delay: p.delay }}
              />
            ))}
          <motion.div style={{ x: hx, y: hy }} className="relative mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-traveloop-steel"
            >
              {TRIP_META.title}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-br from-white via-traveloop-ice to-traveloop-steel bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-[2.45rem]"
            >
              Journey Timeline
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-3 h-px max-w-md origin-center bg-gradient-to-r from-transparent via-traveloop-sky to-transparent shadow-[0_0_22px_rgba(136,189,242,0.45)]"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.48 }}
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-traveloop-ice/68 md:text-lg"
            >
              Explore your complete travel experience through an immersive itinerary view.
            </motion.p>
          </motion.div>
        </header>

        <section className="mb-8 space-y-5 md:mb-10">
          <div className="rounded-3xl border border-traveloop-sky/18 bg-[#0B0F1A]/25 p-4 shadow-inner-glow backdrop-blur-xl md:p-6">
            <SearchFilters
              query={query}
              onQuery={setQuery}
              groupBy={groupBy}
              onGroupBy={setGroupBy}
              filter={filterCat}
              onFilter={setFilterCat}
              sort={sort}
              onSort={setSort}
              mobileOpen={mobileFiltersOpen}
              onMobileOpen={setMobileFiltersOpen}
            />
            <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-center text-sm text-traveloop-ice/50 sm:text-left">
                View only · presentation mode
              </p>
              <div className="flex justify-center sm:justify-end">
                <ViewToggle mode={viewMode} onChange={setViewMode} />
              </div>
            </div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center md:mb-10"
        >
          <h2 className="text-xl font-semibold text-white md:text-2xl">Your itinerary</h2>
          <p className="mt-2 text-sm text-traveloop-ice/55">
            {filteredSorted.length} scheduled moment{filteredSorted.length === 1 ? '' : 's'}
          </p>
        </motion.div>

        <section className="mb-16 space-y-8 md:mb-20 md:space-y-10">
          {viewMode === 'calendar' ? (
            <CalendarItineraryView groupedByDay={groupedByDay} />
          ) : groupBy === 'day' ? (
            groupedByDay.map(({ day, activities }) => (
              <TimelineDay
                key={day}
                day={day}
                activities={activities}
                expanded={expandedDays[day] ?? true}
                onToggle={() => toggleDay(day)}
              />
            ))
          ) : groupBy === 'category' ? (
            byCategorySections.map((sec, i) => (
              <GroupedTimelineSection
                key={sec.title}
                title={sec.title}
                subtitle="Grouped by experience type"
                activities={sec.activities}
                index={i}
              />
            ))
          ) : (
            byDestinationSections.map((sec, i) => (
              <GroupedTimelineSection
                key={sec.title}
                title={sec.title}
                subtitle="Destination cluster"
                activities={sec.activities}
                index={i}
              />
            ))
          )}

          {!filteredSorted.length ? (
            <p className="rounded-2xl border border-traveloop-slate/35 py-16 text-center text-traveloop-ice/60">
              No activities match your filters.
            </p>
          ) : null}
        </section>

        <section className="mb-10 space-y-5 md:mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-white md:text-2xl">Budget analytics</h2>
            <p className="mt-2 text-sm text-traveloop-ice/55">Telemetry on how this journey allocates spend</p>
          </div>
          <BudgetAnalytics data={BUDGET_CHART_ROWS} />
        </section>

        <section className="space-y-5">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-white md:text-2xl">Expense summary</h2>
            <p className="mt-2 text-sm text-traveloop-ice/55">Live counters against your travel envelope</p>
          </div>
          <ExpenseSummaryWidgets />
        </section>
      </main>
    </motion.div>
  )
}
