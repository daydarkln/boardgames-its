import {
  Form,
  Label,
  SelectField,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { Metadata, useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import Card from 'src/components/Card/Card'
import PageHeader from 'src/components/PageHeader/PageHeader'
import { notify } from 'src/components/ToastProvider/ToastProvider'
import { DEFAULT_CITY } from 'src/lib/locations'

const UPDATE_PROFILE = gql`
  mutation UpdateProfileMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      city
      district
      bio
      experienceLevel
      favoriteGamesText
    }
  }
`

type ProfileValues = {
  name?: string
  city?: string
  district?: string
  bio?: string
  experienceLevel?: string
  favoriteGamesText?: string
}

const AccountProfilePage = () => {
  const { currentUser } = useAuth()
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => notify.success('Профиль обновлен'),
    onError: (error) => notify.error(error.message),
  })

  const onSubmit = (data: ProfileValues) => {
    updateProfile({
      variables: {
        id: currentUser.id,
        input: {
          name: data.name,
          city: data.city || DEFAULT_CITY,
          district: data.district,
          bio: data.bio,
          experienceLevel: data.experienceLevel || 'ANY',
          favoriteGamesText: data.favoriteGamesText,
        },
      },
    })
  }

  return (
    <>
      <Metadata title="Профиль" description="Профиль игрока" />

      <PageHeader
        eyebrow="Кабинет"
        title="Профиль"
        description="Данные, которые помогают другим игрокам понять ваш формат и опыт."
      />
      <Card className="p-5">
        <Form<ProfileValues>
          onSubmit={onSubmit}
          className="grid gap-5"
          config={{ mode: 'onBlur' }}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label name="name" className="text-sm font-bold text-slate-200">
                Имя
              </Label>
              <TextField
                name="name"
                defaultValue={currentUser?.name ?? ''}
                className="site-control mt-2 px-4"
              />
            </div>
            <div>
              <Label name="city" className="text-sm font-bold text-slate-200">
                Город
              </Label>
              <TextField
                name="city"
                defaultValue={currentUser?.city ?? DEFAULT_CITY}
                className="site-control mt-2 px-4"
              />
            </div>
            <div>
              <Label
                name="district"
                className="text-sm font-bold text-slate-200"
              >
                Район
              </Label>
              <TextField
                name="district"
                defaultValue={currentUser?.district ?? ''}
                className="site-control mt-2 px-4"
              />
            </div>
            <div>
              <Label
                name="experienceLevel"
                className="text-sm font-bold text-slate-200"
              >
                Игровой опыт
              </Label>
              <SelectField
                name="experienceLevel"
                defaultValue={currentUser?.experienceLevel ?? 'ANY'}
                className="site-control mt-2 px-4"
              >
                <option value="ANY">Любой опыт</option>
                <option value="BEGINNER">Новичок</option>
                <option value="INTERMEDIATE">Средний</option>
                <option value="ADVANCED">Продвинутый</option>
              </SelectField>
            </div>
          </div>
          <div>
            <Label
              name="favoriteGamesText"
              className="text-sm font-bold text-slate-200"
            >
              Любимые игры и системы
            </Label>
            <TextField
              name="favoriteGamesText"
              defaultValue={currentUser?.favoriteGamesText ?? ''}
              className="site-control mt-2 px-4"
              placeholder="Brass, D&D 5e, Blood on the Clocktower"
            />
          </div>
          <div>
            <Label name="bio" className="text-sm font-bold text-slate-200">
              О себе
            </Label>
            <TextAreaField
              name="bio"
              defaultValue={currentUser?.bio ?? ''}
              className="site-control mt-2 min-h-32 px-4 py-3"
            />
          </div>
          <Button type="submit" disabled={loading}>
            Сохранить профиль
          </Button>
        </Form>
      </Card>
    </>
  )
}

export default AccountProfilePage
