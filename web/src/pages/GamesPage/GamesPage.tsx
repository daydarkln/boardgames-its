import { Metadata } from '@redwoodjs/web'

import GameSessionsCell from 'src/components/GameSessionsCell'
import PageHeader from 'src/components/PageHeader/PageHeader'
import Select from 'src/components/Select/Select'
import { useUiStore } from 'src/stores/uiStore'

const GamesPage = () => {
  const filters = useUiStore((state) => state.gameFilters)
  const setFilter = useUiStore((state) => state.setGameFilter)

  const input = {
    ...(filters.category ? { category: filters.category } : {}),
    ...(filters.district ? { district: filters.district } : {}),
    ...(filters.experienceLevel
      ? { experienceLevel: filters.experienceLevel }
      : {}),
    ...(filters.hasSeats ? { hasSeats: true } : {}),
  }

  return (
    <>
      <Metadata title="Игры" description="Каталог игровых встреч" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Каталог"
          title="Игры и встречи"
          description="Фильтруйте встречи по направлению, району, опыту и свободным местам."
        />
        <div className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-slate-950/70 p-4 md:grid-cols-4">
          <Select
            value={filters.category}
            onChange={(event) => setFilter('category', event.target.value)}
          >
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
          <label className="bg-white/7 flex h-11 items-center gap-3 rounded-lg border border-white/10 px-4 text-sm font-semibold text-slate-200">
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
