import type { FindUserById, FindUserByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import User from 'src/components/Admin/User/User'

export const QUERY: TypedDocumentNode<FindUserById, FindUserByIdVariables> =
  gql`
    query FindUserById($id: Int!) {
      user: user(id: $id) {
        id
        email
        name
        avatarUrl
        city
        district
        bio
        favoriteDirections
        favoriteGamesText
        experienceLevel
        role
        createdAt
        updatedAt
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }: CellFailureProps<FindUserByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindUserById, FindUserByIdVariables>) => {
  return <User user={user} />
}
