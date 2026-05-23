import type { EditVenueById, UpdateVenueInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormVenue = NonNullable<EditVenueById['venue']>

interface VenueFormProps {
  venue?: EditVenueById['venue']
  onSave: (data: UpdateVenueInput, id?: FormVenue['id']) => void
  error: RWGqlError
  loading: boolean
}

const VenueForm = (props: VenueFormProps) => {
  const onSubmit = (data: FormVenue) => {
    props.onSave(data, props?.venue?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormVenue> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.venue?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.venue?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="detailedDescription"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Detailed description
        </Label>

        <TextField
          name="detailedDescription"
          defaultValue={props.venue?.detailedDescription}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="detailedDescription" className="rw-field-error" />

        <Label
          name="address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>

        <TextField
          name="address"
          defaultValue={props.venue?.address}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="address" className="rw-field-error" />

        <Label
          name="district"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          District
        </Label>

        <TextField
          name="district"
          defaultValue={props.venue?.district}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="district" className="rw-field-error" />

        <Label
          name="city"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          City
        </Label>

        <TextField
          name="city"
          defaultValue={props.venue?.city}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="city" className="rw-field-error" />

        <Label
          name="websiteUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Website url
        </Label>

        <TextField
          name="websiteUrl"
          defaultValue={props.venue?.websiteUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="websiteUrl" className="rw-field-error" />

        <Label
          name="phone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone
        </Label>

        <TextField
          name="phone"
          defaultValue={props.venue?.phone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="phone" className="rw-field-error" />

        <Label
          name="imageUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image url
        </Label>

        <TextField
          name="imageUrl"
          defaultValue={props.venue?.imageUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="imageUrl" className="rw-field-error" />

        <Label
          name="rating"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rating
        </Label>

        <TextField
          name="rating"
          defaultValue={props.venue?.rating}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="rating" className="rw-field-error" />

        <Label
          name="latitude"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Latitude
        </Label>

        <TextField
          name="latitude"
          defaultValue={props.venue?.latitude}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="latitude" className="rw-field-error" />

        <Label
          name="longitude"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Longitude
        </Label>

        <TextField
          name="longitude"
          defaultValue={props.venue?.longitude}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="longitude" className="rw-field-error" />

        <Label
          name="amenities"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Amenities
        </Label>

        <TextField
          name="amenities"
          defaultValue={props.venue?.amenities}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="amenities" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default VenueForm
