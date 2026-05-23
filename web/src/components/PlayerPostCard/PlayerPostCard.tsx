import { MapPin, Monitor, Users } from 'lucide-react'

import Badge from 'src/components/Badge/Badge'
import Card from 'src/components/Card/Card'
import { formatCategory, formatExperience } from 'src/lib/categories'

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

  return (
    <Card interactive className="p-4">
      <div className="flex flex-wrap gap-2">
        <Badge tone={tone}>{formatCategory(post.category)}</Badge>
        <Badge tone={post.isOnline ? 'blue' : 'slate'}>
          {post.isOnline ? 'Онлайн' : 'Офлайн'}
        </Badge>
      </div>
      <h3 className="mt-3 text-lg font-black text-white">{post.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-400">
        {post.description}
      </p>
      <div className="mt-4 grid gap-2 text-sm text-slate-300">
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
      <p className="mt-4 text-xs text-slate-500">
        Автор: {post.author?.name ?? 'Игрок сообщества'}
      </p>
    </Card>
  )
}

export default PlayerPostCard
