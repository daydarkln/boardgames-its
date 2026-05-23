import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { Link } from '@redwoodjs/router'

import { cn } from 'src/lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  to?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  primary:
    'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg shadow-pink-950/30 hover:from-orange-400 hover:to-pink-500',
  secondary:
    'border border-white/12 bg-white/8 text-white hover:border-violet-300/50 hover:bg-white/12',
  ghost: 'text-slate-200 hover:bg-white/8 hover:text-white',
  danger:
    'border border-rose-400/40 bg-rose-500/12 text-rose-100 hover:bg-rose-500/20',
}

const sizes = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

const Button = ({
  children = 'Button',
  className,
  to,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) => {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    sizes[size],
    className
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
