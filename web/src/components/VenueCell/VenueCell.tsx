import { MapPin, Star } from 'lucide-react'
import type { VenueQuery, VenueQueryVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Badge from 'src/components/Badge/Badge'
import EmptyState from 'src/components/EmptyState/EmptyState'
import VenueGameSessionsCell from 'src/components/VenueGameSessionsCell'

export const QUERY: TypedDocumentNode<VenueQuery, VenueQueryVariables> = gql`
  query VenueQuery($id: Int!) {
    venue(id: $id) {
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
      amenities
    }
  }
`

export const Loading = () => (
  <div className="bg-white/8 h-96 animate-pulse rounded-lg" />
)

export const Empty = () => <EmptyState title="Площадка не найдена" />

export const Failure = ({ error }: CellFailureProps<VenueQueryVariables>) => (
  <EmptyState
    title="Не удалось загрузить площадку"
    description={error?.message}
  />
)

export const Success = ({
  venue,
}: CellSuccessProps<VenueQuery, VenueQueryVariables>) => {
  if (!venue) return <Empty />

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <article className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/70">
        <div
          className="h-72 bg-cover bg-center"
          style={{
            backgroundImage:
              venue.imageUrl ||
              'linear-gradient(135deg, rgba(15,23,42,.88), rgba(14,165,233,.35)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.2), transparent 30%)',
          }}
        />
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="blue">{venue.district ?? venue.city}</Badge>
            <Badge tone="orange">
              <Star className="mr-1 h-3.5 w-3.5 fill-orange-300" />
              {venue.rating.toFixed(1)}
            </Badge>
          </div>
          <h1 className="mt-5 text-4xl font-black text-white">{venue.name}</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            {venue.detailedDescription ?? venue.description}
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-slate-300">
            <MapPin className="h-4 w-4 text-sky-300" />
            {venue.address}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {venue.amenities.map((amenity) => (
              <Badge key={amenity} tone="slate">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      </article>
      <aside>
        <h2 className="mb-4 text-xl font-black text-white">Ближайшие игры</h2>
        <VenueGameSessionsCell venueId={venue.id} />
      </aside>
    </div>
  )
}
