import { useEffect, useRef } from 'react'

import { Form, Label, TextField, FieldError } from '@redwoodjs/forms'
import { Link, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import AuthShell from 'src/components/AuthShell/AuthShell'
import Button from 'src/components/Button/Button'
import { notify } from 'src/components/ToastProvider/ToastProvider'
import { routePath } from 'src/lib/routes'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routePath('home', '/'))
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef?.current?.focus()
  }, [])

  const onSubmit = async (data: { email: string }) => {
    const response = await forgotPassword(data.email)

    if (response.error) {
      notify.error(response.error)
    } else {
      notify.success('Ссылка для сброса пароля отправлена на ' + response.email)
      navigate(routePath('login', '/login'))
    }
  }

  return (
    <>
      <Metadata title="Восстановление пароля" />

      <AuthShell
        title="Восстановление пароля"
        description="Укажите email, и мы отправим ссылку для сброса пароля."
        activeTab="reset"
        footer={
          <Link to={routePath('login', '/login')} className="rw-link">
            Вернуться ко входу
          </Link>
        }
      >
        <Form onSubmit={onSubmit} className="grid gap-4">
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

          <Button type="submit" className="w-full">
            Отправить
          </Button>
        </Form>
      </AuthShell>
    </>
  )
}

export default ForgotPasswordPage
