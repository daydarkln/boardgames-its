import { render } from '@redwoodjs/testing/web'

import AccountCreateGamePage from './AccountCreateGamePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountCreateGamePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountCreateGamePage />)
    }).not.toThrow()
  })
})
