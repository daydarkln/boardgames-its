import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

import { Button as RadixButton } from '@radix-ui/themes'

import { Link } from '@redwoodjs/router'

import { cn } from 'src/lib/cn'

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'onClick' | 'type'
> & {
  children?: ReactNode
  to?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler<HTMLElement>
}

const variants = {
  primary:
    'border border-orange-300/20 bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg shadow-pink-950/35 hover:from-orange-400 hover:to-pink-500',
  secondary:
    'border border-white/12 bg-white/8 text-white shadow-sm shadow-black/20 hover:border-violet-300/50 hover:bg-white/12',
  ghost: 'text-slate-300 hover:bg-white/8 hover:text-white focus:ring-white/20',
  danger:
    'border border-rose-400/40 bg-rose-500/12 text-rose-100 hover:bg-rose-500/20 focus:ring-rose-300/40',
  dark: 'border border-white/10 bg-slate-950/70 text-slate-100 shadow-sm shadow-black/20 hover:border-white/20 hover:bg-slate-900',
}

const sizes = {
  sm: 'min-h-9 px-3 text-xs',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

const Button = ({
  children = 'Button',
  className,
  to,
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  ...props
}: ButtonProps) => {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-bold leading-none transition focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-50 [&.rt-Button]:m-0 [&.rt-Button]:box-border [&.rt-Button]:h-auto [&.rt-Button]:font-bold',
    variants[variant],
    sizes[size],
    className
  )

  if (to) {
    return (
      <RadixButton asChild className={classes}>
        <Link
          to={to}
          onClick={(event) => {
            if (props.disabled) {
              event.preventDefault()
              return
            }

            onClick?.(event)
          }}
          aria-disabled={props.disabled || undefined}
          tabIndex={props.disabled ? -1 : props.tabIndex}
        >
          {children}
        </Link>
      </RadixButton>
    )
  }

  return (
    <RadixButton type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </RadixButton>
  )
}

export default Button
