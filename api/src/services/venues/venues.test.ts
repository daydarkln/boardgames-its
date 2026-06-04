import { db } from 'src/lib/db'

import { createVenue } from './venues'

beforeEach(async () => {
  await db.gameSession.deleteMany()
  await db.venue.deleteMany()
})

describe('venues service', () => {
  it('creates a venue without an address', async () => {
    mockCurrentUser({ id: 1, roles: ['admin'], role: 'ADMIN' })

    const venue = await createVenue({
      input: {
        name: 'Totenot',
        description: 'Клуб настольных игр и НРИ-сообщество.',
        city: 'Ростов-на-Дону',
        rating: 0,
      },
    })

    expect(venue).toMatchObject({
      name: 'Totenot',
      address: null,
      city: 'Ростов-на-Дону',
    })
  })

  it('rejects an empty venue name', async () => {
    mockCurrentUser({ id: 1, roles: ['admin'], role: 'ADMIN' })

    expect(() =>
      createVenue({
        input: {
          name: '   ',
          description: 'Описание площадки',
          city: 'Ростов-на-Дону',
          rating: 0,
        },
      })
    ).toThrow('Название площадки обязательно')
  })
})
