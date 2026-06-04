import { CalendarClock, MapPin, Users } from 'lucide-react'

import { Link } from '@redwoodjs/router'

import Badge from 'src/components/Badge/Badge'
import EmptyState from 'src/components/EmptyState/EmptyState'
import {
  formatCategory,
  formatExperience,
  formatStatus,
} from 'src/lib/categories'
import { cn } from 'src/lib/cn'
import { routePath } from 'src/lib/routes'

type GameTimelineItem = {
  id: number
  title: string
  description?: string | null
  category?: string | null
  date?: string | null
  startTime?: string | null
  maxPlayers?: number | null
  status?: string | null
  experienceLevel?: string | null
  venue?: {
    name?: string | null
    district?: string | null
    address?: string | null
  } | null
  registrations?: Array<{ status?: string | null } | null> | null
}

type GameSessionsTimelineProps = {
  games?: GameTimelineItem[]
}

const toneByCategory = (category?: string | null) =>
  category === 'TTRPG' ? 'rose' : category === 'MAFIA' ? 'orange' : 'violet'

const markerByCategory = (category?: string | null) =>
  category === 'TTRPG'
    ? 'from-rose-500 to-red-700'
    : category === 'MAFIA'
      ? 'from-orange-500 to-stone-900'
      : 'from-violet-500 to-sky-400'

const formatDate = (value?: string | null) => {
  if (!value) return 'Дата уточняется'

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    weekday: 'short',
  }).format(new Date(value))
}

const activeRegistrationCount = (
  registrations?: Array<{ status?: string | null } | null> | null
) =>
  registrations?.filter((registration) =>
    ['PENDING', 'APPROVED'].includes(registration?.status ?? '')
  ).length ?? 0

const GameSessionsTimeline = ({ games = [] }: GameSessionsTimelineProps) => {
  if (games.length === 0) {
    return (
      <EmptyState
        title="Ближайших событий пока нет"
        description="Как только появятся опубликованные игры со свободными местами, они попадут в таймлайн."
      />
    )
  }

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-orange-300/70 via-violet-400/55 to-sky-300/15 md:left-1/2" />
      <ol className="grid gap-5">
        {[...games, ...games, ...games].map((game, index) => {
          const gamePath = routePath('game', `/games/${game.id}`, {
            id: game.id,
          })
          const freeSeats = Math.max(
            (game.maxPlayers ?? 0) -
              activeRegistrationCount(game.registrations),
            0
          )
          const place =
            game.venue?.name ??
            game.venue?.district ??
            game.venue?.address ??
            'Место уточняется'
          const isLeft = index % 2 === 0

          return (
            <li
              key={`${game.id}-${index}`}
              className="relative grid gap-3 pl-12 md:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] md:items-stretch md:gap-4 md:pl-0"
            >
              <div
                className={cn(
                  'hidden md:flex',
                  isLeft ? 'justify-end' : 'md:col-start-3'
                )}
              >
                <div className="flex min-h-full max-w-xs flex-col justify-center rounded-lg border border-white/10 bg-slate-950/45 px-4 py-3 text-sm font-semibold text-slate-300">
                  <span>{formatDate(game.date)}</span>
                  <span className="mt-1 text-orange-200">
                    {game.startTime ?? 'время уточняется'}
                  </span>
                </div>
              </div>

              <div className="absolute left-0 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-950 md:static md:col-start-2 md:mx-auto md:mt-5">
                <span
                  className={cn(
                    'h-4 w-4 rounded-full bg-gradient-to-br shadow-lg',
                    markerByCategory(game.category)
                  )}
                />
              </div>

              <Link
                to={gamePath}
                className={cn(
                  'group block rounded-lg border border-white/10 bg-slate-950/70 p-4 shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-0.5 hover:border-orange-300/35 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-300/40',
                  isLeft ? 'md:col-start-3' : 'md:col-start-1 md:row-start-1'
                )}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge tone={toneByCategory(game.category)}>
                    {formatCategory(game.category)}
                  </Badge>
                  {game.status && (
                    <Badge tone="slate">{formatStatus(game.status)}</Badge>
                  )}
                </div>
                <h3 className="mt-3 font-heading text-xl font-medium leading-tight text-white">
                  {game.title}
                </h3>
                {game.description && (
                  <p className="mt-2 line-clamp-2 text-sm font-medium leading-5 text-slate-400">
                    {game.description}
                  </p>
                )}
                <div className="mt-4 grid gap-2 text-xs font-semibold text-slate-300">
                  <span className="inline-flex items-center gap-2 md:hidden">
                    <CalendarClock className="h-4 w-4 text-orange-300" />
                    {formatDate(game.date)} ·{' '}
                    {game.startTime ?? 'время уточняется'}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-300" />
                    {place}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-emerald-300" />
                    {freeSeats} / {game.maxPlayers ?? 0} мест ·{' '}
                    {formatExperience(game.experienceLevel)}
                  </span>
                </div>
                <span className="mt-4 inline-flex text-xs font-black uppercase text-orange-200 transition group-hover:text-orange-100">
                  Перейти к событию
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default GameSessionsTimeline
