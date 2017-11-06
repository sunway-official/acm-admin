import React from 'react';
import { RaisedButton, Dialog } from 'material-ui';
import { reduxForm, Field, FieldArray, reset } from 'redux-form';
import { connect } from 'react-redux';
import { scheduleActions } from 'store/ducks/schedule';
import { mutations, queries } from './helpers';
import { compose, graphql } from 'react-apollo';
import { renderSchedulesEdit, renderTextField } from './render';
import { scheduleOperations } from 'store/ducks/schedule';

import validate from './validate';
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
    const { DELETE_ACTIVITY_MUTATION, event } = this.props;
    console.log(event);
    DELETE_ACTIVITY_MUTATION({
      variables: {
        id: event.id,
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
            <RaisedButton label="Delete" onClick={this.toggleDelete} />
            <Dialog
              title="Do you want to delete this schedule ?"
              open={this.state.openDelete}
              actions={actions}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const event = state.schedule;
  console.log(event);

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
    checkError: error => {
      dispatch(scheduleOperations.checkErrorOperation(error));
    },
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
  graphql(mutations.DELETE_ACTIVITY_MUTATION, {
    name: 'DELETE_ACTIVITY_MUTATION',
  }),
)(EditActivity);
