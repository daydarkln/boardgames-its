import { CalendarDays, MapPin, Users } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import Badge from 'src/components/Badge/Badge'
import Card from 'src/components/Card/Card'
import {
  formatCategory,
  formatExperience,
  formatStatus,
} from 'src/lib/categories'
import { cn } from 'src/lib/cn'

type GameSessionCardProps = {
  game?: {
    id: number
    title: string
    description?: string | null
    category?: string | null
    date?: string | null
    startTime?: string | null
    maxPlayers?: number | null
    status?: string | null
    experienceLevel?: string | null
    imageUrl?: string | null
    venue?: {
      name?: string | null
      district?: string | null
      address?: string | null
    } | null
    registrations?: Array<{ status?: string | null }> | null
  }
  compact?: boolean
}

const formatDate = (value?: string | null) => {
  if (!value) return 'Дата уточняется'

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  }).format(new Date(value))
}

const GameSessionCard = ({ game, compact = false }: GameSessionCardProps) => {
  if (!game) {
    return (
      <Card className="p-5">
        <p className="text-sm text-slate-400">Игра пока не выбрана</p>
      </Card>
    )
  }

  const approvedPlayers =
    game.registrations?.filter(
      (registration) =>
        registration.status === 'APPROVED' || registration.status === 'PENDING'
    ).length ?? 0
  const freeSeats = Math.max((game.maxPlayers ?? 0) - approvedPlayers, 0)
  const tone =
    game.category === 'TTRPG'
      ? 'rose'
      : game.category === 'MAFIA'
        ? 'orange'
        : 'violet'
  const gamePath =
    typeof routes.game === 'function'
      ? routes.game({ id: game.id })
      : `/games/${game.id}`

  return (
    <Card
      interactive
      className={cn(
        'group min-h-[290px] overflow-hidden',
        compact && 'min-h-[210px]'
      )}
    >
      <Link to={gamePath} className="relative block min-h-[inherit]">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-105"
          style={{
            backgroundImage:
              game.imageUrl ||
              'linear-gradient(135deg, rgba(124,58,237,.65), rgba(244,63,94,.35)), radial-gradient(circle at 70% 20%, rgba(255,255,255,.22), transparent 28%)',
          }}
        />
        <div className="from-black/92 via-black/46 to-black/16 absolute inset-0 bg-gradient-to-t" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.05),transparent_28%)]" />
        <div className="relative flex min-h-[inherit] flex-col justify-end p-4">
          <div className="mb-auto flex flex-wrap items-start gap-2">
            <Badge tone={tone}>{formatCategory(game.category)}</Badge>
            {game.status && (
              <Badge tone="slate">{formatStatus(game.status)}</Badge>
            )}
          </div>
          <h3
            className={cn(
              'line-clamp-2 font-heading font-medium leading-tight text-white',
              compact ? 'text-base' : 'text-xl'
            )}
          >
            {game.title}
          </h3>
          {!compact && game.description && (
            <p className="mt-2 line-clamp-2 text-sm font-medium leading-5 text-slate-300">
              {game.description}
            </p>
          )}
          <div className="mt-4 grid gap-2 text-xs font-semibold text-slate-200">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-orange-300" />
              {formatDate(game.date)} · {game.startTime ?? 'время уточняется'}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-300" />
              {game.venue?.name ?? 'Онлайн или место уточняется'}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-300" />
              {freeSeats} / {game.maxPlayers ?? 0} мест ·{' '}
              {formatExperience(game.experienceLevel)}
            </span>
          </div>
          <div className="mt-4">
            <span className="inline-flex min-h-9 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 text-xs font-black text-white shadow-lg shadow-pink-950/30">
              {freeSeats > 0 ? 'Записаться' : 'Подробнее'}
            </span>
          </div>
        </div>
      </Link>
    </Card>
  )
}

export default GameSessionCard
