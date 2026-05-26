import { CalendarDays, MapPin, PlusCircle, UsersRound } from 'lucide-react'

import Button from 'src/components/Button/Button'
import { routePath } from 'src/lib/routes'

const introItems = [
  {
    title: 'Найти игру',
    description: 'Ближайшие партии по настолкам, НРИ и мафии в одном месте.',
    icon: CalendarDays,
  },
  {
    title: 'Выбрать площадку',
    description: 'Клубы, кафе и антикафе с адресами, районами и удобствами.',
    icon: MapPin,
  },
  {
    title: 'Собрать группу',
    description: 'Объявления игроков, поиск мастера и новые компании рядом.',
    icon: UsersRound,
  },
  {
    title: 'Создать встречу',
    description: 'Организуй стол, укажи места и управляй записью участников.',
    icon: PlusCircle,
  },
]

const HomeIntroBlock = () => {
  return (
    <section className="glass-panel mt-6 overflow-hidden rounded-lg p-5 sm:p-6 lg:p-7">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase text-orange-300">
            Что это за ресурс
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-2xl font-medium leading-none text-white sm:text-4xl">
            Городская платформа для настолок, НРИ и мафии
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-slate-300 sm:text-base">
            Здесь игроки находят встречи, площадки и людей, а организаторы
            собирают столы без долгих переписок. Сервис объединяет городское
            игровое сообщество: от первой партии с новичками до клубных лиг и
            регулярных кампаний.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button to={routePath('games', '/games')}>Смотреть игры</Button>
            <Button
              to={routePath('accountCreateGame', '/account/create-game')}
              variant="dark"
            >
              Создать игру
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {introItems.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-lg border border-white/10 bg-slate-950/55 p-4"
            >
              <Icon className="h-7 w-7 text-orange-300" />
              <h3 className="mt-4 font-heading text-lg font-medium leading-none text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-5 text-slate-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeIntroBlock
