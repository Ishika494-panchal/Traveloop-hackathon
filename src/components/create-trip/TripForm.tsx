import { MapPin } from 'lucide-react'
import type { ReactNode } from 'react'

import { GlassInput } from '@/components/GlassInput'
import { cn } from '@/lib/utils'

import { BuildItineraryButton, GenerateWithAIButton, SaveTripButton } from './GenerateButton'
import { PreferenceChips, type PreferenceId } from './PreferenceChips'

const selectClass =
  'w-full cursor-pointer appearance-none rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/45 px-3.5 py-2.5 text-sm text-traveloop-ice/95 shadow-inner-glow backdrop-blur-md transition-all duration-300 focus:border-traveloop-sky/70 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/35 focus:ring-offset-0 hover:border-traveloop-ice/35 focus-visible:animate-border-pulse'

export type TripFormValues = {
  title: string
  destination: string
  startDate: string
  endDate: string
  budget: string
  travelers: string
}

type TripFormProps = {
  values: TripFormValues
  onChange: <K extends keyof TripFormValues>(key: K, value: TripFormValues[K]) => void
  preferences: PreferenceId[]
  onPreferenceToggle: (id: PreferenceId) => void
  isDirty: boolean
  onSave: () => void
  saving?: boolean
  onBuildItinerary: () => void
  onGenerateWithAI: () => void
}

const DESTINATIONS = [
  { value: '', label: 'Choose a region or city' },
  { value: 'bali', label: 'Bali, Indonesia' },
  { value: 'swiss', label: 'Swiss Alps' },
  { value: 'goa', label: 'Goa, India' },
  { value: 'tokyo', label: 'Tokyo, Japan' },
  { value: 'paris', label: 'Paris, France' },
  { value: 'himalaya', label: 'Himalayan range' },
  { value: 'newyork', label: 'New York City' },
]

function FormRow({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid gap-2 md:grid-cols-[minmax(0,140px)_1fr] md:items-center md:gap-6 lg:grid-cols-[minmax(0,160px)_1fr]',
        className,
      )}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-traveloop-ice/65 md:pt-0 md:text-right">
        {label}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

export function TripForm({
  values,
  onChange,
  preferences,
  onPreferenceToggle,
  isDirty,
  onSave,
  saving = false,
  onBuildItinerary,
  onGenerateWithAI,
}: TripFormProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-traveloop-sky/25 bg-[#0B0F1A]/55 p-6 shadow-[0_0_48px_rgba(136,189,242,0.08)] backdrop-blur-2xl md:p-8 lg:p-10">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-traveloop-sky/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-traveloop-ice/10 blur-3xl"
        aria-hidden
      />

      <div className="relative space-y-6 md:space-y-7">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">Trip details</h2>
          <p className="mt-1 text-sm text-traveloop-ice/55">Wire your basics — we layer intelligence on top.</p>
        </div>

        <div className="space-y-4 md:space-y-5">
          <FormRow label="Trip Title">
            <GlassInput
              placeholder="e.g. Coastal spring escape"
              value={values.title}
              onChange={(e) => onChange('title', e.target.value)}
            />
          </FormRow>

          <FormRow label="Select Destination">
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 z-[1] h-4 w-4 -translate-y-1/2 text-traveloop-ice/70" />
              <select
                className={cn(selectClass, 'pl-10')}
                value={values.destination}
                onChange={(e) => onChange('destination', e.target.value)}
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.value || 'empty'} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </FormRow>

          <FormRow label="Start Date">
            <GlassInput type="date" value={values.startDate} onChange={(e) => onChange('startDate', e.target.value)} />
          </FormRow>

          <FormRow label="End Date">
            <GlassInput type="date" value={values.endDate} onChange={(e) => onChange('endDate', e.target.value)} />
          </FormRow>

          <FormRow label="Budget">
            <GlassInput
              type="text"
              inputMode="decimal"
              placeholder="e.g. 3200 USD"
              value={values.budget}
              onChange={(e) => onChange('budget', e.target.value)}
            />
          </FormRow>

          <FormRow label="Travelers">
            <GlassInput
              type="number"
              min={1}
              max={99}
              placeholder="2"
              value={values.travelers}
              onChange={(e) => onChange('travelers', e.target.value)}
            />
          </FormRow>
        </div>

        <div className="border-t border-traveloop-sky/20 pt-6 md:pt-7">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-traveloop-ice/70">
            Travel preferences
          </h3>
          <PreferenceChips selected={preferences} onToggle={onPreferenceToggle} />
        </div>

        <div className="flex flex-col gap-2 border-t border-traveloop-sky/20 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end md:pt-9">
          {isDirty ? (
            <>
              <SaveTripButton onClick={onSave} saving={saving} className="w-full sm:w-auto" />
              <GenerateWithAIButton onClick={onGenerateWithAI} className="w-full sm:w-auto" />
            </>
          ) : (
            <BuildItineraryButton onClick={onBuildItinerary} className="w-full sm:w-auto" />
          )}
        </div>
      </div>
    </section>
  )
}
