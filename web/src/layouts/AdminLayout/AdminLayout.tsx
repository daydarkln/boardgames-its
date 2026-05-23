import type { ReactNode } from 'react'

import { NavLink, routes } from '@redwoodjs/router'

import PublicLayout from 'src/layouts/PublicLayout/PublicLayout'

type AdminLayoutProps = {
  children?: ReactNode
}

const adminNav = [
  ['Обзор', routes.admin()],
  ['Игры', routes.adminGameSessions()],
  ['Площадки', routes.adminVenues()],
  ['Пользователи', routes.adminUsers()],
  ['Объявления', routes.adminPlayerPosts()],
]

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-white/10 bg-slate-950/70 p-2">
          {adminNav.map(([label, to]) => (
            <NavLink
              key={label}
              to={to}
              className="hover:bg-white/8 rounded-lg px-4 py-2 text-sm font-bold text-slate-300 transition hover:text-white"
              activeClassName="bg-orange-500/18 text-white"
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
