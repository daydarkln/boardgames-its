import { cleanup, render, screen } from '@redwoodjs/testing/web'

import GameSessionsTimeline from './GameSessionsTimeline'

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
        district: 'Кировский',
        address: 'ул. Большая Садовая, 56',
      },
      registrations: [{ status: 'APPROVED' }],
    },
  ]

  afterEach(() => cleanup())

  it('renders successfully', () => {
    expect(() => {
      render(<GameSessionsTimeline />)
    }).not.toThrow()
  })

  it('renders clickable events with date and time', () => {
    render(<GameSessionsTimeline games={games} />)

    expect(
      screen.getAllByRole('link', { name: /Крылья в клубе/i })[0]
    ).toHaveAttribute('href', '/games/42')
    expect(screen.getAllByText(/16:00/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Board Room/).length).toBeGreaterThan(0)
  })

  it('renders an empty state for an empty list', () => {
    render(<GameSessionsTimeline games={[]} />)

    expect(screen.getByText('Ближайших событий пока нет')).toBeInTheDocument()
  })
})
