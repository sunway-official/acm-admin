import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { RaisedButton, Subheader, Dialog } from 'material-ui';
import { renderSchedulesEdit, renderTextField } from '../../render';
import { Link } from 'react-router-dom';
import { compose, withApollo } from 'react-apollo';
import validate from '../../validate';
import { scheduleOperations, scheduleActions } from 'store/ducks/schedule';
import { connect } from 'react-redux';

class EditActivityPaper extends Component {
  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;
    let rooms;
    if (this.props) {
      rooms = this.props.rooms;
    }
    const actionDelete = [
      <RaisedButton label="Yes" primary={true} type="submit" />,
      <RaisedButton
        className="marginLeft"
        label="No"
        onClick={() => {
          this.props.setToggle();
        }}
      />,
    ];
    return (
      <form className="form conference-info " onSubmit={handleSubmit}>
        <Subheader className="subheader">Edit Activity Information</Subheader>

        {error && <div className="error">{error}</div>}
        <div className="d-flex form-group">
          <label>Title :</label>
          <Field
            name="title"
            component={renderTextField}
            hintText="Activity Title"
            fullWidth={true}
          />
        </div>
        <div className="d-flex form-group">
          <label>Description :</label>
          <Field
            name="description"
            component={renderTextField}
            hintText="Activity Description"
            fullWidth={true}
          />
        </div>
        <div className="d-flex form-group">
          <FieldArray
            name="schedules"
            component={renderSchedulesEdit}
            event={this.props.event}
            rooms={rooms}
          />
        </div>
        <div className="d-flex form-group">
          <Field name="error" component="label" />
        </div>
        <div className="marginBottom d-flex justify-content-flex-end">
          <RaisedButton
            label="Save"
            primary={true}
            type="submit"
            disabled={pristine || submitting}
          />
          <RaisedButton
            className="marginLeft"
            label="Delete"
            secondary={true}
            onClick={() => {
              this.props.setToggle();
            }}
          />
          <RaisedButton
            label="Cancel"
            containerElement={<Link to="/conference/activities" />}
            className="marginLeft"
          />
        </div>
        <Dialog
          title={'Do you want to delete this activity?'}
          actions={actionDelete}
          open={this.props.openDeleteFormModal}
        />
      </form>
    );
  }
}
EditActivityPaper = reduxForm({
  form: 'editActivityPaper',
  validate,
})(EditActivityPaper);

const mapDispatchToProps = dispatch => {
  return {
    checkError: error => {
      dispatch(scheduleOperations.checkErrorOperation(error));
    },
    setToggle: () => dispatch(scheduleActions.toggleDeleteActivity()),
  };
};

const mapStateToProps = state => {
  console.log(state);
  return {
    openDeleteFormModal: state.schedule.openDeleteFormModal,
  };
};
export default compose(
  withApollo,
  connect(mapStateToProps, mapDispatchToProps),
)(EditActivityPaper);
