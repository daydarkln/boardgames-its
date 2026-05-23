import { render } from '@redwoodjs/testing/web'

import GameSessionCard from './GameSessionCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GameSessionCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GameSessionCard />)
    }).not.toThrow()
  })
})
