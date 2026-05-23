import type {
  MyGameSessionsQuery,
  MyGameSessionsQueryVariables,
} from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Badge from 'src/components/Badge/Badge'
import Button from 'src/components/Button/Button'
import EmptyState from 'src/components/EmptyState/EmptyState'
import GameSessionCard from 'src/components/GameSessionCard/GameSessionCard'
import { formatStatus } from 'src/lib/categories'

export const QUERY: TypedDocumentNode<
  MyGameSessionsQuery,
  MyGameSessionsQueryVariables
> = gql`
  query MyGameSessionsQuery {
    myGameSessions {
      id
      title
      description
      category
      date
      startTime
      maxPlayers
      status
      experienceLevel
      imageUrl
      requiresApproval
      venue {
        name
        district
        address
      }
      registrations {
        id
        status
        user {
          id
          name
          email
        }
      }
    }
  }
`

const CANCEL_GAME = gql`
  mutation CancelMyGameSessionMutation($id: Int!) {
    cancelGameSession(id: $id) {
      id
      status
    }
  }
`

const APPROVE_REGISTRATION = gql`
  mutation ApproveMyGameRegistrationMutation($id: Int!) {
    approveGameRegistration(id: $id) {
      id
      status
    }
  }
`

const DECLINE_REGISTRATION = gql`
  mutation DeclineMyGameRegistrationMutation($id: Int!) {
    declineGameRegistration(id: $id) {
      id
      status
    }
  }
`

export const Loading = () => (
  <div className="bg-white/8 h-72 animate-pulse rounded-lg" />
)

export const Empty = () => <EmptyState title="Вы пока не создавали игры" />

export const Failure = ({
  error,
}: CellFailureProps<MyGameSessionsQueryVariables>) => (
  <EmptyState
    title="Не удалось загрузить ваши игры"
    description={error?.message}
  />
)

export const Success = ({
  myGameSessions,
}: CellSuccessProps<MyGameSessionsQuery, MyGameSessionsQueryVariables>) => {
  const refetchQueries = ['MyGameSessionsQuery']
  const [cancelGame, { loading: cancelling }] = useMutation(CANCEL_GAME, {
    refetchQueries,
    onCompleted: () => toast.success('Игра отменена'),
    onError: (error) => toast.error(error.message),
  })
  const [approveRegistration, { loading: approving }] = useMutation(
    APPROVE_REGISTRATION,
    {
      refetchQueries,
      onCompleted: () => toast.success('Заявка подтверждена'),
      onError: (error) => toast.error(error.message),
    }
  )
  const [declineRegistration, { loading: declining }] = useMutation(
    DECLINE_REGISTRATION,
    {
      refetchQueries,
      onCompleted: () => toast.success('Заявка отклонена'),
      onError: (error) => toast.error(error.message),
    }
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {myGameSessions.map((game) => (
        <div
          key={game.id}
          className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/70"
        >
          <GameSessionCard game={game} />
          <div className="grid gap-4 border-t border-white/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold text-slate-200">
                Участники и заявки
              </p>
              <Button
                variant="danger"
                size="sm"
                disabled={cancelling || game.status === 'CANCELLED'}
                onClick={() => cancelGame({ variables: { id: game.id } })}
              >
                Отменить игру
              </Button>
            </div>
            {game.registrations.length > 0 ? (
              <div className="grid gap-2">
                {game.registrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="rounded-lg border border-white/10 bg-white/[0.04] p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-white">
                        {registration.user.name ??
                          registration.user.email ??
                          `Игрок #${registration.user.id}`}
                      </span>
                      <Badge tone="slate">
                        {formatStatus(registration.status)}
                      </Badge>
                    </div>
                    {registration.status === 'PENDING' && (
                      <div className="mt-3 flex gap-2">
                        <Button
                          size="sm"
                          disabled={approving}
                          onClick={() =>
                            approveRegistration({
                              variables: { id: registration.id },
                            })
                          }
                        >
                          Подтвердить
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={declining}
                          onClick={() =>
                            declineRegistration({
                              variables: { id: registration.id },
                            })
                          }
                        >
                          Отклонить
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Пока нет записей на эту игру.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
