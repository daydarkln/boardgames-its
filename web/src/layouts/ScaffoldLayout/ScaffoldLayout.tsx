import type { ReactNode } from 'react'

import { Plus } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'

type LayoutProps = {
  title: string
  titleTo: keyof typeof routes
  buttonLabel: string
  buttonTo: keyof typeof routes
  children: ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  return (
    <AdminLayout>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-black text-white">
          <Link to={routes[titleTo]()}>{title}</Link>
        </h1>
        <Button to={routes[buttonTo]()} size="sm">
          <Plus className="h-4 w-4" />
          {buttonLabel}
        </Button>
      </header>
      <main className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
        {children}
      </main>
    </AdminLayout>
  )
}

export default ScaffoldLayout
