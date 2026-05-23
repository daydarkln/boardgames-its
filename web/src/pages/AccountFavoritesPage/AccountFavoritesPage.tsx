import { Metadata } from '@redwoodjs/web'

import FavoriteGameSessionsCell from 'src/components/FavoriteGameSessionsCell'
import PageHeader from 'src/components/PageHeader/PageHeader'

const AccountFavoritesPage = () => {
  return (
    <>
      <Metadata title="Избранное" description="Сохраненные игры" />

      <PageHeader
        eyebrow="Кабинет"
        title="Избранное"
        description="Игры, которые вы сохранили для себя."
      />
      <FavoriteGameSessionsCell />
    </>
  )
}

export default AccountFavoritesPage
