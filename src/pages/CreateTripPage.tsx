import { motion, useTransform } from 'framer-motion'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CreateTripNavbar } from '@/components/create-trip/CreateTripNavbar'
import { DestinationSuggestionCard, type Suggestion } from '@/components/create-trip/DestinationSuggestionCard'
import type { PreferenceId } from '@/components/create-trip/PreferenceChips'
import { TripAnimatedBackground } from '@/components/create-trip/TripAnimatedBackground'
import { TripForm, type TripFormValues } from '@/components/create-trip/TripForm'
import { TripPageWidgets } from '@/components/create-trip/TripPageWidgets'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import {
  readDraftFromStorage,
  serializeTrip,
  TRIP_DRAFT_STORAGE_KEY,
  TRIP_PLAN_CONTEXT_KEY,
} from '@/lib/tripDraft'

const SUGGESTIONS: Suggestion[] = [
  {
    title: 'Bali Beaches',
    tagline: 'Cliff clubs, rice terraces, slow mornings',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Swiss Alps',
    tagline: 'Glacier express, fondue nights, crisp air',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Goa Nightlife',
    tagline: 'Sunset sets, coastal drives, spice markets',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Tokyo Food Tour',
    tagline: 'Izakaya hops, omakase, neon alleys',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Paris Cafés',
    tagline: 'Rive walks, atelier visits, wine hour',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Himalayan Trek',
    tagline: 'High passes, tea houses, starlit ridges',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80',
  },
]

const defaultForm: TripFormValues = {
  title: '',
  destination: '',
  startDate: '',
  endDate: '',
  budget: '',
  travelers: '2',
}

const defaultPreferences: PreferenceId[] = ['luxury', 'food']

function initialForm(): TripFormValues {
  return readDraftFromStorage()?.form ?? defaultForm
}

function initialPreferences(): PreferenceId[] {
  const d = readDraftFromStorage()
  if (!d) return defaultPreferences
  return d.preferences ?? defaultPreferences
}

function initialSavedHash(): string {
  const d = readDraftFromStorage()
  const f = d?.form ?? defaultForm
  const p = d?.preferences ?? defaultPreferences
  return serializeTrip(f, p)
}

export function CreateTripPage() {
  const navigate = useNavigate()
  const reduced = usePrefersReducedMotion()
  const { x, y } = useMouseParallax(reduced ? 0 : 10)
  const titleX = useTransform(x, (v) => v * 0.35)
  const titleY = useTransform(y, (v) => v * 0.35)

  const [form, setForm] = useState<TripFormValues>(initialForm)
  const [preferences, setPreferences] = useState<PreferenceId[]>(initialPreferences)
  const [lastSavedHash, setLastSavedHash] = useState(initialSavedHash)
  const [saving, setSaving] = useState(false)
  const saveLock = useRef(false)

  const currentHash = useMemo(() => serializeTrip(form, preferences), [form, preferences])
  const isDirty = currentHash !== lastSavedHash

  const patchForm = useCallback(<K extends keyof TripFormValues>(key: K, value: TripFormValues[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const togglePref = useCallback((id: PreferenceId) => {
    setPreferences((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }, [])

  const pushPlanContext = useCallback(
    (mode: 'build' | 'ai') => {
      sessionStorage.setItem(TRIP_PLAN_CONTEXT_KEY, JSON.stringify({ form, preferences, mode, at: Date.now() }))
    },
    [form, preferences],
  )

  const goItinerary = useCallback(
    (mode: 'build' | 'ai') => {
      pushPlanContext(mode)
      navigate(mode === 'ai' ? '/plan/itinerary?mode=ai' : '/plan/itinerary?mode=build')
    },
    [navigate, pushPlanContext],
  )

  const handleSave = useCallback(async () => {
    if (saveLock.current) return
    saveLock.current = true
    setSaving(true)
    try {
      await new Promise((r) => window.setTimeout(r, 450))
      const payload = { form, preferences, savedAt: Date.now() }
      localStorage.setItem(TRIP_DRAFT_STORAGE_KEY, JSON.stringify(payload))
      setLastSavedHash(serializeTrip(form, preferences))
    } finally {
      setSaving(false)
      saveLock.current = false
    }
  }, [form, preferences])

  const headerParticles = useMemo(
    () =>
      reduced
        ? []
        : Array.from({ length: 14 }, (_, i) => ({
            id: i,
            left: `${8 + ((i * 7) % 84)}%`,
            top: `${12 + ((i * 11) % 38)}%`,
            delay: i * 0.08,
          })),
    [reduced],
  )

  return (
    <motion.div
      className="relative min-h-screen bg-[#0B0F1A] text-traveloop-ice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <TripAnimatedBackground />
      <CreateTripNavbar />
      <TripPageWidgets form={form} />

      <main className="relative z-10 mx-auto max-w-[1100px] px-4 pb-24 pt-6 md:px-8 md:pb-28 md:pt-10 lg:max-w-[1200px] lg:pr-56">
        <header className="relative mb-10 md:mb-12">
          {!reduced
            ? headerParticles.map((p) => (
                <motion.span
                  key={p.id}
                  className="pointer-events-none absolute h-1 w-1 rounded-full bg-traveloop-sky/70 shadow-[0_0_12px_rgba(136,189,242,0.9)]"
                  style={{ left: p.left, top: p.top }}
                  animate={{ opacity: [0.2, 0.95, 0.25], scale: [0.8, 1.2, 0.9] }}
                  transition={{ duration: 3.2 + p.delay * 0.1, repeat: Infinity, delay: p.delay }}
                />
              ))
            : null}

          <motion.div style={{ x: titleX, y: titleY }} className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight"
            >
              Plan a New Trip
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 h-px max-w-md origin-left bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-transparent shadow-[0_0_20px_rgba(136,189,242,0.55)]"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="mt-4 max-w-xl text-base text-traveloop-ice/70 md:text-lg"
            >
              Create personalized travel experiences effortlessly.
            </motion.p>
          </motion.div>
        </header>

        <TripForm
          values={form}
          onChange={patchForm}
          preferences={preferences}
          onPreferenceToggle={togglePref}
          isDirty={isDirty}
          onSave={handleSave}
          saving={saving}
          onBuildItinerary={() => goItinerary('build')}
          onGenerateWithAI={() => goItinerary('ai')}
        />

        <section className="mt-12 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-5 md:mb-6"
          >
            <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">Suggestions for you</h2>
            <p className="mt-1 text-sm text-traveloop-ice/55">Curated corridors — tap energy before you lock dates.</p>
          </motion.div>

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 lg:gap-5 [&::-webkit-scrollbar]:hidden">
            {SUGGESTIONS.map((s, i) => (
              <div key={s.title} className="w-[min(88vw,320px)] shrink-0 snap-center sm:w-auto sm:shrink">
                <DestinationSuggestionCard suggestion={s} index={i} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  )
}
