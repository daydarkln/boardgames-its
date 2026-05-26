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
        'glass-panel glow-card rounded-lg',
        interactive &&
          'transition duration-200 hover:-translate-y-0.5 hover:border-violet-300/35 hover:bg-slate-900/80 hover:shadow-violet-950/25',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
