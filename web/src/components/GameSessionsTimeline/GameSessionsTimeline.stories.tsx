// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/7/writing-stories/args

import type { Meta, StoryObj } from '@storybook/react'

import GameSessionsTimeline from './GameSessionsTimeline'

const meta: Meta<typeof GameSessionsTimeline> = {
  component: GameSessionsTimeline,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof GameSessionsTimeline>

export const Primary: Story = {
  args: {
    games: [
      {
        id: 42,
        title: 'Крылья в клубе',
        description: 'Спокойная партия для новичков и опытных игроков.',
        category: 'BOARD_GAMES',
        date: '2026-06-01T16:00:00.000Z',
        startTime: '16:00',
        maxPlayers: 5,
        status: 'PUBLISHED',
        experienceLevel: 'BEGINNER',
        venue: {
          name: 'Board Room',
          district: 'Кировский',
          address: 'ул. Большая Садовая, 56',
        },
        registrations: [{ status: 'APPROVED' }],
      },
      {
        id: 43,
        title: 'D&D: проклятая башня',
        description: 'One-shot на вечер с готовыми персонажами.',
        category: 'TTRPG',
        date: '2026-06-03T18:30:00.000Z',
        startTime: '18:30',
        maxPlayers: 6,
        status: 'PUBLISHED',
        experienceLevel: 'ANY',
        venue: {
          name: 'Лофт Героев',
          district: 'Пролетарский',
          address: 'ул. 1-я Майская, 10',
        },
        registrations: [{ status: 'APPROVED' }, { status: 'PENDING' }],
      },
    ],
  },
}

export const Empty: Story = {
  args: {
    games: [],
  },
}
