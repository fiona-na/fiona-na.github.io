import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const SyncValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="title" type="text" component={renderField} label="Title"/>
      <Field name="data" component="textarea" label="Description"/>
      <Field name="icon" type="text" component={renderField} label="Icon URL"/>
      <Field name="type" component="select" label="Username">
        <option />
        <option >Meetup</option>
        <option >Entertainment</option>
        <option >Lunch & Learn</option>
        <option >Party</option>
        <option >Other</option>
      </Field>
      <Field name="serviceid" type="text" component={renderField} label="Service ID"/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'syncValidation',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(SyncValidationForm)


