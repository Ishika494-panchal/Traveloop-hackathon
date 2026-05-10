import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'

import { cn } from '@/lib/utils'

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer flex h-4 w-4 shrink-0 items-center justify-center rounded border border-traveloop-sky/40 bg-[#0B0F1A]/50 text-traveloop-bg shadow-inner-glow transition-all duration-300',
      'hover:border-traveloop-ice/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traveloop-sky/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1A]',
      'data-[state=checked]:border-traveloop-sky data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-traveloop-sky/30 data-[state=checked]:to-traveloop-slate/80 data-[state=checked]:text-traveloop-ice',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3 w-3" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
