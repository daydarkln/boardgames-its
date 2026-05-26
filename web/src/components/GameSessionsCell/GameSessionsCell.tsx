import type {
  GameSessionsQuery,
  GameSessionsQueryVariables,
} from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import EmptyState from 'src/components/EmptyState/EmptyState'
import GameSessionCard from 'src/components/GameSessionCard/GameSessionCard'

export const QUERY: TypedDocumentNode<
  GameSessionsQuery,
  GameSessionsQueryVariables
> = gql`
  query GameSessionsQuery($input: GameSessionFilterInput) {
    gameSessions(input: $input) {
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
`

export const Loading = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <div
        key={item}
        className="glass-panel h-72 animate-pulse rounded-lg"
      />
    ))}
  </div>
)

export const Empty = () => (
  <EmptyState
    title="Игры не найдены"
    description="Попробуйте изменить фильтры."
  />
)

export const Failure = ({
  error,
}: CellFailureProps<GameSessionsQueryVariables>) => (
  <EmptyState title="Не удалось загрузить игры" description={error?.message} />
)

export const Success = ({
  gameSessions,
}: CellSuccessProps<GameSessionsQuery, GameSessionsQueryVariables>) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {gameSessions.map((game) => (
        <GameSessionCard key={game.id} game={game} />
      ))}
    </div>
  )
}
