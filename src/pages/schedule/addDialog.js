import React from 'react';
import Dialog from 'material-ui/Dialog';
import { RaisedButton, DatePicker, TimePicker } from 'material-ui';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

const validate = values => {
  const errors = {};
  const requiredFields = ['startDate', 'startTime', 'endTime'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};
const minDate = new Date();

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
const renderTimePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TimePicker
    minDate={minDate}
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);

class AddDialog extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props;

    return (
      <div>
        <RaisedButton label="Add Activity" onClick={this.handleOpen} />

        <Dialog title="Dialog With Actions" modal={true} open={this.state.open}>
          <form className="form" onSubmit={handleSubmit}>
            <div className="d-flex date">
              <div className="d-flex form-group">
                <Field
                  name="startDate"
                  component={renderDatePicker}
                  format={null}
                  textFieldStyle={{ width: '100%' }}
                  hintText="Start Date"
                />
              </div>
            </div>

            <div className="d-flex form-group">
              <Field
                name="startTime"
                component={renderTimePicker}
                format={null}
                textFieldStyle={{ width: '100%' }}
                hintText="Start Time"
              />
            </div>
            <div className="d-flex form-group">
              <Field
                name="endTime"
                component={renderTimePicker}
                format={null}
                textFieldStyle={{ width: '100%' }}
                hintText="End Time"
              />
            </div>
            <div className="d-flex save-btn btn-group">
              <RaisedButton
                label="Save"
                primary={true}
                type="submit"
                disabled={pristine || submitting || invalid}
                onClick={this.handleClose}
              />
              <RaisedButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
              />,
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

AddDialog = reduxForm({
  form: 'addDialog',
  validate,
})(AddDialog);

const selector = formValueSelector('addDialog'); // <-- same as form name
AddDialog = connect(state => {
  // can select values individually

  const startDate = selector(state, 'startDate');
  const startTime = selector(state, 'startTime');
  const endTime = selector(state, 'endTime');
  // console.log(startDate);
  // startDate.
  // console.log(startTime);
  if (startTime && startTime && endTime) {
    const getFullYear = startDate.getFullYear();
    const getMonth = startDate.getMonth();
    const getDate = startDate.getDate();

    const getHoursStart = startTime.getHours();
    const getMinutesStart = startTime.getMinutes();

    const getHoursEnd = endTime.getHours();
    const getMinutesEnd = endTime.getMinutes();
    // console.log(getHours);
    // console.log(getMinutes);
    const newStarTime = new Date(
      getFullYear,
      getMonth,
      getDate,
      getHoursStart,
      getMinutesStart,
    ).toISOString();
    const newEndTime = new Date(
      getFullYear,
      getMonth,
      getDate,
      getHoursEnd,
      getMinutesEnd,
    ).toISOString();

    console.log(newStarTime);
    console.log(newEndTime);
  }

  return {
    startDate,
    startTime,
    endTime,
  };
})(AddDialog);

export default AddDialog;
