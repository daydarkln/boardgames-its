import { ChevronLeft, ChevronRight } from 'lucide-react'

import Button from 'src/components/Button/Button'
import { heroSlides } from 'src/lib/categories'
import { cn } from 'src/lib/cn'
import { routePath } from 'src/lib/routes'
import { useUiStore } from 'src/stores/uiStore'

const HeroSkewSlider = () => {
  const activeHeroSlide = useUiStore((state) => state.activeHeroSlide)
  const setActiveHeroSlide = useUiStore((state) => state.setActiveHeroSlide)

  const previous = () =>
    setActiveHeroSlide(
      activeHeroSlide === 0 ? heroSlides.length - 1 : activeHeroSlide - 1
    )
  const next = () =>
    setActiveHeroSlide(
      activeHeroSlide === heroSlides.length - 1 ? 0 : activeHeroSlide + 1
    )

  return (
    <section className="relative min-h-[680px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-6 shadow-2xl shadow-black/30 sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(124,58,237,.28),transparent_28%),radial-gradient(circle_at_20%_86%,rgba(249,115,22,.22),transparent_28%)]" />
      <div className="relative flex h-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-300">
              Городская платформа
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
              Играй вместе
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-300">
              Настолки, НРИ, мафия, клубы и люди рядом с тобой.
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              className="bg-white/8 hover:bg-white/12 rounded-lg border border-white/10 p-3 text-white transition"
              onClick={previous}
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="bg-white/8 hover:bg-white/12 rounded-lg border border-white/10 p-3 text-white transition"
              onClick={next}
              aria-label="Следующий слайд"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex min-h-[430px] gap-3 overflow-x-auto pb-4 sm:overflow-visible">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeHeroSlide
            const Icon = slide.icon

            return (
              <button
                key={slide.id}
                type="button"
                className={cn(
                  'clip-skew relative min-w-[210px] overflow-hidden rounded-xl border border-white/10 text-left transition-all duration-300',
                  isActive
                    ? 'min-w-[78vw] flex-[3] border-orange-300/60 shadow-2xl shadow-orange-950/30 sm:min-w-0'
                    : 'flex-[1] grayscale hover:grayscale-0 sm:min-w-0'
                )}
                style={{ backgroundImage: slide.image }}
                onClick={() => setActiveHeroSlide(index)}
              >
                <div className="from-black/82 via-black/28 absolute inset-0 bg-gradient-to-t to-transparent" />
                <div className="relative flex h-full min-h-[430px] flex-col justify-end p-6">
                  <Icon
                    className={cn(
                      'mb-auto h-8 w-8 text-white/80',
                      isActive && 'h-12 w-12 text-orange-200'
                    )}
                  />
                  <span className="mb-4 text-sm font-black text-white/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2
                    className={cn(
                      'font-black uppercase italic text-white',
                      isActive
                        ? 'text-4xl sm:text-6xl'
                        : 'text-2xl sm:[writing-mode:vertical-rl]'
                    )}
                  >
                    {slide.title}
                  </h2>
                  {isActive && (
                    <div className="mt-5 max-w-lg">
                      <p className="text-lg font-semibold text-white">
                        {slide.subtitle}
                      </p>
                      <ul className="mt-4 grid gap-2 text-sm text-slate-200">
                        {slide.bullets.map((bullet) => (
                          <li key={bullet}>• {bullet}</li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button to={routePath('games', '/games')}>
                          Найти игру
                        </Button>
                        <Button
                          to={routePath(
                            'accountCreateGame',
                            '/account/create-game'
                          )}
                          variant="secondary"
                        >
                          Создать стол
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HeroSkewSlider
