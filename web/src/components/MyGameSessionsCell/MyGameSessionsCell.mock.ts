// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  myGameSessions: [
    {
      __typename: 'MyGameSessions' as const,
      id: 42,
    },
    {
      __typename: 'MyGameSessions' as const,
      id: 43,
    },
    {
      __typename: 'MyGameSessions' as const,
      id: 44,
    },
  ],
})
