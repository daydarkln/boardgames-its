import { render, screen } from '@redwoodjs/testing/web'

import ClubOwnerLinkBlock from './ClubOwnerLinkBlock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ClubOwnerLinkBlock', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClubOwnerLinkBlock />)
    }).not.toThrow()
  })

  it('asks club owners to publish the service link', () => {
    render(<ClubOwnerLinkBlock />)

    expect(
      screen.getByText('Разместите ссылку на ресурс у себя')
    ).toBeInTheDocument()
  })
})
