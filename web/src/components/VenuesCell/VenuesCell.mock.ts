// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  venues: [
    {
      __typename: 'Venue' as const,
      id: 42,
    },
    {
      __typename: 'Venue' as const,
      id: 43,
    },
    {
      __typename: 'Venue' as const,
      id: 44,
    },
  ],
})
