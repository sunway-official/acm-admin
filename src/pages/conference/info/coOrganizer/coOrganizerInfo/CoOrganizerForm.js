import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';

import CustomInput from 'components/CustomInput';
import normalizePhone from 'utils/normalizePhone';
import { regex } from 'utils/';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'coOrganizerName',
    'coOrganizerEmail',
    'coOrganizerWebsite',
    'coOrganizerPhone',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.coOrganizerEmail &&
    !regex.EMAIL_REGEX.test(values.coOrganizerEmail)
  ) {
    errors.coOrganizerEmail = 'Invalid email address';
  }
  return errors;
};

const CoOrganizerForm = ({
  onSubmit,
  handleSubmit,
  submitting,
  pristine,
  invalid,
}) => (
  <form className="form conference-info" onSubmit={handleSubmit(onSubmit)}>
    <div>
      <div>
        <div className="d-flex form-group">
          <label>Name :</label>
          <Field
            name="coOrganizerName"
            component={CustomInput}
            hintText="Co-Organizer Name"
            fullWidth={true}
          />
        </div>
        <div className="d-flex form-group">
          <label>Email :</label>
          <Field
            name="coOrganizerEmail"
            component={CustomInput}
            hintText="Co-Organizer Email"
            fullWidth={true}
          />
        </div>
        <div className="d-flex form-group">
          <label>Website :</label>
          <Field
            name="coOrganizerWebsite"
            component={CustomInput}
            hintText="Co-Organizer Website"
            fullWidth={true}
          />
        </div>
        <div className="d-flex form-group">
          <label>Phone Number :</label>
          <Field
            name="coOrganizerPhone"
            component={CustomInput}
            hintText="Co-Organizer Phone Number"
            fullWidth={true}
            normalize={normalizePhone}
          />
        </div>
      </div>
    </div>
    <div className="d-flex save-btn btn-group">
      <RaisedButton
        label="Save"
        primary={true}
        disabled={pristine || submitting || invalid}
        type="submit"
      />
    </div>
  </form>
);

export default reduxForm({
  form: 'CoOrganizerForm',
  validate,
})(CoOrganizerForm);
