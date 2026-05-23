// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  featuredVenues: [
    {
      __typename: 'FeaturedVenues' as const,
      id: 42,
    },
    {
      __typename: 'FeaturedVenues' as const,
      id: 43,
    },
    {
      __typename: 'FeaturedVenues' as const,
      id: 44,
    },
  ],
})
