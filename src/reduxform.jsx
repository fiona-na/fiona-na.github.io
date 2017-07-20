import React from 'react';
import { Field, reduxForm } from 'redux-form';

//global list of service ids for validation checking
let listOfServiceIds;

//simple form validation made easy with redux form
const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.data) {
    errors.data = 'Required';
  }
  if (!values.type) {
    errors.type = 'Required';
  }
  if (!values.serviceid) {
    errors.serviceid = 'Required';
  } else if (listOfServiceIds.includes(values.serviceid.toString())){
    errors.serviceid = 'Service ID is already in use';
  }
  return errors;
}

//renders input fields with label and errors
const renderField = ({ input, label, type, meta: { touched, error} }) => (
  <div className="form-field">
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      { touched && error && <span className="field-err">{error}</span> }
    </div>
  </div>
)

//same as previous render, but textarea and select fields
//require more customization
const renderDataField = ({ input, label, type, meta: { touched, error} }) => (
  <div className="form-field">
    <label>{label}</label>
    <div>
      <Field name="data" component="textarea" />
      { touched && error && <span className="field-err">{error}</span> }
    </div>
  </div>
)

const renderSelectField = ({ input, label, type, meta: { touched, error} }) => (
  <div className="form-field">
    <label>{label}</label>
    <div>
      <Field name="type" component="select">
        <option/>
        <option>Meetup</option>
        <option>Entertainment</option>
        <option>Lunch & Learn</option>
        <option>Party</option>
        <option>Other</option>
      </Field>
      { touched && error && <span className="field-err">{error}</span> }
    </div>
  </div>
)

//actual form that will render field component based on field
const SyncValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, serviceIds } = props
  //set global list of ids to access from validations
  listOfServiceIds = serviceIds;
  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <Field name="title" type="text" component={renderField} label="Title"/>
      <Field name="icon" type="text" component={renderField} label="Icon URL"/>
      <Field name="type" component={renderSelectField} label="Type" />
      <Field name="data" component={renderDataField} label="Description"/>
      <Field name="serviceid" type="text" component={renderField} label="Service ID"/>
      <div className="form-field">
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
      </div>
    </form>
  );
}

export default reduxForm({
  form: 'syncValidation',
  validate     // magical validation of redux-form
})(SyncValidationForm)


