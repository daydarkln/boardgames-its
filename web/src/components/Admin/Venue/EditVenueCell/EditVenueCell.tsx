import type {
  EditVenueById,
  UpdateVenueInput,
  UpdateVenueMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import VenueForm from 'src/components/Admin/Venue/VenueForm'

export const QUERY: TypedDocumentNode<EditVenueById> = gql`
  query EditVenueById($id: Int!) {
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

const UPDATE_VENUE_MUTATION: TypedDocumentNode<
  EditVenueById,
  UpdateVenueMutationVariables
> = gql`
  mutation UpdateVenueMutation($id: Int!, $input: UpdateVenueInput!) {
    updateVenue(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ venue }: CellSuccessProps<EditVenueById>) => {
  const [updateVenue, { loading, error }] = useMutation(UPDATE_VENUE_MUTATION, {
    onCompleted: () => {
      toast.success('Venue updated')
      navigate(routes.adminVenues())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateVenueInput,
    id: EditVenueById['venue']['id']
  ) => {
    updateVenue({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Venue {venue?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <VenueForm
          venue={venue}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
