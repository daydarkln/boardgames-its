import type {
  CreatePlayerPostMutation,
  CreatePlayerPostInput,
  CreatePlayerPostMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PlayerPostForm from 'src/components/Admin/PlayerPost/PlayerPostForm'

const CREATE_PLAYER_POST_MUTATION: TypedDocumentNode<
  CreatePlayerPostMutation,
  CreatePlayerPostMutationVariables
> = gql`
  mutation CreatePlayerPostMutation($input: CreatePlayerPostInput!) {
    createPlayerPost(input: $input) {
      id
    }
  }
`

const NewPlayerPost = () => {
  const [createPlayerPost, { loading, error }] = useMutation(
    CREATE_PLAYER_POST_MUTATION,
    {
      onCompleted: () => {
        toast.success('PlayerPost created')
        navigate(routes.adminPlayerPosts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePlayerPostInput) => {
    createPlayerPost({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New PlayerPost</h2>
      </header>
      <div className="rw-segment-main">
        <PlayerPostForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPlayerPost
