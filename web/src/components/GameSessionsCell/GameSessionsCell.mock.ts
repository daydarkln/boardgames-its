// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  gameSessions: [
    {
      __typename: 'GameSession' as const,
      id: 42,
    },
    {
      __typename: 'GameSession' as const,
      id: 43,
    },
    {
      __typename: 'GameSession' as const,
      id: 44,
    },
  ],
})
