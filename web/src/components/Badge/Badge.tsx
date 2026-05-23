import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from 'src/lib/cn'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode
  tone?: 'violet' | 'orange' | 'green' | 'blue' | 'rose' | 'slate'
}

const tones = {
  violet: 'border-violet-400/30 bg-violet-500/16 text-violet-100',
  orange: 'border-orange-400/35 bg-orange-500/16 text-orange-100',
  green: 'border-emerald-400/30 bg-emerald-500/16 text-emerald-100',
  blue: 'border-sky-400/30 bg-sky-500/16 text-sky-100',
  rose: 'border-rose-400/30 bg-rose-500/16 text-rose-100',
  slate: 'border-white/10 bg-white/8 text-slate-200',
}

const Badge = ({
  children = 'Badge',
  tone = 'slate',
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold',
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
