import { Metadata } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import PageHeader from 'src/components/PageHeader/PageHeader'

const AboutPage = () => {
  return (
    <>
      <Metadata
        title="О проекте"
        description="О городском игровом сообществе"
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="О проекте"
          title="Городская точка входа в настольное сообщество"
          description="MVP объединяет игровые встречи, площадки и поиск игроков в одном сервисе."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {['Игры', 'Площадки', 'Люди'].map((item) => (
            <Card key={item} className="p-5">
              <h2 className="text-xl font-black text-white">{item}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Единая структура для навигации по городским игровым активностям.
              </p>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default AboutPage
