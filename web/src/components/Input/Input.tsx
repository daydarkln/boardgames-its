import type { InputHTMLAttributes } from 'react'

import { cn } from 'src/lib/cn'

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-lg border border-white/10 bg-slate-950/45 px-4 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 hover:border-white/15 focus:border-violet-300/60 focus:bg-slate-900/80 focus:ring-2 focus:ring-violet-500/12',
        className
      )}
      {...props}
    />
  )
}

export default Input
