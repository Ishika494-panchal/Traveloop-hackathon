import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react'

import { cn } from '@/lib/utils'

type FieldShellProps = {
  label?: string
  error?: string
  icon?: ReactNode
  className?: string
  children: ReactNode
}

function FieldShell({ label, error, className, children }: FieldShellProps) {
  return (
    <div className={cn('w-full', className)}>
      {label ? (
        <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-traveloop-ice/82">
          {label}
        </span>
      ) : null}
      <div className="relative">{children}</div>
      {error ? <p className="mt-1 text-xs text-red-300/90">{error}</p> : null}
    </div>
  )
}

const fieldClass =
  'w-full rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/45 px-3.5 py-2.5 text-sm text-traveloop-ice/95 shadow-inner-glow backdrop-blur-md transition-all duration-300 placeholder:text-traveloop-ice/48 focus:border-traveloop-sky/70 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/35 focus:ring-offset-0 hover:border-traveloop-ice/35 focus-visible:animate-border-pulse'

type GlassInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  icon?: ReactNode
  wrapperClassName?: string
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, icon, className, wrapperClassName, ...props }, ref) => (
    <FieldShell label={label} error={error} className={wrapperClassName}>
      {icon ? (
        <span className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-traveloop-ice/70 [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </span>
      ) : null}
      <div className="origin-center transition-transform duration-300 ease-out will-change-transform focus-within:scale-[1.008]">
        <input
          ref={ref}
          className={cn(
            fieldClass,
            icon && 'pl-10',
            error && 'border-red-400/50 focus:ring-red-400/30',
            className,
          )}
          {...props}
        />
      </div>
    </FieldShell>
  ),
)
GlassInput.displayName = 'GlassInput'

type GlassTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
  wrapperClassName?: string
}

export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ label, error, className, wrapperClassName, ...props }, ref) => (
    <FieldShell label={label} error={error} className={wrapperClassName}>
      <div className="origin-center transition-transform duration-300 ease-out will-change-transform focus-within:scale-[1.005]">
        <textarea
          ref={ref}
          className={cn(
            fieldClass,
            'min-h-[128px] resize-y',
            error && 'border-red-400/50 focus:ring-red-400/30',
            className,
          )}
          {...props}
        />
      </div>
    </FieldShell>
  ),
)
GlassTextarea.displayName = 'GlassTextarea'
