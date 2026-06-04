import { render, screen } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './VenueCell'
import { standard } from './VenueCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('VenueCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure id={42} error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success id={42} venue={standard().venue} />)
    }).not.toThrow()
  })

  it('hides the address block when a venue has no address', async () => {
    const venue = { ...standard().venue, address: null }

    render(<Success id={42} venue={venue} />)

    expect(screen.getByText('Board Room')).toBeInTheDocument()
    expect(
      screen.queryByText('ул. Большая Садовая, 56')
    ).not.toBeInTheDocument()
  })
})
