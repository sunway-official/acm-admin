import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { RaisedButton, MenuItem, Subheader } from 'material-ui';
import { renderSchedules, renderSelectField } from '../../render';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { scheduleOperations } from 'store/ducks/schedule';
import validate from '../../validate';

class AddActivityPaper extends Component {
  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;
    let papers, rooms;
    if (this.props) {
      papers = this.props.papers;
      rooms = this.props.rooms;
    }
    return (
      <form className="form conference-info " onSubmit={handleSubmit}>
        <Subheader className="subheader">Add Activity</Subheader>

        {error && <div className="error">{error}</div>}
        <div className="d-flex form-group">
          <label>Paper :</label>
          <Field
            name="paper"
            component={renderSelectField}
            hintText="Activity Paper"
            fullWidth={true}
          >
            {papers.map(paper => {
              return (
                <MenuItem
                  key={paper.id}
                  value={paper.id}
                  primaryText={paper.title}
                />
              );
            })}
          </Field>
        </div>

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
        <div className="d-flex justify-content-flex-end">
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
AddActivityPaper = reduxForm({
  form: 'addActivityPaper',
  validate,
})(AddActivityPaper);

const mapDispatchToProps = dispatch => {
  return {
    checkError: error => {
      dispatch(scheduleOperations.checkErrorOperation(error));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(AddActivityPaper);
