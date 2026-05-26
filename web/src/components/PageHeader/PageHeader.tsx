import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow?: string
  title?: string
  description?: string
  actions?: ReactNode
}

const PageHeader = ({
  eyebrow,
  title = 'Раздел',
  description,
  actions,
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-5 pb-6 pt-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 max-w-3xl text-balance font-heading text-3xl font-medium leading-[0.96] text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-400 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
      )}
    </div>
  )
}

export default PageHeader
