// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  gameSession: {
    __typename: 'GameSession' as const,
    id: 42,
  },
})
