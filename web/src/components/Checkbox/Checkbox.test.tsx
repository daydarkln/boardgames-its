import { fireEvent, render, screen } from '@redwoodjs/testing/web'

import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('renders and toggles through Radix checked state', () => {
    render(<Checkbox label="Есть свободные места" />)

    const checkbox = screen.getByRole('checkbox', {
      name: 'Есть свободные места',
    })

    expect(checkbox).toHaveAttribute('data-state', 'unchecked')

    fireEvent.click(checkbox)

    expect(checkbox).toHaveAttribute('data-state', 'checked')
  })
})
