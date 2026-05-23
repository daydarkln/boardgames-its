import type { InputHTMLAttributes } from 'react'

import { cn } from 'src/lib/cn'

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        'bg-white/7 h-11 w-full rounded-lg border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300/60 focus:bg-white/10',
        className
      )}
      {...props}
    />
  )
}

export default Input
