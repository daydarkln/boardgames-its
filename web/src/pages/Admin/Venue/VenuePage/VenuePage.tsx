import VenueCell from 'src/components/Admin/Venue/VenueCell'

type VenuePageProps = {
  id: number
}

const VenuePage = ({ id }: VenuePageProps) => {
  return <VenueCell id={id} />
}

export default VenuePage
