import { motion } from 'framer-motion'
import { Lock, Mail, MapPin, Phone, User } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthTabs } from '@/components/AuthTabs'
import { GlassButton } from '@/components/GlassButton'
import { GlassInput, GlassTextarea } from '@/components/GlassInput'
import { useCardTilt } from '@/hooks/useCardTilt'
import { Checkbox } from '@/ui/checkbox'
import { Label } from '@/ui/label'

type Tab = 'login' | 'signup'

export function AuthPanel() {
  const [tab, setTab] = useState<Tab>('login')
  const formId = useId()
  const tiltOn = tab === 'login'
  const { ref: tiltRef, onPointerMove, onPointerLeave, transform } = useCardTilt(5)

  useEffect(() => {
    if (!tiltOn) onPointerLeave()
  }, [tiltOn, onPointerLeave])

  return (
    <section className="relative flex min-h-0 w-full flex-1 flex-col items-center justify-center px-4 py-8 md:h-full md:max-h-[100dvh] md:w-[40%] md:py-6 md:pl-3 md:pr-8 lg:pr-12">
      <div className="pointer-events-none absolute inset-0 md:bg-gradient-to-l md:from-[#0B0F1A] md:via-[#0B0F1A]/85 md:to-transparent" />

      <motion.div
        ref={tiltRef}
        onPointerMove={tiltOn ? onPointerMove : undefined}
        onPointerLeave={tiltOn ? onPointerLeave : undefined}
        style={tiltOn ? { transform } : undefined}
        initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-[2] flex w-full max-w-md min-h-0 flex-1 flex-col items-center justify-center md:max-h-full ${tiltOn ? 'will-change-transform' : ''}`}
      >
        <div className="flex max-h-[min(92dvh,calc(100dvh-1.5rem))] min-h-0 w-full flex-col rounded-3xl border border-traveloop-sky/30 bg-gradient-to-br from-white/[0.08] via-[#0B0F1A]/55 to-[#0B0F1A]/80 p-5 shadow-[0_0_60px_rgba(136,189,242,0.18)] backdrop-blur-xl sm:p-6 md:max-h-[calc(100dvh-2rem)]">
          <div className="flex shrink-0 items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-traveloop-ice/75">
                Travel OS
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">Traveloop</h2>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-traveloop-sky to-traveloop-slate shadow-glow" />
          </div>

          <div className="mt-4 shrink-0 sm:mt-5">
            <AuthTabs value={tab} onChange={setTab} />
          </div>

          <div className="auth-form-scroll mt-4 min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain sm:mt-5">
            <div className="space-y-4 pb-1">
              {tab === 'login' ? (
                <form
                  className="space-y-3.5"
                  onSubmit={(e) => {
                    e.preventDefault()
                  }}
                >
                  <GlassInput
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@domain.com"
                    label="Email"
                    icon={<Mail />}
                    required
                  />
                  <GlassInput
                    id={`${formId}-password`}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    label="Password"
                    icon={<Lock />}
                    required
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`${formId}-remember`} />
                      <Label
                        htmlFor={`${formId}-remember`}
                        className="cursor-pointer font-normal normal-case tracking-normal text-traveloop-ice/90"
                      >
                        Remember me
                      </Label>
                    </div>
                    <button
                      type="button"
                      className="text-traveloop-sky transition-colors hover:text-traveloop-ice"
                    >
                      Forgot password
                    </button>
                  </div>

                  <GlassButton type="submit" className="w-full" size="lg">
                    Login
                  </GlassButton>
                </form>
              ) : (
                <form
                  className="space-y-3.5"
                  onSubmit={(e) => {
                    e.preventDefault()
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <GlassInput
                      id={`${formId}-fn`}
                      name="firstName"
                      autoComplete="given-name"
                      placeholder="Alex"
                      label="First name"
                      icon={<User />}
                      required
                    />
                    <GlassInput
                      id={`${formId}-ln`}
                      name="lastName"
                      autoComplete="family-name"
                      placeholder="Rivera"
                      label="Last name"
                      icon={<User />}
                      required
                    />
                  </div>

                  <GlassInput
                    id={`${formId}-semail`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@domain.com"
                    label="Email"
                    icon={<Mail />}
                    required
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <GlassInput
                      id={`${formId}-phone`}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 415 555 0100"
                      label="Phone number"
                      icon={<Phone />}
                    />
                    <GlassInput
                      id={`${formId}-city`}
                      name="city"
                      autoComplete="address-level2"
                      placeholder="San Francisco"
                      label="City"
                      icon={<MapPin />}
                    />
                  </div>

                  <GlassInput
                    id={`${formId}-country`}
                    name="country"
                    autoComplete="country-name"
                    placeholder="United States"
                    label="Country"
                    icon={<MapPin />}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <GlassInput
                      id={`${formId}-pw1`}
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Create a password"
                      label="Password"
                      icon={<Lock />}
                      required
                    />
                    <GlassInput
                      id={`${formId}-pw2`}
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Repeat password"
                      label="Confirm password"
                      icon={<Lock />}
                      required
                    />
                  </div>

                  <GlassTextarea
                    id={`${formId}-info`}
                    name="additionalInfo"
                    placeholder="Tell us about your travel style, loyalty programs, dietary needs…"
                    label="Additional information"
                    rows={5}
                  />

                  <GlassButton type="submit" className="w-full" size="lg">
                    Create account
                  </GlassButton>
                </form>
              )}
            </div>
          </div>

          <p className="mt-4 shrink-0 border-t border-white/5 pt-4 text-center text-[11px] leading-relaxed text-traveloop-ice/80">
            By continuing you agree to Traveloop&apos;s{' '}
            <button type="button" className="text-traveloop-sky hover:text-traveloop-ice">
              Terms
            </button>{' '}
            and{' '}
            <button type="button" className="text-traveloop-sky hover:text-traveloop-ice">
              Privacy
            </button>
            .{' '}
            <Link to="/dashboard" className="block pt-2 text-traveloop-sky hover:text-traveloop-ice">
              View dashboard →
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  )
}
