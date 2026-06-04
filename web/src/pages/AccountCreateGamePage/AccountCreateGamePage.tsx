import { useState } from 'react'

import {
  CheckboxField,
  FieldError,
  Form,
  Label,
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { navigate } from '@redwoodjs/router'
import { Metadata, useMutation, useQuery } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import Card from 'src/components/Card/Card'
import PageHeader from 'src/components/PageHeader/PageHeader'
import { notify } from 'src/components/ToastProvider/ToastProvider'
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
  date: Date
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
      notify.success('Игра создана')
      navigate(
        routePath('game', `/games/${createGameSession.id}`, {
          id: createGameSession.id,
        })
      )
    },
    onError: (error) => notify.error(error.message),
  })

  const onSubmit = (data: FormValues) => {
    if (
      data.isOnline &&
      !data.connectionInfo?.trim() &&
      !data.connectionInfoLater
    ) {
      notify.error(
        'Укажите детали подключения или отметьте, что сообщите их позже'
      )
      return
    }

    if (!data.isOnline && !data.venueId && !data.locationDetails?.trim()) {
      notify.error('Для офлайн-игры выберите площадку или укажите адрес')
      return
    }

    const date = new Date(
      `${data.date.toISOString().split('T')[0]}T${data.startTime || '00:00'}`
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
              >
                Направление
              </Label>
              <SelectField
                name="category"
                className="site-control mt-2 px-4"
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
              >
                Игра / система
              </Label>
              <TextField
                name="gameSystem"
                className="site-control mt-2 px-4"
                placeholder="D&D 5e, Крылья, Мафия Classic"
              />
            </div>
            <div>
              <Label name="date" className="text-sm font-bold text-slate-200">
                Дата
              </Label>
              <TextField
                name="date"
                type="date"
                className="site-control mt-2 px-4"
                validation={{ required: true }}
              />
              <FieldError name="date" className="site-field-error" />
            </div>
            <div>
              <Label
                name="startTime"
                className="text-sm font-bold text-slate-200"
              >
                Время начала
              </Label>
              <TextField
                name="startTime"
                type="time"
                className="site-control mt-2 px-4"
                validation={{ required: true }}
              />
              <FieldError name="startTime" className="site-field-error" />
            </div>
          </div>

          <div>
            <Label name="title" className="text-sm font-bold text-slate-200">
              Название
            </Label>
            <TextField
              name="title"
              className="site-control mt-2 px-4"
              validation={{ required: true }}
            />
            <FieldError name="title" className="site-field-error" />
          </div>

          <div>
            <Label
              name="description"
              className="text-sm font-bold text-slate-200"
            >
              Описание
            </Label>
            <TextAreaField
              name="description"
              className="site-control mt-2 min-h-32 px-4 py-3"
              validation={{ required: true }}
            />
            <FieldError name="description" className="site-field-error" />
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <div>
              <Label
                name="maxPlayers"
                className="text-sm font-bold text-slate-200"
              >
                Макс. игроков
              </Label>
              <NumberField
                name="maxPlayers"
                className="site-control mt-2 px-4"
                validation={{ required: true, min: 1 }}
              />
            </div>
            <div>
              <Label
                name="minPlayers"
                className="text-sm font-bold text-slate-200"
              >
                Мин. игроков
              </Label>
              <NumberField
                name="minPlayers"
                defaultValue={1}
                className="site-control mt-2 px-4"
              />
            </div>
            <div>
              <Label
                name="experienceLevel"
                className="text-sm font-bold text-slate-200"
              >
                Уровень опыта
              </Label>
              <SelectField
                name="experienceLevel"
                className="site-control mt-2 px-4"
              >
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
              >
                Время окончания
              </Label>
              <TextField
                name="endTime"
                type="time"
                className="site-control mt-2 px-4"
              />
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
                className="h-5 w-5 rounded-md border-white/15 bg-slate-950/60 text-violet-500 focus:ring-violet-300/45"
                onChange={(event) => setIsOnline(event.target.checked)}
              />
              Онлайн-игра
            </label>
            {!isOnline && (
              <div>
                <Label
                  name="venueId"
                  className="text-sm font-bold text-slate-200"
                >
                  Площадка
                </Label>
                <SelectField name="venueId" className="site-control mt-2 px-4">
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
              >
                Адрес или ориентир
              </Label>
              <TextField
                name="locationDetails"
                className="site-control mt-2 px-4"
                placeholder="Адрес или ориентир, если площадки нет в списке"
              />
            </div>
          ) : (
            <div className="grid gap-3">
              <div>
                <Label
                  name="connectionInfo"
                  className="text-sm font-bold text-slate-200"
                >
                  Детали подключения
                </Label>
                <TextAreaField
                  name="connectionInfo"
                  className="site-control mt-2 min-h-24 px-4 py-3"
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
                  className="h-5 w-5 rounded-md border-white/15 bg-slate-950/60 text-violet-500 focus:ring-violet-300/45"
                />
                Сообщу детали подключения после записи
              </label>
            </div>
          )}

          <div>
            <Label name="tags" className="text-sm font-bold text-slate-200">
              Теги
            </Label>
            <TextField
              name="tags"
              className="site-control mt-2 px-4"
              placeholder="стратегия, новичкам, долгая игра"
            />
          </div>

          <div className="flex flex-wrap gap-5 text-sm font-semibold text-slate-200">
            <label htmlFor="isPrivate" className="flex items-center gap-2">
              <CheckboxField
                id="isPrivate"
                name="isPrivate"
                className="h-5 w-5 rounded-md border-white/15 bg-slate-950/60 text-violet-500 focus:ring-violet-300/45"
              />
              Приватная игра
            </label>
            <label
              htmlFor="requiresApproval"
              className="flex items-center gap-2"
            >
              <CheckboxField
                id="requiresApproval"
                name="requiresApproval"
                className="h-5 w-5 rounded-md border-white/15 bg-slate-950/60 text-violet-500 focus:ring-violet-300/45"
              />
              Подтверждать участников
            </label>
          </div>

          <Button type="submit" disabled={loading}>
            Опубликовать игру
          </Button>
        </Form>
      </Card>
    </>
  )
}

export default AccountCreateGamePage
