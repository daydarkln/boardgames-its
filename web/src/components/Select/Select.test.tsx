import { render, screen } from '@redwoodjs/testing/web'

import Select from './Select'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Select', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Select />)
    }).not.toThrow()
  })

  it('renders the selected option in the trigger', () => {
    render(
      <Select
        value="BOARD_GAMES"
        options={[
          { value: '', label: 'Все направления' },
          { value: 'BOARD_GAMES', label: 'Настолки' },
        ]}
      />
    )

    expect(screen.getByRole('combobox')).toHaveTextContent('Настолки')
  })
})
