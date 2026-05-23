import { render } from '@redwoodjs/testing/web'

import AccountProfilePage from './AccountProfilePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountProfilePage />)
    }).not.toThrow()
  })
})
