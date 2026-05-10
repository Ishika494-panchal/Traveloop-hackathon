import { motion } from 'framer-motion'
import { Pencil, Save } from 'lucide-react'

import { GlassInput } from '@/components/GlassInput'
import { GlassTextarea } from '@/components/GlassInput'

import { SocialLinks } from './SocialLinks'
import { TravelStats } from './TravelStats'

export type ProfileForm = {
  fullName: string
  username: string
  bio: string
  email: string
  phone: string
  city: string
  country: string
  travelStyle: string
  instagram: string
  twitter: string
  linkedin: string
  github: string
}

type UserDetailsCardProps = {
  form: ProfileForm
  onChange: <K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) => void
  editing: boolean
  onEdit: () => void
  onSave: () => void
  stats: { countries: number; favorite: string; avgCost: number; tripsDone: number }
}

export function UserDetailsCard({ form, onChange, editing, onEdit, onSave, stats }: UserDetailsCardProps) {
  const ro = !editing

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-traveloop-sky/25 bg-[#0B0F1A]/5 p-5 shadow-[0_0_48px_rgba(56,73,89,0.4)] backdrop-blur-2xl md:p-7"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-traveloop-sky/12 blur-3xl" />
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-traveloop-sky/15 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-white md:text-xl">Profile details</h2>
          <p className="mt-1 text-sm text-traveloop-ice/55">Identity, contact, and travel preferences.</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEdit}
            disabled={editing}
            className="inline-flex items-center gap-2 rounded-xl border border-traveloop-slate/40 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-traveloop-ice transition-colors hover:border-traveloop-ice/35 hover:text-white disabled:pointer-events-none disabled:opacity-40"
          >
            <Pencil className="h-4 w-4" strokeWidth={1.75} />
            Edit
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSave}
            disabled={!editing}
            className="inline-flex items-center gap-2 rounded-xl border border-traveloop-sky/40 bg-traveloop-slate/30 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-traveloop-ice/35 hover:bg-traveloop-sky/20 disabled:pointer-events-none disabled:opacity-40"
          >
            <Save className="h-4 w-4" strokeWidth={1.75} />
            Save
          </motion.button>
        </div>
      </div>

      <div className="relative mt-5 grid gap-4 md:grid-cols-2">
        <GlassInput label="Full name" value={form.fullName} disabled={ro} onChange={(e) => onChange('fullName', e.target.value)} />
        <GlassInput label="Username" value={form.username} disabled={ro} onChange={(e) => onChange('username', e.target.value)} />
        <div className="md:col-span-2">
          <GlassTextarea label="Bio" value={form.bio} disabled={ro} onChange={(e) => onChange('bio', e.target.value)} className="min-h-[96px]" />
        </div>
        <GlassInput label="Email" type="email" value={form.email} disabled={ro} onChange={(e) => onChange('email', e.target.value)} />
        <GlassInput label="Phone" value={form.phone} disabled={ro} onChange={(e) => onChange('phone', e.target.value)} />
        <GlassInput label="City" value={form.city} disabled={ro} onChange={(e) => onChange('city', e.target.value)} />
        <GlassInput label="Country" value={form.country} disabled={ro} onChange={(e) => onChange('country', e.target.value)} />
        <div className="md:col-span-2">
          <GlassInput
            label="Preferred travel style"
            value={form.travelStyle}
            disabled={ro}
            onChange={(e) => onChange('travelStyle', e.target.value)}
            placeholder="e.g. slow travel · boutique stays"
          />
        </div>
      </div>

      <div className="relative mt-8 border-t border-traveloop-sky/15 pt-6">
        <SocialLinks
          instagram={form.instagram}
          twitter={form.twitter}
          linkedin={form.linkedin}
          github={form.github}
          disabled={ro}
          onChange={onChange}
        />
      </div>

      <div className="relative mt-8 border-t border-traveloop-sky/15 pt-6">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-traveloop-steel">Travel stats</p>
        <TravelStats
          countries={stats.countries}
          favoriteLabel={stats.favorite}
          avgCost={stats.avgCost}
          tripsDone={stats.tripsDone}
        />
      </div>
    </motion.div>
  )
}
