import type { ReactNode } from 'react'

import { Dice5 } from 'lucide-react'

import { Link } from '@redwoodjs/router'

import { routePath } from 'src/lib/routes'

type AuthShellProps = {
  title: string
  description: string
  activeTab?: 'login' | 'signup' | 'reset'
  children: ReactNode
  footer?: ReactNode
}

const AuthShell = ({
  title,
  description,
  activeTab = 'login',
  children,
  footer,
}: AuthShellProps) => {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
      <section className="hidden min-h-[620px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,.42),rgba(244,63,94,.22)),radial-gradient(circle_at_28%_24%,rgba(255,255,255,.22),transparent_16rem)] p-8 shadow-2xl shadow-black/35 lg:flex">
        <div className="max-w-xl">
          <div className="border-white/12 mb-6 inline-flex items-center gap-3 rounded-xl border bg-slate-950/45 px-4 py-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 text-white">
              <Dice5 className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-heading text-sm font-medium uppercase text-white">
                Играй вместе
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-300">
                Настолки · НРИ · Мафия
              </span>
            </span>
          </div>
          <h1 className="font-heading text-5xl font-medium leading-[0.96] text-white">
            Найди свой стол, клуб и компанию.
          </h1>
          <p className="mt-4 max-w-lg text-base font-semibold leading-7 text-slate-200">
            Вход открывает записи на игры, избранное, личный кабинет и создание
            собственных встреч.
          </p>
        </div>
      </section>

      <section className="glass-panel mx-auto w-full max-w-[420px] rounded-2xl p-5 sm:p-6 lg:my-16">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-medium leading-none text-white">
              {title}
            </h1>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-400">
              {description}
            </p>
          </div>
          <Link
            to={routePath('home', '/')}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white"
            aria-label="На главную"
          >
            ×
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 border-b border-white/10 text-center text-sm font-bold">
          <Link
            to={routePath('login', '/login')}
            className={
              activeTab === 'login'
                ? 'border-b-2 border-violet-400 pb-3 text-white'
                : 'pb-3 text-slate-400 hover:text-white'
            }
          >
            Вход
          </Link>
          <Link
            to={routePath('signup', '/signup')}
            className={
              activeTab === 'signup'
                ? 'border-b-2 border-violet-400 pb-3 text-white'
                : 'pb-3 text-slate-400 hover:text-white'
            }
          >
            Регистрация
          </Link>
        </div>

        <div className="mt-5">{children}</div>
        {footer && <div className="mt-5 text-center text-sm">{footer}</div>}
      </section>
    </div>
  )
}

export default AuthShell
