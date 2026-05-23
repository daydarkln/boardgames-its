import type {
  FindPlayerPostById,
  FindPlayerPostByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import PlayerPost from 'src/components/Admin/PlayerPost/PlayerPost'

export const QUERY: TypedDocumentNode<
  FindPlayerPostById,
  FindPlayerPostByIdVariables
> = gql`
  query FindPlayerPostById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PlayerPost not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindPlayerPostByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  playerPost,
}: CellSuccessProps<FindPlayerPostById, FindPlayerPostByIdVariables>) => {
  return <PlayerPost playerPost={playerPost} />
}
