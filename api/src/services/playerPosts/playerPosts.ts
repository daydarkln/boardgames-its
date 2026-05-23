import type {
  QueryResolvers,
  MutationResolvers,
  PlayerPostRelationResolvers,
} from 'types/graphql'

import { ForbiddenError, ValidationError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

const isAdmin = () =>
  context.currentUser?.roles?.includes('admin') ||
  context.currentUser?.role === 'ADMIN'

const validatePlayerPost = (input: {
  title?: string | null
  description?: string | null
  neededPlayers?: number | null
  currentPlayers?: number | null
}) => {
  if ('title' in input && !input.title?.trim()) {
    throw new ValidationError('Название объявления обязательно')
  }

  if ('description' in input && !input.description?.trim()) {
    throw new ValidationError('Описание объявления обязательно')
  }

  if ('neededPlayers' in input && Number(input.neededPlayers) <= 0) {
    throw new ValidationError(
      'Количество нужных игроков должно быть больше нуля'
    )
  }

  if (
    input.currentPlayers &&
    input.neededPlayers &&
    Number(input.currentPlayers) > Number(input.neededPlayers)
  ) {
    throw new ValidationError(
      'Текущих игроков не может быть больше нужного числа'
    )
  }
}

const assertCanManagePost = async (id: number) => {
  requireAuth()

  const post = await db.playerPost.findUnique({ where: { id } })

  if (!post) {
    throw new ValidationError('Объявление не найдено')
  }

  if (!isAdmin() && post.authorId !== context.currentUser.id) {
    throw new ForbiddenError('Можно редактировать только свое объявление')
  }

  return post
}

export const playerPosts: QueryResolvers['playerPosts'] = ({ input }) => {
  return db.playerPost.findMany({
    where: {
      ...(isAdmin() ? {} : { status: { not: 'HIDDEN' as const } }),
      ...(input?.category ? { category: input.category } : {}),
      ...(input?.district
        ? {
            district: {
              contains: input.district,
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(input?.isOnline !== undefined ? { isOnline: input.isOnline } : {}),
      ...(input?.experienceLevel
        ? { experienceLevel: input.experienceLevel }
        : {}),
    },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  })
}

export const playerPost: QueryResolvers['playerPost'] = ({ id }) => {
  return db.playerPost.findUnique({
    where: { id },
    include: { author: true },
  })
}

export const createPlayerPost: MutationResolvers['createPlayerPost'] = ({
  input,
}) => {
  requireAuth()
  validatePlayerPost(input)

  return db.playerPost.create({
    data: {
      ...input,
      authorId:
        input.authorId && isAdmin() ? input.authorId : context.currentUser.id,
      tags: input.tags ?? [],
      status: input.status ?? 'ACTIVE',
    },
  })
}

export const updatePlayerPost: MutationResolvers['updatePlayerPost'] = async ({
  id,
  input,
}) => {
  await assertCanManagePost(id)
  validatePlayerPost(input)

  return db.playerPost.update({
    data: {
      ...input,
      ...(!isAdmin() ? { authorId: undefined } : {}),
    },
    where: { id },
  })
}

export const closePlayerPost: MutationResolvers['closePlayerPost'] = async ({
  id,
}) => {
  await assertCanManagePost(id)

  return db.playerPost.update({
    data: { status: 'CLOSED' },
    where: { id },
  })
}

export const hidePlayerPost: MutationResolvers['hidePlayerPost'] = ({ id }) => {
  requireAuth({ roles: 'admin' })

  return db.playerPost.update({
    data: { status: 'HIDDEN' },
    where: { id },
  })
}

export const deletePlayerPost: MutationResolvers['deletePlayerPost'] = async ({
  id,
}) => {
  await assertCanManagePost(id)

  return db.playerPost.delete({
    where: { id },
  })
}

export const PlayerPost: PlayerPostRelationResolvers = {
  author: (_obj, { root }) => {
    return db.playerPost.findUnique({ where: { id: root?.id } }).author()
  },
}
