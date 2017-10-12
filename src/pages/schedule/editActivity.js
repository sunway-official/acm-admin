import React from 'react';
import { RaisedButton, MenuItem } from 'material-ui';
import { reduxForm, Field, reset } from 'redux-form';
import { connect } from 'react-redux';

import validate, {
  renderTextField,
  renderDatePicker,
  renderTimePicker,
  renderSelectField,
} from './validate';

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

class EditActivity extends React.PureComponent {
  render() {
    console.log(this.props.events);
    const { handleSubmit, submitting, pristine, invalid } = this.props;
    return (
      <div>
        <form className="form conference-info" onSubmit={handleSubmit}>
          <div className="d-flex form-group">
            <label>Title :</label>
            <Field
              name="title"
              component={renderTextField}
              hintText="Activity Title"
            />
          </div>
          <div className="d-flex">
            <div className="d-flex form-group">
              <label>Date:</label>
              <Field
                name="date"
                component={renderDatePicker}
                format={null}
                textFieldStyle={{ width: '100%' }}
                hintText="Activity Date"
              />
            </div>
            <div className="d-flex form-group" style={{ width: '300px' }}>
              <label className="text-align-center">Room :</label>
              <Field name="room" component={renderSelectField}>
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
                name="startTime"
                component={renderTimePicker}
                format={null}
                hintText="Begin Schedule"
                textFieldStyle={{ width: '100%' }}
              />
            </div>
            <div className="d-flex form-group">
              <label className="text-align-center">To :</label>
              <Field
                name="endTime"
                component={renderTimePicker}
                format={null}
                hintText="End Schedule"
                textFieldStyle={{ width: '100%' }}
              />
            </div>
          </div>
          <div className="d-flex save-btn btn-group">
            <RaisedButton
              label="Save"
              primary={true}
              type="submit"
              disabled={pristine || submitting || invalid}
              onClick={this.handleClose}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const events = ownProps.events;
  return {
    initialValues: {
      title: events.title,
      endTime: events.end,
      startTime: events.start,
    },
  };
};

const afterSubmit = (result, dispatch) => dispatch(reset('addDialog'));
EditActivity = reduxForm({
  form: 'addDialog',
  onSubmitSuccess: afterSubmit,
  validate,
})(EditActivity);

export default connect(mapStateToProps, undefined)(EditActivity);
