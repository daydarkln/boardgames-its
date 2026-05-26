import { MapPin, Monitor, Users } from 'lucide-react'

import Badge from 'src/components/Badge/Badge'
import Card from 'src/components/Card/Card'
import { formatCategory, formatExperience } from 'src/lib/categories'
import { cn } from 'src/lib/cn'

type PlayerPostCardProps = {
  post?: {
    id: number
    title: string
    description?: string | null
    category?: string | null
    district?: string | null
    isOnline?: boolean | null
    experienceLevel?: string | null
    neededPlayers?: number | null
    currentPlayers?: number | null
    tags?: string[] | null
    author?: { name?: string | null } | null
  }
}

const PlayerPostCard = ({ post }: PlayerPostCardProps) => {
  if (!post) {
    return (
      <Card className="p-5">
        <p className="text-sm text-slate-400">Объявление пока не выбрано</p>
      </Card>
    )
  }

  const tone =
    post.category === 'TTRPG'
      ? 'rose'
      : post.category === 'MAFIA'
        ? 'orange'
        : 'violet'
  const accent =
    post.category === 'TTRPG'
      ? 'from-rose-500/24 to-violet-950/18'
      : post.category === 'MAFIA'
        ? 'from-orange-500/24 to-stone-950/22'
        : 'from-violet-500/24 to-sky-950/18'

  return (
    <Card interactive className="min-h-[205px] overflow-hidden p-4">
      <div className={cn('absolute inset-0 bg-gradient-to-br', accent)} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(255,255,255,.14),transparent_7rem)]" />
      <div className="flex flex-wrap gap-2">
        <Badge tone={tone}>{formatCategory(post.category)}</Badge>
        <Badge tone={post.isOnline ? 'blue' : 'slate'}>
          {post.isOnline ? 'Онлайн' : 'Офлайн'}
        </Badge>
      </div>
      <h3 className="mt-3 line-clamp-2 font-heading text-lg font-medium leading-tight text-white">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm font-medium leading-5 text-slate-300">
        {post.description}
      </p>
      <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-200">
        <span className="inline-flex items-center gap-2">
          {post.isOnline ? (
            <Monitor className="h-4 w-4 text-sky-300" />
          ) : (
            <MapPin className="h-4 w-4 text-orange-300" />
          )}
          {post.isOnline ? 'Онлайн' : (post.district ?? 'Район уточняется')}
        </span>
        <span className="inline-flex items-center gap-2">
          <Users className="h-4 w-4 text-emerald-300" />
          {post.currentPlayers ?? 0} / {post.neededPlayers ?? 0} игроков ·{' '}
          {formatExperience(post.experienceLevel)}
        </span>
      </div>
      <p className="mt-4 text-xs font-semibold text-slate-500">
        Автор: {post.author?.name ?? 'Игрок сообщества'}
      </p>
    </Card>
  )
}

export default PlayerPostCard
