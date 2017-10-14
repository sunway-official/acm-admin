import React from 'react';
import {
  DatePicker,
  TimePicker,
  TextField,
  SelectField,
  MenuItem,
  RaisedButton,
} from 'material-ui';
import { Field } from 'redux-form';

const currentDate = new Date();
const validate = values => {
  const errors = {};
  const ArrayErrors = [];
  const requiredFields = ['title', 'date', 'room', 'endTime', 'startTime'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (!values.schedules || !values.schedules.length) {
    errors.schedules = { _error: '.' };
  } else {
    values.schedules.forEach((schedule, memberIndex) => {
      if (!schedule || !schedule.date) {
        errors.date = 'Required';
        ArrayErrors[memberIndex] = errors;
      }
      if (!schedule || !schedule.room) {
        errors.room = 'Required';
        ArrayErrors[memberIndex] = errors;
      }
      if (!schedule || !schedule.startTime) {
        errors.startTime = 'Required';
        ArrayErrors[memberIndex] = errors;
      }
      if (!schedule || !schedule.endTime) {
        errors.endTime = 'Required';
        ArrayErrors[memberIndex] = errors;
      }
    });
    if (ArrayErrors.length) {
      errors.schedules = ArrayErrors;
    }
  }
  return errors;
};

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    errorText={touched && error}
    fullWidth={true}
    {...input}
    {...custom}
  />
);
export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);
export const renderDatePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <DatePicker
    minDate={currentDate}
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);
export const renderTimePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TimePicker
    minutesStep={5}
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);

export const renderSchedules = ({
  rooms,
  fields,
  meta: { error, submitFailed },
}) => (
  <div>
    {fields.map((schedule, index) => (
      <div key={index}>
        <div className="d-flex align-items-center justify-content-space-around">
          <h4>Time #{index + 1}</h4>
          <div>
            <RaisedButton
              type="button"
              label="Remove"
              onClick={() => fields.remove(index)}
            />
          </div>
        </div>

        <div className="d-flex">
          <div className="d-flex form-group">
            <label>Date:</label>
            <Field
              name={`${schedule}.date`}
              component={renderDatePicker}
              format={null}
              textFieldStyle={{ width: '100%' }}
              hintText="Activity Date"
            />
          </div>
          <div className="d-flex form-group" style={{ width: '300px' }}>
            <label className="text-align-center">Room :</label>
            <Field name={`${schedule}.room`} component={renderSelectField}>
              {rooms.map(room => {
                return (
                  <MenuItem
                    key={room.id}
                    value={room.id}
                    primaryText={room.name}
                  />
                );
              })}
            </Field>
          </div>
        </div>
        <div className="d-flex">
          <div className="d-flex form-group">
            <label>Start From :</label>
            <Field
              name={`${schedule}.startTime`}
              component={renderTimePicker}
              format={null}
              hintText="Begin Schedule"
              textFieldStyle={{ width: '100%' }}
            />
          </div>
          <div className="d-flex form-group">
            <label className="text-align-center">To :</label>
            <Field
              name={`${schedule}.endTime`}
              component={renderTimePicker}
              format={null}
              hintText="End Schedule"
              textFieldStyle={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    ))}
    <div className="d-flex save-btn btn-group">
      <RaisedButton
        label="Add "
        type="button"
        primary={true}
        onClick={() => fields.push({})}
      />
      {submitFailed && error && <span>{error}</span>}
    </div>
  </div>
);

export default validate;
