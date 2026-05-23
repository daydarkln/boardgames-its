import type { ReactNode } from 'react'

import { CalendarPlus, ClipboardList, Heart, UserRound } from 'lucide-react'

import { NavLink } from '@redwoodjs/router'

import PublicLayout from 'src/layouts/PublicLayout/PublicLayout'
import { routePath } from 'src/lib/routes'

type AccountLayoutProps = {
  children?: ReactNode
}

const accountNav = [
  ['Мои игры', routePath('accountMyGames', '/account/my-games'), ClipboardList],
  [
    'Мои записи',
    routePath('accountMyRegistrations', '/account/my-registrations'),
    Heart,
  ],
  [
    'Создать игру',
    routePath('accountCreateGame', '/account/create-game'),
    CalendarPlus,
  ],
  ['Профиль', routePath('accountProfile', '/account/profile'), UserRound],
  ['Избранное', routePath('accountFavorites', '/account/favorites'), Heart],
]

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <PublicLayout>
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="px-3 text-xs font-black uppercase tracking-[0.2em] text-orange-300">
            Кабинет
          </p>
          <nav className="mt-4 grid gap-2">
            {accountNav.map(([label, to, Icon]) => (
              <NavLink
                key={label as string}
                to={to as string}
                className="hover:bg-white/8 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-300 transition hover:text-white"
                activeClassName="bg-violet-500/18 text-white"
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <section>{children}</section>
      </div>
    </PublicLayout>
  )
}

export default AccountLayout
