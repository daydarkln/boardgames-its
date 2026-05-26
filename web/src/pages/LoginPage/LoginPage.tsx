import { useEffect, useRef } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import AuthShell from 'src/components/AuthShell/AuthShell'
import { routePath } from 'src/lib/routes'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routePath('home', '/'))
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Вы вошли')
    }
  }

  return (
    <>
      <Metadata title="Вход" />

      <AuthShell
        title="Добро пожаловать в сообщество игроков!"
        description="Войди и найди свою игру."
        activeTab="login"
        footer={
          <span className="text-slate-400">
            Нет аккаунта?{' '}
            <Link
              to={routePath('signup', '/signup')}
              className="font-bold text-violet-200"
            >
              Зарегистрироваться
            </Link>
          </span>
        }
      >
        <Form onSubmit={onSubmit} className="grid gap-4">
          <div>
            <Label
              name="email"
              className="text-sm font-bold text-slate-200"
              errorClassName="text-sm font-bold text-rose-200"
            >
              E-mail или телефон
            </Label>
            <TextField
              name="email"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              ref={emailRef}
              validation={{
                required: {
                  value: true,
                  message: 'Email обязателен',
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Введите корректный email',
                },
              }}
            />
            <FieldError name="email" className="rw-field-error" />
          </div>

          <div>
            <Label
              name="password"
              className="text-sm font-bold text-slate-200"
              errorClassName="text-sm font-bold text-rose-200"
            >
              Пароль
            </Label>
            <PasswordField
              name="password"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              autoComplete="current-password"
              validation={{
                required: {
                  value: true,
                  message: 'Пароль обязателен',
                },
              }}
            />
            <FieldError name="password" className="rw-field-error" />
          </div>

          <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-400">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded" />
              Запомнить меня
            </label>
            <Link to={routePath('signup', '/signup')} className="rw-link">
              Зарегистрироваться
            </Link>
            <Link
              to={routePath('forgotPassword', '/forgot-password')}
              className="text-violet-200"
            >
              Забыли пароль?
            </Link>
          </div>

          <Submit className="rw-button rw-button-blue w-full">Войти</Submit>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
            <span className="h-px flex-1 bg-white/10" />
            или продолжите с
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['VK', 'TG', 'G'].map((item) => (
              <button
                key={item}
                type="button"
                className="h-11 rounded-lg border border-white/10 bg-slate-950/45 text-sm font-black text-slate-200 hover:bg-white/8"
              >
                {item}
              </button>
            ))}
          </div>
        </Form>
      </AuthShell>
    </>
  )
}

export default LoginPage
