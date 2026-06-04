import { useEffect, useRef } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import AuthShell from 'src/components/AuthShell/AuthShell'
import Button from 'src/components/Button/Button'
import { notify } from 'src/components/ToastProvider/ToastProvider'
import { routePath } from 'src/lib/routes'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

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
    const response = await signUp({
      username: data.email,
      password: data.password,
      name: data.name,
    })

    if (response.message) {
      notify.info(response.message)
    } else if (response.error) {
      notify.error(response.error)
    } else {
      notify.success('Аккаунт создан')
    }
  }

  return (
    <>
      <Metadata title="Регистрация" />

      <AuthShell
        title="Создать аккаунт"
        description="Регистрация нужна для записи на игры, избранного и личного кабинета."
        activeTab="signup"
        footer={
          <span className="text-slate-400">
            Уже есть аккаунт?{' '}
            <Link to={routePath('login', '/login')} className="rw-link">
              Войти
            </Link>
          </span>
        }
      >
        <Form onSubmit={onSubmit} className="grid gap-4">
          <div>
            <Label
              name="name"
              className="text-sm font-bold text-slate-200"
              errorClassName="text-sm font-bold text-rose-200"
            >
              Имя
            </Label>
            <TextField
              name="name"
              className="site-control mt-2 px-4"
              errorClassName="site-control mt-2 border-rose-300/60 px-4"
            />
            <FieldError name="name" className="site-field-error" />
          </div>

          <div>
            <Label
              name="email"
              className="text-sm font-bold text-slate-200"
              errorClassName="text-sm font-bold text-rose-200"
            >
              Email
            </Label>
            <TextField
              name="email"
              className="site-control mt-2 px-4"
              errorClassName="site-control mt-2 border-rose-300/60 px-4"
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
            <FieldError name="email" className="site-field-error" />
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
              className="site-control mt-2 px-4"
              errorClassName="site-control mt-2 border-rose-300/60 px-4"
              autoComplete="current-password"
              validation={{
                required: {
                  value: true,
                  message: 'Пароль обязателен',
                },
              }}
            />
            <FieldError name="password" className="site-field-error" />
          </div>

          <Button type="submit" className="w-full">
            Зарегистрироваться
          </Button>
        </Form>
      </AuthShell>
    </>
  )
}

export default SignupPage
