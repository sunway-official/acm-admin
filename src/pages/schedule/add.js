import React from 'react';
import Dialog from 'material-ui/Dialog';
import { RaisedButton, IconButton, MenuItem } from 'material-ui';
import {
  reduxForm,
  Field,
  formValueSelector,
  FieldArray,
  reset,
} from 'redux-form';
import { connect } from 'react-redux';
import { NavigationClose } from 'material-ui/svg-icons';
import validate, {
  renderTextField,
  renderDatePicker,
  renderTimePicker,
  renderSelectField,
} from './validate';
const renderSchedules = ({ fields, meta: { error, submitFailed } }) => (
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
                    key={room.value}
                    value={room.value}
                    primaryText={room.text}
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

const rooms = [
  {
    value: '1',
    text: 'Room 1',
  },
  {
    value: '2',
    text: 'Room 2',
  },
  {
    value: '3',
    text: 'Room 3',
  },
];
class AddDialog extends React.PureComponent {
  submit = values => {
    console.log('Test Values', values);
  };
  state = {
    openAdd: false,
    dialogTitle: '',
  };

  handleOpen = isAdd => {
    if (isAdd) {
      this.setState({ openAdd: true, dialogTitle: 'Add New Activity' });
    }
  };

  handleClose = () => {
    this.setState({ openAdd: false });
  };

  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props;

    return (
      <div>
        <RaisedButton label="Add Activity" onClick={this.handleOpen} />
        <Dialog
          title={this.state.dialogTitle}
          modal={true}
          autoScrollBodyContent={true}
          open={this.state.openAdd}
        >
          <form
            className="form conference-info"
            onSubmit={handleSubmit(this.submit)}
          >
            <div className="d-flex form-group">
              <label>Title :</label>
              <Field
                name="title"
                component={renderTextField}
                hintText="Activity Title"
              />
            </div>
            <FieldArray name="schedules" component={renderSchedules} />
            <div className="d-flex justify-content-flex-end">
              <RaisedButton
                label="Save"
                primary={true}
                type="submit"
                disabled={pristine || submitting || invalid}
                onClick={this.handleClose}
              />
              <IconButton
                tooltip="Close"
                className="cancel-btn dialog"
                onClick={this.handleClose}
              >
                <NavigationClose />
              </IconButton>
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}
const afterSubmit = (result, dispatch) => dispatch(reset('addDialog'));
AddDialog = reduxForm({
  form: 'addDialog',
  onSubmitSuccess: afterSubmit,
  validate,
})(AddDialog);

const selector = formValueSelector('addDialog'); // <-- same as form name
AddDialog = connect(state => {
  const date = selector(state, 'date');
  const startTime = selector(state, 'startTime');
  const endTime = selector(state, 'endTime');
  if (date && startTime && endTime) {
    const getFullYear = date.getFullYear();
    const getMonth = date.getMonth();
    const getDate = date.getDate();

    const getHoursStart = startTime.getHours();
    const getMinutesStart = startTime.getMinutes();

    const getHoursEnd = endTime.getHours();
    const getMinutesEnd = endTime.getMinutes();
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
  }

  return {
    date,
    startTime,
    endTime,
  };
})(AddDialog);

export default AddDialog;
