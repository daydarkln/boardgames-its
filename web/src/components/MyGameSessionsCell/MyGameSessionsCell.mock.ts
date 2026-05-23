const gameSession = (id: number) => ({
  __typename: 'GameSession' as const,
  id,
  title: `Моя игра ${id}`,
  description: 'Описание игры',
  category: 'BOARD_GAMES' as const,
  date: '2026-06-01T16:00:00.000Z',
  startTime: '16:00',
  maxPlayers: 4,
  status: 'PUBLISHED' as const,
  experienceLevel: 'ANY' as const,
  imageUrl: null,
  requiresApproval: true,
  venue: {
    __typename: 'Venue' as const,
    name: 'Board Room',
    district: 'Тверская',
    address: 'Тверская, 12',
  },
  registrations: [
    {
      __typename: 'GameRegistration' as const,
      id,
      status: 'PENDING' as const,
      user: {
        __typename: 'User' as const,
        id,
        name: `Игрок ${id}`,
        email: `player${id}@example.com`,
      },
    },
  ],
})

export const standard = (/* vars, { ctx, req } */) => ({
  myGameSessions: [gameSession(42), gameSession(43), gameSession(44)],
})
