import { render } from '@redwoodjs/testing/web'

import EmptyState from './EmptyState'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EmptyState', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmptyState />)
    }).not.toThrow()
  })
})
