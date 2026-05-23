import type {
  EditGameSessionById,
  UpdateGameSessionInput,
  UpdateGameSessionMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GameSessionForm from 'src/components/Admin/GameSession/GameSessionForm'

export const QUERY: TypedDocumentNode<EditGameSessionById> = gql`
  query EditGameSessionById($id: Int!) {
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

const UPDATE_GAME_SESSION_MUTATION: TypedDocumentNode<
  EditGameSessionById,
  UpdateGameSessionMutationVariables
> = gql`
  mutation UpdateGameSessionMutation(
    $id: Int!
    $input: UpdateGameSessionInput!
  ) {
    updateGameSession(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  gameSession,
}: CellSuccessProps<EditGameSessionById>) => {
  const [updateGameSession, { loading, error }] = useMutation(
    UPDATE_GAME_SESSION_MUTATION,
    {
      onCompleted: () => {
        toast.success('GameSession updated')
        navigate(routes.adminGameSessions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateGameSessionInput,
    id: EditGameSessionById['gameSession']['id']
  ) => {
    updateGameSession({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit GameSession {gameSession?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <GameSessionForm
          gameSession={gameSession}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
