import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { motion, useTransform } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { AddSectionButton } from '@/components/itinerary-builder/AddSectionButton'
import { BudgetWidget } from '@/components/itinerary-builder/BudgetWidget'
import { GenerateItineraryWithAIButton } from '@/components/itinerary-builder/GenerateItineraryWithAIButton'
import { createDefaultSections, emptySection, hydrateFromPlanContext } from '@/components/itinerary-builder/initialItinerary'
import { ItineraryAnimatedBackground } from '@/components/itinerary-builder/ItineraryAnimatedBackground'
import { ItineraryBuilderNavbar } from '@/components/itinerary-builder/ItineraryBuilderNavbar'
import { ItinerarySectionCard } from '@/components/itinerary-builder/ItinerarySectionCard'
import {
  countActivities,
  sumActivitySpend,
  sumSectionBudgets,
  totalTripDays,
  uniqueCities,
} from '@/components/itinerary-builder/itineraryCalculations'
import { RouteMapCard } from '@/components/itinerary-builder/RouteMapCard'
import { TimelineSidebar } from '@/components/itinerary-builder/TimelineSidebar'
import { TripSummaryCard } from '@/components/itinerary-builder/TripSummaryCard'
import type { Activity, ItinerarySection } from '@/components/itinerary-builder/types'
import { newId } from '@/components/itinerary-builder/types'
import { WeatherWidget } from '@/components/itinerary-builder/WeatherWidget'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const DESTINATION_LABELS: Record<string, string> = {
  bali: 'Bali',
  swiss: 'Swiss Alps',
  goa: 'Goa',
  tokyo: 'Tokyo',
  paris: 'Paris',
  himalaya: 'Himalayas',
  newyork: 'New York',
}

function applyPlanHydration(sections: ItinerarySection[]): ItinerarySection[] {
  const hint = hydrateFromPlanContext()
  if (!hint?.destination || !sections[0]) return sections
  const label = DESTINATION_LABELS[hint.destination] ?? hint.destination
  return sections.map((s, i) => (i === 0 ? { ...s, destination: label } : s))
}

function resolveActivityContainer(overId: string, sections: ItinerarySection[]): string | undefined {
  if (overId.startsWith('activities-end-')) {
    return `activities-${overId.replace('activities-end-', '')}`
  }
  for (const s of sections) {
    if (s.activities.some((a) => a.id === overId)) return `activities-${s.id}`
  }
  return undefined
}

export function ItineraryBuilderPage() {
  const reduced = usePrefersReducedMotion()
  const { x, y } = useMouseParallax(reduced ? 0 : 9)
  const hx = useTransform(x, (v) => v * 0.25)
  const hy = useTransform(y, (v) => v * 0.25)

  const [sections, setSections] = useState<ItinerarySection[]>(() => applyPlanHydration(createDefaultSections()))
  const [activeSectionId, setActiveSectionId] = useState<string | null>(() => sections[0]?.id ?? null)
  const [aiGenerating, setAiGenerating] = useState(false)
  const aiLock = useRef(false)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const timelineIds = useMemo(() => sections.map((s) => s.id), [sections])

  const spent = useMemo(() => sumActivitySpend(sections), [sections])
  const totalBudget = useMemo(() => sumSectionBudgets(sections), [sections])
  const activityCount = useMemo(() => countActivities(sections), [sections])
  const cities = useMemo(() => uniqueCities(sections), [sections])
  const days = useMemo(() => totalTripDays(sections), [sections])
  const weatherDestination = sections[0]?.destination ?? 'Corridor'

  const patchSection = useCallback((id: string, patch: Partial<ItinerarySection>) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }, [])

  const addActivity = useCallback((sectionId: string, activity: Activity) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, activities: [...s.activities, activity] } : s)),
    )
  }, [])

  const addSection = useCallback(() => {
    setSections((prev) => {
      const next = [...prev, emptySection(prev.length + 1)]
      return next.map((s, i) => ({ ...s, dayIndex: i + 1 }))
    })
  }, [])

  const handleGenerateItineraryWithAI = useCallback(async () => {
    if (aiLock.current) return
    aiLock.current = true
    setAiGenerating(true)
    try {
      await new Promise((r) => setTimeout(r, 2000))
      const image =
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=480&q=80'
      setSections((prev) =>
        prev.map((s) => ({
          ...s,
          activities: [
            ...s.activities,
            {
              id: newId('act'),
              title: 'AI pick · Signature stop',
              duration: '2h',
              costLabel: '$35',
              costValue: 35,
              rating: 4.8,
              image,
            },
          ],
        })),
      )
    } finally {
      setAiGenerating(false)
      aiLock.current = false
    }
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)
    if (activeId === overId) return

    const activeContainer = active.data.current?.sortable?.containerId as string | undefined
    const overContainerRaw = over.data.current?.sortable?.containerId as string | undefined

    if (activeContainer === 'timeline' && overContainerRaw === 'timeline') {
      setSections((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === activeId)
        const newIndex = prev.findIndex((s) => s.id === overId)
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return prev
        return arrayMove(prev, oldIndex, newIndex).map((s, i) => ({ ...s, dayIndex: i + 1 }))
      })
      return
    }

    if (!activeContainer?.startsWith('activities-')) return

    setSections((prev) => {
      const overContainer = overContainerRaw ?? resolveActivityContainer(overId, prev)
      if (!overContainer?.startsWith('activities-')) return prev

      const activeSec = activeContainer.replace('activities-', '')
      const overSec = overContainer.replace('activities-', '')

      const from = prev.find((s) => s.id === activeSec)
      if (!from) return prev
      const act = from.activities.find((a) => a.id === activeId)
      if (!act) return prev

      if (activeSec === overSec) {
        const oldIdx = from.activities.findIndex((a) => a.id === activeId)
        let newIdx = from.activities.findIndex((a) => a.id === overId)
        if (overId.startsWith('activities-end-')) newIdx = from.activities.length - 1
        if (oldIdx < 0 || newIdx < 0 || oldIdx === newIdx) return prev
        return prev.map((s) =>
          s.id === activeSec ? { ...s, activities: arrayMove(s.activities, oldIdx, newIdx) } : s,
        )
      }

      const to = prev.find((s) => s.id === overSec)
      if (!to) return prev

      let insertIndex = to.activities.findIndex((a) => a.id === overId)
      if (overId.startsWith('activities-end-')) insertIndex = to.activities.length
      if (insertIndex < 0) insertIndex = to.activities.length

      return prev.map((s) => {
        if (s.id === activeSec) return { ...s, activities: s.activities.filter((a) => a.id !== activeId) }
        if (s.id === overSec) {
          const nextActs = [...s.activities]
          nextActs.splice(insertIndex, 0, act)
          return { ...s, activities: nextActs }
        }
        return s
      })
    })
  }, [])

  useEffect(() => {
    const obs: IntersectionObserver[] = []
    for (const s of sections) {
      const el = sectionRefs.current[s.id]
      if (!el) continue
      const io = new IntersectionObserver(
        (entries) => {
          const hit = entries.find((e) => e.isIntersecting && e.intersectionRatio >= 0.35)
          if (hit) setActiveSectionId(s.id)
        },
        { threshold: [0, 0.2, 0.35, 0.5], rootMargin: '-12% 0px -40% 0px' },
      )
      io.observe(el)
      obs.push(io)
    }
    return () => obs.forEach((o) => o.disconnect())
  }, [sections])

  const onActivateTimeline = useCallback((id: string) => {
    setActiveSectionId(id)
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const headerParticles = useMemo(
    () =>
      reduced
        ? []
        : Array.from({ length: 18 }, (_, i) => ({
            id: i,
            left: `${6 + ((i * 11) % 88)}%`,
            top: `${10 + ((i * 7) % 36)}%`,
            delay: i * 0.06,
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
      <ItineraryAnimatedBackground />
      <ItineraryBuilderNavbar />

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <main className="relative z-[1] mx-auto max-w-[1800px] px-4 pb-32 pt-6 md:px-8 md:pb-36 md:pt-8">
          <header className="relative mb-10 md:mb-12">
            {!reduced
              ? headerParticles.map((p) => (
                  <motion.span
                    key={p.id}
                    className="pointer-events-none absolute h-1 w-1 rounded-full bg-traveloop-sky/80 shadow-[0_0_14px_rgba(136,189,242,0.95)]"
                    style={{ left: p.left, top: p.top }}
                    animate={{ opacity: [0.15, 0.9, 0.2], scale: [0.85, 1.25, 0.95] }}
                    transition={{ duration: 3.4 + p.delay * 0.08, repeat: Infinity, delay: p.delay }}
                  />
                ))
              : null}
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
              <motion.div style={{ x: hx, y: hy }} className="relative max-w-2xl">
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-gradient-to-br from-white via-traveloop-ice to-traveloop-steel bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-[2.6rem] lg:leading-tight"
                >
                  Build Your Journey
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="mt-4 text-base leading-relaxed text-traveloop-ice/70 md:text-lg"
                >
                  Organize destinations, activities, budgets, and travel timelines effortlessly.
                </motion.p>
              </motion.div>
              <GenerateItineraryWithAIButton loading={aiGenerating} onClick={handleGenerateItineraryWithAI} />
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-6 xl:gap-8">
            <div className="flex flex-col gap-4 lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
              <SortableContext id="timeline" items={timelineIds} strategy={verticalListSortingStrategy}>
                <TimelineSidebar sections={sections} activeSectionId={activeSectionId} onActivate={onActivateTimeline} />
              </SortableContext>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-7">
              {sections.map((section) => (
                <ItinerarySectionCard
                  key={section.id}
                  section={section}
                  onPatch={patchSection}
                  onAddActivity={addActivity}
                  sectionRef={(el) => {
                    sectionRefs.current[section.id] = el
                  }}
                />
              ))}
              <AddSectionButton onClick={addSection} />
            </div>

            <div className="flex flex-col gap-4 lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
              <BudgetWidget totalBudget={totalBudget} spent={spent} />
              <WeatherWidget destination={weatherDestination} />
              <RouteMapCard cities={cities} />
              <TripSummaryCard days={days} cities={cities.length} activities={activityCount} estimatedCost={spent} />
            </div>
          </div>
        </main>
      </DndContext>
    </motion.div>
  )
}
