import { fireEvent, render, screen } from '@redwoodjs/testing/web'

jest.mock('@redwoodjs/web', () => {
  const actual = jest.requireActual('@redwoodjs/web')

  return {
    ...actual,
    useMutation: jest.fn(() => [jest.fn(), { loading: false }]),
    useQuery: jest.fn(() => ({
      data: {
        venues: [
          {
            id: 1,
            name: 'Board Room',
            district: 'Кировский',
            address: 'ул. Большая Садовая, 56',
          },
        ],
      },
      loading: false,
    })),
  }
})

import AccountCreateGamePage from './AccountCreateGamePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountCreateGamePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountCreateGamePage />)
    }).not.toThrow()
  })

  it('renders russian labels for game creation fields', () => {
    render(<AccountCreateGamePage />)

    expect(screen.getByLabelText('Направление')).toBeInTheDocument()
    expect(screen.getByLabelText('Игра / система')).toBeInTheDocument()
    expect(screen.getByLabelText('Дата')).toBeInTheDocument()
    expect(screen.getByLabelText('Время начала')).toBeInTheDocument()
    expect(screen.getByLabelText('Название')).toBeInTheDocument()
    expect(screen.getByLabelText('Описание')).toBeInTheDocument()
    expect(screen.getByLabelText('Макс. игроков')).toBeInTheDocument()
    expect(screen.getByLabelText('Мин. игроков')).toBeInTheDocument()
    expect(screen.getByLabelText('Уровень опыта')).toBeInTheDocument()
    expect(screen.getByLabelText('Площадка')).toBeInTheDocument()
    expect(screen.getByLabelText('Адрес или ориентир')).toBeInTheDocument()
    expect(screen.getByLabelText('Теги')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Онлайн-игра'))

    expect(screen.getByLabelText('Детали подключения')).toBeInTheDocument()
  })
})
