import type { FindVenues, FindVenuesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Venues from 'src/components/Admin/Venue/Venues'

export const QUERY: TypedDocumentNode<FindVenues, FindVenuesVariables> = gql`
  query FindVenues {
    venues {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No venues yet.{' '}
      <Link to={routes.adminNewVenue()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindVenues>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  venues,
}: CellSuccessProps<FindVenues, FindVenuesVariables>) => {
  return <Venues venues={venues} />
}
