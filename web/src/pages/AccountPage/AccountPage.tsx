import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import Card from 'src/components/Card/Card'
import PageHeader from 'src/components/PageHeader/PageHeader'
import { routePath } from 'src/lib/routes'

const AccountPage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <Metadata title="Кабинет" description="Личный кабинет игрока" />

      <PageHeader
        eyebrow="Профиль"
        title={`Привет, ${currentUser?.name ?? 'игрок'}`}
        description="Здесь собраны ваши игры, записи и профиль сообщества."
        actions={
          <Button to={routePath('accountCreateGame', '/account/create-game')}>
            Создать игру
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          [
            'Мои игры',
            'Встречи, которые вы организуете',
            routePath('accountMyGames', '/account/my-games'),
          ],
          [
            'Мои записи',
            'Игры, где вы участник',
            routePath('accountMyRegistrations', '/account/my-registrations'),
          ],
          [
            'Профиль',
            'Город, район и игровой опыт',
            routePath('accountProfile', '/account/profile'),
          ],
          [
            'Избранное',
            'Сохраненные встречи',
            routePath('accountFavorites', '/account/favorites'),
          ],
        ].map(([title, description, to]) => (
          <Card key={title} interactive className="p-5">
            <h2 className="font-heading text-xl font-medium leading-none text-white">
              {title}
            </h2>
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
