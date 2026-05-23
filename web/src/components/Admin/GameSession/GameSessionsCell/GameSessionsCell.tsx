import type { FindGameSessions, FindGameSessionsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import GameSessions from 'src/components/Admin/GameSession/GameSessions'

export const QUERY: TypedDocumentNode<
  FindGameSessions,
  FindGameSessionsVariables
> = gql`
  query FindGameSessions {
    gameSessions {
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
      createdAt
      updatedAt
      organizerId
      venueId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No gameSessions yet.{' '}
      <Link to={routes.adminNewGameSession()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindGameSessions>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  gameSessions,
}: CellSuccessProps<FindGameSessions, FindGameSessionsVariables>) => {
  return <GameSessions gameSessions={gameSessions} />
}
