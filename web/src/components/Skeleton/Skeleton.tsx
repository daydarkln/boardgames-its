import type { HTMLAttributes } from 'react'

import { Skeleton as RadixSkeleton } from '@radix-ui/themes'

import { cn } from 'src/lib/cn'

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <RadixSkeleton
      className={cn(
        'bg-white/8 block rounded-lg [&.rt-Skeleton]:before:bg-gradient-to-r [&.rt-Skeleton]:before:from-transparent [&.rt-Skeleton]:before:via-white/10 [&.rt-Skeleton]:before:to-transparent',
        className
      )}
      {...props}
    />
  )
}

export default Skeleton
