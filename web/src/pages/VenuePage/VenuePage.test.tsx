import { render } from '@redwoodjs/testing/web'

import VenuePage from './VenuePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('VenuePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VenuePage id={42} />)
    }).not.toThrow()
  })
})
