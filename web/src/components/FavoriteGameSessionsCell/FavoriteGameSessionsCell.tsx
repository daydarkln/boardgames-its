import type {
  FavoriteGameSessionsQuery,
  FavoriteGameSessionsQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import EmptyState from 'src/components/EmptyState/EmptyState'
import GameSessionCard from 'src/components/GameSessionCard/GameSessionCard'

export const QUERY: TypedDocumentNode<
  FavoriteGameSessionsQuery,
  FavoriteGameSessionsQueryVariables
> = gql`
  query FavoriteGameSessionsQuery {
    favoriteGameSessions {
      id
      gameSession {
        id
        title
        description
        category
        date
        startTime
        maxPlayers
        status
        experienceLevel
        imageUrl
        venue {
          name
          district
          address
        }
        registrations {
          status
        }
      }
    }
  }
`

export const Loading = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {[1, 2, 3].map((item) => (
      <div key={item} className="bg-white/8 h-72 animate-pulse rounded-lg" />
    ))}
  </div>
)

export const Empty = () => <EmptyState title="В избранном пока нет игр" />

export const Failure = ({
  error,
}: CellFailureProps<FavoriteGameSessionsQueryVariables>) => (
  <EmptyState
    title="Не удалось загрузить избранное"
    description={error?.message}
  />
)

export const Success = ({
  favoriteGameSessions,
}: CellSuccessProps<
  FavoriteGameSessionsQuery,
  FavoriteGameSessionsQueryVariables
>) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {favoriteGameSessions.map((favorite) => (
        <GameSessionCard key={favorite.id} game={favorite.gameSession} />
      ))}
    </div>
  )
}
