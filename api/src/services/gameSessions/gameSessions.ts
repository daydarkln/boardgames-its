import type {
  QueryResolvers,
  MutationResolvers,
  GameSessionRelationResolvers,
} from 'types/graphql'

import { ForbiddenError, ValidationError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

const isAdmin = () =>
  context.currentUser?.roles?.includes('admin') ||
  context.currentUser?.role === 'ADMIN'

const approvedCount = (
  registrations: Array<{ status?: string | null }> | null | undefined
) =>
  registrations?.filter((registration) => registration.status === 'APPROVED')
    .length ?? 0

const assertCanManageGame = async (id: number) => {
  requireAuth()

  const game = await db.gameSession.findUnique({ where: { id } })

  if (!game) {
    throw new ValidationError('Игра не найдена')
  }

  if (!isAdmin() && game.organizerId !== context.currentUser.id) {
    throw new ForbiddenError('Можно управлять только своими играми')
  }

  return game
}

const validateGameInput = (input: {
  title?: string | null
  description?: string | null
  date?: Date | string | null
  startTime?: string | null
  maxPlayers?: number | null
  minPlayers?: number | null
}) => {
  if ('title' in input && !input.title?.trim()) {
    throw new ValidationError('Название игры обязательно')
  }

  if ('description' in input && !input.description?.trim()) {
    throw new ValidationError('Описание игры обязательно')
  }

  if ('date' in input && !input.date) {
    throw new ValidationError('Дата обязательна')
  }

  if ('startTime' in input && !input.startTime?.trim()) {
    throw new ValidationError('Время начала обязательно')
  }

  if ('maxPlayers' in input && Number(input.maxPlayers) <= 0) {
    throw new ValidationError('Количество мест должно быть больше нуля')
  }

  if (
    input.minPlayers &&
    input.maxPlayers &&
    Number(input.minPlayers) > Number(input.maxPlayers)
  ) {
    throw new ValidationError('Минимум игроков не может быть больше максимума')
  }
}

export const gameSessions: QueryResolvers['gameSessions'] = async ({
  input,
}) => {
  const where = {
    ...(isAdmin()
      ? {}
      : {
          status: { not: 'HIDDEN' as const },
          isPrivate: false,
        }),
    ...(input?.category ? { category: input.category } : {}),
    ...(input?.experienceLevel
      ? { experienceLevel: input.experienceLevel }
      : {}),
    ...(input?.venueId ? { venueId: input.venueId } : {}),
    ...(input?.district
      ? {
          venue: {
            district: {
              contains: input.district,
              mode: 'insensitive' as const,
            },
          },
        }
      : {}),
    ...(input?.dateFrom || input?.dateTo
      ? {
          date: {
            ...(input.dateFrom ? { gte: input.dateFrom } : {}),
            ...(input.dateTo ? { lte: input.dateTo } : {}),
          },
        }
      : {}),
  }

  const sessions = await db.gameSession.findMany({
    where,
    include: {
      organizer: true,
      venue: true,
      registrations: true,
      favorites: true,
    },
    orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
  })

  if (input?.hasSeats) {
    return sessions.filter(
      (session) => approvedCount(session.registrations) < session.maxPlayers
    )
  }

  return sessions
}

export const gameSession: QueryResolvers['gameSession'] = async ({ id }) => {
  const session = await db.gameSession.findUnique({
    where: { id },
    include: {
      organizer: true,
      venue: true,
      registrations: true,
      favorites: true,
    },
  })

  if (!session) {
    return null
  }

  if (
    !isAdmin() &&
    session.status === 'HIDDEN' &&
    session.organizerId !== context.currentUser?.id
  ) {
    return null
  }

  return session
}

export const myGameSessions: QueryResolvers['myGameSessions'] = () => {
  requireAuth()

  return db.gameSession.findMany({
    where: { organizerId: context.currentUser.id },
    include: {
      venue: true,
      registrations: true,
      favorites: true,
      organizer: true,
    },
    orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
  })
}

export const createGameSession: MutationResolvers['createGameSession'] = ({
  input,
}) => {
  requireAuth()
  validateGameInput(input)

  const organizerId =
    input.organizerId && isAdmin() ? input.organizerId : context.currentUser.id

  return db.gameSession.create({
    data: {
      ...input,
      organizerId,
      tags: input.tags ?? [],
      status: input.status ?? 'OPEN',
      experienceLevel: input.experienceLevel ?? 'ANY',
      minPlayers: input.minPlayers ?? 1,
    },
  })
}

export const updateGameSession: MutationResolvers['updateGameSession'] =
  async ({ id, input }) => {
    await assertCanManageGame(id)
    validateGameInput(input)

    const data = {
      ...input,
      ...(!isAdmin() ? { organizerId: undefined } : {}),
    }

    return db.gameSession.update({
      data,
      where: { id },
    })
  }

export const cancelGameSession: MutationResolvers['cancelGameSession'] =
  async ({ id }) => {
    await assertCanManageGame(id)

    return db.gameSession.update({
      data: { status: 'CANCELLED' },
      where: { id },
    })
  }

export const registerForGameSession: MutationResolvers['registerForGameSession'] =
  async ({ id }) => {
    requireAuth()

    const session = await db.gameSession.findUnique({
      where: { id },
      include: { registrations: true },
    })

    if (!session) {
      throw new ValidationError('Игра не найдена')
    }

    if (session.status === 'CANCELLED' || session.status === 'HIDDEN') {
      throw new ValidationError('На эту игру нельзя записаться')
    }

    const existing = await db.gameRegistration.findUnique({
      where: {
        userId_gameSessionId: {
          userId: context.currentUser.id,
          gameSessionId: id,
        },
      },
    })

    if (existing && existing.status !== 'CANCELLED') {
      throw new ValidationError('Вы уже записаны на эту игру')
    }

    if (approvedCount(session.registrations) >= session.maxPlayers) {
      throw new ValidationError('Свободных мест нет')
    }

    const status = session.requiresApproval ? 'PENDING' : 'APPROVED'

    const registration = existing
      ? await db.gameRegistration.update({
          where: { id: existing.id },
          data: { status },
        })
      : await db.gameRegistration.create({
          data: {
            status,
            userId: context.currentUser.id,
            gameSessionId: id,
          },
        })

    const activeCount = approvedCount([...session.registrations, registration])
    if (activeCount >= session.maxPlayers) {
      await db.gameSession.update({
        where: { id },
        data: { status: 'FULL' },
      })
    }

    return registration
  }

export const cancelGameSessionRegistration: MutationResolvers['cancelGameSessionRegistration'] =
  async ({ id }) => {
    requireAuth()

    const registration = await db.gameRegistration.findUnique({
      where: {
        userId_gameSessionId: {
          userId: context.currentUser.id,
          gameSessionId: id,
        },
      },
    })

    if (!registration) {
      throw new ValidationError('Запись не найдена')
    }

    const updated = await db.gameRegistration.update({
      where: { id: registration.id },
      data: { status: 'CANCELLED' },
    })

    await db.gameSession.update({
      where: { id },
      data: { status: 'OPEN' },
    })

    return updated
  }

export const addFavoriteGameSession: MutationResolvers['addFavoriteGameSession'] =
  ({ id }) => {
    requireAuth()

    return db.favoriteGameSession.upsert({
      where: {
        userId_gameSessionId: {
          userId: context.currentUser.id,
          gameSessionId: id,
        },
      },
      update: {},
      create: {
        userId: context.currentUser.id,
        gameSessionId: id,
      },
    })
  }

export const removeFavoriteGameSession: MutationResolvers['removeFavoriteGameSession'] =
  async ({ id }) => {
    requireAuth()

    const favorite = await db.favoriteGameSession.findUnique({
      where: {
        userId_gameSessionId: {
          userId: context.currentUser.id,
          gameSessionId: id,
        },
      },
    })

    if (!favorite) {
      throw new ValidationError('Игра не была в избранном')
    }

    return db.favoriteGameSession.delete({ where: { id: favorite.id } })
  }

export const deleteGameSession: MutationResolvers['deleteGameSession'] = ({
  id,
}) => {
  requireAuth({ roles: 'admin' })

  return db.gameSession.delete({
    where: { id },
  })
}

export const GameSession: GameSessionRelationResolvers = {
  organizer: (_obj, { root }) => {
    return db.gameSession.findUnique({ where: { id: root?.id } }).organizer()
  },
  venue: (_obj, { root }) => {
    return db.gameSession.findUnique({ where: { id: root?.id } }).venue()
  },
  registrations: (_obj, { root }) => {
    return db.gameSession
      .findUnique({ where: { id: root?.id } })
      .registrations()
  },
  favorites: (_obj, { root }) => {
    return db.gameSession.findUnique({ where: { id: root?.id } }).favorites()
  },
}
