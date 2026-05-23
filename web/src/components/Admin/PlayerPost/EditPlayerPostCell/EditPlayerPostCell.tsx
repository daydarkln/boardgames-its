import type {
  EditPlayerPostById,
  UpdatePlayerPostInput,
  UpdatePlayerPostMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PlayerPostForm from 'src/components/Admin/PlayerPost/PlayerPostForm'

export const QUERY: TypedDocumentNode<EditPlayerPostById> = gql`
  query EditPlayerPostById($id: Int!) {
    playerPost: playerPost(id: $id) {
      id
      title
      description
      category
      city
      district
      isOnline
      experienceLevel
      neededPlayers
      currentPlayers
      tags
      status
      createdAt
      updatedAt
      authorId
    }
  }
`

const UPDATE_PLAYER_POST_MUTATION: TypedDocumentNode<
  EditPlayerPostById,
  UpdatePlayerPostMutationVariables
> = gql`
  mutation UpdatePlayerPostMutation($id: Int!, $input: UpdatePlayerPostInput!) {
    updatePlayerPost(id: $id, input: $input) {
      id
      title
      description
      category
      city
      district
      isOnline
      experienceLevel
      neededPlayers
      currentPlayers
      tags
      status
      createdAt
      updatedAt
      authorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  playerPost,
}: CellSuccessProps<EditPlayerPostById>) => {
  const [updatePlayerPost, { loading, error }] = useMutation(
    UPDATE_PLAYER_POST_MUTATION,
    {
      onCompleted: () => {
        toast.success('PlayerPost updated')
        navigate(routes.adminPlayerPosts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePlayerPostInput,
    id: EditPlayerPostById['playerPost']['id']
  ) => {
    updatePlayerPost({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PlayerPost {playerPost?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PlayerPostForm
          playerPost={playerPost}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
