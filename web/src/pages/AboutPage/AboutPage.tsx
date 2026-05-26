import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import Card from 'src/components/Card/Card'
import PageHeader from 'src/components/PageHeader/PageHeader'
import { routePath } from 'src/lib/routes'

const aboutSections = [
  {
    title: 'Зачем нужен сервис',
    points: [
      'Собрать в одном месте игры, площадки и игроков города.',
      'Сделать запись на игровые встречи понятной и быстрой.',
      'Помочь организаторам и клубам проще находить свою аудиторию.',
    ],
  },
  {
    title: 'Что уже входит в MVP',
    points: [
      'Главная страница с ближайшими играми, площадками и поиском игроков.',
      'Каталог игр, карточки площадок и объявления для сбора группы.',
      'Регистрация, личный кабинет и создание своей игровой встречи.',
    ],
  },
  {
    title: 'Как поддержать сейчас',
    points: [
      'Зарегистрироваться и заполнить профиль, чтобы оживить сообщество.',
      'Создать первую игру или пригласить друзей на существующую встречу.',
      'Дать обратную связь и рассказать о проекте тем, кто собирает игры.',
    ],
  },
]

const AboutPage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Metadata
        title="О проекте"
        description="Зачем нужен сервис и как поддержать его запуск"
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Поддержи проект"
          title="Строим живую городскую платформу для игроков"
          description="Сервис объединяет настолки, НРИ и мафию в одном месте: здесь можно искать встречи, площадки и людей, а не собирать всё по чатам и случайным афишам."
          actions={
            <>
              <Button
                to={
                  isAuthenticated
                    ? routePath('accountCreateGame', '/account/create-game')
                    : routePath('signup', '/signup')
                }
              >
                {isAuthenticated ? 'Создать игру' : 'Присоединиться'}
              </Button>
              <Button to={routePath('games', '/games')} variant="dark">
                Смотреть игры
              </Button>
            </>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {aboutSections.map((section) => (
            <Card key={section.title} className="min-h-56 p-5">
              <h2 className="font-heading text-xl font-medium leading-none text-white">
                {section.title}
              </h2>
              <ul className="mt-4 grid gap-3 text-sm font-medium leading-6 text-slate-300">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default AboutPage
