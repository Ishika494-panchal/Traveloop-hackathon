import { motion } from 'framer-motion'
import { Github, Instagram, Linkedin } from 'lucide-react'

type SocialLinksProps = {
  instagram: string
  twitter: string
  linkedin: string
  github: string
  disabled?: boolean
  onChange: (key: 'instagram' | 'twitter' | 'linkedin' | 'github', value: string) => void
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const row = [
  { key: 'instagram' as const, label: 'Instagram', icon: Instagram, placeholder: '@traveloop' },
  { key: 'twitter' as const, label: 'Twitter / X', icon: XIcon, placeholder: '@traveloop' },
  { key: 'linkedin' as const, label: 'LinkedIn', icon: Linkedin, placeholder: '/in/you' },
  { key: 'github' as const, label: 'GitHub', icon: Github, placeholder: '/username' },
]

export function SocialLinks({ instagram, twitter, linkedin, github, disabled, onChange }: SocialLinksProps) {
  const values = { instagram, twitter, linkedin, github }

  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Social</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {row.map(({ key, label, icon: Icon, placeholder }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            className="relative overflow-hidden rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/40 p-0.5 transition-shadow hover:border-traveloop-sky/45 hover:shadow-[0_0_20px_rgba(136,189,242,0.15)]"
          >
            <div className="flex items-center gap-2 rounded-[10px] bg-white/[0.03] px-2.5 py-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-traveloop-slate/40 text-traveloop-sky">
                <Icon className="h-4 w-4" strokeWidth={1.6} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wider text-traveloop-ice/55">{label}</p>
                <input
                  disabled={disabled}
                  value={values[key]}
                  onChange={(e) => onChange(key, e.target.value)}
                  placeholder={placeholder}
                  className="mt-0.5 w-full border-0 bg-transparent text-sm text-traveloop-ice placeholder:text-traveloop-ice/40 focus:outline-none focus:ring-0 disabled:opacity-50"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
