// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  venue: {
    __typename: 'Venue' as const,
    id: 42,
  },
})
