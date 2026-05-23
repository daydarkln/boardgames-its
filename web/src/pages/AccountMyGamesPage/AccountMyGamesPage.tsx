import { Metadata } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import MyGameSessionsCell from 'src/components/MyGameSessionsCell'
import PageHeader from 'src/components/PageHeader/PageHeader'
import { routePath } from 'src/lib/routes'

const AccountMyGamesPage = () => {
  return (
    <>
      <Metadata title="Мои игры" description="Созданные мной игры" />

      <PageHeader
        eyebrow="Кабинет"
        title="Мои игры"
        description="Игры, которые вы создали как организатор."
        actions={
          <Button to={routePath('accountCreateGame', '/account/create-game')}>
            Создать игру
          </Button>
        }
      />
      <MyGameSessionsCell />
    </>
  )
}

export default AccountMyGamesPage
