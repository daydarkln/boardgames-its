import { Metadata } from '@redwoodjs/web'

import VenueCell from 'src/components/VenueCell'

type VenuePageProps = {
  id: number
}

const VenuePage = ({ id }: VenuePageProps) => {
  return (
    <>
      <Metadata title="Площадка" description="Карточка площадки" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <VenueCell id={id} />
      </div>
    </>
  )
}

export default VenuePage
