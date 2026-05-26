import type {
  LatestPlayerPostsQuery,
  LatestPlayerPostsQueryVariables,
} from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import EmptyState from 'src/components/EmptyState/EmptyState'
import PlayerPostCard from 'src/components/PlayerPostCard/PlayerPostCard'

export const QUERY: TypedDocumentNode<
  LatestPlayerPostsQuery,
  LatestPlayerPostsQueryVariables
> = gql`
  query LatestPlayerPostsQuery {
    playerPosts {
      id
      title
      description
      category
      district
      isOnline
      experienceLevel
      neededPlayers
      currentPlayers
      tags
      author {
        name
      }
    }
  }
`

export const Loading = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="glass-panel h-56 animate-pulse rounded-lg"
      />
    ))}
  </div>
)

export const Empty = () => <EmptyState title="Объявлений пока нет" />

export const Failure = ({
  error,
}: CellFailureProps<LatestPlayerPostsQueryVariables>) => (
  <EmptyState
    title="Не удалось загрузить объявления"
    description={error?.message}
  />
)

export const Success = ({
  playerPosts,
}: CellSuccessProps<
  LatestPlayerPostsQuery,
  LatestPlayerPostsQueryVariables
>) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {playerPosts.slice(0, 4).map((post) => (
        <PlayerPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
