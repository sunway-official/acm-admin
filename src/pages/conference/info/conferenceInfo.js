import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { RaisedButton, Subheader, TextField, DatePicker } from 'material-ui';
import { style } from './style.css';
import normalizePhone from './normalizePhone';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'title',
    'description',
    'startDate',
    'endDate',
    'organizerName',
    'organizerEmail',
    'organizerWebsite',
    'organizerPhoneNumber',
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

const renderDatePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <DatePicker
    minDate={minDate}
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);

class Info extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <div>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <div>
            <div>
              <Subheader className="header title">Basic Information</Subheader>
              <div>
                <div className="d-flex form-group">
                  <label>Title :</label>
                  <Field
                    name="title"
                    component={renderTextField}
                    fullWidth={true}
                    hintText="asd"
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Description :</label>
                  <Field
                    name="description"
                    component={renderTextField}
                    multiLine
                    rows={1}
                    fullWidth={true}
                  />
                </div>
                <div className="d-flex date">
                  <div className="d-flex form-group">
                    <label className="start">Conference Start From :</label>
                    <Field
                      name="startDate"
                      component={renderDatePicker}
                      format={null}
                      textFieldStyle={{ width: '100%' }}
                      hintText="Start Date"
                    />
                  </div>
                  <div className="d-flex form-group">
                    <label className="end">To :</label>
                    <Field
                      name="endDate"
                      component={renderDatePicker}
                      format={null}
                      textFieldStyle={{ width: '100%' }}
                      hintText="End Date"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Subheader className="header title">
                  Organizer Information
                </Subheader>
                <div>
                  <div className="d-flex form-group">
                    <label>Name :</label>
                    <Field
                      name="organizerName"
                      component={renderTextField}
                      hintText="Organizer Name"
                      fullWidth={true}
                    />
                  </div>
                  <div className="d-flex form-group">
                    <label>Email :</label>
                    <Field
                      name="organizerEmail"
                      component={renderTextField}
                      hintText="Organizer Email"
                      fullWidth={true}
                    />
                  </div>
                  <div className="d-flex form-group">
                    <label>Website :</label>
                    <Field
                      name="organizerWebsite"
                      component={renderTextField}
                      hintText="Organizer Website"
                      fullWidth={true}
                    />
                  </div>
                  <div className="d-flex form-group">
                    <label>Phone Number :</label>
                    <Field
                      name="organizerPhoneNumber"
                      component={renderTextField}
                      hintText="Organizer Phone Number"
                      fullWidth={true}
                      normalize={normalizePhone}
                    />
                  </div>
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
const minDate = new Date();
const maxDate = new Date();
maxDate.setFullYear(
  maxDate.getFullYear(),
  maxDate.getMonth(),
  maxDate.getDate() + 1,
);
Info = reduxForm({
  form: 'conferenceInfo',
  initialValues: {
    title: 'Android',
    description: 'This...',
    startDate: minDate,
    endDate: maxDate,
    organizerName: 'Duy Tan University',
    organizerEmail: 'duytan@gmail.com',
    organizerWebsite: 'mydtu.com',
    organizerPhoneNumber: '123-123-1233',
  },
  validate,
})(Info);

export default Info;
