import type {
  MyRegistrationsQuery,
  MyRegistrationsQueryVariables,
} from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'

import Badge from 'src/components/Badge/Badge'
import Button from 'src/components/Button/Button'
import EmptyState from 'src/components/EmptyState/EmptyState'
import GameSessionCard from 'src/components/GameSessionCard/GameSessionCard'
import Skeleton from 'src/components/Skeleton/Skeleton'
import { notify } from 'src/components/ToastProvider/ToastProvider'
import { formatStatus } from 'src/lib/categories'

export const QUERY: TypedDocumentNode<
  MyRegistrationsQuery,
  MyRegistrationsQueryVariables
> = gql`
  query MyRegistrationsQuery {
    myRegistrations {
      id
      status
      gameSession {
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
        venue {
          name
          district
          address
        }
        registrations {
          status
        }
      }
    }
  }
`

const CANCEL_REGISTRATION = gql`
  mutation CancelMyRegistrationMutation($id: Int!) {
    cancelGameSessionRegistration(id: $id) {
      id
      status
    }
  }
`

export const Loading = () => <Skeleton className="h-72" />

export const Empty = () => <EmptyState title="Вы пока не записаны на игры" />

export const Failure = ({
  error,
}: CellFailureProps<MyRegistrationsQueryVariables>) => (
  <EmptyState
    title="Не удалось загрузить ваши записи"
    description={error?.message}
  />
)

export const Success = ({
  myRegistrations,
}: CellSuccessProps<MyRegistrationsQuery, MyRegistrationsQueryVariables>) => {
  const [cancelRegistration, { loading }] = useMutation(CANCEL_REGISTRATION, {
    refetchQueries: ['MyRegistrationsQuery'],
    onCompleted: () => notify.success('Запись отменена'),
    onError: (error) => notify.error(error.message),
  })

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {myRegistrations.map((registration) => (
        <div key={registration.id} className="relative">
          <div className="absolute right-3 top-3 z-10">
            <Badge tone="green">{formatStatus(registration.status)}</Badge>
          </div>
          <GameSessionCard game={registration.gameSession} />
          <div className="mt-3">
            <Button
              variant="danger"
              size="sm"
              disabled={loading}
              onClick={() =>
                cancelRegistration({
                  variables: { id: registration.gameSession.id },
                })
              }
            >
              Отменить запись
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
