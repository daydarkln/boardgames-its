import { Heart, Users } from 'lucide-react'
import type { GameSessionQuery, GameSessionQueryVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Badge from 'src/components/Badge/Badge'
import EmptyState from 'src/components/EmptyState/EmptyState'
import GameSessionCard from 'src/components/GameSessionCard/GameSessionCard'
import RegistrationControls from 'src/components/RegistrationControls/RegistrationControls'
import {
  formatCategory,
  formatExperience,
  formatStatus,
} from 'src/lib/categories'

export const QUERY: TypedDocumentNode<
  GameSessionQuery,
  GameSessionQueryVariables
> = gql`
  query GameSessionQuery($id: Int!) {
    gameSession(id: $id) {
      id
      title
      description
      category
      gameSystem
      date
      startTime
      endTime
      maxPlayers
      minPlayers
      status
      experienceLevel
      isOnline
      isPrivate
      requiresApproval
      locationDetails
      connectionInfo
      imageUrl
      tags
      organizerId
      organizer {
        id
        name
        email
      }
      venue {
        id
        name
        address
        district
      }
      registrations {
        id
        status
        userId
        user {
          id
          name
        }
      }
      favorites {
        id
        userId
      }
    }
  }
`

export const Loading = () => (
  <div className="bg-white/8 h-96 animate-pulse rounded-lg" />
)

export const Empty = () => <EmptyState title="Игра не найдена" />

export const Failure = ({
  error,
}: CellFailureProps<GameSessionQueryVariables>) => (
  <EmptyState title="Не удалось загрузить игру" description={error?.message} />
)

export const Success = ({
  gameSession,
}: CellSuccessProps<GameSessionQuery, GameSessionQueryVariables>) => {
  if (!gameSession) return <Empty />

  const approved = gameSession.registrations.filter(
    (registration) => registration.status === 'APPROVED'
  )

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <article className="rounded-xl border border-white/10 bg-slate-950/70 p-6">
        <div className="flex flex-wrap gap-2">
          <Badge tone="violet">{formatCategory(gameSession.category)}</Badge>
          <Badge tone="slate">{formatStatus(gameSession.status)}</Badge>
          <Badge tone="blue">
            {formatExperience(gameSession.experienceLevel)}
          </Badge>
        </div>
        <h1 className="mt-5 text-4xl font-black text-white">
          {gameSession.title}
        </h1>
        <p className="mt-4 whitespace-pre-line text-base leading-7 text-slate-300">
          {gameSession.description}
        </p>
        <div className="mt-6 grid gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300 sm:grid-cols-2">
          <span>
            Дата: {new Date(gameSession.date).toLocaleDateString('ru-RU')}
          </span>
          <span>
            Время: {gameSession.startTime}
            {gameSession.endTime ? ` - ${gameSession.endTime}` : ''}
          </span>
          <span>
            Место:{' '}
            {gameSession.isOnline
              ? 'Онлайн'
              : (gameSession.venue?.name ??
                gameSession.locationDetails ??
                'Уточняется')}
          </span>
          {gameSession.isOnline && (
            <span>
              Подключение:{' '}
              {gameSession.connectionInfo ?? 'Организатор сообщит детали'}
            </span>
          )}
          <span>
            Организатор:{' '}
            {gameSession.organizer.name ?? gameSession.organizer.email}
          </span>
        </div>
        <div className="mt-6">
          <h2 className="flex items-center gap-2 text-xl font-black text-white">
            <Users className="h-5 w-5 text-emerald-300" />
            Участники
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {approved.length > 0 ? (
              approved.map((registration) => (
                <Badge key={registration.id} tone="green">
                  {registration.user.name ?? `Игрок #${registration.user.id}`}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-slate-500">
                Пока никто не записался.
              </span>
            )}
          </div>
        </div>
      </article>
      <aside className="grid content-start gap-4">
        <GameSessionCard game={gameSession} />
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-white">
            <Heart className="h-5 w-5 text-pink-300" />
            Действия
          </h2>
          <RegistrationControls game={gameSession} />
        </div>
      </aside>
    </div>
  )
}
