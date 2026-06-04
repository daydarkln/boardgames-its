const venue = (id: number) => ({
  __typename: 'Venue' as const,
  id,
  name: `Площадка ${id}`,
  description: 'Описание площадки',
  address: 'ул. Большая Садовая, 56',
  district: 'Кировский',
  rating: 4.8,
  imageUrl: null,
  amenities: ['Wi-Fi'],
})

export const standard = (/* vars, { ctx, req } */) => ({
  venues: [venue(42), venue(43), venue(44)],
})
