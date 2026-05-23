import type {
  UpcomingGameSessionsQuery,
  UpcomingGameSessionsQueryVariables,
} from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import EmptyState from 'src/components/EmptyState/EmptyState'
import GameSessionCard from 'src/components/GameSessionCard/GameSessionCard'

export const QUERY: TypedDocumentNode<
  UpcomingGameSessionsQuery,
  UpcomingGameSessionsQueryVariables
> = gql`
  query UpcomingGameSessionsQuery {
    gameSessions(input: { hasSeats: true }) {
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
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {[1, 2, 3, 4].map((item) => (
      <div key={item} className="bg-white/8 h-72 animate-pulse rounded-lg" />
    ))}
  </div>
)

export const Empty = () => (
  <EmptyState
    title="Ближайших игр пока нет"
    description="Станьте первым организатором и соберите стол в своем районе."
  />
)

export const Failure = ({
  error,
}: CellFailureProps<UpcomingGameSessionsQueryVariables>) => (
  <EmptyState title="Не удалось загрузить игры" description={error?.message} />
)

export const Success = ({
  gameSessions,
}: CellSuccessProps<
  UpcomingGameSessionsQuery,
  UpcomingGameSessionsQueryVariables
>) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {gameSessions.slice(0, 4).map((game) => (
        <GameSessionCard key={game.id} game={game} compact />
      ))}
    </div>
  )
}
