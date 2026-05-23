const venue = (id: number) => ({
  __typename: 'Venue' as const,
  id,
  name: `Площадка ${id}`,
  description: 'Описание площадки',
  address: 'Тверская, 12',
  district: 'Тверская',
  rating: 4.8,
  imageUrl: null,
  amenities: ['Wi-Fi'],
})

export const standard = (/* vars, { ctx, req } */) => ({
  venues: [venue(42), venue(43), venue(44)],
})
