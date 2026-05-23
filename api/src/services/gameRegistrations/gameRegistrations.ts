import type {
  QueryResolvers,
  MutationResolvers,
  GameRegistrationRelationResolvers,
} from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

const isAdmin = () =>
  context.currentUser?.roles?.includes('admin') ||
  context.currentUser?.role === 'ADMIN'

export const gameRegistrations: QueryResolvers['gameRegistrations'] = () => {
  requireAuth({ roles: 'admin' })

  return db.gameRegistration.findMany({
    include: { gameSession: true, user: true },
    orderBy: { createdAt: 'desc' },
  })
}

export const gameRegistration: QueryResolvers['gameRegistration'] = async ({
  id,
}) => {
  requireAuth()

  const registration = await db.gameRegistration.findUnique({
    where: { id },
    include: { gameSession: true, user: true },
  })

  if (
    registration &&
    !isAdmin() &&
    registration.userId !== context.currentUser.id &&
    registration.gameSession.organizerId !== context.currentUser.id
  ) {
    throw new ForbiddenError('Эта запись недоступна')
  }

  return registration
}

export const myRegistrations: QueryResolvers['myRegistrations'] = () => {
  requireAuth()

  return db.gameRegistration.findMany({
    where: { userId: context.currentUser.id, status: { not: 'CANCELLED' } },
    include: {
      gameSession: {
        include: {
          venue: true,
          organizer: true,
          registrations: true,
          favorites: true,
        },
      },
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

export const createGameRegistration: MutationResolvers['createGameRegistration'] =
  ({ input }) => {
    requireAuth({ roles: 'admin' })

    return db.gameRegistration.create({
      data: {
        ...input,
        status: input.status ?? 'APPROVED',
      },
    })
  }

export const updateGameRegistration: MutationResolvers['updateGameRegistration'] =
  ({ id, input }) => {
    requireAuth({ roles: 'admin' })

    return db.gameRegistration.update({
      data: input,
      where: { id },
    })
  }

export const deleteGameRegistration: MutationResolvers['deleteGameRegistration'] =
  ({ id }) => {
    requireAuth({ roles: 'admin' })

    return db.gameRegistration.delete({
      where: { id },
    })
  }

export const GameRegistration: GameRegistrationRelationResolvers = {
  user: (_obj, { root }) => {
    return db.gameRegistration.findUnique({ where: { id: root?.id } }).user()
  },
  gameSession: (_obj, { root }) => {
    return db.gameRegistration
      .findUnique({ where: { id: root?.id } })
      .gameSession()
  },
}
