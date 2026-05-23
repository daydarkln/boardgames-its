// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  upcomingGameSessions: [
    {
      __typename: 'UpcomingGameSessions' as const,
      id: 42,
    },
    {
      __typename: 'UpcomingGameSessions' as const,
      id: 43,
    },
    {
      __typename: 'UpcomingGameSessions' as const,
      id: 44,
    },
  ],
})
