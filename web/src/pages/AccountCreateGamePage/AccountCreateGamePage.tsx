import { useState } from 'react'

import {
  CheckboxField,
  FieldError,
  Form,
  Label,
  NumberField,
  SelectField,
  Submit,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { navigate } from '@redwoodjs/router'
import { Metadata, useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Card from 'src/components/Card/Card'
import PageHeader from 'src/components/PageHeader/PageHeader'
import { routePath } from 'src/lib/routes'

const CREATE_GAME_SESSION = gql`
  mutation CreateAccountGameSessionMutation($input: CreateGameSessionInput!) {
    createGameSession(input: $input) {
      id
    }
  }
`

const VENUE_OPTIONS = gql`
  query CreateGameVenueOptionsQuery {
    venues {
      id
      name
      district
      address
    }
  }
`

type FormValues = {
  title: string
  description: string
  category: 'BOARD_GAMES' | 'TTRPG' | 'MAFIA'
  gameSystem?: string
  date: string
  startTime: string
  endTime?: string
  maxPlayers: string
  minPlayers: string
  experienceLevel: string
  isOnline?: boolean
  venueId?: string
  locationDetails?: string
  connectionInfo?: string
  connectionInfoLater?: boolean
  tags?: string
  isPrivate?: boolean
  requiresApproval?: boolean
}

const AccountCreateGamePage = () => {
  const [isOnline, setIsOnline] = useState(false)
  const { data: venueData, loading: venuesLoading } = useQuery(VENUE_OPTIONS)
  const [createGame, { loading }] = useMutation(CREATE_GAME_SESSION, {
    onCompleted: ({ createGameSession }) => {
      toast.success('Игра создана')
      navigate(
        routePath('game', `/games/${createGameSession.id}`, {
          id: createGameSession.id,
        })
      )
    },
    onError: (error) => toast.error(error.message),
  })

  const onSubmit = (data: FormValues) => {
    if (
      data.isOnline &&
      !data.connectionInfo?.trim() &&
      !data.connectionInfoLater
    ) {
      toast.error(
        'Укажите детали подключения или отметьте, что сообщите их позже'
      )
      return
    }

    if (!data.isOnline && !data.venueId && !data.locationDetails?.trim()) {
      toast.error('Для офлайн-игры выберите площадку или укажите адрес')
      return
    }

    const date = new Date(
      `${data.date}T${data.startTime || '00:00'}`
    ).toISOString()
    const connectionInfo = data.connectionInfoLater
      ? 'Организатор сообщит детали подключения после записи'
      : data.connectionInfo

    createGame({
      variables: {
        input: {
          title: data.title,
          description: data.description,
          category: data.category,
          gameSystem: data.gameSystem || null,
          date,
          startTime: data.startTime,
          endTime: data.endTime || null,
          maxPlayers: Number(data.maxPlayers),
          minPlayers: Number(data.minPlayers || 1),
          experienceLevel: data.experienceLevel || 'ANY',
          isOnline: Boolean(data.isOnline),
          isPrivate: Boolean(data.isPrivate),
          requiresApproval: Boolean(data.requiresApproval),
          venueId: data.venueId ? Number(data.venueId) : null,
          locationDetails: data.locationDetails || null,
          connectionInfo: connectionInfo || null,
          tags:
            data.tags
              ?.split(',')
              .map((tag) => tag.trim())
              .filter(Boolean) ?? [],
        },
      },
    })
  }

  return (
    <>
      <Metadata title="Создать игру" description="Создание игровой встречи" />

      <PageHeader
        eyebrow="Организатор"
        title="Создать игру"
        description="Опубликуйте встречу, укажите формат, дату и количество мест."
      />
      <Card className="p-5">
        <Form<FormValues> onSubmit={onSubmit} className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <Label
                name="category"
                className="text-sm font-bold text-slate-200"
              />
              <SelectField
                name="category"
                className="rw-input"
                validation={{ required: true }}
              >
                <option value="BOARD_GAMES">Настолки</option>
                <option value="TTRPG">НРИ</option>
                <option value="MAFIA">Мафия</option>
              </SelectField>
            </div>
            <div>
              <Label
                name="gameSystem"
                className="text-sm font-bold text-slate-200"
              />
              <TextField
                name="gameSystem"
                className="rw-input"
                placeholder="D&D 5e, Крылья, Мафия Classic"
              />
            </div>
            <div>
              <Label name="date" className="text-sm font-bold text-slate-200" />
              <TextField
                name="date"
                type="date"
                className="rw-input"
                validation={{ required: true }}
              />
              <FieldError name="date" className="rw-field-error" />
            </div>
            <div>
              <Label
                name="startTime"
                className="text-sm font-bold text-slate-200"
              />
              <TextField
                name="startTime"
                type="time"
                className="rw-input"
                validation={{ required: true }}
              />
              <FieldError name="startTime" className="rw-field-error" />
            </div>
          </div>

          <div>
            <Label name="title" className="text-sm font-bold text-slate-200" />
            <TextField
              name="title"
              className="rw-input"
              validation={{ required: true }}
            />
            <FieldError name="title" className="rw-field-error" />
          </div>

          <div>
            <Label
              name="description"
              className="text-sm font-bold text-slate-200"
            />
            <TextAreaField
              name="description"
              className="rw-input min-h-32"
              validation={{ required: true }}
            />
            <FieldError name="description" className="rw-field-error" />
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <div>
              <Label
                name="maxPlayers"
                className="text-sm font-bold text-slate-200"
              />
              <NumberField
                name="maxPlayers"
                className="rw-input"
                validation={{ required: true, min: 1 }}
              />
            </div>
            <div>
              <Label
                name="minPlayers"
                className="text-sm font-bold text-slate-200"
              />
              <NumberField
                name="minPlayers"
                defaultValue={1}
                className="rw-input"
              />
            </div>
            <div>
              <Label
                name="experienceLevel"
                className="text-sm font-bold text-slate-200"
              />
              <SelectField name="experienceLevel" className="rw-input">
                <option value="ANY">Любой опыт</option>
                <option value="BEGINNER">Новичок</option>
                <option value="INTERMEDIATE">Средний</option>
                <option value="ADVANCED">Продвинутый</option>
              </SelectField>
            </div>
            <div>
              <Label
                name="endTime"
                className="text-sm font-bold text-slate-200"
              />
              <TextField name="endTime" type="time" className="rw-input" />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label
              htmlFor="isOnline"
              className="flex items-center gap-2 text-sm font-semibold text-slate-200"
            >
              <CheckboxField
                id="isOnline"
                name="isOnline"
                onChange={(event) => setIsOnline(event.target.checked)}
              />
              Онлайн-игра
            </label>
            {!isOnline && (
              <div>
                <Label
                  name="venueId"
                  className="text-sm font-bold text-slate-200"
                />
                <SelectField name="venueId" className="rw-input">
                  <option value="">
                    {venuesLoading ? 'Площадки загружаются...' : 'Без площадки'}
                  </option>
                  {venueData?.venues?.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name}
                      {venue.district ? ` · ${venue.district}` : ''}
                    </option>
                  ))}
                </SelectField>
              </div>
            )}
          </div>

          {!isOnline ? (
            <div>
              <Label
                name="locationDetails"
                className="text-sm font-bold text-slate-200"
              />
              <TextField
                name="locationDetails"
                className="rw-input"
                placeholder="Адрес или ориентир, если площадки нет в списке"
              />
            </div>
          ) : (
            <div className="grid gap-3">
              <div>
                <Label
                  name="connectionInfo"
                  className="text-sm font-bold text-slate-200"
                />
                <TextAreaField
                  name="connectionInfo"
                  className="rw-input min-h-24"
                  placeholder="Ссылка, Discord, Roll20, Foundry или другой способ подключения"
                />
              </div>
              <label
                htmlFor="connectionInfoLater"
                className="flex items-center gap-2 text-sm font-semibold text-slate-200"
              >
                <CheckboxField
                  id="connectionInfoLater"
                  name="connectionInfoLater"
                />
                Сообщу детали подключения после записи
              </label>
            </div>
          )}

          <div>
            <Label name="tags" className="text-sm font-bold text-slate-200" />
            <TextField
              name="tags"
              className="rw-input"
              placeholder="стратегия, новичкам, долгая игра"
            />
          </div>

          <div className="flex flex-wrap gap-5 text-sm font-semibold text-slate-200">
            <label htmlFor="isPrivate" className="flex items-center gap-2">
              <CheckboxField id="isPrivate" name="isPrivate" />
              Приватная игра
            </label>
            <label
              htmlFor="requiresApproval"
              className="flex items-center gap-2"
            >
              <CheckboxField id="requiresApproval" name="requiresApproval" />
              Подтверждать участников
            </label>
          </div>

          <Submit disabled={loading} className="rw-button rw-button-blue">
            Опубликовать игру
          </Submit>
        </Form>
      </Card>
    </>
  )
}

export default AccountCreateGamePage
