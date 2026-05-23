// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  myRegistrations: [
    {
      __typename: 'MyRegistrations' as const,
      id: 42,
    },
    {
      __typename: 'MyRegistrations' as const,
      id: 43,
    },
    {
      __typename: 'MyRegistrations' as const,
      id: 44,
    },
  ],
})
