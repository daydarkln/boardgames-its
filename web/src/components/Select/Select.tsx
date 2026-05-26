import type { SelectHTMLAttributes } from 'react'

import { cn } from 'src/lib/cn'

const Select = ({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      className={cn(
        'h-11 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 text-sm font-semibold text-white outline-none transition hover:border-white/15 focus:border-violet-300/60 focus:ring-2 focus:ring-violet-500/12',
        className
      )}
      {...props}
    >
      {children ?? <option>Select</option>}
    </select>
  )
}

export default Select
