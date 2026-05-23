import type {
  CreateVenueMutation,
  CreateVenueInput,
  CreateVenueMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import VenueForm from 'src/components/Admin/Venue/VenueForm'

const CREATE_VENUE_MUTATION: TypedDocumentNode<
  CreateVenueMutation,
  CreateVenueMutationVariables
> = gql`
  mutation CreateVenueMutation($input: CreateVenueInput!) {
    createVenue(input: $input) {
      id
    }
  }
`

const NewVenue = () => {
  const [createVenue, { loading, error }] = useMutation(CREATE_VENUE_MUTATION, {
    onCompleted: () => {
      toast.success('Venue created')
      navigate(routes.adminVenues())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateVenueInput) => {
    createVenue({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Venue</h2>
      </header>
      <div className="rw-segment-main">
        <VenueForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewVenue
