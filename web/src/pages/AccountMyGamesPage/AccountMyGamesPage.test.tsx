import { render } from '@redwoodjs/testing/web'

import AccountMyGamesPage from './AccountMyGamesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountMyGamesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountMyGamesPage />)
    }).not.toThrow()
  })
})
