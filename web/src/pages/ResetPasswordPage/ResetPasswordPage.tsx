import { useEffect, useRef, useState } from 'react'

import { Form, Label, PasswordField, FieldError } from '@redwoodjs/forms'
import { Link, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import AuthShell from 'src/components/AuthShell/AuthShell'
import Button from 'src/components/Button/Button'
import { notify } from 'src/components/ToastProvider/ToastProvider'
import { routePath } from 'src/lib/routes'

const ResetPasswordPage = ({ resetToken }: { resetToken: string }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routePath('home', '/'))
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        notify.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [resetToken, validateResetToken])

  const passwordRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      notify.error(response.error)
    } else {
      notify.success('Пароль изменен')
      await reauthenticate()
      navigate(routePath('login', '/login'))
    }
  }

  return (
    <>
      <Metadata title="Новый пароль" />

      <AuthShell
        title="Новый пароль"
        description="Придумайте новый пароль для аккаунта."
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
              name="password"
              className="text-sm font-bold text-slate-200"
              errorClassName="text-sm font-bold text-rose-200"
            >
              Новый пароль
            </Label>
            <PasswordField
              name="password"
              autoComplete="new-password"
              className="site-control mt-2 px-4"
              errorClassName="site-control mt-2 border-rose-300/60 px-4"
              disabled={!enabled}
              ref={passwordRef}
              validation={{
                required: {
                  value: true,
                  message: 'Пароль обязателен',
                },
              }}
            />

            <FieldError name="password" className="site-field-error" />
          </div>

          <Button type="submit" className="w-full" disabled={!enabled}>
            Сохранить
          </Button>
        </Form>
      </AuthShell>
    </>
  )
}

export default ResetPasswordPage
