import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import { ForbiddenError, ValidationError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

const isAdmin = () =>
  context.currentUser?.roles?.includes('admin') ||
  context.currentUser?.role === 'ADMIN'

const sanitizeUserInput = <T extends Record<string, unknown>>(input: T) => {
  const { password, ...data } = input
  return { password: password as string | undefined, data }
}

export const users: QueryResolvers['users'] = () => {
  requireAuth({ roles: 'admin' })

  return db.user.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export const user: QueryResolvers['user'] = ({ id }) => {
  requireAuth()

  if (!isAdmin() && context.currentUser.id !== id) {
    throw new ForbiddenError('Можно смотреть только свой профиль')
  }

  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  requireAuth({ roles: 'admin' })

  if (!input.email?.includes('@')) {
    throw new ValidationError('Email должен быть валидным')
  }

  const { password, data } = sanitizeUserInput(input)
  const [hashedPassword, salt] = hashPassword(password || crypto.randomUUID())

  return db.user.create({
    data: {
      ...data,
      hashedPassword,
      salt,
      city: input.city || 'Ростов-на-Дону',
      favoriteDirections: input.favoriteDirections ?? [],
    },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  requireAuth()

  if (!isAdmin() && context.currentUser.id !== id) {
    throw new ForbiddenError('Можно редактировать только свой профиль')
  }

  if (input.email && !input.email.includes('@')) {
    throw new ValidationError('Email должен быть валидным')
  }

  const role = isAdmin() ? input.role : undefined

  return db.user.update({
    data: {
      ...input,
      role,
    },
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  requireAuth({ roles: 'admin' })

  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  createdGameSessions: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).createdGameSessions()
  },
  gameRegistrations: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).gameRegistrations()
  },
  favoriteGames: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).favoriteGames()
  },
  playerPosts: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).playerPosts()
  },
}
