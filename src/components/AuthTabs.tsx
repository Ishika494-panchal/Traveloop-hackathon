import { motion } from 'framer-motion'

type Tab = 'login' | 'signup'

type AuthTabsProps = {
  value: Tab
  onChange: (v: Tab) => void
}

export function AuthTabs({ value, onChange }: AuthTabsProps) {
  return (
    <div className="relative flex rounded-full border border-traveloop-sky/25 bg-[#0B0F1A]/45 p-1 shadow-inner-glow backdrop-blur-md">
      {(['login', 'signup'] as const).map((tab) => {
        const active = value === tab
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className="relative z-[1] flex-1 rounded-full py-2.5 text-sm font-medium transition-colors"
          >
            {active ? (
              <motion.span
                layoutId="auth-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-traveloop-sky/35 via-traveloop-steel/35 to-traveloop-slate/55 shadow-glow-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span
              className={`relative z-[2] uppercase tracking-[0.22em] ${
                active ? 'text-white' : 'text-traveloop-ice/72 hover:text-traveloop-ice'
              }`}
            >
              {tab === 'login' ? 'Login' : 'Sign Up'}
            </span>
          </button>
        )
      })}
    </div>
  )
}
