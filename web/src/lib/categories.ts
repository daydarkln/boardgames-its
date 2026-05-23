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
    image:
      'linear-gradient(135deg, rgba(124,58,237,.78), rgba(14,165,233,.35)), radial-gradient(circle at 20% 20%, rgba(255,255,255,.28), transparent 30%)',
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
    image:
      'linear-gradient(135deg, rgba(190,18,60,.75), rgba(88,28,135,.45)), radial-gradient(circle at 75% 15%, rgba(255,255,255,.25), transparent 28%)',
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
    image:
      'linear-gradient(135deg, rgba(249,115,22,.72), rgba(20,20,24,.72)), radial-gradient(circle at 30% 30%, rgba(255,255,255,.18), transparent 28%)',
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
    image:
      'linear-gradient(135deg, rgba(16,185,129,.62), rgba(15,23,42,.72)), radial-gradient(circle at 65% 15%, rgba(255,255,255,.2), transparent 28%)',
    icon: Users,
  },
  {
    id: 'TOURNAMENTS',
    title: 'Турниры и лиги',
    subtitle: 'Соревнуйся, поднимайся в рейтинге и собирай команду.',
    bullets: ['Регулярные лиги', 'Рейтинги игроков', 'Городские финалы'],
    image:
      'linear-gradient(135deg, rgba(245,158,11,.72), rgba(88,28,135,.48)), radial-gradient(circle at 70% 20%, rgba(255,255,255,.22), transparent 30%)',
    icon: Trophy,
  },
]

export const formatCategory = (category?: string | null) =>
  category && category in categoryMeta
    ? categoryMeta[category as CategoryKey].label
    : 'Игра'

export const formatExperience = (value?: string | null) => {
  const labels: Record<string, string> = {
    BEGINNER: 'Новичок',
    CASUAL: 'Любитель',
    EXPERIENCED: 'Опытный',
    EXPERT: 'Эксперт',
    ANY: 'Любой опыт',
  }

  return value ? (labels[value] ?? value) : 'Любой опыт'
}

export const formatStatus = (value?: string | null) => {
  const labels: Record<string, string> = {
    DRAFT: 'Черновик',
    OPEN: 'Открыта',
    FULL: 'Мест нет',
    CANCELLED: 'Отменена',
    COMPLETED: 'Завершена',
    HIDDEN: 'Скрыта',
    PENDING: 'Ожидает',
    APPROVED: 'Подтверждена',
    DECLINED: 'Отклонена',
    CLOSED: 'Закрыто',
  }

  return value ? (labels[value] ?? value) : ''
}
