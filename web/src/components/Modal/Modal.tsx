import type { ReactNode } from 'react'

import { X } from 'lucide-react'

import { cn } from 'src/lib/cn'

type ModalProps = {
  open?: boolean
  title?: string
  children?: ReactNode
  onClose?: () => void
}

const Modal = ({
  open = false,
  title = 'Modal',
  children,
  onClose,
}: ModalProps) => {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div
        className={cn(
          'w-full max-w-md rounded-xl border border-violet-300/30 bg-slate-950 p-5 shadow-2xl shadow-violet-950/40'
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button
            type="button"
            className="hover:bg-white/8 rounded-lg p-2 text-slate-400 transition hover:text-white"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
