import { render } from '@redwoodjs/testing/web'

import AccountFavoritesPage from './AccountFavoritesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountFavoritesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountFavoritesPage />)
    }).not.toThrow()
  })
})
