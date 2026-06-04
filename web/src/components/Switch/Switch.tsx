import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { Switch as SwitchPrimitive } from 'radix-ui'

import { cn } from 'src/lib/cn'

type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  label?: ReactNode
  labelClassName?: string
}

const Switch = ({
  id,
  label,
  labelClassName,
  className,
  ...props
}: SwitchProps) => {
  const generatedId = useId()
  const switchId = id ?? generatedId
  const control = (
    <SwitchPrimitive.Root
      id={switchId}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full border border-white/10 bg-slate-800 outline-none transition focus-visible:ring-2 focus-visible:ring-violet-300/45 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-violet-500',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-5" />
    </SwitchPrimitive.Root>
  )

  if (!label) return control

  return (
    <label
      htmlFor={switchId}
      className={cn(
        'flex min-h-11 items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-slate-200',
        labelClassName
      )}
    >
      <span>{label}</span>
      {control}
    </label>
  )
}

export default Switch
