import type {
  DeleteVenueMutation,
  DeleteVenueMutationVariables,
  FindVenueById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_VENUE_MUTATION: TypedDocumentNode<
  DeleteVenueMutation,
  DeleteVenueMutationVariables
> = gql`
  mutation DeleteVenueMutation($id: Int!) {
    deleteVenue(id: $id) {
      id
    }
  }
`

interface Props {
  venue: NonNullable<FindVenueById['venue']>
}

const Venue = ({ venue }: Props) => {
  const [deleteVenue] = useMutation(DELETE_VENUE_MUTATION, {
    onCompleted: () => {
      toast.success('Venue deleted')
      navigate(routes.adminVenues())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteVenueMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete venue ' + id + '?')) {
      deleteVenue({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Venue {venue.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{venue.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{venue.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{venue.description}</td>
            </tr>
            <tr>
              <th>Detailed description</th>
              <td>{venue.detailedDescription}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{venue.address?.trim() || '—'}</td>
            </tr>
            <tr>
              <th>District</th>
              <td>{venue.district}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{venue.city}</td>
            </tr>
            <tr>
              <th>Website url</th>
              <td>{venue.websiteUrl}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{venue.phone}</td>
            </tr>
            <tr>
              <th>Image url</th>
              <td>{venue.imageUrl}</td>
            </tr>
            <tr>
              <th>Rating</th>
              <td>{venue.rating}</td>
            </tr>
            <tr>
              <th>Latitude</th>
              <td>{venue.latitude}</td>
            </tr>
            <tr>
              <th>Longitude</th>
              <td>{venue.longitude}</td>
            </tr>
            <tr>
              <th>Amenities</th>
              <td>{venue.amenities}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(venue.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(venue.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditVenue({ id: venue.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(venue.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Venue
