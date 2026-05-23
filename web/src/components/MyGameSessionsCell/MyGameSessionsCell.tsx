import type {
  MyGameSessionsQuery,
  MyGameSessionsQueryVariables,
} from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import EmptyState from 'src/components/EmptyState/EmptyState'
import GameSessionCard from 'src/components/GameSessionCard/GameSessionCard'

export const QUERY: TypedDocumentNode<
  MyGameSessionsQuery,
  MyGameSessionsQueryVariables
> = gql`
  query MyGameSessionsQuery {
    myGameSessions {
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
  <div className="bg-white/8 h-72 animate-pulse rounded-lg" />
)

export const Empty = () => <EmptyState title="Вы пока не создавали игры" />

export const Failure = ({
  error,
}: CellFailureProps<MyGameSessionsQueryVariables>) => (
  <EmptyState
    title="Не удалось загрузить ваши игры"
    description={error?.message}
  />
)

export const Success = ({
  myGameSessions,
}: CellSuccessProps<MyGameSessionsQuery, MyGameSessionsQueryVariables>) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {myGameSessions.map((game) => (
        <GameSessionCard key={game.id} game={game} />
      ))}
    </div>
  )
}
