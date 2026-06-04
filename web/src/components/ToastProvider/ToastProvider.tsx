import { useEffect, useState } from 'react'

import { CheckCircle2, Info, XCircle } from 'lucide-react'
import { Toast } from 'radix-ui'

import { cn } from 'src/lib/cn'

type ToastTone = 'success' | 'error' | 'info'

type ToastMessage = {
  id: number
  title: string
  description?: string
  tone: ToastTone
}

type ToastInput = Omit<ToastMessage, 'id'>

const listeners = new Set<(toast: ToastInput) => void>()

const emit = (toast: ToastInput) => {
  listeners.forEach((listener) => listener(toast))
}

export const notify = {
  success: (title: string, description?: string) =>
    emit({ title, description, tone: 'success' }),
  error: (title: string, description?: string) =>
    emit({ title, description, tone: 'error' }),
  info: (title: string, description?: string) =>
    emit({ title, description, tone: 'info' }),
}

const toneClasses = {
  success: 'border-emerald-300/25 bg-emerald-950/85 text-emerald-50',
  error: 'border-rose-300/25 bg-rose-950/88 text-rose-50',
  info: 'border-violet-300/25 bg-slate-950/92 text-slate-50',
}

const toneIcons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const ToastProvider = () => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  useEffect(() => {
    const listener = (toast: ToastInput) => {
      setMessages((current) => [
        ...current,
        {
          ...toast,
          id: Date.now() + Math.random(),
        },
      ])
    }

    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }, [])

  return (
    <Toast.Provider swipeDirection="right" duration={5000}>
      {messages.map((message) => {
        const Icon = toneIcons[message.tone]

        return (
          <Toast.Root
            key={message.id}
            className={cn(
              'grid grid-cols-[auto_1fr] gap-x-3 rounded-xl border p-4 shadow-2xl shadow-black/35 backdrop-blur-xl data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
              toneClasses[message.tone]
            )}
            onOpenChange={(open) => {
              if (!open) {
                setMessages((current) =>
                  current.filter((toast) => toast.id !== message.id)
                )
              }
            }}
          >
            <Icon className="mt-0.5 h-4 w-4" />
            <div>
              <Toast.Title className="text-sm font-bold leading-5">
                {message.title}
              </Toast.Title>
              {message.description && (
                <Toast.Description className="mt-1 text-xs font-medium leading-5 opacity-80">
                  {message.description}
                </Toast.Description>
              )}
            </div>
          </Toast.Root>
        )
      })}
      <Toast.Viewport className="fixed right-4 top-4 z-[100] grid w-[calc(100vw-2rem)] max-w-sm gap-3 outline-none" />
    </Toast.Provider>
  )
}

export default ToastProvider
