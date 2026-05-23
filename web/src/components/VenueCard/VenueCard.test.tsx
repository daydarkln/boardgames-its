import { render } from '@redwoodjs/testing/web'

import VenueCard from './VenueCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VenueCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VenueCard />)
    }).not.toThrow()
  })
})
