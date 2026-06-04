import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import { cn } from 'src/lib/cn'

const Root = DropdownMenuPrimitive.Root
const Trigger = DropdownMenuPrimitive.Trigger

const Content = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, align = 'end', ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      className={cn(
        'z-50 min-w-48 overflow-hidden rounded-lg border border-violet-300/20 bg-slate-950/95 p-1 text-slate-100 shadow-2xl shadow-black/40 backdrop-blur-xl',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
Content.displayName = 'DropdownMenuContent'

const Item = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'data-[highlighted]:bg-violet-500/22 flex min-h-9 cursor-default select-none items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold outline-none transition data-[disabled]:pointer-events-none data-[disabled]:text-slate-600 data-[highlighted]:text-white',
      className
    )}
    {...props}
  />
))
Item.displayName = 'DropdownMenuItem'

const Separator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('my-1 h-px bg-white/10', className)}
    {...props}
  />
))
Separator.displayName = 'DropdownMenuSeparator'

export const DropdownMenu = {
  Root,
  Trigger,
  Content,
  Item,
  Separator,
}
