import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { RaisedButton, Subheader, Dialog } from 'material-ui';
import { renderSchedulesEdit, renderTextField } from '../../render';
import { Link } from 'react-router-dom';
import { queries, mutations } from '../../helpers';
import { compose, withApollo, graphql } from 'react-apollo';
import validate from '../../validate';
import { scheduleOperations, scheduleActions } from 'store/ducks/schedule';
import { connect } from 'react-redux';
import AlertContainer from 'react-alert';
import { alertOptions, MyFaCheck } from 'theme/alert';
import { withRouter } from 'react-router';

class EditActivityPaper extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  showAlertSuccess = () => {
    this.msg.success('Deleted success!', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {
        this.props.history.replace('/conference/activities');
      },
    });
  };
  async handleDelete() {
    await this.props.DELETE_ACTIVITY_MUTATION({
      variables: {
        id: this.props.event.id,
      },
      refetchQueries: [
        {
          query: queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
        },
      ],
    });
    this.showAlertSuccess();
  }

  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;
    let rooms;
    if (this.props) {
      rooms = this.props.rooms;
    }
    const actionDelete = [
      <RaisedButton
        label="Yes"
        primary={true}
        type="submit"
        onClick={() => {
          this.handleDelete();
          this.props.setToggle();
        }}
      />,
      <RaisedButton
        className="marginLeft"
        label="No"
        onClick={() => {
          this.props.setToggle();
        }}
      />,
    ];
    return (
      <form className="form conference-info m-auto" onSubmit={handleSubmit}>
        <section>
          <div className="d-flex align-items-baseline">
            <Subheader className="subtitle">
              Edit Activity Information
            </Subheader>
            <RaisedButton
              className="marginLeft"
              label="Delete"
              secondary={true}
              onClick={() => {
                this.props.setToggle();
              }}
            />
          </div>
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
        </section>
        <div className="d-flex form-group">
          <FieldArray
            name="schedules"
            component={renderSchedulesEdit}
            event={this.props.event}
            rooms={rooms}
          />
        </div>
        <div className="d-flex form-group">
          <Field name="error" component="p" />
        </div>
        <div className="marginBottom d-flex justify-content-flex-end">
          <RaisedButton
            label="Save"
            primary={true}
            type="submit"
            disabled={pristine || submitting}
          />
          <RaisedButton
            label="Cancel"
            containerElement={<Link to="/conference/activities" />}
            style={{ marginLeft: '10px' }}
          />
        </div>
        <Dialog
          title={'Do you want to delete this activity?'}
          actions={actionDelete}
          open={this.props.openDeleteFormModal}
        />
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </form>
    );
  }
}
EditActivityPaper = reduxForm({
  form: 'editActivityPaper',
  validate,
})(EditActivityPaper);
const mapStateToProps = state => {
  return {
    openDeleteFormModal: state.schedule.openDeleteFormModal,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    checkError: error => {
      dispatch(scheduleOperations.checkErrorOperation(error));
    },
    setToggle: () => dispatch(scheduleActions.toggleDeleteActivity()),
  };
};

export default compose(
  withApollo,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  graphql(mutations.DELETE_ACTIVITY_MUTATION, {
    name: 'DELETE_ACTIVITY_MUTATION',
  }),
)(EditActivityPaper);
