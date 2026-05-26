import { render, screen } from '@redwoodjs/testing/web'

import HomeIntroBlock from './HomeIntroBlock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HomeIntroBlock', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomeIntroBlock />)
    }).not.toThrow()
  })

  it('shows the core service actions', () => {
    render(<HomeIntroBlock />)

    expect(screen.getByText('Найти игру')).toBeInTheDocument()
    expect(screen.getByText('Выбрать площадку')).toBeInTheDocument()
    expect(screen.getByText('Собрать группу')).toBeInTheDocument()
    expect(screen.getByText('Создать встречу')).toBeInTheDocument()
  })
})
