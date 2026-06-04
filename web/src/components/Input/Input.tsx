import type { ComponentPropsWithoutRef } from 'react'

import { TextField } from '@radix-ui/themes'

import { cn } from 'src/lib/cn'

const Input = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof TextField.Root>) => {
  return (
    <TextField.Root
      className={cn(
        'site-control px-4 text-white placeholder:text-slate-500 [&.rt-TextFieldRoot]:box-border [&.rt-TextFieldRoot]:shadow-none',
        className
      )}
      {...props}
    />
  )
}

export default Input
