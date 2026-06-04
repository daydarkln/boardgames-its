import type {
  DeleteVenueMutation,
  DeleteVenueMutationVariables,
  FindVenues,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Venue/VenuesCell'
import { timeTag, truncate } from 'src/lib/formatters'

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

const VenuesList = ({ venues }: FindVenues) => {
  const [deleteVenue] = useMutation(DELETE_VENUE_MUTATION, {
    onCompleted: () => {
      toast.success('Venue deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteVenueMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete venue ' + id + '?')) {
      deleteVenue({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Detailed description</th>
            <th>Address</th>
            <th>District</th>
            <th>City</th>
            <th>Website url</th>
            <th>Phone</th>
            <th>Image url</th>
            <th>Rating</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Amenities</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td>{truncate(venue.id)}</td>
              <td>{truncate(venue.name)}</td>
              <td>{truncate(venue.description)}</td>
              <td>{truncate(venue.detailedDescription)}</td>
              <td>{truncate(venue.address?.trim() || '—')}</td>
              <td>{truncate(venue.district)}</td>
              <td>{truncate(venue.city)}</td>
              <td>{truncate(venue.websiteUrl)}</td>
              <td>{truncate(venue.phone)}</td>
              <td>{truncate(venue.imageUrl)}</td>
              <td>{truncate(venue.rating)}</td>
              <td>{truncate(venue.latitude)}</td>
              <td>{truncate(venue.longitude)}</td>
              <td>{truncate(venue.amenities)}</td>
              <td>{timeTag(venue.createdAt)}</td>
              <td>{timeTag(venue.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminVenue({ id: venue.id })}
                    title={'Show venue ' + venue.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditVenue({ id: venue.id })}
                    title={'Edit venue ' + venue.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete venue ' + venue.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(venue.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VenuesList
