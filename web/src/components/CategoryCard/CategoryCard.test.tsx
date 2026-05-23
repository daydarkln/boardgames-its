import { render } from '@redwoodjs/testing/web'

import CategoryCard from './CategoryCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CategoryCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CategoryCard />)
    }).not.toThrow()
  })
})
