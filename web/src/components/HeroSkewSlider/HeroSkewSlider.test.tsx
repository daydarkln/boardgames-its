import { render } from '@redwoodjs/testing/web'

import HeroSkewSlider from './HeroSkewSlider'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HeroSkewSlider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HeroSkewSlider />)
    }).not.toThrow()
  })
})
