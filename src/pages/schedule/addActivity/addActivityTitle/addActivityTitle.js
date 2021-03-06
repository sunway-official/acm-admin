import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { RaisedButton, Subheader } from 'material-ui';
import { renderSchedules, renderTextField } from '../../render';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { scheduleOperations } from 'store/ducks/schedule';
import validate from '../../validate';

class AddActivityTitle extends Component {
  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;
    let rooms;
    if (this.props) {
      rooms = this.props.rooms;
    }
    return (
      <form className="form conference-info m-auto" onSubmit={handleSubmit}>
        <section>
          <Subheader className="subtitle">Add Activity</Subheader>
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
            component={renderSchedules}
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
            label="Cancel"
            containerElement={<Link to="/conference/activities" />}
            style={{ marginLeft: '10px' }}
          />
        </div>
      </form>
    );
  }
}
AddActivityTitle = reduxForm({
  form: 'addActivityTitle',
  validate,
})(AddActivityTitle);

const mapDispatchToProps = dispatch => {
  return {
    checkError: error => {
      dispatch(scheduleOperations.checkErrorOperation(error));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(AddActivityTitle);
