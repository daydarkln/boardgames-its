import { render, screen } from '@redwoodjs/testing/web'

import GameSessionsTimeline from './GameSessionsTimeline'

jest.mock('@primereact/headless/timeline', () => ({
  useTimeline: () => ({
    attrs: {
      align: 'alternate',
      orientation: 'vertical',
    },
  }),
}))

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GameSessionsTimeline', () => {
  const games = [
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
        district: 'Тверская',
        address: 'Тверская, 12',
      },
      registrations: [{ status: 'APPROVED' }],
    },
  ]

  it('renders successfully', () => {
    expect(() => {
      render(<GameSessionsTimeline />)
    }).not.toThrow()
  })

  it('renders clickable events with date and time', () => {
    render(<GameSessionsTimeline games={games} />)

    expect(
      screen.getByRole('link', { name: /Крылья в клубе/i })
    ).toHaveAttribute('href', '/games/42')
    expect(screen.getByText(/16:00/)).toBeInTheDocument()
    expect(screen.getByText(/Board Room/)).toBeInTheDocument()
  })

  it('renders an empty state for an empty list', () => {
    render(<GameSessionsTimeline games={[]} />)

    expect(screen.getByText('Ближайших событий пока нет')).toBeInTheDocument()
  })
})
