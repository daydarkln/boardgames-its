import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'

import { navigate, useLocation } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import GameSessionsCell from 'src/components/GameSessionsCell'
import PageHeader from 'src/components/PageHeader/PageHeader'
import Select from 'src/components/Select/Select'
import type { CategoryKey } from 'src/lib/categories'
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

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextCategory = event.target.value as CategoryKey | ''
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
          <Select value={category} onChange={handleCategoryChange}>
            <option value="">Все направления</option>
            <option value="BOARD_GAMES">Настолки</option>
            <option value="TTRPG">НРИ</option>
            <option value="MAFIA">Мафия</option>
          </Select>
          <Select
            value={filters.experienceLevel}
            onChange={(event) =>
              setFilter('experienceLevel', event.target.value)
            }
          >
            <option value="">Любой опыт</option>
            <option value="BEGINNER">Новичок</option>
            <option value="INTERMEDIATE">Средний</option>
            <option value="ADVANCED">Продвинутый</option>
          </Select>
          <Select
            value={filters.district}
            onChange={(event) => setFilter('district', event.target.value)}
          >
            <option value="">Все районы</option>
            <option value="Тверская">Тверская</option>
            <option value="Бауманская">Бауманская</option>
            <option value="Стартаковская">Стартаковская</option>
            <option value="Курская">Курская</option>
          </Select>
          <label className="flex h-11 items-center gap-3 rounded-lg border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-slate-200">
            <input
              type="checkbox"
              checked={filters.hasSeats}
              onChange={(event) => setFilter('hasSeats', event.target.checked)}
            />
            Есть свободные места
          </label>
        </div>
        <GameSessionsCell input={input} />
      </div>
    </>
  )
}

export default GamesPage
