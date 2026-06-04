const registration = (id: number) => ({
  __typename: 'GameRegistration' as const,
  id,
  status: 'APPROVED' as const,
  gameSession: {
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
    registrations: [
      {
        __typename: 'GameRegistration' as const,
        status: 'APPROVED' as const,
      },
    ],
  },
})

export const standard = (/* vars, { ctx, req } */) => ({
  myRegistrations: [registration(42), registration(43), registration(44)],
})
