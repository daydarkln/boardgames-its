import { db } from 'src/lib/db'

import {
  createFavoriteGameSession,
  deleteFavoriteGameSession,
  favoriteGameSession,
} from './favoriteGameSessions'

const createUser = (email: string, role: 'USER' | 'ADMIN' = 'USER') =>
  db.user.create({
    data: {
      email,
      role,
      hashedPassword: 'hash',
      salt: 'salt',
    },
  })

const createSession = (organizerId: number) =>
  db.gameSession.create({
    data: {
      title: 'Крылья',
      description: 'Тестовая игра',
      category: 'BOARD_GAMES',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      startTime: '16:00',
      maxPlayers: 4,
      minPlayers: 1,
      experienceLevel: 'ANY',
      isOnline: false,
      locationDetails: 'ул. Большая Садовая, 56',
      organizerId,
      tags: [],
    },
  })

beforeEach(async () => {
  await db.favoriteGameSession.deleteMany()
  await db.gameRegistration.deleteMany()
  await db.playerPost.deleteMany()
  await db.gameSession.deleteMany()
  await db.venue.deleteMany()
  await db.user.deleteMany()
})

describe('favorite game session ownership', () => {
  it('creates favorites only for the current user unless admin passes userId', async () => {
    const organizer = await createUser('organizer@example.com')
    const player = await createUser('player@example.com')
    const other = await createUser('other@example.com')
    const session = await createSession(organizer.id)

    mockCurrentUser({ id: player.id, roles: ['user'], role: 'USER' })
    const favorite = await createFavoriteGameSession({
      input: { userId: other.id, gameSessionId: session.id },
    })

    expect(favorite.userId).toEqual(player.id)
  })

  it('does not expose another user’s favorite by id', async () => {
    const organizer = await createUser('organizer@example.com')
    const player = await createUser('player@example.com')
    const other = await createUser('other@example.com')
    const session = await createSession(organizer.id)
    const favorite = await db.favoriteGameSession.create({
      data: { userId: other.id, gameSessionId: session.id },
    })

    mockCurrentUser({ id: player.id, roles: ['user'], role: 'USER' })

    await expect(favoriteGameSession({ id: favorite.id })).resolves.toBeNull()
  })

  it('allows only owner or admin to delete a favorite', async () => {
    const organizer = await createUser('organizer@example.com')
    const player = await createUser('player@example.com')
    const other = await createUser('other@example.com')
    const admin = await createUser('admin@example.com', 'ADMIN')
    const session = await createSession(organizer.id)
    const favorite = await db.favoriteGameSession.create({
      data: { userId: other.id, gameSessionId: session.id },
    })

    mockCurrentUser({ id: player.id, roles: ['user'], role: 'USER' })
    await expect(
      deleteFavoriteGameSession({ id: favorite.id })
    ).rejects.toThrow()

    mockCurrentUser({ id: admin.id, roles: ['admin'], role: 'ADMIN' })
    await expect(
      deleteFavoriteGameSession({ id: favorite.id })
    ).resolves.toEqual(expect.objectContaining({ id: favorite.id }))
  })
})
