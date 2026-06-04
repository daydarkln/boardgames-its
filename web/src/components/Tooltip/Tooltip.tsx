import type { ReactElement, ReactNode } from 'react'

import { Tooltip as TooltipPrimitive } from 'radix-ui'

import { cn } from 'src/lib/cn'

type TooltipProps = {
  children: ReactElement
  content: ReactNode
  className?: string
}

const Tooltip = ({ children, content, className }: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={8}
            className={cn(
              'z-50 max-w-xs rounded-md border border-white/10 bg-slate-950/95 px-3 py-2 text-xs font-semibold text-slate-100 shadow-xl shadow-black/35',
              className
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-slate-950" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
