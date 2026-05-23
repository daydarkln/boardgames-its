import EditVenueCell from 'src/components/Admin/Venue/EditVenueCell'

type VenuePageProps = {
  id: number
}

const EditVenuePage = ({ id }: VenuePageProps) => {
  return <EditVenueCell id={id} />
}

export default EditVenuePage
