import { useEffect, useState } from 'react'

import { navigate, useLocation } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Checkbox from 'src/components/Checkbox/Checkbox'
import GameSessionsCell from 'src/components/GameSessionsCell'
import PageHeader from 'src/components/PageHeader/PageHeader'
import Select from 'src/components/Select/Select'
import type { CategoryKey } from 'src/lib/categories'
import { rostovDistrictOptions } from 'src/lib/locations'
import { routePath } from 'src/lib/routes'
import { useUiStore } from 'src/stores/uiStore'

const validCategories: CategoryKey[] = ['BOARD_GAMES', 'TTRPG', 'MAFIA']
const gamesPath = routePath('games', '/games')

const getCategoryFromSearch = (search: string): CategoryKey | '' => {
  const category = new URLSearchParams(search).get('category')

  return category && validCategories.includes(category as CategoryKey)
    ? (category as CategoryKey)
    : ''
}

const GamesPage = () => {
  const location = useLocation()
  const filters = useUiStore((state) => state.gameFilters)
  const setFilter = useUiStore((state) => state.setGameFilter)
  const [category, setCategory] = useState<CategoryKey | ''>(() =>
    getCategoryFromSearch(location.search)
  )

  useEffect(() => {
    const nextCategory = getCategoryFromSearch(location.search)

    setCategory(nextCategory)

    if (filters.category !== nextCategory) {
      setFilter('category', nextCategory)
    }
  }, [filters.category, location.search, setFilter])

  const handleCategoryChange = (nextValue: string) => {
    const nextCategory = nextValue as CategoryKey | ''
    const nextParams = new URLSearchParams(location.search)

    setCategory(nextCategory)
    setFilter('category', nextCategory)

    if (nextCategory) {
      nextParams.set('category', nextCategory)
    } else {
      nextParams.delete('category')
    }

    const nextSearch = nextParams.toString()

    navigate(nextSearch ? `${gamesPath}?${nextSearch}` : gamesPath, {
      replace: true,
    })
  }

  const input = {
    ...(category ? { category } : {}),
    ...(filters.district ? { district: filters.district } : {}),
    ...(filters.experienceLevel
      ? { experienceLevel: filters.experienceLevel }
      : {}),
    ...(filters.hasSeats ? { hasSeats: true } : {}),
  }

  return (
    <>
      <Metadata title="Игры" description="Каталог игровых встреч" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Каталог"
          title="Игры и встречи"
          description="Фильтруйте встречи по направлению, району, опыту и свободным местам."
        />
        <div className="glass-panel mb-6 grid gap-3 rounded-xl p-3 md:grid-cols-4">
          <Select
            value={category}
            onValueChange={handleCategoryChange}
            options={[
              { value: '', label: 'Все направления' },
              { value: 'BOARD_GAMES', label: 'Настолки' },
              { value: 'TTRPG', label: 'НРИ' },
              { value: 'MAFIA', label: 'Мафия' },
            ]}
            aria-label="Направление"
          />
          <Select
            value={filters.experienceLevel}
            onValueChange={(nextValue) =>
              setFilter('experienceLevel', nextValue)
            }
            options={[
              { value: '', label: 'Любой опыт' },
              { value: 'BEGINNER', label: 'Новичок' },
              { value: 'INTERMEDIATE', label: 'Средний' },
              { value: 'ADVANCED', label: 'Продвинутый' },
            ]}
            aria-label="Опыт"
          />
          <Select
            value={filters.district}
            onValueChange={(nextValue) => setFilter('district', nextValue)}
            options={[
              { value: '', label: 'Все районы' },
              ...rostovDistrictOptions,
            ]}
            aria-label="Район"
          />
          <Checkbox
            checked={filters.hasSeats}
            onCheckedChange={(checked) =>
              setFilter('hasSeats', checked === true)
            }
            label="Есть свободные места"
          />
        </div>
        <GameSessionsCell input={input} />
      </div>
    </>
  )
}

export default GamesPage
