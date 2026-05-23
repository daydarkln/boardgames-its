import { routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import Card from 'src/components/Card/Card'
import PageHeader from 'src/components/PageHeader/PageHeader'

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
          ['Игры', routes.adminGameSessions()],
          ['Площадки', routes.adminVenues()],
          ['Пользователи', routes.adminUsers()],
          ['Объявления', routes.adminPlayerPosts()],
        ].map(([title, to]) => (
          <Card key={title} className="p-5">
            <h2 className="text-xl font-black text-white">{title}</h2>
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
