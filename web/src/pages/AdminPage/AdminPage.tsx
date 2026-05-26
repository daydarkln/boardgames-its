import { Metadata } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import Card from 'src/components/Card/Card'
import PageHeader from 'src/components/PageHeader/PageHeader'
import { routePath } from 'src/lib/routes'

const AdminPage = () => {
  return (
    <>
      <Metadata title="Админка" description="Администрирование сервиса" />

      <PageHeader
        eyebrow="Admin"
        title="Управление MVP"
        description="Scaffold-разделы Redwood для модерации игр, площадок, пользователей и объявлений."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Игры', routePath('adminGameSessions', '/admin/games')],
          ['Площадки', routePath('adminVenues', '/admin/venues')],
          ['Пользователи', routePath('adminUsers', '/admin/users')],
          ['Объявления', routePath('adminPlayerPosts', '/admin/player-posts')],
        ].map(([title, to]) => (
          <Card key={title} className="p-5">
            <h2 className="font-heading text-xl font-medium leading-none text-white">
              {title}
            </h2>
            <Button to={to} variant="secondary" size="sm" className="mt-5">
              Открыть
            </Button>
          </Card>
        ))}
      </div>
    </>
  )
}

export default AdminPage
