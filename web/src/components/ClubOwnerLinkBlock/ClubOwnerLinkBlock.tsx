import { ExternalLink, Store } from 'lucide-react'

import Button from 'src/components/Button/Button'
import { routePath } from 'src/lib/routes'

const ClubOwnerLinkBlock = () => {
  return (
    <section className="mt-5 overflow-hidden rounded-lg border border-emerald-300/20 bg-emerald-500/10 p-5 shadow-lg shadow-emerald-950/20 sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-300/15 text-emerald-200">
            <Store className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-black uppercase text-emerald-200">
              Для владельцев клубов
            </p>
            <h2 className="mt-2 font-heading text-2xl font-medium leading-none text-white">
              Разместите ссылку на ресурс у себя
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-slate-300">
              Если вы представляете клуб, кафе или игровую площадку, добавьте
              ссылку на этот сервис на сайт, в соцсети или описание сообщества.
              Так игрокам проще найти расписание, записаться на встречи и прийти
              к вам за стол.
            </p>
          </div>
        </div>
        <Button
          to={routePath('about', '/about')}
          variant="secondary"
          className="shrink-0"
        >
          <ExternalLink className="h-4 w-4" />О проекте
        </Button>
      </div>
    </section>
  )
}

export default ClubOwnerLinkBlock
