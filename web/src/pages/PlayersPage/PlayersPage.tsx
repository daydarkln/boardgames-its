import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import LatestPlayerPostsCell from 'src/components/LatestPlayerPostsCell'
import PageHeader from 'src/components/PageHeader/PageHeader'
import Select from 'src/components/Select/Select'
import Switch from 'src/components/Switch/Switch'
import { rostovDistrictOptions } from 'src/lib/locations'
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
          <Select
            defaultValue=""
            options={[
              { value: '', label: 'Все районы' },
              ...rostovDistrictOptions,
            ]}
            aria-label="Район"
          />
          <Select
            defaultValue=""
            options={[
              { value: '', label: 'Тип игры' },
              { value: 'BOARD_GAMES', label: 'Настолки' },
              { value: 'TTRPG', label: 'НРИ' },
              { value: 'MAFIA', label: 'Мафия' },
            ]}
            aria-label="Тип игры"
          />
          <Select
            defaultValue=""
            options={[
              { value: '', label: 'Опыт' },
              { value: 'BEGINNER', label: 'Новичок' },
              { value: 'INTERMEDIATE', label: 'Средний' },
              { value: 'ADVANCED', label: 'Продвинутый' },
            ]}
            aria-label="Опыт"
          />
          <Switch label="Онлайн и офлайн" defaultChecked />
        </div>
        <LatestPlayerPostsCell />
      </div>
    </>
  )
}

export default PlayersPage
