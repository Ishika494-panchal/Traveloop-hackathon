import * as LabelPrimitive from '@radix-ui/react-label'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'

import { cn } from '@/lib/utils'

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-xs font-medium uppercase tracking-[0.18em] text-traveloop-ice/80',
      className,
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
