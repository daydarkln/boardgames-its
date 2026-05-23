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
        'h-11 w-full rounded-lg border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none transition focus:border-violet-300/60',
        className
      )}
      {...props}
    >
      {children ?? <option>Select</option>}
    </select>
  )
}

export default Select
