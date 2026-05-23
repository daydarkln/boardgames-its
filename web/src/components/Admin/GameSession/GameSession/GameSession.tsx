import type {
  DeleteGameSessionMutation,
  DeleteGameSessionMutationVariables,
  FindGameSessionById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, formatEnum, timeTag } from 'src/lib/formatters'

const DELETE_GAME_SESSION_MUTATION: TypedDocumentNode<
  DeleteGameSessionMutation,
  DeleteGameSessionMutationVariables
> = gql`
  mutation DeleteGameSessionMutation($id: Int!) {
    deleteGameSession(id: $id) {
      id
    }
  }
`

interface Props {
  gameSession: NonNullable<FindGameSessionById['gameSession']>
}

const GameSession = ({ gameSession }: Props) => {
  const [deleteGameSession] = useMutation(DELETE_GAME_SESSION_MUTATION, {
    onCompleted: () => {
      toast.success('GameSession deleted')
      navigate(routes.adminGameSessions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteGameSessionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete gameSession ' + id + '?')) {
      deleteGameSession({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            GameSession {gameSession.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{gameSession.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{gameSession.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{gameSession.description}</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{formatEnum(gameSession.category)}</td>
            </tr>
            <tr>
              <th>Game system</th>
              <td>{gameSession.gameSystem}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(gameSession.date)}</td>
            </tr>
            <tr>
              <th>Start time</th>
              <td>{gameSession.startTime}</td>
            </tr>
            <tr>
              <th>End time</th>
              <td>{gameSession.endTime}</td>
            </tr>
            <tr>
              <th>Max players</th>
              <td>{gameSession.maxPlayers}</td>
            </tr>
            <tr>
              <th>Min players</th>
              <td>{gameSession.minPlayers}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{formatEnum(gameSession.status)}</td>
            </tr>
            <tr>
              <th>Experience level</th>
              <td>{formatEnum(gameSession.experienceLevel)}</td>
            </tr>
            <tr>
              <th>Is private</th>
              <td>{checkboxInputTag(gameSession.isPrivate)}</td>
            </tr>
            <tr>
              <th>Requires approval</th>
              <td>{checkboxInputTag(gameSession.requiresApproval)}</td>
            </tr>
            <tr>
              <th>Image url</th>
              <td>{gameSession.imageUrl}</td>
            </tr>
            <tr>
              <th>Tags</th>
              <td>{gameSession.tags}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(gameSession.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(gameSession.updatedAt)}</td>
            </tr>
            <tr>
              <th>Organizer id</th>
              <td>{gameSession.organizerId}</td>
            </tr>
            <tr>
              <th>Venue id</th>
              <td>{gameSession.venueId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditGameSession({ id: gameSession.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(gameSession.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default GameSession
