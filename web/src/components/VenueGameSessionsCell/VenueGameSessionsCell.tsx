import type {
  VenueGameSessionsQuery,
  VenueGameSessionsQueryVariables,
} from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import EmptyState from 'src/components/EmptyState/EmptyState'
import GameSessionCard from 'src/components/GameSessionCard/GameSessionCard'
import Skeleton from 'src/components/Skeleton/Skeleton'

export const QUERY: TypedDocumentNode<
  VenueGameSessionsQuery,
  VenueGameSessionsQueryVariables
> = gql`
  query VenueGameSessionsQuery($venueId: Int!) {
    gameSessions(input: { venueId: $venueId }) {
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

export const Loading = () => <Skeleton className="h-72" />

export const Empty = () => <EmptyState title="Игр на площадке пока нет" />

export const Failure = ({
  error,
}: CellFailureProps<VenueGameSessionsQueryVariables>) => (
  <EmptyState title="Не удалось загрузить игры" description={error?.message} />
)

export const Success = ({
  gameSessions,
}: CellSuccessProps<
  VenueGameSessionsQuery,
  VenueGameSessionsQueryVariables
>) => {
  return (
    <div className="grid gap-4">
      {gameSessions.slice(0, 3).map((game) => (
        <GameSessionCard key={game.id} game={game} compact />
      ))}
    </div>
  )
}
