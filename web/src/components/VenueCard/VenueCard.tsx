import { MapPin, Star } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import Badge from 'src/components/Badge/Badge'
import Card from 'src/components/Card/Card'

type VenueCardProps = {
  venue?: {
    id: number
    name: string
    description?: string | null
    address?: string | null
    district?: string | null
    rating?: number | null
    imageUrl?: string | null
    amenities?: string[] | null
  }
}

const VenueCard = ({ venue }: VenueCardProps) => {
  if (!venue) {
    return (
      <Card className="p-5">
        <p className="text-sm text-slate-400">Площадка пока не выбрана</p>
      </Card>
    )
  }

  const venuePath =
    typeof routes.venue === 'function'
      ? routes.venue({ id: venue.id })
      : `/venues/${venue.id}`
  const location = venue.district ?? venue.address

  return (
    <Link to={venuePath}>
      <Card interactive className="min-h-[215px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-300 hover:scale-105"
          style={{
            backgroundImage:
              venue.imageUrl ||
              'linear-gradient(135deg, rgba(15,23,42,.85), rgba(14,165,233,.35)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.2), transparent 30%)',
          }}
        />
        <div className="from-black/86 via-black/32 absolute inset-0 bg-gradient-to-t to-black/10" />
        <div className="relative flex min-h-[215px] flex-col justify-end p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-lg font-medium leading-tight text-white">
                {venue.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm font-medium text-slate-300">
                {venue.description}
              </p>
            </div>
            <span className="bg-amber-400/12 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-black text-amber-200">
              <Star className="h-3.5 w-3.5 fill-amber-300" />
              {venue.rating?.toFixed(1) ?? '0.0'}
            </span>
          </div>
          {location && (
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
              <MapPin className="h-4 w-4 text-sky-300" />
              {location}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {(venue.amenities ?? []).slice(0, 3).map((amenity) => (
              <Badge key={amenity} tone="slate">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default VenueCard
