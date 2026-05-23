import { Heart, LogIn, XCircle } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'

const REGISTER = gql`
  mutation RegisterForGameSessionMutation($id: Int!) {
    registerForGameSession(id: $id) {
      id
      status
    }
  }
`

const CANCEL_REGISTRATION = gql`
  mutation CancelGameSessionRegistrationMutation($id: Int!) {
    cancelGameSessionRegistration(id: $id) {
      id
      status
    }
  }
`

const ADD_FAVORITE = gql`
  mutation AddFavoriteGameSessionMutation($id: Int!) {
    addFavoriteGameSession(id: $id) {
      id
    }
  }
`

const REMOVE_FAVORITE = gql`
  mutation RemoveFavoriteGameSessionMutation($id: Int!) {
    removeFavoriteGameSession(id: $id) {
      id
    }
  }
`

type RegistrationControlsProps = {
  game: {
    id: number
    status?: string | null
    maxPlayers?: number | null
    registrations?: Array<{
      userId?: number | null
      status?: string | null
    }> | null
    favorites?: Array<{ userId?: number | null }> | null
  }
}

const RegistrationControls = ({ game }: RegistrationControlsProps) => {
  const { isAuthenticated, currentUser } = useAuth()
  const refetchQueries = ['GameSessionQuery']
  const [register, { loading: registering }] = useMutation(REGISTER, {
    refetchQueries,
    onCompleted: () => toast.success('Запись создана'),
    onError: (error) => toast.error(error.message),
  })
  const [cancel, { loading: cancelling }] = useMutation(CANCEL_REGISTRATION, {
    refetchQueries,
    onCompleted: () => toast.success('Запись отменена'),
    onError: (error) => toast.error(error.message),
  })
  const [addFavorite, { loading: addingFavorite }] = useMutation(ADD_FAVORITE, {
    refetchQueries,
    onCompleted: () => toast.success('Добавлено в избранное'),
    onError: (error) => toast.error(error.message),
  })
  const [removeFavorite, { loading: removingFavorite }] = useMutation(
    REMOVE_FAVORITE,
    {
      refetchQueries,
      onCompleted: () => toast.success('Убрано из избранного'),
      onError: (error) => toast.error(error.message),
    }
  )

  if (!isAuthenticated) {
    const loginPath =
      typeof routes.login === 'function' ? routes.login() : '/login'

    return (
      <div className="grid gap-3">
        <p className="text-sm leading-6 text-slate-400">
          Чтобы записаться на игру или добавить ее в избранное, войдите в
          аккаунт.
        </p>
        <Button to={loginPath}>
          <LogIn className="h-4 w-4" />
          Войти или зарегистрироваться
        </Button>
      </div>
    )
  }

  const myRegistration = game.registrations?.find(
    (registration) =>
      registration.userId === currentUser?.id &&
      registration.status !== 'CANCELLED'
  )
  const isFavorite = game.favorites?.some(
    (favorite) => favorite.userId === currentUser?.id
  )
  const approvedCount =
    game.registrations?.filter(
      (registration) =>
        registration.status === 'APPROVED' || registration.status === 'PENDING'
    ).length ?? 0
  const hasSeats = approvedCount < (game.maxPlayers ?? 0)
  const canRegister = !myRegistration && hasSeats && game.status === 'PUBLISHED'

  return (
    <div className="grid gap-3">
      {myRegistration ? (
        <Button
          variant="danger"
          disabled={cancelling}
          onClick={() => cancel({ variables: { id: game.id } })}
        >
          <XCircle className="h-4 w-4" />
          Отменить запись
        </Button>
      ) : (
        <Button
          disabled={!canRegister || registering}
          onClick={() => register({ variables: { id: game.id } })}
        >
          Записаться
        </Button>
      )}
      <Button
        variant="secondary"
        disabled={addingFavorite || removingFavorite}
        onClick={() =>
          isFavorite
            ? removeFavorite({ variables: { id: game.id } })
            : addFavorite({ variables: { id: game.id } })
        }
      >
        <Heart className="h-4 w-4" />
        {isFavorite ? 'Убрать из избранного' : 'В избранное'}
      </Button>
      <Link
        to={
          typeof routes.accountCreateGame === 'function'
            ? routes.accountCreateGame()
            : '/account/create-game'
        }
        className="text-center text-sm font-bold text-violet-200"
      >
        Создать свою игру
      </Link>
    </div>
  )
}

export default RegistrationControls
