import { render } from '@redwoodjs/testing/web'

import VenuesPage from './VenuesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('VenuesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VenuesPage />)
    }).not.toThrow()
  })
})
