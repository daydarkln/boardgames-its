const gameSession = (id: number) => ({
  __typename: 'GameSession' as const,
  id,
  title: `Игра ${id}`,
  description: 'Описание игры',
  category: 'BOARD_GAMES' as const,
  date: '2026-06-01T16:00:00.000Z',
  startTime: '16:00',
  maxPlayers: 4,
  status: 'PUBLISHED' as const,
  experienceLevel: 'ANY' as const,
  imageUrl: null,
  venue: {
    __typename: 'Venue' as const,
    name: 'Board Room',
    district: 'Кировский',
    address: 'ул. Большая Садовая, 56',
  },
  registrations: [],
})

export const standard = (/* vars, { ctx, req } */) => ({
  gameSessions: [gameSession(42), gameSession(43), gameSession(44)],
})
