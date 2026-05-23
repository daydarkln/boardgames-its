// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  latestPlayerPosts: [
    {
      __typename: 'LatestPlayerPosts' as const,
      id: 42,
    },
    {
      __typename: 'LatestPlayerPosts' as const,
      id: 43,
    },
    {
      __typename: 'LatestPlayerPosts' as const,
      id: 44,
    },
  ],
})
