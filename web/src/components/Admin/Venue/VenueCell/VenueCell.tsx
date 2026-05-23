import type { FindVenueById, FindVenueByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Venue from 'src/components/Admin/Venue/Venue'

export const QUERY: TypedDocumentNode<FindVenueById, FindVenueByIdVariables> =
  gql`
    query FindVenueById($id: Int!) {
      venue: venue(id: $id) {
        id
        name
        description
        detailedDescription
        address
        district
        city
        websiteUrl
        phone
        imageUrl
        rating
        latitude
        longitude
        amenities
        createdAt
        updatedAt
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Venue not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindVenueByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  venue,
}: CellSuccessProps<FindVenueById, FindVenueByIdVariables>) => {
  return <Venue venue={venue} />
}
