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
import GameSessionsTimeline from 'src/components/GameSessionsTimeline/GameSessionsTimeline'
import Skeleton from 'src/components/Skeleton/Skeleton'

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
  <div className="grid gap-5">
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="grid gap-3 pl-12 md:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] md:gap-4 md:pl-0"
      >
        <Skeleton className="hidden h-24 md:block" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="glass-panel h-40" />
      </div>
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
  return <GameSessionsTimeline games={gameSessions.slice(0, 6)} />
}
