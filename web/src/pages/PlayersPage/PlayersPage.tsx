import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import LatestPlayerPostsCell from 'src/components/LatestPlayerPostsCell'
import PageHeader from 'src/components/PageHeader/PageHeader'
import Select from 'src/components/Select/Select'
import { routePath } from 'src/lib/routes'

const PlayersPage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Metadata title="Игроки" description="Поиск игроков и групп" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Комьюнити"
          title="Найти игроков"
          description="Объявления для поиска партии, группы или недостающих игроков."
          actions={
            <Button
              to={
                isAuthenticated
                  ? routePath('accountCreateGame', '/account/create-game')
                  : routePath('login', '/login')
              }
            >
              Создать игру
            </Button>
          }
        />
        <div className="glass-panel mb-6 grid gap-3 rounded-xl p-3 md:grid-cols-[1fr_1fr_1fr_auto]">
          <Select>
            <option value="">Все районы</option>
            <option value="Тверская">Тверская</option>
            <option value="Бауманская">Бауманская</option>
            <option value="Стартаковская">Стартаковская</option>
          </Select>
          <Select>
            <option value="">Тип игры</option>
            <option value="BOARD_GAMES">Настолки</option>
            <option value="TTRPG">НРИ</option>
            <option value="MAFIA">Мафия</option>
          </Select>
          <Select>
            <option value="">Опыт</option>
            <option value="BEGINNER">Новичок</option>
            <option value="INTERMEDIATE">Средний</option>
            <option value="ADVANCED">Продвинутый</option>
          </Select>
          <label className="flex h-11 items-center gap-3 rounded-lg border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-slate-200">
            <input type="checkbox" />
            Онлайн и офлайн
          </label>
        </div>
        <LatestPlayerPostsCell />
      </div>
    </>
  )
}

export default PlayersPage
