// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  venueGameSessions: [
    {
      __typename: 'VenueGameSessions' as const,
      id: 42,
    },
    {
      __typename: 'VenueGameSessions' as const,
      id: 43,
    },
    {
      __typename: 'VenueGameSessions' as const,
      id: 44,
    },
  ],
})
