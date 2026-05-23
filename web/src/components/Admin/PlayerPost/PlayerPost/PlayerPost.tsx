import type {
  DeletePlayerPostMutation,
  DeletePlayerPostMutationVariables,
  FindPlayerPostById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, formatEnum, timeTag } from 'src/lib/formatters'

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

interface Props {
  playerPost: NonNullable<FindPlayerPostById['playerPost']>
}

const PlayerPost = ({ playerPost }: Props) => {
  const [deletePlayerPost] = useMutation(DELETE_PLAYER_POST_MUTATION, {
    onCompleted: () => {
      toast.success('PlayerPost deleted')
      navigate(routes.adminPlayerPosts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePlayerPostMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete playerPost ' + id + '?')) {
      deletePlayerPost({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PlayerPost {playerPost.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{playerPost.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{playerPost.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{playerPost.description}</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{formatEnum(playerPost.category)}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{playerPost.city}</td>
            </tr>
            <tr>
              <th>District</th>
              <td>{playerPost.district}</td>
            </tr>
            <tr>
              <th>Is online</th>
              <td>{checkboxInputTag(playerPost.isOnline)}</td>
            </tr>
            <tr>
              <th>Experience level</th>
              <td>{formatEnum(playerPost.experienceLevel)}</td>
            </tr>
            <tr>
              <th>Needed players</th>
              <td>{playerPost.neededPlayers}</td>
            </tr>
            <tr>
              <th>Current players</th>
              <td>{playerPost.currentPlayers}</td>
            </tr>
            <tr>
              <th>Tags</th>
              <td>{playerPost.tags}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{formatEnum(playerPost.status)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(playerPost.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(playerPost.updatedAt)}</td>
            </tr>
            <tr>
              <th>Author id</th>
              <td>{playerPost.authorId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditPlayerPost({ id: playerPost.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(playerPost.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default PlayerPost
