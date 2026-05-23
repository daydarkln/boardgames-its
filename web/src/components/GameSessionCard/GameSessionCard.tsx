import { CalendarDays, MapPin, Users } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import Badge from 'src/components/Badge/Badge'
import Button from 'src/components/Button/Button'
import Card from 'src/components/Card/Card'
import {
  formatCategory,
  formatExperience,
  formatStatus,
} from 'src/lib/categories'

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
      (registration) => registration.status === 'APPROVED'
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
    <Card interactive className="group overflow-hidden">
      <Link to={gamePath} className="block">
        <div
          className="h-32 bg-cover bg-center"
          style={{
            backgroundImage:
              game.imageUrl ||
              'linear-gradient(135deg, rgba(124,58,237,.65), rgba(244,63,94,.35)), radial-gradient(circle at 70% 20%, rgba(255,255,255,.22), transparent 28%)',
          }}
        />
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={tone}>{formatCategory(game.category)}</Badge>
            {game.status && (
              <Badge tone="slate">{formatStatus(game.status)}</Badge>
            )}
          </div>
          <h3 className="mt-3 line-clamp-2 text-lg font-black text-white">
            {game.title}
          </h3>
          {!compact && game.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-400">
              {game.description}
            </p>
          )}
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
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
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button to={gamePath} className="w-full">
          {freeSeats > 0 ? 'Записаться' : 'Подробнее'}
        </Button>
      </div>
    </Card>
  )
}

export default GameSessionCard
