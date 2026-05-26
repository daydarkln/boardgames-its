import type {
  CSSProperties,
  KeyboardEvent,
  PointerEvent,
  TouchEvent,
} from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Check, ChevronLeft, ChevronRight } from 'lucide-react'

import { Link } from '@redwoodjs/router'

import { routePath } from 'src/lib/routes'

import './HeroSkewCarousel.css'

type HeroSlideCategory = 'board-games' | 'ttrpg' | 'mafia' | 'support'

export type HeroSlide = {
  id: string
  title: string
  shortTitle?: string
  subtitle: string
  description: string
  bullets?: string[]
  category: HeroSlideCategory
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  imageUrl: string
  imagePosition?: string
  accentRgb: string
  fallbackGradient: string
}

type HeroSkewCarouselProps = {
  slides?: HeroSlide[]
  initialSlideId?: string
}

type HeroSlideLayout = {
  left: number
  width: number
  zIndex: number
}

const swipeThreshold = 48
const activeContentRevealDelayMs = 430
const gamesPath = routePath('games', '/games')
const aboutPath = routePath('about', '/about')
const createGamePath = routePath('accountCreateGame', '/account/create-game')

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 'board-games',
    title: 'Настолки',
    subtitle: 'Сотни игр. Тысячи партий. Твой стол ждет тебя.',
    description: 'Находи партии в клубах, кафе и у игроков рядом с тобой.',
    bullets: [
      'Найди игру по вкусу',
      'Играй в клубах и кафе',
      'Собери компанию за столом',
    ],
    category: 'board-games',
    primaryAction: {
      label: 'Найти игру',
      href: `${gamesPath}?category=BOARD_GAMES`,
    },
    secondaryAction: {
      label: 'Создать игру',
      href: createGamePath,
    },
    imageUrl: '/hero/boardgames.jpg',
    imagePosition: '32% center',
    accentRgb: '129 140 248',
    fallbackGradient:
      'linear-gradient(135deg, #312e81 0%, #075985 48%, #111827 100%)',
  },
  {
    id: 'ttrpg',
    title: 'НРИ',
    subtitle: 'Истории, которые мы создаем вместе.',
    description:
      'D&D, Pathfinder, Call of Cthulhu, авторские миры и one-shot встречи.',
    bullets: ['Найди мастера', 'Собери партию', 'Попробуй one-shot'],
    category: 'ttrpg',
    primaryAction: {
      label: 'Найти группу',
      href: `${gamesPath}?category=TTRPG`,
    },
    secondaryAction: {
      label: 'Создать приключение',
      href: createGamePath,
    },
    imageUrl: '/hero/ttrpg.jpg',
    imagePosition: '44% center',
    accentRgb: '244 63 94',
    fallbackGradient:
      'linear-gradient(135deg, #7f1d1d 0%, #3b0764 52%, #111827 100%)',
  },
  {
    id: 'mafia',
    title: 'Мафия',
    subtitle: 'Доверие. Интуиция. Интрига.',
    description: 'Классические и клубные игры, турниры и вечеринки.',
    bullets: ['Найди стол', 'Присоединись к клубу', 'Играй на выходных'],
    category: 'mafia',
    primaryAction: {
      label: 'Найти стол',
      href: `${gamesPath}?category=MAFIA`,
    },
    secondaryAction: {
      label: 'Создать игру',
      href: createGamePath,
    },
    imageUrl: '/hero/mafia.jpg',
    imagePosition: '58% center',
    accentRgb: '249 115 22',
    fallbackGradient:
      'linear-gradient(135deg, #7c2d12 0%, #111827 54%, #020617 100%)',
  },
  {
    id: 'support',
    title: 'Поддержи проект',
    shortTitle: 'Поддержи',
    subtitle: 'Помоги собрать живую городскую платформу для игроков.',
    description:
      'Подключайся к MVP, создавай первые игры и помогай развивать сообщество.',
    bullets: [
      'Присоединяйся к MVP',
      'Создавай игры и приглашай друзей',
      'Делись обратной связью о сервисе',
    ],
    category: 'support',
    primaryAction: {
      label: 'О проекте',
      href: aboutPath,
    },
    imageUrl: '/hero/community.jpg',
    imagePosition: '46% center',
    accentRgb: '45 212 191',
    fallbackGradient:
      'linear-gradient(135deg, #134e4a 0%, #0f766e 44%, #111827 100%)',
  },
]

const getInitialIndex = (slides: HeroSlide[], initialSlideId?: string) => {
  if (slides.length === 0) {
    return 0
  }

  const requestedIndex = initialSlideId
    ? slides.findIndex((slide) => slide.id === initialSlideId)
    : 0

  return requestedIndex >= 0 ? requestedIndex : 0
}

const getCarouselLayouts = ({
  containerWidth,
  activeIndex,
  count,
}: {
  containerWidth: number
  activeIndex: number
  count: number
}): HeroSlideLayout[] => {
  if (containerWidth <= 0 || count <= 0) {
    return []
  }

  if (count === 1) {
    return [
      {
        left: 0,
        width: containerWidth,
        zIndex: 30,
      },
    ]
  }

  /*
    ВАЖНО:
    slideSkewPx должен совпадать с CSS-переменной --slide-skew.
    Если в CSS --slide-skew: 34px, здесь тоже должна быть близкая величина.
  */
  const slideSkewPx = Math.max(26, Math.min(containerWidth * 0.022, 38))

  /*
    Это именно ВИДИМЫЙ зазор между скошенными гранями,
    а не gap между прямоугольными layout-box.
  */
  const visualGapPx = Math.max(8, Math.min(containerWidth * 0.008, 14))

  /*
    Чтобы между скошенными видимыми гранями был небольшой зазор,
    прямоугольные боксы должны немного заходить друг на друга.
  */
  const overlap = Math.max(0, slideSkewPx - visualGapPx)

  const activeWidth = Math.min(containerWidth * 0.48, 760)

  const collapsedWidth = Math.max(Math.min(containerWidth * 0.13, 210), 132)

  const widths = Array.from({ length: count }, (_, index) =>
    index === activeIndex ? activeWidth : collapsedWidth
  )

  const getTotalWidth = () =>
    widths.reduce((sum, width) => sum + width, 0) - overlap * (count - 1)

  let totalWidth = getTotalWidth()

  if (totalWidth > containerWidth) {
    const widthsSum = widths.reduce((sum, width) => sum + width, 0)
    const targetWidthsSum = containerWidth + overlap * (count - 1)
    const scale = targetWidthsSum / widthsSum

    for (let index = 0; index < widths.length; index += 1) {
      widths[index] = widths[index] * scale
    }

    totalWidth = getTotalWidth()
  }

  const start = Math.max(0, (containerWidth - totalWidth) / 2)

  let currentLeft = start

  return widths.map((width, index) => {
    const distanceFromActive = Math.abs(index - activeIndex)

    const layout = {
      left: currentLeft,
      width,
      /*
        Активный выше, но не настолько, чтобы визуально "съедать" соседей.
        Сами видимые области не должны пересекаться из-за clip-path.
      */
      zIndex: index === activeIndex ? 20 : 10 - distanceFromActive,
    }

    currentLeft += width - overlap

    return layout
  })
}

const HeroSkewCarousel = ({
  slides = defaultHeroSlides,
  initialSlideId,
}: HeroSkewCarouselProps) => {
  const initialIndex = getInitialIndex(slides, initialSlideId)

  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [revealedIndex, setRevealedIndex] = useState<number | null>(
    initialIndex
  )
  const [trackWidth, setTrackWidth] = useState(0)

  const trackRef = useRef<HTMLDivElement | null>(null)
  const startXRef = useRef<number | null>(null)
  const startYRef = useRef<number | null>(null)
  const hasInitializedRevealRef = useRef(false)

  const layouts = useMemo(
    () =>
      getCarouselLayouts({
        containerWidth: trackWidth,
        activeIndex,
        count: slides.length,
      }),
    [activeIndex, slides.length, trackWidth]
  )

  useEffect(() => {
    const element = trackRef.current

    if (!element) {
      return
    }

    const updateTrackWidth = () => {
      setTrackWidth(element.clientWidth)
    }

    updateTrackWidth()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateTrackWidth)

      return () => {
        window.removeEventListener('resize', updateTrackWidth)
      }
    }

    const resizeObserver = new ResizeObserver(updateTrackWidth)

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    setActiveIndex((currentIndex) => {
      if (slides.length === 0) {
        return 0
      }

      return currentIndex < slides.length
        ? currentIndex
        : getInitialIndex(slides, initialSlideId)
    })
  }, [initialSlideId, slides])

  useEffect(() => {
    if (!hasInitializedRevealRef.current) {
      hasInitializedRevealRef.current = true
      setRevealedIndex(activeIndex)
      return
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setRevealedIndex(activeIndex)
      return
    }

    setRevealedIndex(null)

    const revealTimeoutId = window.setTimeout(() => {
      setRevealedIndex(activeIndex)
    }, activeContentRevealDelayMs)

    return () => window.clearTimeout(revealTimeoutId)
  }, [activeIndex])

  const activateSlide = useCallback(
    (index: number) => {
      if (slides.length === 0) {
        return
      }

      setActiveIndex((index + slides.length) % slides.length)
    },
    [slides.length]
  )

  const goNext = useCallback(() => {
    setActiveIndex((currentIndex) =>
      slides.length === 0 ? 0 : (currentIndex + 1) % slides.length
    )
  }, [slides.length])

  const goPrevious = useCallback(() => {
    setActiveIndex((currentIndex) =>
      slides.length === 0
        ? 0
        : (currentIndex - 1 + slides.length) % slides.length
    )
  }, [slides.length])

  const handleCarouselKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (slides.length <= 1) {
        return
      }

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault()
          goNext()
          break
        case 'ArrowLeft':
          event.preventDefault()
          goPrevious()
          break
        case 'Home':
          event.preventDefault()
          activateSlide(0)
          break
        case 'End':
          event.preventDefault()
          activateSlide(slides.length - 1)
          break
      }
    },
    [activateSlide, goNext, goPrevious, slides.length]
  )

  const resetSwipe = useCallback(() => {
    startXRef.current = null
    startYRef.current = null
  }, [])

  const startSwipe = useCallback((clientX: number, clientY: number) => {
    startXRef.current = clientX
    startYRef.current = clientY
  }, [])

  const finishSwipe = useCallback(
    (clientX: number, clientY: number) => {
      if (startXRef.current == null || startYRef.current == null) {
        return
      }

      const deltaX = clientX - startXRef.current
      const deltaY = clientY - startYRef.current
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY)
      const isMeaningfulSwipe = Math.abs(deltaX) > swipeThreshold

      if (isHorizontalSwipe && isMeaningfulSwipe) {
        if (deltaX < 0) {
          goNext()
        } else {
          goPrevious()
        }
      }

      resetSwipe()
    },
    [goNext, goPrevious, resetSwipe]
  )

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') {
      return
    }

    if (event.pointerType === 'mouse' && event.button > 0) {
      return
    }

    startSwipe(event.clientX, event.clientY)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') {
      return
    }

    finishSwipe(event.clientX, event.clientY)
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]

    if (touch) {
      startSwipe(touch.clientX, touch.clientY)
    }
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0]

    if (touch) {
      finishSwipe(touch.clientX, touch.clientY)
    }
  }

  if (slides.length === 0) {
    return null
  }

  const hasMultipleSlides = slides.length > 1

  return (
    <section
      className="hero-skew-carousel-shell"
      aria-labelledby="home-hero-title"
    >
      <h1 id="home-hero-title" className="hero-skew-carousel__sr-only">
        Найди настольные игры, НРИ и мафию в своем городе и поддержи проект
      </h1>

      {/* The carousel region owns arrow keys and swipe gestures for the whole composite widget. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="hero-skew-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Основные направления игр"
        onKeyDown={handleCarouselKeyDown}
        onPointerDown={handlePointerDown}
        onPointerCancel={resetSwipe}
        onPointerUp={handlePointerUp}
        onTouchCancel={resetSwipe}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
      >
        <div ref={trackRef} className="hero-skew-carousel__track">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex
            const isActiveContentVisible = revealedIndex === index
            const layout = layouts[index]

            const slideStyle = {
              '--slide-accent': slide.accentRgb,
              '--slide-image': `url(${slide.imageUrl})`,
              '--slide-position': slide.imagePosition ?? 'center center',
              '--slide-fallback': slide.fallbackGradient,
              left: layout ? `${layout.left}px` : 0,
              width: layout ? `${layout.width}px` : 0,
              zIndex: layout?.zIndex ?? 1,
            } as CSSProperties

            return (
              <article
                key={slide.id}
                className="hero-skew-carousel__slide"
                data-active={isActive}
                aria-current={isActive ? 'true' : undefined}
                aria-label={slide.title}
                style={slideStyle}
              >
                <div className="hero-skew-carousel__panel">
                  <div className="hero-skew-carousel__media" />
                  <div className="hero-skew-carousel__shade" />
                  <div className="hero-skew-carousel__accent" />
                  <div className="hero-skew-carousel__shine" />

                  {!isActive ? (
                    <button
                      type="button"
                      className="hero-skew-carousel__slide-activator"
                      aria-label={`Открыть слайд ${slide.title}`}
                      onClick={() => activateSlide(index)}
                    />
                  ) : null}

                  {isActive && isActiveContentVisible ? (
                    <div
                      className="hero-skew-carousel__content hero-skew-carousel__content--active"
                      data-visible={isActiveContentVisible}
                      aria-hidden={!isActiveContentVisible}
                    >
                      <div className="hero-skew-carousel__copy">
                        <span className="hero-skew-carousel__label">
                          {String(index + 1).padStart(2, '0')} /{' '}
                          {String(slides.length).padStart(2, '0')}
                        </span>

                        <h2 className="hero-skew-carousel__title">
                          {slide.title}
                        </h2>

                        <p className="hero-skew-carousel__subtitle">
                          {slide.subtitle}
                        </p>

                        {/* <p className="hero-skew-carousel__description">
                          {slide.description}
                        </p> */}

                        {slide.bullets?.length ? (
                          <ul className="hero-skew-carousel__bullets">
                            {slide.bullets.map((bullet) => (
                              <li key={bullet}>
                                <Check aria-hidden="true" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        <div className="hero-skew-carousel__actions">
                          <Link
                            to={slide.primaryAction.href}
                            className="hero-skew-carousel__cta hero-skew-carousel__cta--primary"
                          >
                            {slide.primaryAction.label}
                          </Link>

                          {slide.secondaryAction ? (
                            <Link
                              to={slide.secondaryAction.href}
                              className="hero-skew-carousel__cta hero-skew-carousel__cta--secondary"
                            >
                              {slide.secondaryAction.label}
                            </Link>
                          ) : null}
                        </div>
                      </div>

                      {hasMultipleSlides ? (
                        <div
                          className="hero-skew-carousel__dots"
                          aria-label="Выбор слайда"
                        >
                          {slides.map((dotSlide, dotIndex) => (
                            <button
                              key={dotSlide.id}
                              type="button"
                              aria-label={`Перейти к слайду ${dotSlide.title}`}
                              aria-current={
                                dotIndex === activeIndex ? 'true' : undefined
                              }
                              onClick={() => activateSlide(dotIndex)}
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="hero-skew-carousel__content hero-skew-carousel__content--inactive">
                      <span className="hero-skew-carousel__inactive-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div>
                        <h2 className="hero-skew-carousel__inactive-title">
                          {slide.shortTitle ?? slide.title}
                        </h2>

                        {/* <p className="hero-skew-carousel__inactive-text">
                          {slide.description}
                        </p> */}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        {hasMultipleSlides ? (
          <>
            <button
              type="button"
              className="hero-skew-carousel__nav hero-skew-carousel__nav--previous"
              aria-label="Предыдущий слайд"
              onClick={goPrevious}
            >
              <ChevronLeft aria-hidden="true" />
            </button>

            <button
              type="button"
              className="hero-skew-carousel__nav hero-skew-carousel__nav--next"
              aria-label="Следующий слайд"
              onClick={goNext}
            >
              <ChevronRight aria-hidden="true" />
            </button>

            <div className="hero-skew-carousel__mobile-controls">
              <button
                type="button"
                className="hero-skew-carousel__mobile-arrow"
                aria-label="Предыдущий слайд"
                onClick={goPrevious}
              >
                <ChevronLeft aria-hidden="true" />
              </button>

              <div
                className="hero-skew-carousel__thumbs"
                aria-label="Выбор слайда"
              >
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Перейти к слайду ${slide.title}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                    onClick={() => activateSlide(index)}
                  >
                    {slide.shortTitle ?? slide.title}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="hero-skew-carousel__mobile-arrow"
                aria-label="Следующий слайд"
                onClick={goNext}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

export default HeroSkewCarousel
