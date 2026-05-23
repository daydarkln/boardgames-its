import type {
  FindGameSessionById,
  FindGameSessionByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import GameSession from 'src/components/Admin/GameSession/GameSession'

export const QUERY: TypedDocumentNode<
  FindGameSessionById,
  FindGameSessionByIdVariables
> = gql`
  query FindGameSessionById($id: Int!) {
    gameSession: gameSession(id: $id) {
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
      isPrivate
      requiresApproval
      imageUrl
      tags
      createdAt
      updatedAt
      organizerId
      venueId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>GameSession not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindGameSessionByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  gameSession,
}: CellSuccessProps<FindGameSessionById, FindGameSessionByIdVariables>) => {
  return <GameSession gameSession={gameSession} />
}
