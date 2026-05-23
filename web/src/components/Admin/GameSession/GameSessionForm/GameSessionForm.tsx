import type { EditGameSessionById, UpdateGameSessionInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  DatetimeLocalField,
  NumberField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormGameSession = NonNullable<EditGameSessionById['gameSession']>

interface GameSessionFormProps {
  gameSession?: EditGameSessionById['gameSession']
  onSave: (data: UpdateGameSessionInput, id?: FormGameSession['id']) => void
  error: RWGqlError
  loading: boolean
}

const GameSessionForm = (props: GameSessionFormProps) => {
  const onSubmit = (data: FormGameSession) => {
    props.onSave(data, props?.gameSession?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormGameSession> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.gameSession?.title}
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
          defaultValue={props.gameSession?.description}
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
            id="gameSession-category-0"
            name="category"
            defaultValue="BOARD_GAMES"
            defaultChecked={props.gameSession?.category?.includes(
              'BOARD_GAMES'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Board Games</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-category-1"
            name="category"
            defaultValue="TTRPG"
            defaultChecked={props.gameSession?.category?.includes('TTRPG')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Ttrpg</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-category-2"
            name="category"
            defaultValue="MAFIA"
            defaultChecked={props.gameSession?.category?.includes('MAFIA')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Mafia</div>
        </div>

        <FieldError name="category" className="rw-field-error" />

        <Label
          name="gameSystem"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Game system
        </Label>

        <TextField
          name="gameSystem"
          defaultValue={props.gameSession?.gameSystem}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="gameSystem" className="rw-field-error" />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DatetimeLocalField
          name="date"
          defaultValue={formatDatetime(props.gameSession?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="startTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start time
        </Label>

        <TextField
          name="startTime"
          defaultValue={props.gameSession?.startTime}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="startTime" className="rw-field-error" />

        <Label
          name="endTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End time
        </Label>

        <TextField
          name="endTime"
          defaultValue={props.gameSession?.endTime}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="endTime" className="rw-field-error" />

        <Label
          name="maxPlayers"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Max players
        </Label>

        <NumberField
          name="maxPlayers"
          defaultValue={props.gameSession?.maxPlayers}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="maxPlayers" className="rw-field-error" />

        <Label
          name="minPlayers"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Min players
        </Label>

        <NumberField
          name="minPlayers"
          defaultValue={props.gameSession?.minPlayers}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="minPlayers" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-status-0"
            name="status"
            defaultValue="DRAFT"
            defaultChecked={props.gameSession?.status?.includes('DRAFT')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Draft</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-status-1"
            name="status"
            defaultValue="OPEN"
            defaultChecked={props.gameSession?.status?.includes('OPEN')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Open</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-status-2"
            name="status"
            defaultValue="FULL"
            defaultChecked={props.gameSession?.status?.includes('FULL')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Full</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-status-3"
            name="status"
            defaultValue="CANCELLED"
            defaultChecked={props.gameSession?.status?.includes('CANCELLED')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Cancelled</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-status-4"
            name="status"
            defaultValue="COMPLETED"
            defaultChecked={props.gameSession?.status?.includes('COMPLETED')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Completed</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-status-5"
            name="status"
            defaultValue="HIDDEN"
            defaultChecked={props.gameSession?.status?.includes('HIDDEN')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Hidden</div>
        </div>

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="experienceLevel"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Experience level
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-experienceLevel-0"
            name="experienceLevel"
            defaultValue="BEGINNER"
            defaultChecked={props.gameSession?.experienceLevel?.includes(
              'BEGINNER'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Beginner</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-experienceLevel-1"
            name="experienceLevel"
            defaultValue="CASUAL"
            defaultChecked={props.gameSession?.experienceLevel?.includes(
              'CASUAL'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Casual</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-experienceLevel-2"
            name="experienceLevel"
            defaultValue="EXPERIENCED"
            defaultChecked={props.gameSession?.experienceLevel?.includes(
              'EXPERIENCED'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Experienced</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-experienceLevel-3"
            name="experienceLevel"
            defaultValue="EXPERT"
            defaultChecked={props.gameSession?.experienceLevel?.includes(
              'EXPERT'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Expert</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="gameSession-experienceLevel-4"
            name="experienceLevel"
            defaultValue="ANY"
            defaultChecked={props.gameSession?.experienceLevel?.includes('ANY')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Any</div>
        </div>

        <FieldError name="experienceLevel" className="rw-field-error" />

        <Label
          name="isPrivate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is private
        </Label>

        <CheckboxField
          name="isPrivate"
          defaultChecked={props.gameSession?.isPrivate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isPrivate" className="rw-field-error" />

        <Label
          name="requiresApproval"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Requires approval
        </Label>

        <CheckboxField
          name="requiresApproval"
          defaultChecked={props.gameSession?.requiresApproval}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="requiresApproval" className="rw-field-error" />

        <Label
          name="imageUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image url
        </Label>

        <TextField
          name="imageUrl"
          defaultValue={props.gameSession?.imageUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="imageUrl" className="rw-field-error" />

        <Label
          name="tags"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tags
        </Label>

        <TextField
          name="tags"
          defaultValue={props.gameSession?.tags}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="tags" className="rw-field-error" />

        <Label
          name="organizerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Organizer id
        </Label>

        <NumberField
          name="organizerId"
          defaultValue={props.gameSession?.organizerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="organizerId" className="rw-field-error" />

        <Label
          name="venueId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Venue id
        </Label>

        <NumberField
          name="venueId"
          defaultValue={props.gameSession?.venueId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="venueId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default GameSessionForm
