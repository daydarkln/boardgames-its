import type { EditUserById, UpdateUserInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  CheckboxField,
  FieldError,
  Form,
  FormError,
  Label,
  RadioField,
  Submit,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'

type FormUser = NonNullable<EditUserById['user']> & {
  password?: string
}

interface UserFormProps {
  user?: EditUserById['user']
  onSave: (
    data: UpdateUserInput & { password?: string },
    id?: FormUser['id']
  ) => void
  error?: RWGqlError
  loading: boolean
}

const UserForm = (props: UserFormProps) => {
  const onSubmit = (data: FormUser) => {
    if (data.favoriteDirections) {
      data.favoriteDirections = data.favoriteDirections.filter(
        (value) => !!value
      )
    }

    props.onSave(data, props?.user?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormUser> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>
        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="email" className="rw-field-error" />

        {!props.user && (
          <>
            <Label
              name="password"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Password
            </Label>
            <TextField
              name="password"
              type="password"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <FieldError name="password" className="rw-field-error" />
          </>
        )}

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="avatarUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Avatar url
        </Label>
        <TextField
          name="avatarUrl"
          defaultValue={props.user?.avatarUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="city"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          City
        </Label>
        <TextField
          name="city"
          defaultValue={props.user?.city ?? 'Ростов-на-Дону'}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="district"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          District
        </Label>
        <TextField
          name="district"
          defaultValue={props.user?.district}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="bio"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Bio
        </Label>
        <TextAreaField
          name="bio"
          defaultValue={props.user?.bio}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="favoriteDirections"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Favorite directions
        </Label>
        {['BOARD_GAMES', 'TTRPG', 'MAFIA'].map((value, index) => (
          <label key={value} className="rw-check-radio-items">
            <CheckboxField
              id={`user-favoriteDirections-${index}`}
              name={`favoriteDirections[${index}]`}
              defaultValue={value}
              defaultChecked={props.user?.favoriteDirections?.includes(value)}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <span>{value}</span>
          </label>
        ))}

        <Label
          name="favoriteGamesText"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Favorite games text
        </Label>
        <TextField
          name="favoriteGamesText"
          defaultValue={props.user?.favoriteGamesText}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="experienceLevel"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Experience level
        </Label>
        {['ANY', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((value, index) => (
          <label key={value} className="rw-check-radio-items">
            <RadioField
              id={`user-experienceLevel-${index}`}
              name="experienceLevel"
              defaultValue={value}
              defaultChecked={(props.user?.experienceLevel ?? 'ANY') === value}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <span>{value}</span>
          </label>
        ))}

        <Label
          name="role"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Role
        </Label>
        {['USER', 'ADMIN'].map((value, index) => (
          <label key={value} className="rw-check-radio-items">
            <RadioField
              id={`user-role-${index}`}
              name="role"
              defaultValue={value}
              defaultChecked={(props.user?.role ?? 'USER') === value}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <span>{value}</span>
          </label>
        ))}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
