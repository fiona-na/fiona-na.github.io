import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.data) {
    errors.data = 'Required'
  }
  if (!values.icon) {
    errors.icon = 'Required'
  }
  if (!values.type) {
    errors.type = 'Required'
  }
  if (!values.serviceid) {
    errors.serviceid = 'Required'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error} }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
)

const renderDataField = ({ input, label, type, meta: { touched, error} }) => (
  <div>
    <label>{label}</label>
    <div>
      <Field name="data" component="textarea" />
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
)

const renderSelectField = ({ input, label, type, meta: { touched, error} }) => (
  <div>
    <label>{label}</label>
    <div>
      <Field name="type" component="select">
        <option />
        <option >Meetup</option>
        <option >Entertainment</option>
        <option >Lunch & Learn</option>
        <option >Party</option>
        <option >Other</option>
      </Field>
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
)

const SyncValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="title" type="text" component={renderField} label="Title"/>
      <Field name="icon" type="text" component={renderField} label="Icon URL"/>
      <Field name="type" component={renderSelectField} label="Type" />
      <Field name="data" component={renderDataField} label="Description"/>

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


