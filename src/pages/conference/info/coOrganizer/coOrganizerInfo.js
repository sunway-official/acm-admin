import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { RaisedButton, Subheader, TextField } from 'material-ui';
import { style } from '../style.css';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'coOrganizerName',
    'coOrganizerEmail',
    'coOrganizerWebsite',
    'coOrganizerPhoneNumber',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.organizerEmail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.organizerEmail)
  ) {
    errors.organizerEmail = 'Invalid email address';
  }
  return errors;
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => <TextField errorText={touched && error} {...input} {...custom} />;

class Info extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <div>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <div>
            <div>
              <Subheader className="header title">
                Co-Organizer Information
              </Subheader>
              <div>
                <div className="d-flex form-group">
                  <label>Name :</label>
                  <Field
                    name="coOrganizerName"
                    component={renderTextField}
                    hintText="Co-Organizer Name"
                    fullWidth={true}
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Email :</label>
                  <Field
                    name="coOrganizerEmail"
                    component={renderTextField}
                    hintText="Co-Organizer Email"
                    fullWidth={true}
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Website :</label>
                  <Field
                    name="coOrganizerWebsite"
                    component={renderTextField}
                    hintText="Co-Organizer Website"
                    fullWidth={true}
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Phone Number :</label>
                  <Field
                    name="coOrganizerPhoneNumber"
                    component={renderTextField}
                    hintText="Co-Organizer Phone Number"
                    fullWidth={true}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex save-btn btn-group">
              <RaisedButton
                label="Save"
                primary={true}
                type="submit"
                disabled={submitting}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
Info = reduxForm({
  form: 'coOrganizerInfo',
  initialValues: {
    coOrganizerName: 'Duy Tan University',
    coOrganizerEmail: 'duytan@gmail.com',
    coOrganizerWebsite: 'mydtu.com',
    coOrganizerPhoneNumber: '123-123-1233',
  },
  validate,
})(Info);

export default Info;
