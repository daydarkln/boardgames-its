import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from 'src/lib/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  interactive?: boolean
}

const Card = ({
  children = 'Card',
  className,
  interactive,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        'bg-slate-950/68 rounded-lg border border-white/10 shadow-xl shadow-black/20 backdrop-blur',
        interactive &&
          'transition hover:-translate-y-0.5 hover:border-violet-300/30 hover:bg-slate-900/80',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
