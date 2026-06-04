import type { ReactNode } from 'react'

import { X } from 'lucide-react'
import { Dialog } from 'radix-ui'

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
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose?.()
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=closed]:animate-out data-[state=open]:animate-in fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-violet-300/30 bg-slate-950 p-5 shadow-2xl shadow-violet-950/40 outline-none focus-visible:ring-2 focus-visible:ring-violet-300/50'
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <Dialog.Title className="text-lg font-bold text-white">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="hover:bg-white/8 rounded-lg p-2 text-slate-400 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/50"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
