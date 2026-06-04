import { db } from 'api/src/lib/db'

type SourceVenue = {
  name: string
  url: string
  category: string[]
  short_description: string
  detailed_description: string
  specialization: string
  city: string
}

const rostovVenues: SourceVenue[] = [
  {
    name: 'Totenot',
    url: 'https://vk.com/totenot',
    category: ['board_games', 'rpg', 'dnd'],
    short_description: 'Клуб настольных игр и НРИ-сообщество.',
    detailed_description:
      'Один из старейших клубов настольных игр Ростова-на-Дону. Проводятся игротеки, турниры, встречи по современным настольным играм. Через сообщество можно найти партии по Dungeons & Dragons, Pathfinder и другим НРИ.',
    specialization: 'Настольные игры, НРИ',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'Лавка Орка',
    url: 'https://lavkaorka.ru',
    category: ['board_games', 'rpg', 'mtg', 'wargames', 'dnd'],
    short_description: 'Крупный хобби-центр и игровое пространство.',
    detailed_description:
      'Один из крупнейших игровых клубов на юге России. Помимо магазина настольных игр предоставляет игровые столы для настолок, варгеймов, MTG и НРИ. Регулярно проводятся игровые мероприятия, турниры и встречи сообщества. Имеет собственный клуб в Ростове-на-Дону.',
    specialization: 'Настольные игры, варгеймы, MTG, НРИ',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'PandaSale',
    url: 'https://vk.com/pandasale_rnd',
    category: ['board_games'],
    short_description: 'Магазин и клуб настольных игр.',
    detailed_description:
      'Специализируется на продаже настольных игр и проведении игровых встреч. Имеет игровое сообщество и площадку для проведения настольных мероприятий.',
    specialization: 'Настольные игры',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'Караван Подарков',
    url: 'https://karavangifts.ru',
    category: ['board_games'],
    short_description: 'Магазин настольных игр с игровыми мероприятиями.',
    detailed_description:
      'Магазин настольных игр, где периодически проводятся игротеки и встречи настольщиков. В ассортименте представлены семейные, стратегические и карточные игры.',
    specialization: 'Настольные игры',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'День Игр',
    url: 'https://vk.com/dayofgamesrnd',
    category: ['board_games', 'rpg'],
    short_description: 'Клуб настольных и ролевых игр.',
    detailed_description:
      'Игровое пространство для проведения настольных игр, ваншотов и открытых игровых встреч. Периодически организуются мероприятия по D&D и другим НРИ.',
    specialization: 'Настольные игры, НРИ',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'Игродом',
    url: 'https://vk.com/igrodomrnd',
    category: ['board_games', 'rpg'],
    short_description: 'Клуб настольных игр и ролевых мероприятий.',
    detailed_description:
      'Большое игровое пространство для настольных игр и НРИ. Проводятся игротеки, тематические мероприятия и партии по Dungeons & Dragons.',
    specialization: 'Настольные игры, НРИ',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'Орк Волшебник',
    url: 'https://ork-volshebnik.clients.site/',
    category: ['rpg', 'dnd'],
    short_description: 'Специализированный клуб настольных ролевых игр.',
    detailed_description:
      'Пожалуй, самое специализированное место по D&D в Ростове-на-Дону. Есть отдельные комнаты для партий, аренда игровых столов, услуги мастеров, проведение Dungeons & Dragons для готовых компаний и новичков. Основной фокус сделан именно на НРИ, а не на обычные настольные игры.',
    specialization: 'Dungeons & Dragons, НРИ',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'Mesto',
    url: 'https://www.instagram.com/mesto.rnd/',
    category: ['rpg', 'dnd'],
    short_description:
      'Игровое пространство для НРИ и тематических мероприятий.',
    detailed_description:
      'Современная площадка, где проводятся D&D-сессии и другие настольные ролевые игры. Делается акцент на атмосферу, оформление и вовлечение новых игроков.',
    specialization: 'D&D, НРИ',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'Persona Joy',
    url: 'https://www.instagram.com/persona_joy/',
    category: ['rpg', 'dnd', 'events'],
    short_description: 'Организаторы сюжетных D&D-мероприятий.',
    detailed_description:
      'Проводят D&D-сессии, тематические приключения и игровые события. Ближе к формату интерактивного развлечения и мероприятий для компаний, чем к классическому клубу.',
    specialization: 'D&D, игровые мероприятия',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'Guild RPG Club',
    url: 'https://www.instagram.com/guild_rpg/',
    category: ['rpg', 'dnd'],
    short_description: 'Сообщество настольных ролевых игр.',
    detailed_description:
      'Клуб и сообщество игроков в Dungeons & Dragons и другие НРИ. Проводятся наборы в кампании, ваншоты и регулярные игровые встречи.',
    specialization: 'D&D, Pathfinder, НРИ',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'MAFIA VIP',
    url: 'https://mafiavip.ru',
    category: ['mafia'],
    short_description: 'Профессиональный клуб игры в мафию.',
    detailed_description:
      'Специализированный мафия-клуб с ведущими, отдельной площадкой и регулярными играми. Проводятся открытые встречи, турниры и корпоративные мероприятия.',
    specialization: 'Мафия',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'Мафия Ростов',
    url: 'https://mafiarnd.ru',
    category: ['mafia'],
    short_description: 'Сообщество и клуб игры в мафию.',
    detailed_description:
      'Регулярные офлайн-игры в мафию, турниры и тематические мероприятия для любителей социальной дедукции.',
    specialization: 'Мафия',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'Cosa Nostra Mafia Club',
    url: 'https://vk.com/cosanostra_rnd',
    category: ['mafia'],
    short_description: 'Клуб игры в мафию.',
    detailed_description:
      'Регулярные встречи по классической и спортивной мафии. Имеет собственное игровое сообщество и ведущих.',
    specialization: 'Мафия',
    city: 'Ростов-на-Дону',
  },
  {
    name: 'mafia_rnd61',
    url: 'https://www.instagram.com/mafia_rnd61/',
    category: ['mafia'],
    short_description: 'Ростовское сообщество игроков в мафию.',
    detailed_description:
      'Через сообщество организуются игровые встречи, наборы на игры и тематические мероприятия по мафии.',
    specialization: 'Мафия',
    city: 'Ростов-на-Дону',
  },
]

const mapVenue = (sourceVenue: SourceVenue) => ({
  name: sourceVenue.name,
  description: sourceVenue.short_description,
  detailedDescription: sourceVenue.detailed_description,
  address: null,
  district: null,
  city: sourceVenue.city,
  websiteUrl: sourceVenue.url,
  phone: null,
  imageUrl: null,
  rating: 0,
  latitude: null,
  longitude: null,
  amenities: [],
})

export default async () => {
  let createdCount = 0
  let updatedCount = 0

  for (const venue of rostovVenues) {
    const matches = await db.venue.findMany({
      where: { name: venue.name },
      select: { id: true },
    })

    if (matches.length > 1) {
      throw new Error(
        `Found ${matches.length} venues named "${venue.name}". Resolve duplicates before import.`
      )
    }

    const data = mapVenue(venue)

    if (matches.length === 1) {
      await db.venue.update({
        where: { id: matches[0].id },
        data,
      })
      updatedCount += 1
      continue
    }

    await db.venue.create({ data })
    createdCount += 1
  }

  const importedCount = await db.venue.count({
    where: {
      city: 'Ростов-на-Дону',
      name: {
        in: rostovVenues.map((venue) => venue.name),
      },
    },
  })

  console.info(
    `Rostov venues import complete. Created: ${createdCount}, updated: ${updatedCount}, total imported: ${importedCount}.`
  )
}
