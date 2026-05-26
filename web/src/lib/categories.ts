import type { ComponentType } from 'react'

import { Crown, Drama, Dice5, Trophy, Users } from 'lucide-react'

export type CategoryKey = 'BOARD_GAMES' | 'TTRPG' | 'MAFIA'

export const categoryMeta: Record<
  CategoryKey,
  {
    label: string
    shortLabel: string
    description: string
    accent: string
    icon: ComponentType<{ className?: string }>
  }
> = {
  BOARD_GAMES: {
    label: 'Настолки',
    shortLabel: 'Настолки',
    description: 'Евро, стратегии, пати-игры и семейные хиты.',
    accent: 'from-violet-500 to-sky-400',
    icon: Dice5,
  },
  TTRPG: {
    label: 'НРИ',
    shortLabel: 'НРИ',
    description: 'Кампании, one-shot, мастера и новые миры.',
    accent: 'from-rose-500 to-red-700',
    icon: Crown,
  },
  MAFIA: {
    label: 'Мафия',
    shortLabel: 'Мафия',
    description: 'Классическая и ролевая мафия, психология и дедукция.',
    accent: 'from-orange-500 to-stone-900',
    icon: Drama,
  },
}

export const heroSlides = [
  {
    id: 'BOARD_GAMES',
    title: 'Настолки',
    subtitle: 'Сотни игр. Тысячи партий. Твой стол ждет тебя.',
    bullets: [
      'Найди игру по вкусу',
      'Играй в клубах и кафе',
      'Новые друзья за столом',
    ],
    image: "url('/hero/boardgames.jpg')",
    activeBackgroundPosition: '28% 54%',
    inactiveBackgroundPosition: '34% 52%',
    activeBackgroundSize: '145% auto',
    inactiveBackgroundSize: '250% auto',
    icon: Dice5,
  },
  {
    id: 'TTRPG',
    title: 'НРИ',
    subtitle: 'Истории, которые мы создаем вместе.',
    bullets: [
      'D&D, Pathfinder и авторские системы',
      'One-shot и кампании',
      'Игры для новичков',
    ],
    image: "url('/hero/ttrpg.jpg')",
    activeBackgroundPosition: '8% 45%',
    inactiveBackgroundPosition: '10% 42%',
    activeBackgroundSize: '190% auto',
    inactiveBackgroundSize: '310% auto',
    icon: Crown,
  },
  {
    id: 'MAFIA',
    title: 'Мафия',
    subtitle: 'Доверие, интрига и внимательность к деталям.',
    bullets: [
      'Классика и ролевая мафия',
      'Вечера в клубах',
      'Команды и турниры',
    ],
    image: "url('/hero/ttrpg.jpg')",
    activeBackgroundPosition: '82% 36%',
    inactiveBackgroundPosition: '78% 24%',
    activeBackgroundSize: '190% auto',
    inactiveBackgroundSize: '300% auto',
    icon: Drama,
  },
  {
    id: 'COMMUNITY',
    title: 'Сообщество',
    subtitle: 'Люди, события и обсуждения каждый день.',
    bullets: [
      'Собирай группы',
      'Находи игроков рядом',
      'Следи за афишей города',
    ],
    image: "url('/hero/mafia.jpg')",
    activeBackgroundPosition: '64% 42%',
    inactiveBackgroundPosition: '66% 34%',
    activeBackgroundSize: '180% auto',
    inactiveBackgroundSize: '280% auto',
    icon: Users,
  },
  {
    id: 'TOURNAMENTS',
    title: 'Турниры и лиги',
    subtitle: 'Соревнуйся, поднимайся в рейтинге и собирай команду.',
    bullets: ['Регулярные лиги', 'Рейтинги игроков', 'Городские финалы'],
    image: "url('/hero/community.jpg')",
    activeBackgroundPosition: '40% 50%',
    inactiveBackgroundPosition: '38% 34%',
    activeBackgroundSize: '175% auto',
    inactiveBackgroundSize: '275% auto',
    icon: Trophy,
  },
]

export const formatCategory = (category?: string | null) =>
  category && category in categoryMeta
    ? categoryMeta[category as CategoryKey].label
    : 'Игра'

export const formatExperience = (value?: string | null) => {
  const labels: Record<string, string> = {
    ANY: 'Любой опыт',
    BEGINNER: 'Новичок',
    INTERMEDIATE: 'Средний',
    ADVANCED: 'Продвинутый',
  }

  return value ? (labels[value] ?? value) : 'Любой опыт'
}

export const formatStatus = (value?: string | null) => {
  const labels: Record<string, string> = {
    DRAFT: 'Черновик',
    PUBLISHED: 'Опубликована',
    CANCELLED: 'Отменена',
    FINISHED: 'Завершена',
    ACTIVE: 'Активно',
    PENDING: 'Ожидает',
    APPROVED: 'Подтверждена',
    DECLINED: 'Отклонена',
    CLOSED: 'Закрыто',
  }

  return value ? (labels[value] ?? value) : ''
}
