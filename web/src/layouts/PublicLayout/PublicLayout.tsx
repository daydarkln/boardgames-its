import type { ReactNode } from 'react'

import { LogOut, Menu, Search, Sparkles, X } from 'lucide-react'

import { Link, NavLink, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import { cn } from 'src/lib/cn'
import { useUiStore } from 'src/stores/uiStore'

type PublicLayoutProps = {
  children?: ReactNode
}

const navItems = [
  ['Игры', routes.games()],
  ['Места', routes.venues()],
  ['Люди', routes.players()],
  ['События', routes.games()],
  ['Сообщество', routes.players()],
  ['О проекте', routes.about()],
]

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const isMobileMenuOpen = useUiStore((state) => state.isMobileMenuOpen)
  const toggleMobileMenu = useUiStore((state) => state.toggleMobileMenu)
  const closeMobileMenu = useUiStore((state) => state.closeMobileMenu)

  return (
    <div className="min-h-screen">
      <Toaster toastOptions={{ duration: 5000 }} />
      <header className="bg-slate-950/82 sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to={routes.home()} className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-lg shadow-pink-950/30">
              <Sparkles className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-black uppercase text-white">
                Играй вместе
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Настолки · НРИ · Мафия
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-5 lg:flex">
            {navItems.map(([label, to]) => (
              <NavLink
                key={label}
                to={to}
                className="text-sm font-semibold text-slate-300 transition hover:text-white"
                activeClassName="text-orange-300"
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="bg-white/7 hidden min-w-0 max-w-xs flex-1 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-500 xl:flex">
            <Search className="h-4 w-4 shrink-0" />
            <span className="truncate">Поиск игр, мест и людей...</span>
          </div>

          <div className="ml-auto hidden items-center gap-2 lg:ml-0 lg:flex">
            {isAuthenticated ? (
              <>
                <Button to={routes.account()} variant="secondary" size="sm">
                  {currentUser?.name ?? 'Кабинет'}
                </Button>
                <button
                  type="button"
                  className="hover:bg-white/8 rounded-lg border border-white/10 p-2 text-slate-300 transition hover:text-white"
                  onClick={() => logOut()}
                  aria-label="Выйти"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <Button to={routes.login()} variant="secondary" size="sm">
                Войти
              </Button>
            )}
            <Button to={routes.accountCreateGame()} size="sm">
              Создать игру
            </Button>
          </div>

          <button
            type="button"
            className="ml-auto rounded-lg border border-white/10 p-2 text-white lg:hidden"
            onClick={toggleMobileMenu}
            aria-label="Открыть меню"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
        <div
          className={cn(
            'border-t border-white/10 bg-slate-950 px-4 py-4 lg:hidden',
            !isMobileMenuOpen && 'hidden'
          )}
        >
          <nav className="grid gap-3">
            {navItems.map(([label, to]) => (
              <Link
                key={label}
                to={to}
                onClick={closeMobileMenu}
                className="hover:bg-white/8 rounded-lg px-3 py-2 text-sm font-semibold text-slate-200"
              >
                {label}
              </Link>
            ))}
            <Button to={routes.login()} variant="secondary" className="mt-2">
              Войти
            </Button>
            <Button to={routes.accountCreateGame()}>Создать игру</Button>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/10 bg-slate-950/90">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          <div>
            <p className="text-lg font-black text-white">Играй вместе</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Городское комьюнити для игроков, клубов и организаторов.
            </p>
          </div>
          {[
            ['Навигация', ['Игры', 'Места', 'Люди', 'События']],
            ['Сообщество', ['Форум', 'Новости', 'Блог', 'Поддержка']],
            ['Информация', ['О проекте', 'Правила', 'Партнерам', 'Для клубов']],
          ].map(([title, links]) => (
            <div key={title}>
              <p className="font-bold text-white">{title}</p>
              <div className="mt-3 grid gap-2 text-sm text-slate-400">
                {(links as string[]).map((link) => (
                  <span key={link}>{link}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
