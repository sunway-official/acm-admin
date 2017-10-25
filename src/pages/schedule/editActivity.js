import React from 'react';
import { RaisedButton, Dialog, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';
import { reduxForm, Field, FieldArray, reset } from 'redux-form';
import { connect } from 'react-redux';
import { scheduleActions } from 'store/ducks/schedule';
import { mutations, queries } from './helpers';
import { compose, graphql } from 'react-apollo';
import renderSchedulesEdit from './renderSchedulesEdit';

import validate, { renderTextField } from './validate';
class EditActivity extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      openDelete: false,
    };
    this.toggleDelete = this.toggleDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleDelete() {
    this.setState({ openDelete: !this.state.openDelete });
  }

  handleDelete() {
    const { DELETE_SCHEDULE_MUTATION, event } = this.props;
    DELETE_SCHEDULE_MUTATION({
      variables: {
        id: event.scheduleId,
      },
      refetchQueries: [
        {
          query: queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
          variables: { conference_id: this.props.conferenceId },
        },
      ],
    });
    this.toggleDelete();
    this.props.toggleEdit();
  }

  render() {
    const actions = (
      <div>
        <RaisedButton
          label="yes"
          primary={true}
          onClick={() => this.handleDelete()}
        />
        <RaisedButton label="no" onClick={() => this.toggleDelete()} />
      </div>
    );
    const {
      handleSubmit,
      submitting,
      pristine,
      rooms,
      error,
      event,
    } = this.props;

    return (
      <div>
        {error && <div className="error">{error}</div>}
        <form className="form conference-info" onSubmit={handleSubmit}>
          <div className="d-flex form-group">
            <label>Title :</label>
            <Field
              name="title"
              component={renderTextField}
              hintText="Activity Title"
            />
          </div>
          <div className="d-flex form-group">
            <label>Description :</label>
            <Field
              name="description"
              component={renderTextField}
              hintText="Activity Description"
            />
          </div>
          <div className="d-flex form-group">
            <FieldArray
              name="schedules"
              component={renderSchedulesEdit}
              event={event}
              rooms={rooms}
            />
          </div>
          <div className="d-flex form-group">
            <Field name="error" component="label" />
          </div>
          <div className="d-flex justify-content-flex-end">
            <RaisedButton
              label="Save"
              primary={true}
              type="submit"
              disabled={pristine || submitting}
            />
            <RaisedButton label="Remove" onClick={this.toggleDelete} />
            <Dialog
              title="Do you want to delete this schedule ?"
              open={this.state.openDelete}
              actions={actions}
            />
            <IconButton
              tooltip="Close"
              className="cancel-btn dialog"
              onClick={() => {
                this.props.toggleAdd();
                this.props.reset();
              }}
            >
              <NavigationClose />
            </IconButton>
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
      description: event.description,
      schedules: event.schedules,
    },
    event: event,
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(mutations.DELETE_SCHEDULE_MUTATION, {
    name: 'DELETE_SCHEDULE_MUTATION',
  }),
)(EditActivity);
// return (
//   <div>
//     <form className="form conference-info" onSubmit={handleSubmit}>
//       <div className="d-flex form-group">
//         <label>Title :</label>
//         <Field
//           name="id"
//           component={() => {
//             return null;
//           }}
//           type="hidden"
//         />
//         <Field
//           name="scheduleId"
//           component={() => {
//             return null;
//           }}
//           type="hidden"
//         />
//         <Field
//           name="title"
//           component={renderTextField}
//           hintText="Activity Title"
//         />
//       </div>
//       <div className="d-flex form-group">
//         <label>Description :</label>
//         <Field
//           name="id"
//           component={() => {
//             return null;
//           }}
//           type="hidden"
//         />
//         <Field
//           name="scheduleId"
//           component={() => {
//             return null;
//           }}
//           type="hidden"
//         />
//         <Field
//           name="description"
//           component={renderTextField}
//           hintText="Activity Description"
//         />
//       </div>
//       <div className="d-flex">
//         <div className="d-flex form-group ">
//           <label className="schedule-date">Date:</label>
//           <Field
//             name="date"
//             component={renderDatePicker}
//             format={null}
//             textFieldStyle={{ width: '100%' }}
//             hintText="Activity Date"
//           />
//         </div>
//         <div className="d-flex form-group" style={{ width: '300px' }}>
//           <label className="text-align-center room">Room :</label>
//           <Field name="room" component={renderSelectField}>
//             {rooms.map(room => {
//               return (
//                 <MenuItem
//                   key={room.id}
//                   value={room.id}
//                   primaryText={room.name}
//                 />
//               );
//             })}
//           </Field>
//         </div>
//       </div>
//       <div className="d-flex">
//         <div className="d-flex form-group ">
//           <label className="schedule-time-from">Start From :</label>
//           <Field
//             name="startTime"
//             component={renderTimePicker}
//             format={null}
//             hintText="Begin Schedule"
//             textFieldStyle={{ width: '100%' }}
//           />
//         </div>
//         <div className="d-flex form-group">
//           <label className="text-align-center">To :</label>
//           <Field
//             name="endTime"
//             component={renderTimePicker}
//             format={null}
//             hintText="End Schedule"
//             textFieldStyle={{ width: '100%' }}
//           />
//         </div>
//       </div>
//       <div className="d-flex save-btn btn-group">
//         <RaisedButton
//           label="Save"
//           primary={true}
//           type="submit"
//           style={styles}
//           disabled={pristine || submitting}
//           // onClick={this.props.toggleEdit}
//         />
//         <RaisedButton label="Delete" onClick={this.toggleDelete} />
//         <Dialog
//           title="Do you want to delete this schedule ?"
//           open={this.state.openDelete}
//         >
//           <div className="d-flex justify-content-flex-end">
//             <RaisedButton
//               label="Yes"
//               primary={true}
//               type="submit"
//               disabled={submitting}
//               style={styles}
//               onClick={this.handleDelete}
//             />
//             <RaisedButton
//               label="No"
//               type="submit"
//               onClick={this.toggleDelete}
//             />
//           </div>
//         </Dialog>
//       </div>
//     </form>
//   </div>
// );
