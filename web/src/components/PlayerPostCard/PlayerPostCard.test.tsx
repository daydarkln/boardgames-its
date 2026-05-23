import { render } from '@redwoodjs/testing/web'

import PlayerPostCard from './PlayerPostCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PlayerPostCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PlayerPostCard />)
    }).not.toThrow()
  })
})
