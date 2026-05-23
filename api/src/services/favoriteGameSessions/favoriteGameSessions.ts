import type {
  QueryResolvers,
  MutationResolvers,
  FavoriteGameSessionRelationResolvers,
} from 'types/graphql'

import { ForbiddenError, ValidationError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

const isAdmin = () =>
  context.currentUser?.roles?.includes('admin') ||
  context.currentUser?.role === 'ADMIN'

export const favoriteGameSessions: QueryResolvers['favoriteGameSessions'] =
  () => {
    requireAuth()

    return db.favoriteGameSession.findMany({
      where: isAdmin() ? {} : { userId: context.currentUser.id },
      include: { gameSession: true, user: true },
      orderBy: { createdAt: 'desc' },
    })
  }

export const favoriteGameSession: QueryResolvers['favoriteGameSession'] = ({
  id,
}) => {
  requireAuth()

  return db.favoriteGameSession.findFirst({
    where: isAdmin() ? { id } : { id, userId: context.currentUser.id },
  })
}

export const createFavoriteGameSession: MutationResolvers['createFavoriteGameSession'] =
  ({ input }) => {
    requireAuth()

    return db.favoriteGameSession.upsert({
      where: {
        userId_gameSessionId: {
          userId:
            input.userId && isAdmin() ? input.userId : context.currentUser.id,
          gameSessionId: input.gameSessionId,
        },
      },
      update: {},
      create: {
        userId:
          input.userId && isAdmin() ? input.userId : context.currentUser.id,
        gameSessionId: input.gameSessionId,
      },
    })
  }

export const updateFavoriteGameSession: MutationResolvers['updateFavoriteGameSession'] =
  ({ id, input }) => {
    requireAuth({ roles: 'admin' })

    return db.favoriteGameSession.update({
      data: input,
      where: { id },
    })
  }

export const deleteFavoriteGameSession: MutationResolvers['deleteFavoriteGameSession'] =
  async ({ id }) => {
    requireAuth()

    const favorite = await db.favoriteGameSession.findUnique({ where: { id } })

    if (!favorite) {
      throw new ValidationError('Избранная игра не найдена')
    }

    if (!isAdmin() && favorite.userId !== context.currentUser.id) {
      throw new ForbiddenError('Можно удалять только свое избранное')
    }

    return db.favoriteGameSession.delete({
      where: { id },
    })
  }

export const FavoriteGameSession: FavoriteGameSessionRelationResolvers = {
  user: (_obj, { root }) => {
    return db.favoriteGameSession.findUnique({ where: { id: root?.id } }).user()
  },
  gameSession: (_obj, { root }) => {
    return db.favoriteGameSession
      .findUnique({ where: { id: root?.id } })
      .gameSession()
  },
}
