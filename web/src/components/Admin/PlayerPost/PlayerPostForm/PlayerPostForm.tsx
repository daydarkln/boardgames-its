import type { EditPlayerPostById, UpdatePlayerPostInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormPlayerPost = NonNullable<EditPlayerPostById['playerPost']>

interface PlayerPostFormProps {
  playerPost?: EditPlayerPostById['playerPost']
  onSave: (data: UpdatePlayerPostInput, id?: FormPlayerPost['id']) => void
  error: RWGqlError
  loading: boolean
}

const PlayerPostForm = (props: PlayerPostFormProps) => {
  const onSubmit = (data: FormPlayerPost) => {
    props.onSave(data, props?.playerPost?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPlayerPost> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.playerPost?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.playerPost?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="category"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Category
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="playerPost-category-0"
            name="category"
            defaultValue="BOARD_GAMES"
            defaultChecked={props.playerPost?.category?.includes('BOARD_GAMES')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Board Games</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="playerPost-category-1"
            name="category"
            defaultValue="TTRPG"
            defaultChecked={props.playerPost?.category?.includes('TTRPG')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Ttrpg</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="playerPost-category-2"
            name="category"
            defaultValue="MAFIA"
            defaultChecked={props.playerPost?.category?.includes('MAFIA')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Mafia</div>
        </div>

        <FieldError name="category" className="rw-field-error" />

        <Label
          name="city"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          City
        </Label>

        <TextField
          name="city"
          defaultValue={props.playerPost?.city}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="city" className="rw-field-error" />

        <Label
          name="district"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          District
        </Label>

        <TextField
          name="district"
          defaultValue={props.playerPost?.district}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="district" className="rw-field-error" />

        <Label
          name="isOnline"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is online
        </Label>

        <CheckboxField
          name="isOnline"
          defaultChecked={props.playerPost?.isOnline}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isOnline" className="rw-field-error" />

        <Label
          name="experienceLevel"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Experience level
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="playerPost-experienceLevel-0"
            name="experienceLevel"
            defaultValue="BEGINNER"
            defaultChecked={props.playerPost?.experienceLevel?.includes(
              'BEGINNER'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Beginner</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="playerPost-experienceLevel-1"
            name="experienceLevel"
            defaultValue="CASUAL"
            defaultChecked={props.playerPost?.experienceLevel?.includes(
              'CASUAL'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Casual</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="playerPost-experienceLevel-2"
            name="experienceLevel"
            defaultValue="EXPERIENCED"
            defaultChecked={props.playerPost?.experienceLevel?.includes(
              'EXPERIENCED'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Experienced</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="playerPost-experienceLevel-3"
            name="experienceLevel"
            defaultValue="EXPERT"
            defaultChecked={props.playerPost?.experienceLevel?.includes(
              'EXPERT'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Expert</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="playerPost-experienceLevel-4"
            name="experienceLevel"
            defaultValue="ANY"
            defaultChecked={props.playerPost?.experienceLevel?.includes('ANY')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Any</div>
        </div>

        <FieldError name="experienceLevel" className="rw-field-error" />

        <Label
          name="neededPlayers"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Needed players
        </Label>

        <NumberField
          name="neededPlayers"
          defaultValue={props.playerPost?.neededPlayers}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="neededPlayers" className="rw-field-error" />

        <Label
          name="currentPlayers"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Current players
        </Label>

        <NumberField
          name="currentPlayers"
          defaultValue={props.playerPost?.currentPlayers}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="currentPlayers" className="rw-field-error" />

        <Label
          name="tags"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tags
        </Label>

        <TextField
          name="tags"
          defaultValue={props.playerPost?.tags}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="tags" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="playerPost-status-0"
            name="status"
            defaultValue="OPEN"
            defaultChecked={props.playerPost?.status?.includes('OPEN')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Open</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="playerPost-status-1"
            name="status"
            defaultValue="CLOSED"
            defaultChecked={props.playerPost?.status?.includes('CLOSED')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Closed</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="playerPost-status-2"
            name="status"
            defaultValue="HIDDEN"
            defaultChecked={props.playerPost?.status?.includes('HIDDEN')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Hidden</div>
        </div>

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="authorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Author id
        </Label>

        <NumberField
          name="authorId"
          defaultValue={props.playerPost?.authorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="authorId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PlayerPostForm
