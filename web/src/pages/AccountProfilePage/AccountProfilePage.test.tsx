import { render, screen } from '@redwoodjs/testing/web'

jest.mock('@redwoodjs/web', () => {
  const actual = jest.requireActual('@redwoodjs/web')

  return {
    ...actual,
    useMutation: jest.fn(() => [jest.fn(), { loading: false }]),
  }
})

jest.mock('src/auth', () => ({
  useAuth: () => ({
    currentUser: {
      id: 1,
      name: 'Мария',
      city: 'Ростов-на-Дону',
      district: 'Кировский',
      experienceLevel: 'ANY',
      favoriteGamesText: '',
      bio: '',
    },
  }),
}))

import AccountProfilePage from './AccountProfilePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountProfilePage />)
    }).not.toThrow()
  })

  it('renders russian labels for profile fields', () => {
    render(<AccountProfilePage />)

    expect(screen.getByLabelText('Имя')).toBeInTheDocument()
    expect(screen.getByLabelText('Город')).toHaveValue('Ростов-на-Дону')
    expect(screen.getByLabelText('Район')).toBeInTheDocument()
    expect(screen.getByLabelText('Игровой опыт')).toBeInTheDocument()
    expect(screen.getByLabelText('Любимые игры и системы')).toBeInTheDocument()
    expect(screen.getByLabelText('О себе')).toBeInTheDocument()
  })
})
