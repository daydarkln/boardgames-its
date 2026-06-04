import { render, screen } from '@redwoodjs/testing/web'

import Tabs from './Tabs'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Tabs', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Tabs />)
    }).not.toThrow()
  })

  it('marks the selected tab with Radix state', () => {
    render(
      <Tabs
        value="games"
        tabs={[
          { value: 'games', label: 'Игры' },
          { value: 'venues', label: 'Места' },
        ]}
      />
    )

    expect(screen.getByRole('tab', { name: 'Игры' })).toHaveAttribute(
      'data-state',
      'active'
    )
  })
})
