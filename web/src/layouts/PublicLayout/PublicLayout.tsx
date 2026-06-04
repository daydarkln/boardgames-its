import type { ReactNode } from 'react'

import { ChevronDown, Dice5, LogOut, Menu, UserRound, X } from 'lucide-react'
import { Collapsible } from 'radix-ui'

import { Link, NavLink } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import { DropdownMenu } from 'src/components/DropdownMenu/DropdownMenu'
import ToastProvider from 'src/components/ToastProvider/ToastProvider'
import Tooltip from 'src/components/Tooltip/Tooltip'
import { cn } from 'src/lib/cn'
import { routePath } from 'src/lib/routes'
import { useUiStore } from 'src/stores/uiStore'

type PublicLayoutProps = {
  children?: ReactNode
}

const navItems = [
  ['Игры', routePath('games', '/games')],
  ['Места', routePath('venues', '/venues')],
  ['Люди', routePath('players', '/players')],
  ['О проекте', routePath('about', '/about')],
]

const desktopNavLinkClassName =
  'font-heading text-[1.05rem] font-medium leading-none tracking-[0.01em] text-slate-300 transition-colors duration-200 hover:text-white'

const desktopActiveNavLinkClassName = cn(
  desktopNavLinkClassName,
  'text-orange-300'
)

const mobileNavLinkClassName =
  'rounded-lg px-3 py-2.5 font-heading text-base font-medium leading-none tracking-[0.01em] text-slate-100 transition hover:bg-white/8 hover:text-white'

const headerButtonClassName =
  'font-heading text-sm font-medium tracking-[0.01em]'

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const isMobileMenuOpen = useUiStore((state) => state.isMobileMenuOpen)
  const toggleMobileMenu = useUiStore((state) => state.toggleMobileMenu)
  const closeMobileMenu = useUiStore((state) => state.closeMobileMenu)
  const currentYear = new Date().getFullYear()

  return (
    <div className="app-shell min-h-screen">
      <ToastProvider />
      <div className="app-frame mx-auto min-h-[calc(100vh-1rem)] max-w-[1480px] overflow-hidden">
        <Collapsible.Root
          open={isMobileMenuOpen}
          onOpenChange={(open) => {
            if (open === isMobileMenuOpen) return
            if (open) toggleMobileMenu()
            else closeMobileMenu()
          }}
        >
          <header className="border-white/8 bg-slate-950/82 header sticky top-2 z-40 border-b backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <Link
                to={routePath('home', '/')}
                className="flex min-w-0 items-center gap-3"
                onClick={closeMobileMenu}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-orange-300/30 bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-lg shadow-pink-950/35">
                  <Dice5 className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-heading text-base font-medium uppercase leading-none tracking-[0.04em] text-white">
                    Играй вместе
                  </span>
                  <span className="mt-1 block truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Настолки · НРИ · Мафия
                  </span>
                </span>
              </Link>

              <nav className="ml-auto hidden items-center gap-5 lg:flex">
                {navItems.map(([label, to]) => (
                  <NavLink
                    key={label}
                    to={to}
                    className={desktopNavLinkClassName}
                    activeClassName={desktopActiveNavLinkClassName}
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>

              <div className="hidden items-center gap-2 lg:flex">
                {isAuthenticated ? (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button
                        variant="dark"
                        size="sm"
                        className={cn(headerButtonClassName, 'px-3')}
                      >
                        <UserRound className="h-4 w-4" />
                        {currentUser?.name ?? 'Кабинет'}
                        <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item asChild>
                        <Link to={routePath('account', '/account')}>
                          <UserRound className="h-4 w-4" />
                          Личный кабинет
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item onSelect={() => logOut()}>
                        <LogOut className="h-4 w-4" />
                        Выйти
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                ) : (
                  <Button
                    to={routePath('login', '/login')}
                    variant="dark"
                    size="sm"
                    className={headerButtonClassName}
                  >
                    Войти
                  </Button>
                )}
                <Button
                  to={routePath('accountCreateGame', '/account/create-game')}
                  size="sm"
                  className={headerButtonClassName}
                >
                  Создать игру
                </Button>
              </div>

              <Tooltip
                content={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              >
                <Collapsible.Trigger asChild>
                  <button
                    type="button"
                    className="ml-auto rounded-lg border border-white/10 bg-white/5 p-2 text-white outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-violet-300/50 lg:hidden"
                    aria-label={
                      isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'
                    }
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </button>
                </Collapsible.Trigger>
              </Tooltip>
            </div>
            <Collapsible.Content className="border-t border-white/10 bg-slate-950/95 px-4 py-4 lg:hidden">
              <nav className="grid gap-2">
                {navItems.map(([label, to]) => (
                  <Link
                    key={label}
                    to={to}
                    onClick={closeMobileMenu}
                    className={mobileNavLinkClassName}
                  >
                    {label}
                  </Link>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Button
                    to={
                      isAuthenticated
                        ? routePath('account', '/account')
                        : routePath('login', '/login')
                    }
                    variant="dark"
                    onClick={closeMobileMenu}
                    className={headerButtonClassName}
                  >
                    {isAuthenticated ? 'Кабинет' : 'Войти'}
                  </Button>
                  <Button
                    to={routePath('accountCreateGame', '/account/create-game')}
                    onClick={closeMobileMenu}
                    className={headerButtonClassName}
                  >
                    Создать игру
                  </Button>
                </div>
              </nav>
            </Collapsible.Content>
          </header>
        </Collapsible.Root>

        <main>{children}</main>

        <footer className="border-t border-white/10 bg-slate-950/70">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-2xl">
              <Link
                to={routePath('home', '/')}
                className="flex items-center gap-3"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-orange-300/30 bg-gradient-to-br from-orange-500 to-pink-600 text-white">
                  <Dice5 className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-heading text-sm font-medium uppercase text-white">
                    Играй вместе
                  </span>
                  <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Настолки · НРИ · Мафия
                  </span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Городская платформа, где можно найти игры, площадки и игроков
                для настолок, НРИ и мафии.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                to={routePath('about', '/about')}
                className="font-heading text-base font-medium text-white transition hover:text-orange-300"
              >
                О проекте и как поддержать
              </Link>
              <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                MVP в активной разработке
              </span>
            </div>
          </div>
          <div className="border-white/8 mx-auto flex max-w-7xl flex-col gap-2 border-t px-4 py-4 text-[11px] font-semibold text-slate-600 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
            <span>© {currentYear} Играй вместе</span>
            <span>Главная точка входа в городское игровое сообщество.</span>
            <span>
              Разработал{' '}
              <a href="https://ezholnin.ru?utm_source=boardgames">
                Егор Жолнин
              </a>
            </span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default PublicLayout
