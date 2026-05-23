import { render } from '@redwoodjs/testing/web'

import AccountMyRegistrationsPage from './AccountMyRegistrationsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountMyRegistrationsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountMyRegistrationsPage />)
    }).not.toThrow()
  })
})
