import { cva, type VariantProps } from 'class-variance-authority'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

const glassButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traveloop-sky/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1A] disabled:pointer-events-none disabled:opacity-45',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-br from-traveloop-sky via-traveloop-steel to-traveloop-slate text-white shadow-glow hover:shadow-[0_0_48px_rgba(136,189,242,0.45)] border border-white/10',
        ghost:
          'border border-traveloop-sky/30 bg-white/5 text-traveloop-ice backdrop-blur-xl hover:border-traveloop-ice/40 hover:bg-white/10',
        social:
          'border border-traveloop-sky/25 bg-[#0B0F1A]/40 text-traveloop-ice backdrop-blur-xl hover:border-traveloop-ice/35 hover:bg-white/[0.07]',
      },
      size: {
        default: 'h-11 px-5',
        lg: 'h-12 px-6 text-[15px]',
        icon: 'h-11 w-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export type GlassButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> &
  VariantProps<typeof glassButtonVariants> & {
    leftIcon?: ReactNode
    children?: ReactNode
  }

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, leftIcon, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: variant === 'primary' ? 1.03 : 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={cn(glassButtonVariants({ variant, size, className }))}
      {...props}
    >
      {leftIcon ? <span className="shrink-0 [&>svg]:h-[18px] [&>svg]:w-[18px]">{leftIcon}</span> : null}
      {children}
    </motion.button>
  ),
)
GlassButton.displayName = 'GlassButton'
