import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { Check } from 'lucide-react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'

import { cn } from 'src/lib/cn'

type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  label?: ReactNode
  labelClassName?: string
}

const Checkbox = ({
  id,
  label,
  labelClassName,
  className,
  ...props
}: CheckboxProps) => {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const control = (
    <CheckboxPrimitive.Root
      id={checkboxId}
      className={cn(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/15 bg-slate-950/60 text-white outline-none transition hover:border-violet-300/60 focus-visible:ring-2 focus-visible:ring-violet-300/45 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-violet-300/70 data-[state=checked]:bg-violet-500',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="h-3.5 w-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (!label) return control

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        'flex min-h-11 items-center gap-3 rounded-lg border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-slate-200',
        labelClassName
      )}
    >
      {control}
      <span>{label}</span>
    </label>
  )
}

export default Checkbox
