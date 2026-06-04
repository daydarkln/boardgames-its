import { fireEvent, render, screen } from '@redwoodjs/testing/web'

import Switch from './Switch'

describe('Switch', () => {
  it('renders and toggles through Radix checked state', () => {
    render(<Switch label="Онлайн и офлайн" />)

    const control = screen.getByRole('switch', {
      name: 'Онлайн и офлайн',
    })

    expect(control).toHaveAttribute('data-state', 'unchecked')

    fireEvent.click(control)

    expect(control).toHaveAttribute('data-state', 'checked')
  })
})
