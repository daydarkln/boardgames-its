import type { ReactNode } from 'react'

import { NavLink } from '@redwoodjs/router'

import PublicLayout from 'src/layouts/PublicLayout/PublicLayout'
import { cn } from 'src/lib/cn'
import { routePath } from 'src/lib/routes'

type AdminLayoutProps = {
  children?: ReactNode
}

const adminNav = [
  ['Обзор', routePath('admin', '/admin')],
  ['Игры', routePath('adminGameSessions', '/admin/games')],
  ['Площадки', routePath('adminVenues', '/admin/venues')],
  ['Пользователи', routePath('adminUsers', '/admin/users')],
  ['Объявления', routePath('adminPlayerPosts', '/admin/player-posts')],
]

const adminNavLinkClassName =
  'hover:bg-white/8 rounded-lg px-4 py-2 text-sm font-bold text-slate-300 transition hover:text-white'

const adminActiveNavLinkClassName = cn(
  adminNavLinkClassName,
  'bg-orange-500/18 text-white'
)

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-white/10 bg-slate-950/70 p-2">
          {adminNav.map(([label, to]) => (
            <NavLink
              key={label}
              to={to}
              className={adminNavLinkClassName}
              activeClassName={adminActiveNavLinkClassName}
            >
              {label}
            </NavLink>
          ))}
        </div>
        {children}
      </div>
    </PublicLayout>
  )
}

export default AdminLayout
