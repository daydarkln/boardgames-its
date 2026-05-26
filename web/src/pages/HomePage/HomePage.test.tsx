import { render, screen } from '@redwoodjs/testing/web'

import HomePage from './HomePage'

jest.mock('@primereact/headless/timeline', () => ({
  useTimeline: () => ({
    attrs: {
      align: 'alternate',
      orientation: 'vertical',
    },
  }),
}))

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })

  it('explains what the service is for', () => {
    render(<HomePage />)

    expect(
      screen.getByText('Городская платформа для настолок, НРИ и мафии')
    ).toBeInTheDocument()
  })
})
