const playerPost = (id: number) => ({
  __typename: 'PlayerPost' as const,
  id,
  title: `Объявление ${id}`,
  description: 'Описание объявления',
  category: 'BOARD_GAMES' as const,
  district: 'Тверская',
  isOnline: false,
  experienceLevel: 'ANY' as const,
  neededPlayers: 4,
  currentPlayers: 2,
  tags: ['евро'],
  author: {
    __typename: 'User' as const,
    name: 'Мария',
  },
})

export const standard = (/* vars, { ctx, req } */) => ({
  playerPosts: [playerPost(42), playerPost(43), playerPost(44)],
})
