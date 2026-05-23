import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

const passwordFor = (password: string) => {
  const [hashedPassword, salt] = hashPassword(password)
  return { hashedPassword, salt }
}

const daysFromNow = (days: number, hour: number, minute = 0) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(hour, minute, 0, 0)
  return date
}

export default async () => {
  await db.favoriteGameSession.deleteMany()
  await db.gameRegistration.deleteMany()
  await db.playerPost.deleteMany()
  await db.gameSession.deleteMany()
  await db.venue.deleteMany()
  await db.user.deleteMany()

  const admin = await db.user.create({
    data: {
      email: 'admin@boardgames.local',
      name: 'Алексей',
      role: 'ADMIN',
      city: 'Москва',
      district: 'Тверская',
      bio: 'Организатор городских игр и модератор площадки.',
      experienceLevel: 'INTERMEDIATE',
      favoriteDirections: ['BOARD_GAMES', 'TTRPG', 'MAFIA'],
      favoriteGamesText: 'Покорение Марса, D&D 5e, Мафия Classic',
      ...passwordFor('password123'),
    },
  })

  const user = await db.user.create({
    data: {
      email: 'player@boardgames.local',
      name: 'Мария',
      role: 'USER',
      city: 'Москва',
      district: 'Бауманская',
      bio: 'Люблю евро и камерные НРИ для новичков.',
      experienceLevel: 'INTERMEDIATE',
      favoriteDirections: ['BOARD_GAMES', 'TTRPG'],
      favoriteGamesText: 'Крылья, One Shot, Каркассон',
      ...passwordFor('password123'),
    },
  })

  const boardRoom = await db.venue.create({
    data: {
      name: 'Board Room',
      description: 'Клуб с большой библиотекой настольных игр.',
      detailedDescription:
        'Большие столы, объяснение правил, регулярные вечера для новичков и турнирные дни.',
      address: 'Тверская, 12',
      district: 'Тверская',
      city: 'Москва',
      rating: 4.8,
      imageUrl:
        'linear-gradient(135deg, rgba(14,165,233,.55), rgba(15,23,42,.8)), radial-gradient(circle at 35% 25%, rgba(255,255,255,.22), transparent 30%)',
      amenities: ['Wi-Fi', 'Кафе', 'Библиотека'],
    },
  })

  const loft = await db.venue.create({
    data: {
      name: 'Лофт Герои',
      description: 'Лофт для НРИ, кампаний и закрытых встреч.',
      detailedDescription:
        'Отдельные комнаты, атмосферный свет, тихие зоны для мастеров и долгих партий.',
      address: 'Бауманская, 11',
      district: 'Бауманская',
      city: 'Москва',
      rating: 4.7,
      imageUrl:
        'linear-gradient(135deg, rgba(190,18,60,.55), rgba(15,23,42,.82)), radial-gradient(circle at 70% 25%, rgba(255,255,255,.2), transparent 30%)',
      amenities: ['Комнаты', 'Проектор', 'Еда'],
    },
  })

  const meeple = await db.venue.create({
    data: {
      name: 'Meeple House',
      description: 'Кафе-клуб для быстрых партий и семейных игр.',
      address: 'Стартаковская, 7',
      district: 'Стартаковская',
      city: 'Москва',
      rating: 4.9,
      imageUrl:
        'linear-gradient(135deg, rgba(249,115,22,.55), rgba(15,23,42,.82)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.2), transparent 30%)',
      amenities: ['Кафе', 'Семейные игры', 'Wi-Fi'],
    },
  })

  const wings = await db.gameSession.create({
    data: {
      title: 'Крылья',
      description:
        'Спокойная партия в Wingspan для игроков, которые уже знают базовые правила.',
      category: 'BOARD_GAMES',
      date: daysFromNow(1, 16),
      startTime: '16:00',
      endTime: '19:00',
      maxPlayers: 5,
      minPlayers: 3,
      experienceLevel: 'INTERMEDIATE',
      tags: ['евро', 'птицы', 'спокойная партия'],
      organizerId: admin.id,
      venueId: boardRoom.id,
      imageUrl:
        'linear-gradient(135deg, rgba(59,130,246,.58), rgba(15,23,42,.8)), radial-gradient(circle at 65% 20%, rgba(255,255,255,.22), transparent 30%)',
    },
  })

  const dnd = await db.gameSession.create({
    data: {
      title: 'Подземелья и драконы',
      description:
        'One-shot для новичков: персонажи готовы, правила объясним за столом.',
      category: 'TTRPG',
      gameSystem: 'D&D 5e',
      date: daysFromNow(1, 18),
      startTime: '18:00',
      endTime: '22:30',
      maxPlayers: 6,
      minPlayers: 3,
      requiresApproval: true,
      experienceLevel: 'BEGINNER',
      tags: ['one-shot', 'новичкам', 'фэнтези'],
      organizerId: admin.id,
      venueId: loft.id,
      imageUrl:
        'linear-gradient(135deg, rgba(190,18,60,.62), rgba(88,28,135,.45)), radial-gradient(circle at 70% 20%, rgba(255,255,255,.22), transparent 28%)',
    },
  })

  const mafia = await db.gameSession.create({
    data: {
      title: 'Мафия Classic',
      description:
        'Классическая ролевая мафия с ведущим, живым общением и быстрыми раундами.',
      category: 'MAFIA',
      date: daysFromNow(2, 20),
      startTime: '20:00',
      endTime: '23:30',
      maxPlayers: 10,
      minPlayers: 6,
      experienceLevel: 'ANY',
      tags: ['мафия', 'общение', 'вечер'],
      organizerId: user.id,
      venueId: meeple.id,
      imageUrl:
        'linear-gradient(135deg, rgba(249,115,22,.72), rgba(20,20,24,.82)), radial-gradient(circle at 28% 25%, rgba(255,255,255,.2), transparent 30%)',
    },
  })

  await db.gameRegistration.createMany({
    data: [
      { userId: user.id, gameSessionId: wings.id, status: 'APPROVED' },
      { userId: admin.id, gameSessionId: mafia.id, status: 'APPROVED' },
      { userId: user.id, gameSessionId: dnd.id, status: 'PENDING' },
    ],
  })

  await db.favoriteGameSession.create({
    data: { userId: user.id, gameSessionId: wings.id },
  })

  await db.playerPost.createMany({
    data: [
      {
        title: 'Ищу компанию в Покорение Марса',
        description: 'Нужны 2 игрока на спокойную партию в выходные.',
        category: 'BOARD_GAMES',
        district: 'Тверская',
        experienceLevel: 'INTERMEDIATE',
        neededPlayers: 4,
        currentPlayers: 2,
        tags: ['евро', 'марс'],
        authorId: user.id,
      },
      {
        title: 'Веду D&D 5e новичкам',
        description: 'Короткий one-shot на 3-4 часа, помогу с персонажами.',
        category: 'TTRPG',
        district: 'Бауманская',
        experienceLevel: 'BEGINNER',
        neededPlayers: 5,
        currentPlayers: 3,
        tags: ['dnd', 'новичкам'],
        authorId: admin.id,
      },
      {
        title: 'Собираем Мафию на выходные',
        description: 'Ищем еще игроков для живой мафии в клубе.',
        category: 'MAFIA',
        district: 'Стартаковская',
        experienceLevel: 'ANY',
        neededPlayers: 10,
        currentPlayers: 6,
        tags: ['мафия', 'вечер'],
        authorId: user.id,
      },
    ],
  })

  console.info('Seed data created. Login: admin@boardgames.local / password123')
}
