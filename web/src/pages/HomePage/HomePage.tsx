import { Metadata } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import CategoryCard from 'src/components/CategoryCard/CategoryCard'
import ClubOwnerLinkBlock from 'src/components/ClubOwnerLinkBlock/ClubOwnerLinkBlock'
import FeaturedVenuesCell from 'src/components/FeaturedVenuesCell'
import HeroSkewCarousel from 'src/components/HeroSkewCarousel/HeroSkewCarousel'
import HomeIntroBlock from 'src/components/HomeIntroBlock/HomeIntroBlock'
import LatestPlayerPostsCell from 'src/components/LatestPlayerPostsCell'
import UpcomingGameSessionsCell from 'src/components/UpcomingGameSessionsCell'
import { routePath } from 'src/lib/routes'

const HomePage = () => {
  return (
    <>
      <Metadata
        title="Играй вместе"
        description="Городская платформа настольных игр"
      />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <HeroSkewCarousel />

        <HomeIntroBlock />

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-medium leading-none text-white sm:text-3xl">
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
            <h2 className="font-heading text-2xl font-medium leading-none text-white sm:text-3xl">
              Ближайшие игры
            </h2>
            <Button to={routePath('games', '/games')} variant="ghost" size="sm">
              Смотреть все
            </Button>
          </div>
          <UpcomingGameSessionsCell />
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="font-heading text-2xl font-medium leading-none text-white sm:text-3xl">
              Клубы и площадки
            </h2>
            <Button
              to={routePath('venues', '/venues')}
              variant="ghost"
              size="sm"
            >
              Смотреть все
            </Button>
          </div>
          <FeaturedVenuesCell />
          <ClubOwnerLinkBlock />
        </section>

        <section className="mb-12 mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="font-heading text-2xl font-medium leading-none text-white sm:text-3xl">
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
