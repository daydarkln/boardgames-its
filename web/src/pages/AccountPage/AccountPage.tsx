import { routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import Card from 'src/components/Card/Card'
import PageHeader from 'src/components/PageHeader/PageHeader'

const AccountPage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <Metadata title="Кабинет" description="Личный кабинет игрока" />

      <PageHeader
        eyebrow="Профиль"
        title={`Привет, ${currentUser?.name ?? 'игрок'}`}
        description="Здесь собраны ваши игры, записи и профиль сообщества."
        actions={<Button to={routes.accountCreateGame()}>Создать игру</Button>}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          [
            'Мои игры',
            'Встречи, которые вы организуете',
            routes.accountMyGames(),
          ],
          [
            'Мои записи',
            'Игры, где вы участник',
            routes.accountMyRegistrations(),
          ],
          ['Профиль', 'Город, район и игровой опыт', routes.accountProfile()],
        ].map(([title, description, to]) => (
          <Card key={title} interactive className="p-5">
            <h2 className="text-xl font-black text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {description}
            </p>
            <Button to={to} variant="secondary" size="sm" className="mt-5">
              Открыть
            </Button>
          </Card>
        ))}
      </div>
    </>
  )
}

export default AccountPage
