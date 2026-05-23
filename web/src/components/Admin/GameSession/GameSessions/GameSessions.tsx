import type {
  DeleteGameSessionMutation,
  DeleteGameSessionMutationVariables,
  FindGameSessions,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/GameSession/GameSessionsCell'
import {
  checkboxInputTag,
  formatEnum,
  timeTag,
  truncate,
} from 'src/lib/formatters'

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

const GameSessionsList = ({ gameSessions }: FindGameSessions) => {
  const [deleteGameSession] = useMutation(DELETE_GAME_SESSION_MUTATION, {
    onCompleted: () => {
      toast.success('GameSession deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteGameSessionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete gameSession ' + id + '?')) {
      deleteGameSession({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Game system</th>
            <th>Date</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Max players</th>
            <th>Min players</th>
            <th>Status</th>
            <th>Experience level</th>
            <th>Is private</th>
            <th>Requires approval</th>
            <th>Image url</th>
            <th>Tags</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Organizer id</th>
            <th>Venue id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {gameSessions.map((gameSession) => (
            <tr key={gameSession.id}>
              <td>{truncate(gameSession.id)}</td>
              <td>{truncate(gameSession.title)}</td>
              <td>{truncate(gameSession.description)}</td>
              <td>{formatEnum(gameSession.category)}</td>
              <td>{truncate(gameSession.gameSystem)}</td>
              <td>{timeTag(gameSession.date)}</td>
              <td>{truncate(gameSession.startTime)}</td>
              <td>{truncate(gameSession.endTime)}</td>
              <td>{truncate(gameSession.maxPlayers)}</td>
              <td>{truncate(gameSession.minPlayers)}</td>
              <td>{formatEnum(gameSession.status)}</td>
              <td>{formatEnum(gameSession.experienceLevel)}</td>
              <td>{checkboxInputTag(gameSession.isPrivate)}</td>
              <td>{checkboxInputTag(gameSession.requiresApproval)}</td>
              <td>{truncate(gameSession.imageUrl)}</td>
              <td>{truncate(gameSession.tags)}</td>
              <td>{timeTag(gameSession.createdAt)}</td>
              <td>{timeTag(gameSession.updatedAt)}</td>
              <td>{truncate(gameSession.organizerId)}</td>
              <td>{truncate(gameSession.venueId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminGameSession({ id: gameSession.id })}
                    title={'Show gameSession ' + gameSession.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditGameSession({ id: gameSession.id })}
                    title={'Edit gameSession ' + gameSession.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete gameSession ' + gameSession.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(gameSession.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GameSessionsList
