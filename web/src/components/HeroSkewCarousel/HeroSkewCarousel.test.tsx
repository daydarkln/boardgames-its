import { fireEvent, render, screen } from '@redwoodjs/testing/web'

import HeroSkewCarousel from './HeroSkewCarousel'

describe('HeroSkewCarousel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HeroSkewCarousel />)
    }).not.toThrow()
  })

  it('switches slides with carousel keyboard controls', async () => {
    render(<HeroSkewCarousel />)

    const carousel = screen.getByRole('region', {
      name: 'Основные направления игр',
    })

    fireEvent.keyDown(carousel, { key: 'ArrowRight' })

    expect(
      screen.queryByRole('link', { name: 'Найти группу' })
    ).not.toBeInTheDocument()

    expect(
      await screen.findByRole('link', { name: 'Найти группу' })
    ).toBeInTheDocument()

    fireEvent.keyDown(carousel, { key: 'End' })

    expect(
      await screen.findByRole('link', { name: 'О проекте' })
    ).toBeInTheDocument()
  })

  it('activates an inactive slide by click', async () => {
    render(<HeroSkewCarousel />)

    fireEvent.click(screen.getByRole('button', { name: 'Открыть слайд Мафия' }))

    expect(
      screen.queryByRole('link', { name: 'Найти стол' })
    ).not.toBeInTheDocument()

    expect(
      await screen.findByRole('link', { name: 'Найти стол' })
    ).toBeInTheDocument()
  })

  it('switches slides by swipe gesture', async () => {
    render(<HeroSkewCarousel />)

    const carousel = screen.getByRole('region', {
      name: 'Основные направления игр',
    })

    fireEvent.touchStart(carousel, {
      touches: [{ clientX: 220, clientY: 100 }],
    })
    fireEvent.touchEnd(carousel, {
      changedTouches: [{ clientX: 120, clientY: 108 }],
    })

    expect(
      await screen.findByRole('link', { name: 'Найти группу' })
    ).toBeInTheDocument()
  })
})
