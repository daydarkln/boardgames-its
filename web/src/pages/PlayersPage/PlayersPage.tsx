import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import LatestPlayerPostsCell from 'src/components/LatestPlayerPostsCell'
import PageHeader from 'src/components/PageHeader/PageHeader'
import { routePath } from 'src/lib/routes'

const PlayersPage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Metadata title="Игроки" description="Поиск игроков и групп" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
        <LatestPlayerPostsCell />
      </div>
    </>
  )
}

export default PlayersPage
