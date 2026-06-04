import type {
  QueryResolvers,
  MutationResolvers,
  VenueRelationResolvers,
} from 'types/graphql'

import { ValidationError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

const validateVenue = (input: { name?: string | null }) => {
  if ('name' in input && !input.name?.trim()) {
    throw new ValidationError('Название площадки обязательно')
  }
}

const normalizeOptionalString = (value: string | null | undefined) => {
  if (value === undefined) {
    return undefined
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

export const venues: QueryResolvers['venues'] = ({ input }) => {
  return db.venue.findMany({
    where: {
      ...(input?.city
        ? { city: { contains: input.city, mode: 'insensitive' as const } }
        : {}),
      ...(input?.district
        ? {
            district: {
              contains: input.district,
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(input?.amenity ? { amenities: { has: input.amenity } } : {}),
    },
    include: { gameSessions: true },
    orderBy: [{ rating: 'desc' }, { name: 'asc' }],
  })
}

export const venue: QueryResolvers['venue'] = ({ id }) => {
  return db.venue.findUnique({
    where: { id },
    include: { gameSessions: true },
  })
}

export const createVenue: MutationResolvers['createVenue'] = ({ input }) => {
  requireAuth({ roles: 'admin' })
  validateVenue(input)

  return db.venue.create({
    data: {
      ...input,
      address: normalizeOptionalString(input.address),
      amenities: input.amenities ?? [],
    },
  })
}

export const updateVenue: MutationResolvers['updateVenue'] = ({
  id,
  input,
}) => {
  requireAuth({ roles: 'admin' })
  validateVenue(input)

  return db.venue.update({
    data: {
      ...input,
      address: normalizeOptionalString(input.address),
    },
    where: { id },
  })
}

export const deleteVenue: MutationResolvers['deleteVenue'] = ({ id }) => {
  requireAuth({ roles: 'admin' })

  return db.venue.delete({
    where: { id },
  })
}

export const Venue: VenueRelationResolvers = {
  gameSessions: (_obj, { root }) => {
    return db.venue.findUnique({ where: { id: root?.id } }).gameSessions()
  },
}
