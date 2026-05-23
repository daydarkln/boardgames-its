import type { FindPlayerPosts, FindPlayerPostsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import PlayerPosts from 'src/components/Admin/PlayerPost/PlayerPosts'

export const QUERY: TypedDocumentNode<
  FindPlayerPosts,
  FindPlayerPostsVariables
> = gql`
  query FindPlayerPosts {
    playerPosts {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No playerPosts yet.{' '}
      <Link to={routes.adminNewPlayerPost()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindPlayerPosts>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  playerPosts,
}: CellSuccessProps<FindPlayerPosts, FindPlayerPostsVariables>) => {
  return <PlayerPosts playerPosts={playerPosts} />
}
