import React from 'react';
import { RaisedButton, MenuItem, Dialog } from 'material-ui';
import { reduxForm, Field, reset } from 'redux-form';
import { connect } from 'react-redux';
import { scheduleActions } from 'store/ducks/schedule';

import validate, {
  renderTextField,
  renderDatePicker,
  renderTimePicker,
  renderSelectField,
} from './validate';
const styles = {
  marginRight: 12,
};
class EditActivity extends React.PureComponent {
  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleSetTime = this.handleClose.bind(this);
  }
  state = {
    openDelete: false,
  };
  handleDelete() {
    this.setState({ openDelete: true });
  }
  handleCloseDelete() {
    this.setState({ openDelete: false });
  }
  handleClose() {
    this.props.toggleEdit();
  }
  render() {
    const { handleSubmit, submitting, pristine, invalid, rooms } = this.props;
    return (
      <div>
        <form className="form conference-info" onSubmit={handleSubmit}>
          <div className="d-flex form-group">
            <label>Title :</label>
            <Field
              name="id"
              component={() => {
                return null;
              }}
              type="hidden"
            />
            <Field
              name="scheduleId"
              component={() => {
                return null;
              }}
              type="hidden"
            />
            <Field
              name="title"
              component={renderTextField}
              hintText="Activity Title"
            />
          </div>
          <div className="d-flex form-group">
            <label>Description :</label>
            <Field
              name="id"
              component={() => {
                return null;
              }}
              type="hidden"
            />
            <Field
              name="scheduleId"
              component={() => {
                return null;
              }}
              type="hidden"
            />
            <Field
              name="description"
              component={renderTextField}
              hintText="Activity Description"
            />
          </div>
          <div className="d-flex">
            <div className="d-flex form-group ">
              <label className="schedule-date">Date:</label>
              <Field
                name="date"
                component={renderDatePicker}
                format={null}
                textFieldStyle={{ width: '100%' }}
                hintText="Activity Date"
              />
            </div>
            <div className="d-flex form-group" style={{ width: '300px' }}>
              <label className="text-align-center room">Room :</label>
              <Field name="room" component={renderSelectField}>
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
            <div className="d-flex form-group ">
              <label className="schedule-time-from">Start From :</label>
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
              style={styles}
              disabled={pristine || submitting || invalid}
              onClick={this.handleClose}
            />
            <RaisedButton label="Delete" onClick={this.handleDelete} />
            <Dialog title="Delete" open={this.state.openDelete}>
              <div className="d-flex justify-content-flex-end">
                <RaisedButton
                  label="Submit"
                  primary={true}
                  type="submit"
                  disabled={submitting}
                  style={styles}
                  onClick={this.handleClose}
                />
                <RaisedButton
                  label="Cancel"
                  type="submit"
                  onClick={this.handleCloseDelete}
                />
              </div>
            </Dialog>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const event = state.schedule.event;
  return {
    initialValues: {
      id: event.id,
      title: event.title,
      endTime: event.end,
      startTime: event.start,
      date: new Date(event.start),
      room: event.room.id,
      scheduleId: event.scheduleId,
    },
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEdit: () => dispatch(scheduleActions.toggleEditActivityFormModal()),
  };
};

const afterSubmit = (result, dispatch) => dispatch(reset('editDialog'));
EditActivity = reduxForm({
  form: 'editDialog',
  onSubmitSuccess: afterSubmit,
  validate,
})(EditActivity);

export default connect(mapStateToProps, mapDispatchToProps)(EditActivity);
