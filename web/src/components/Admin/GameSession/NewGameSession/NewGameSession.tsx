import type {
  CreateGameSessionMutation,
  CreateGameSessionInput,
  CreateGameSessionMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GameSessionForm from 'src/components/Admin/GameSession/GameSessionForm'

const CREATE_GAME_SESSION_MUTATION: TypedDocumentNode<
  CreateGameSessionMutation,
  CreateGameSessionMutationVariables
> = gql`
  mutation CreateGameSessionMutation($input: CreateGameSessionInput!) {
    createGameSession(input: $input) {
      id
    }
  }
`

const NewGameSession = () => {
  const [createGameSession, { loading, error }] = useMutation(
    CREATE_GAME_SESSION_MUTATION,
    {
      onCompleted: () => {
        toast.success('GameSession created')
        navigate(routes.adminGameSessions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateGameSessionInput) => {
    createGameSession({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New GameSession</h2>
      </header>
      <div className="rw-segment-main">
        <GameSessionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewGameSession
