import { db } from 'src/lib/db'
import { createGameRegistration } from 'src/services/gameRegistrations/gameRegistrations'

import {
  approveGameRegistration,
  declineGameRegistration,
  registerForGameSession,
  updateGameSession,
} from './gameSessions'

const futureDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date
}

const pastDate = () => {
  const date = new Date()
  date.setDate(date.getDate() - 7)
  return date
}

const createUser = (email: string, role: 'USER' | 'ADMIN' = 'USER') =>
  db.user.create({
    data: {
      email,
      role,
      hashedPassword: 'hash',
      salt: 'salt',
    },
  })

const createSession = async (
  organizerId: number,
  data: Partial<Parameters<typeof db.gameSession.create>[0]['data']> = {}
) =>
  db.gameSession.create({
    data: {
      title: 'Крылья',
      description: 'Тестовая игра',
      category: 'BOARD_GAMES',
      date: futureDate(),
      startTime: '16:00',
      maxPlayers: 2,
      minPlayers: 1,
      experienceLevel: 'ANY',
      isOnline: false,
      isPrivate: false,
      locationDetails: 'ул. Большая Садовая, 56',
      organizerId,
      tags: [],
      ...data,
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

describe('game session registration rules', () => {
  it('rejects guest registration', async () => {
    const organizer = await createUser('organizer@example.com')
    const session = await createSession(organizer.id)

    await expect(registerForGameSession({ id: session.id })).rejects.toThrow()
  })

  it('rejects draft, cancelled, finished and past sessions', async () => {
    const organizer = await createUser('organizer@example.com')
    const player = await createUser('player@example.com')

    mockCurrentUser({ id: player.id, roles: ['user'], role: 'USER' })

    for (const data of [
      { status: 'DRAFT' as const },
      { status: 'CANCELLED' as const },
      { status: 'FINISHED' as const },
      { date: pastDate() },
    ]) {
      const session = await createSession(organizer.id, data)
      await expect(registerForGameSession({ id: session.id })).rejects.toThrow()
    }
  })

  it('rejects private, full and duplicate registrations', async () => {
    const organizer = await createUser('organizer@example.com')
    const player = await createUser('player@example.com')
    const other = await createUser('other@example.com')

    mockCurrentUser({ id: player.id, roles: ['user'], role: 'USER' })

    const privateSession = await createSession(organizer.id, {
      isPrivate: true,
    })
    await expect(
      registerForGameSession({ id: privateSession.id })
    ).rejects.toThrow()

    const fullSession = await createSession(organizer.id, { maxPlayers: 1 })
    await db.gameRegistration.create({
      data: {
        userId: other.id,
        gameSessionId: fullSession.id,
        status: 'APPROVED',
      },
    })
    await expect(
      registerForGameSession({ id: fullSession.id })
    ).rejects.toThrow()

    const duplicateSession = await createSession(organizer.id)
    await registerForGameSession({ id: duplicateSession.id })
    await expect(
      registerForGameSession({ id: duplicateSession.id })
    ).rejects.toThrow()
  })

  it('creates pending registration when organizer approval is required', async () => {
    const organizer = await createUser('organizer@example.com')
    const player = await createUser('player@example.com')
    const session = await createSession(organizer.id, {
      requiresApproval: true,
    })

    mockCurrentUser({ id: player.id, roles: ['user'], role: 'USER' })

    const registration = await registerForGameSession({ id: session.id })

    expect(registration.status).toEqual('PENDING')
  })

  it('allows only organizer or admin to approve and decline registrations', async () => {
    const organizer = await createUser('organizer@example.com')
    const player = await createUser('player@example.com')
    const stranger = await createUser('stranger@example.com')
    const admin = await createUser('admin@example.com', 'ADMIN')
    const session = await createSession(organizer.id, {
      requiresApproval: true,
    })
    const registration = await db.gameRegistration.create({
      data: {
        userId: player.id,
        gameSessionId: session.id,
        status: 'PENDING',
      },
    })

    mockCurrentUser({ id: stranger.id, roles: ['user'], role: 'USER' })
    await expect(
      approveGameRegistration({ id: registration.id })
    ).rejects.toThrow()

    mockCurrentUser({ id: organizer.id, roles: ['user'], role: 'USER' })
    await expect(
      approveGameRegistration({ id: registration.id })
    ).resolves.toMatchObject({ status: 'APPROVED' })

    mockCurrentUser({ id: admin.id, roles: ['admin'], role: 'ADMIN' })
    await expect(
      declineGameRegistration({ id: registration.id })
    ).resolves.toMatchObject({ status: 'DECLINED' })
  })
})

describe('game session ownership rules', () => {
  it('prevents editing someone else’s game', async () => {
    const organizer = await createUser('organizer@example.com')
    const stranger = await createUser('stranger@example.com')
    const session = await createSession(organizer.id)

    mockCurrentUser({ id: stranger.id, roles: ['user'], role: 'USER' })

    await expect(
      updateGameSession({ id: session.id, input: { title: 'Чужая правка' } })
    ).rejects.toThrow()
  })

  it('keeps generic registration creation admin-only', async () => {
    const organizer = await createUser('organizer@example.com')
    const player = await createUser('player@example.com')
    const session = await createSession(organizer.id)

    mockCurrentUser({ id: player.id, roles: ['user'], role: 'USER' })

    expect(() =>
      createGameRegistration({
        input: { userId: player.id, gameSessionId: session.id },
      })
    ).toThrow()
  })
})
