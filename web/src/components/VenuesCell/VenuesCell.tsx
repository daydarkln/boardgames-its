import type { VenuesQuery, VenuesQueryVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import EmptyState from 'src/components/EmptyState/EmptyState'
import Skeleton from 'src/components/Skeleton/Skeleton'
import VenueCard from 'src/components/VenueCard/VenueCard'

export const QUERY: TypedDocumentNode<VenuesQuery, VenuesQueryVariables> = gql`
  query VenuesQuery($input: VenueFilterInput) {
    venues(input: $input) {
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
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <Skeleton key={item} className="glass-panel h-64" />
    ))}
  </div>
)

export const Empty = () => <EmptyState title="Площадки не найдены" />

export const Failure = ({ error }: CellFailureProps<VenuesQueryVariables>) => (
  <EmptyState
    title="Не удалось загрузить площадки"
    description={error?.message}
  />
)

export const Success = ({
  venues,
}: CellSuccessProps<VenuesQuery, VenuesQueryVariables>) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  )
}
