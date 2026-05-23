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
    <Link to={`${gamesPath}?category=${category}`}>
      <Card interactive className="relative min-h-44 overflow-hidden p-5">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-28`}
        />
        <div className="relative">
          <Icon className="h-9 w-9 text-white" />
          <h3 className="mt-5 text-2xl font-black italic text-white">
            {meta.label}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-5 text-slate-300">
            {meta.description}
          </p>
          <span className="border-white/14 mt-5 inline-flex rounded-lg border px-3 py-2 text-xs font-bold text-white">
            Смотреть игры
          </span>
        </div>
      </Card>
    </Link>
  )
}

export default CategoryCard
