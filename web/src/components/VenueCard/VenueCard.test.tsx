import { render, screen } from '@redwoodjs/testing/web'

import VenueCard from './VenueCard'

describe('VenueCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VenueCard />)
    }).not.toThrow()
  })

  it('hides the location row when address and district are missing', () => {
    render(
      <VenueCard
        venue={{
          id: 42,
          name: 'Totenot',
          description: 'Клуб настольных игр',
          address: null,
          district: null,
          rating: 0,
          amenities: [],
        }}
      />
    )

    expect(screen.getByText('Totenot')).toBeInTheDocument()
    expect(screen.queryByText('Адрес уточняется')).not.toBeInTheDocument()
  })
})
