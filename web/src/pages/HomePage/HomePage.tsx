import { CalendarDays, Map, MapPin, Users } from 'lucide-react'

import { Metadata } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import CategoryCard from 'src/components/CategoryCard/CategoryCard'
import FeaturedVenuesCell from 'src/components/FeaturedVenuesCell'
import HeroSkewSlider from 'src/components/HeroSkewSlider/HeroSkewSlider'
import LatestPlayerPostsCell from 'src/components/LatestPlayerPostsCell'
import UpcomingGameSessionsCell from 'src/components/UpcomingGameSessionsCell'
import { routePath } from 'src/lib/routes'

const quickActions = [
  [
    'Найти место',
    'Клубы, кафе и антикафе рядом с тобой',
    routePath('venues', '/venues'),
    MapPin,
  ],
  [
    'Найти игроков',
    'Играй своей компанией или собери новую',
    routePath('players', '/players'),
    Users,
  ],
  [
    'Ближайшие игры',
    'Сегодня, завтра и на выходных',
    routePath('games', '/games'),
    CalendarDays,
  ],
  [
    'Карта сообщества',
    'Смотри, что происходит в городе',
    routePath('venues', '/venues'),
    Map,
  ],
]

const HomePage = () => {
  return (
    <>
      <Metadata
        title="Играй вместе"
        description="Городская платформа настольных игр"
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <HeroSkewSlider />

        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map(([title, description, to, Icon]) => (
            <Button
              key={title as string}
              to={to as string}
              variant="secondary"
              className="h-auto justify-start p-4 text-left"
            >
              <Icon className="h-8 w-8 shrink-0 text-orange-300" />
              <span>
                <span className="block text-sm font-black text-white">
                  {title}
                </span>
                <span className="mt-1 block text-xs font-medium leading-5 text-slate-400">
                  {description}
                </span>
              </span>
            </Button>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-black text-white">
            Выбери свое направление
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <CategoryCard category="BOARD_GAMES" />
            <CategoryCard category="TTRPG" />
            <CategoryCard category="MAFIA" />
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-black text-white">
              Ближайшие игры и события
            </h2>
            <Button to={routePath('games', '/games')} variant="ghost" size="sm">
              Смотреть все
            </Button>
          </div>
          <UpcomingGameSessionsCell />
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-black text-white">Клубы и площадки</h2>
            <Button
              to={routePath('venues', '/venues')}
              variant="ghost"
              size="sm"
            >
              Смотреть все
            </Button>
          </div>
          <FeaturedVenuesCell />
        </section>

        <section className="mb-12 mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-black text-white">
              Найди игроков или собери группу
            </h2>
            <Button
              to={routePath('players', '/players')}
              variant="ghost"
              size="sm"
            >
              Смотреть все
            </Button>
          </div>
          <LatestPlayerPostsCell />
        </section>
      </div>
    </>
  )
}

export default HomePage
