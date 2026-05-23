import type {
  DeletePlayerPostMutation,
  DeletePlayerPostMutationVariables,
  FindPlayerPosts,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/PlayerPost/PlayerPostsCell'
import {
  checkboxInputTag,
  formatEnum,
  timeTag,
  truncate,
} from 'src/lib/formatters'

const DELETE_PLAYER_POST_MUTATION: TypedDocumentNode<
  DeletePlayerPostMutation,
  DeletePlayerPostMutationVariables
> = gql`
  mutation DeletePlayerPostMutation($id: Int!) {
    deletePlayerPost(id: $id) {
      id
    }
  }
`

const PlayerPostsList = ({ playerPosts }: FindPlayerPosts) => {
  const [deletePlayerPost] = useMutation(DELETE_PLAYER_POST_MUTATION, {
    onCompleted: () => {
      toast.success('PlayerPost deleted')
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

  const onDeleteClick = (id: DeletePlayerPostMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete playerPost ' + id + '?')) {
      deletePlayerPost({ variables: { id } })
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
            <th>City</th>
            <th>District</th>
            <th>Is online</th>
            <th>Experience level</th>
            <th>Needed players</th>
            <th>Current players</th>
            <th>Tags</th>
            <th>Status</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Author id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {playerPosts.map((playerPost) => (
            <tr key={playerPost.id}>
              <td>{truncate(playerPost.id)}</td>
              <td>{truncate(playerPost.title)}</td>
              <td>{truncate(playerPost.description)}</td>
              <td>{formatEnum(playerPost.category)}</td>
              <td>{truncate(playerPost.city)}</td>
              <td>{truncate(playerPost.district)}</td>
              <td>{checkboxInputTag(playerPost.isOnline)}</td>
              <td>{formatEnum(playerPost.experienceLevel)}</td>
              <td>{truncate(playerPost.neededPlayers)}</td>
              <td>{truncate(playerPost.currentPlayers)}</td>
              <td>{truncate(playerPost.tags)}</td>
              <td>{formatEnum(playerPost.status)}</td>
              <td>{timeTag(playerPost.createdAt)}</td>
              <td>{timeTag(playerPost.updatedAt)}</td>
              <td>{truncate(playerPost.authorId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminPlayerPost({ id: playerPost.id })}
                    title={'Show playerPost ' + playerPost.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditPlayerPost({ id: playerPost.id })}
                    title={'Edit playerPost ' + playerPost.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete playerPost ' + playerPost.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(playerPost.id)}
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

export default PlayerPostsList
