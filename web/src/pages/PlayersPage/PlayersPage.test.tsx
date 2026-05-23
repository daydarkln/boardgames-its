import { render } from '@redwoodjs/testing/web'

import PlayersPage from './PlayersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PlayersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PlayersPage />)
    }).not.toThrow()
  })
})
