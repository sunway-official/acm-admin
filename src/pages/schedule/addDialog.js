import React from 'react';
import Dialog from 'material-ui/Dialog';
import { RaisedButton, DatePicker, TimePicker } from 'material-ui';
import { reduxForm, Field } from 'redux-form';

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
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);

class AddDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

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
                  name="date"
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
})(AddDialog);

// const selector = formValueSelector('addDialog'); // <-- same as form name
// AddDialog = connect(state => {
//   // can select values individually
//   const date = selector(state, 'date');
//   const startTime = selector(state, 'startTime');
//   const endTime = selector(state, 'endTime');
//   let newStarTime;
//   let newEndTime;
//   if (date && startTime && endTime) {
//     newStarTime = getDateTime(date, startTime);
//     newEndTime = getDateTime(date, endTime);
//   }

//   return {
//     newStarTime,
//     newEndTime,
//   };
// })(AddDialog);

// export default compose(
//   graphql(INSERT_ACTIVITY_MUTATION, {
//     name: 'INSERT_ACTIVITY_MUTATION',
//   }),
//   graphql(INSERT_SCHEDULE_MUTATION, {
//     name: 'INSERT_SCHEDULE_MUTATION',
//   }),
// )(AddDialog);

export default AddDialog;
