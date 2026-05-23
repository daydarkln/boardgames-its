import {
  Form,
  Label,
  SelectField,
  Submit,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { Metadata, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Card from 'src/components/Card/Card'
import PageHeader from 'src/components/PageHeader/PageHeader'

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
    onCompleted: () => toast.success('Профиль обновлен'),
    onError: (error) => toast.error(error.message),
  })

  const onSubmit = (data: ProfileValues) => {
    updateProfile({
      variables: {
        id: currentUser.id,
        input: {
          name: data.name,
          city: data.city || 'Москва',
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
              <Label name="name" className="text-sm font-bold text-slate-200" />
              <TextField
                name="name"
                defaultValue={currentUser?.name ?? ''}
                className="rw-input"
              />
            </div>
            <div>
              <Label name="city" className="text-sm font-bold text-slate-200" />
              <TextField
                name="city"
                defaultValue={currentUser?.city ?? 'Москва'}
                className="rw-input"
              />
            </div>
            <div>
              <Label
                name="district"
                className="text-sm font-bold text-slate-200"
              />
              <TextField
                name="district"
                defaultValue={currentUser?.district ?? ''}
                className="rw-input"
              />
            </div>
            <div>
              <Label
                name="experienceLevel"
                className="text-sm font-bold text-slate-200"
              />
              <SelectField
                name="experienceLevel"
                defaultValue={currentUser?.experienceLevel ?? 'ANY'}
                className="rw-input"
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
            />
            <TextField
              name="favoriteGamesText"
              defaultValue={currentUser?.favoriteGamesText ?? ''}
              className="rw-input"
              placeholder="Brass, D&D 5e, Blood on the Clocktower"
            />
          </div>
          <div>
            <Label name="bio" className="text-sm font-bold text-slate-200" />
            <TextAreaField
              name="bio"
              defaultValue={currentUser?.bio ?? ''}
              className="rw-input min-h-32"
            />
          </div>
          <Submit disabled={loading} className="rw-button rw-button-blue">
            Сохранить профиль
          </Submit>
        </Form>
      </Card>
    </>
  )
}

export default AccountProfilePage
