import { Link, routes } from '@redwoodjs/router'

import Card from 'src/components/Card/Card'
import type { CategoryKey } from 'src/lib/categories'
import { categoryMeta } from 'src/lib/categories'

type CategoryCardProps = {
  category?: CategoryKey
}

const CategoryCard = ({ category = 'BOARD_GAMES' }: CategoryCardProps) => {
  const meta = categoryMeta[category]
  const Icon = meta.icon
  const gamesPath =
    typeof routes.games === 'function' ? routes.games() : '/games'

  return (
    <Link to={`${gamesPath}?category=${category}`} className="block h-full">
      <Card
        interactive
        className="relative h-full min-h-44 overflow-hidden p-5"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-32`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,.18),transparent_8rem),linear-gradient(180deg,transparent,rgba(0,0,0,.42))]" />
        <div className="relative flex h-full flex-col">
          <Icon className="h-9 w-9 text-white drop-shadow" />
          <h3 className="mt-5 font-heading text-2xl font-medium uppercase italic text-white">
            {meta.label}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-5 text-slate-300">
            {meta.description}
          </p>
          <span className="border-white/14 mt-auto inline-flex w-fit rounded-lg border bg-slate-950/40 px-3 py-2 text-xs font-black text-white">
            {category === 'TTRPG'
              ? 'Найти группу'
              : category === 'MAFIA'
                ? 'Найти стол'
                : 'Смотреть игры'}
          </span>
        </div>
      </Card>
    </Link>
  )
}

export default CategoryCard
