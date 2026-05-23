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
import { navigate, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Card from 'src/components/Card/Card'
import PageHeader from 'src/components/PageHeader/PageHeader'

const CREATE_GAME_SESSION = gql`
  mutation CreateAccountGameSessionMutation($input: CreateGameSessionInput!) {
    createGameSession(input: $input) {
      id
    }
  }
`

type FormValues = {
  title: string
  description: string
  category: 'BOARD_GAMES' | 'TTRPG' | 'MAFIA'
  date: string
  startTime: string
  endTime?: string
  maxPlayers: string
  minPlayers: string
  experienceLevel: string
  tags?: string
  isPrivate?: boolean
  requiresApproval?: boolean
}

const AccountCreateGamePage = () => {
  const [createGame, { loading }] = useMutation(CREATE_GAME_SESSION, {
    onCompleted: ({ createGameSession }) => {
      toast.success('Игра создана')
      navigate(routes.game({ id: createGameSession.id }))
    },
    onError: (error) => toast.error(error.message),
  })

  const onSubmit = (data: FormValues) => {
    const date = new Date(
      `${data.date}T${data.startTime || '00:00'}`
    ).toISOString()

    createGame({
      variables: {
        input: {
          title: data.title,
          description: data.description,
          category: data.category,
          date,
          startTime: data.startTime,
          endTime: data.endTime || null,
          maxPlayers: Number(data.maxPlayers),
          minPlayers: Number(data.minPlayers || 1),
          experienceLevel: data.experienceLevel || 'ANY',
          isPrivate: Boolean(data.isPrivate),
          requiresApproval: Boolean(data.requiresApproval),
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
                <option value="CASUAL">Любитель</option>
                <option value="EXPERIENCED">Опытный</option>
                <option value="EXPERT">Эксперт</option>
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
