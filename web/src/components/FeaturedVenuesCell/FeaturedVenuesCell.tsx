import type {
  FeaturedVenuesQuery,
  FeaturedVenuesQueryVariables,
} from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import EmptyState from 'src/components/EmptyState/EmptyState'
import VenueCard from 'src/components/VenueCard/VenueCard'

export const QUERY: TypedDocumentNode<
  FeaturedVenuesQuery,
  FeaturedVenuesQueryVariables
> = gql`
  query FeaturedVenuesQuery {
    venues {
      id
      name
      description
      address
      district
      rating
      imageUrl
      amenities
    }
  }
`

export const Loading = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {[1, 2, 3, 4].map((item) => (
      <div key={item} className="bg-white/8 h-64 animate-pulse rounded-lg" />
    ))}
  </div>
)

export const Empty = () => <EmptyState title="Площадки пока не добавлены" />

export const Failure = ({
  error,
}: CellFailureProps<FeaturedVenuesQueryVariables>) => (
  <EmptyState
    title="Не удалось загрузить площадки"
    description={error?.message}
  />
)

export const Success = ({
  venues,
}: CellSuccessProps<FeaturedVenuesQuery, FeaturedVenuesQueryVariables>) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {venues.slice(0, 4).map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  )
}
