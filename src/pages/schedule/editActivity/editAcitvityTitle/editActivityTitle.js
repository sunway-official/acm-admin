import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { RaisedButton, Subheader } from 'material-ui';
import { renderSchedules, renderTextField } from '../../render';
import { Link } from 'react-router-dom';
// import validate from '../../validate';

class EditActivityPaper extends Component {
  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;
    let rooms;
    if (this.props) {
      rooms = this.props.rooms;
    }
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
EditActivityPaper = reduxForm({
  form: 'editActivityPaper',
  // validate,
})(EditActivityPaper);
export default EditActivityPaper;
