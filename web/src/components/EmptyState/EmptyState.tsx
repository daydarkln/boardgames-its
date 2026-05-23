import type { ReactNode } from 'react'

import { SearchX } from 'lucide-react'

type EmptyStateProps = {
  title?: string
  description?: string
  action?: ReactNode
}

const EmptyState = ({
  title = 'Пока пусто',
  description = 'Здесь появятся данные, когда они будут добавлены.',
  action,
}: EmptyStateProps) => {
  return (
    <div className="border-white/14 rounded-lg border border-dashed bg-white/[0.04] px-6 py-10 text-center">
      <SearchX className="mx-auto h-9 w-9 text-slate-500" />
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export default EmptyState
