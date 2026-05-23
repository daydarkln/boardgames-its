export const standard = (/* vars, { ctx, req } */) => ({
  venue: {
    __typename: 'Venue' as const,
    id: 42,
    name: 'Board Room',
    description: 'Клуб с играми',
    detailedDescription: 'Большая библиотека настольных игр.',
    address: 'Тверская, 12',
    district: 'Тверская',
    city: 'Москва',
    websiteUrl: null,
    phone: null,
    imageUrl: null,
    rating: 4.8,
    amenities: ['Wi-Fi'],
  },
})
