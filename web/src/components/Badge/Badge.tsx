import type { HTMLAttributes, ReactNode } from 'react'

import { Badge as RadixBadge } from '@radix-ui/themes'

import { cn } from 'src/lib/cn'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode
  tone?: 'violet' | 'orange' | 'green' | 'blue' | 'rose' | 'slate'
}

const tones = {
  violet:
    'border-violet-400/35 bg-violet-500/18 text-violet-100 shadow-violet-950/20',
  orange:
    'border-orange-400/35 bg-orange-500/18 text-orange-100 shadow-orange-950/20',
  green:
    'border-emerald-400/35 bg-emerald-500/18 text-emerald-100 shadow-emerald-950/20',
  blue: 'border-sky-400/35 bg-sky-500/18 text-sky-100 shadow-sky-950/20',
  rose: 'border-rose-400/35 bg-rose-500/18 text-rose-100 shadow-rose-950/20',
  slate: 'border-white/10 bg-white/8 text-slate-200 shadow-black/10',
}

const Badge = ({
  children = 'Badge',
  tone = 'slate',
  className,
  ...props
}: BadgeProps) => {
  return (
    <RadixBadge
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-black uppercase leading-none shadow-sm [&.rt-Badge]:m-0 [&.rt-Badge]:h-auto [&.rt-Badge]:font-black',
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </RadixBadge>
  )
}

export default Badge
