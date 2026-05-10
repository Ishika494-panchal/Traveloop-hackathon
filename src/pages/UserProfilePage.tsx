import { motion, useTransform } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'

import { FloatingProfileWidgets } from '@/components/profile/FloatingProfileWidgets'
import { PersonalityCard } from '@/components/profile/PersonalityCard'
import { ProfileAnimatedBackground } from '@/components/profile/ProfileAnimatedBackground'
import { ProfileAvatarBlock } from '@/components/profile/ProfileAvatarBlock'
import { ProfileNavbar } from '@/components/profile/ProfileNavbar'
import { ProfileTripCard } from '@/components/profile/ProfileTripCard'
import { PAST_PROFILE, PREPLANNED_PROFILE } from '@/components/profile/profileTripsMock'
import type { ProfileForm } from '@/components/profile/UserDetailsCard'
import { UserDetailsCard } from '@/components/profile/UserDetailsCard'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const initialForm: ProfileForm = {
  fullName: 'Akshad Kumar',
  username: 'akshad.travels',
  bio: 'Chasing golden hours across continents. Building Traveloop to make every itinerary feel cinematic.',
  email: 'akshad@traveloop.app',
  phone: '+91 98765 43210',
  city: 'Mumbai',
  country: 'India',
  travelStyle: 'Slow travel · boutique stays · ridge lines',
  instagram: '@akshad.travels',
  twitter: '@akshadloop',
  linkedin: '/in/akshad-kumar',
  github: '/akshadloop',
}

export function UserProfilePage() {
  const reduced = usePrefersReducedMotion()
  const { x, y } = useMouseParallax(reduced ? 0 : 10)
  const hx = useTransform(x, (v) => v * 0.26)
  const hy = useTransform(y, (v) => v * 0.26)

  const [form, setForm] = useState<ProfileForm>(initialForm)
  const [savedSnapshot, setSavedSnapshot] = useState<ProfileForm>(initialForm)
  const [editing, setEditing] = useState(false)
  const [bookmarked, setBookmarked] = useState<Set<string>>(() => new Set(['p1', 'c2']))

  const patch = useCallback(<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const onSave = useCallback(() => {
    setSavedSnapshot(form)
    setEditing(false)
  }, [form])

  const onEdit = useCallback(() => setEditing(true), [])

  const toggleBm = useCallback((id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const headerParticles = useMemo(
    () =>
      reduced
        ? []
        : Array.from({ length: 16 }, (_, i) => ({
            id: i,
            left: `${6 + ((i * 11) % 88)}%`,
            top: `${10 + ((i * 7) % 34)}%`,
            delay: i * 0.07,
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
      <ProfileAnimatedBackground />
      <ProfileNavbar />

      <main className="relative z-10 mx-auto max-w-[1200px] px-4 pb-28 pt-6 md:px-8 md:pb-32 md:pt-8 lg:max-w-[1400px]">
        <header className="relative mb-10 md:mb-12">
          {!reduced
            ? headerParticles.map((p) => (
                <motion.span
                  key={p.id}
                  className="pointer-events-none absolute h-1 w-1 rounded-full bg-traveloop-sky/80 shadow-[0_0_12px_rgba(136,189,242,0.95)]"
                  style={{ left: p.left, top: p.top }}
                  animate={{ opacity: [0.2, 0.95, 0.25], scale: [0.85, 1.2, 0.9] }}
                  transition={{ duration: 3.2 + p.delay * 0.06, repeat: Infinity, delay: p.delay }}
                />
              ))
            : null}
          <motion.div style={{ x: hx, y: hy }} className="relative max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.5rem]"
            >
              My Travel Identity
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 h-px max-w-xl origin-left bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-transparent shadow-[0_0_22px_rgba(136,189,242,0.5)]"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mt-4 max-w-2xl text-base leading-relaxed text-traveloop-ice/70 md:text-lg"
            >
              Manage your profile, journeys, preferences, and travel experiences seamlessly.
            </motion.p>
          </motion.div>
        </header>

        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)_minmax(0,188px)] lg:items-start lg:gap-x-8 xl:grid-cols-[minmax(0,280px)_minmax(0,1fr)_minmax(0,200px)]">
          <aside className="mx-auto flex w-full max-w-[320px] justify-center lg:sticky lg:top-28 lg:z-20 lg:mx-0 lg:max-w-none lg:justify-start lg:self-start">
            <ProfileAvatarBlock />
          </aside>

          <div className="w-full lg:hidden">
            <FloatingProfileWidgets
              countriesExplored={18}
              miles="284k"
              activeTrips={2}
              streakDays={12}
              variant="sidebar"
              orientation="row"
              className="max-w-none"
            />
          </div>

          <div className="min-w-0 space-y-8 lg:space-y-10">
            <UserDetailsCard
              form={form}
              onChange={patch}
              editing={editing}
              onEdit={onEdit}
              onSave={onSave}
              stats={{
                countries: 18,
                favorite: savedSnapshot.city ? `${savedSnapshot.city} corridor` : 'Kyoto',
                avgCost: 2100,
                tripsDone: 14,
              }}
            />
            <PersonalityCard
              title="Explorer"
              description="You optimize for variety: city energy, quiet ridges, and chef-led tables in the same week."
              traits={['Peak dawn hikes', 'Coastal drives', 'Local hosts', 'Film-roll pacing']}
            />

            <section className="lg:pt-2">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h2 className="text-xl font-semibold text-white md:text-2xl">Preplanned trips</h2>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.65 }}
                  className="mt-3 h-px max-w-md origin-left bg-gradient-to-r from-traveloop-sky/80 via-traveloop-ice/60 to-transparent"
                />
              </motion.div>
              <div className="flex flex-col gap-5">
                {PREPLANNED_PROFILE.map((trip, i) => (
                  <ProfileTripCard
                    key={trip.id}
                    variant="preplanned"
                    trip={trip}
                    index={i}
                    bookmarked={bookmarked.has(trip.id)}
                    onToggleBookmark={() => toggleBm(trip.id)}
                  />
                ))}
              </div>
            </section>

            <section>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h2 className="text-xl font-semibold text-white md:text-2xl">Previous trips</h2>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.65 }}
                  className="mt-3 h-px max-w-md origin-left bg-gradient-to-r from-traveloop-sky/80 via-traveloop-ice/60 to-transparent"
                />
              </motion.div>
              <div className="flex flex-col gap-5">
                {PAST_PROFILE.map((trip, i) => (
                  <ProfileTripCard
                    key={trip.id}
                    variant="past"
                    trip={trip}
                    index={i}
                    bookmarked={bookmarked.has(trip.id)}
                    onToggleBookmark={() => toggleBm(trip.id)}
                  />
                ))}
              </div>
            </section>
          </div>

          <aside className="hidden lg:sticky lg:top-28 lg:z-20 lg:flex lg:w-full lg:max-w-[200px] lg:flex-col lg:self-start xl:max-w-[220px]">
            <FloatingProfileWidgets countriesExplored={18} miles="284k" activeTrips={2} streakDays={12} variant="sidebar" orientation="column" />
          </aside>
        </div>
      </main>
    </motion.div>
  )
}
